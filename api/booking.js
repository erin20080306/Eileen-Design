import nodemailer from 'nodemailer';

const serviceLabels = {
  web: '一頁式網站 (Web Design)',
  code: '程式開發 (Development)',
  sheet: '報表整理 (Data Process)',
  payment: '金流串接 (Payment API)',
  course: '教學課程 (Course)',
  other: '其他需求 (Others)',
};

const allowedOrigins = [
  'https://erin.is-a.dev',
  'https://eileen-design.pages.dev',
  'https://eileen-design.vercel.app',
  'http://localhost:5173',
  ...(process.env.BOOKING_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
];

const limit = (value = '', max = 1000) => String(value).trim().slice(0, max);

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

export default async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.BOOKING_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const body = req.body || {};
  if (body.website) {
    return res.status(200).json({ ok: true });
  }

  const name = limit(body.name, 120);
  const phone = limit(body.phone, 80);
  const email = limit(body.email, 160);
  const service = serviceLabels[body.service] || limit(body.service || '未指定', 120);
  const preferredDate = limit(body.preferredDate || '未指定', 40);
  const preferredTime = limit(body.preferredTime || '不指定', 80);
  const message = limit(body.message || '未填寫', 2000);

  if (!name || !phone || !email || !body.service) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const submittedAt = new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    hour12: false,
  });

  const text = [
    '新的預約表單',
    '',
    `姓名: ${name}`,
    `電話: ${phone}`,
    `Email: ${email}`,
    `服務類型: ${service}`,
    `希望日期: ${preferredDate}`,
    `希望時間: ${preferredTime}`,
    '',
    '詳細需求:',
    message,
    '',
    `送出時間: ${submittedAt}`,
  ].join('\n');

  const html = `
    <h2>新的預約表單</h2>
    <p><strong>姓名:</strong> ${escapeHtml(name)}</p>
    <p><strong>電話:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>服務類型:</strong> ${escapeHtml(service)}</p>
    <p><strong>希望日期:</strong> ${escapeHtml(preferredDate)}</p>
    <p><strong>希望時間:</strong> ${escapeHtml(preferredTime)}</p>
    <p><strong>詳細需求:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
    <hr>
    <p><small>送出時間: ${escapeHtml(submittedAt)}</small></p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  await transporter.sendMail({
    from: `"ERIN Design Booking" <${gmailUser}>`,
    to: toEmail,
    replyTo: email,
    subject: `新的預約表單 - ${name}`,
    text,
    html,
  });

  return res.status(200).json({ ok: true });
}
