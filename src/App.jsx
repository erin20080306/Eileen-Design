import React, { useState, useEffect } from 'react';
import { Code, Layout, FileSpreadsheet, Database, CreditCard, Compass, Menu, X, ArrowRight, Calendar, Clock, Send, CheckCircle2, Instagram, Mail, Linkedin, ChevronDown } from 'lucide-react';

// 自訂 Threads 圖示組件
const ThreadsIcon = ({ className, strokeWidth = 2 }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.09 10.43c0 6.63-5.37 12-12 12A11.97 11.97 0 0 1 2 17.43"/>
    <path d="M15.42 10.43a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
    <path d="M15.42 10.43v1.6c0 1.77 1.43 3.2 3.2 3.2 1.77 0 3.2-1.43 3.2-3.2v-1.6c0-5.3-4.3-9.6-9.6-9.6s-9.6 4.3-9.6 9.6"/>
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [bookingError, setBookingError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activePresentation, setActivePresentation] = useState(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [servicesIntroVisible, setServicesIntroVisible] = useState(false);

  // 處理進場動畫與導覽列滾動效果
  useEffect(() => {
    const timer = setTimeout(() => { setIsLoaded(true); }, 100);
    const handleScroll = () => { setScrolled(window.scrollY > 80); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const element = document.getElementById('services-intro-copy');
    if (!element) { return undefined; }
    if (!('IntersectionObserver' in window)) {
      setServicesIntroVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setServicesIntroVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus('submitting');
    setBookingError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const bookingApiUrl = import.meta.env.VITE_BOOKING_API_URL || 'https://eileen-design.vercel.app/api/booking';

    try {
      const response = await fetch(bookingApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Booking request failed');
      }

      form.reset();
      setBookingStatus('success');
      setTimeout(() => setBookingStatus('idle'), 5000);
    } catch (error) {
      setBookingError('表單暫時無法送出，請稍後再試，或直接寄信到 erin20080306@gmail.com。');
      setBookingStatus('idle');
    }
  };

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) { element.scrollIntoView({ behavior: 'smooth' }); }
  };

  // 強制開新分頁功能 (解決預覽環境的限制)
  const openLink = (url) => {
    if (url) { window.open(url, '_blank', 'noopener,noreferrer'); }
  };

  const getPresentationViewerUrl = (file) => {
    const publicUrl = `${window.location.origin}${file}`;
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(publicUrl)}`;
  };

  const certificates = [
    {
      title: '運用需求開發創造需求並促成轉換',
      image: '/certificates/IMG_8425.jpeg',
      label: '需求開發 / 轉換認證',
    },
    {
      title: '從業人員適用的 AI 技術輔助搜尋廣告基礎課程',
      image: '/certificates/IMG_8426.jpeg',
      label: 'AI搜尋 / 廣告基礎',
    },
    {
      title: 'Google AI 技術輔助高效廣告認證',
      image: '/certificates/IMG_8427.jpeg',
      label: 'AI高效 / 廣告認證',
    },
    {
      title: 'Google Analytics（分析）認證',
      image: '/certificates/IMG_8414.jpeg',
      label: 'GA分析 / 認證證書',
    },
  ];

  const claudeCertificates = [
    {
      title: 'Claude 101 Certificate of Completion',
      image: '/certificates/claude-101-certificate.png',
      label: 'Claude 101 / Claude 入門證書',
    },
    {
      title: 'AI Fluency: Framework & Foundations Certificate',
      image: '/certificates/ai-fluency-foundations.png',
      label: 'AI Fluency / AI 流暢度基礎',
    },
    {
      title: 'Claude 101 Validation Information',
      image: '/certificates/claude-101-validation.png',
      label: 'Claude Validation / Claude 驗證資訊',
    },
  ];

  const presentationCases = [
    {
      title: 'GAS廣告企劃報告',
      subtitle: 'Google Ads 策略企劃簡報',
      desc: '以廣告目標、受眾規劃、投放策略與成效追蹤為核心，整理成可對外提案與內部溝通使用的企劃簡報。',
      file: '/presentations/gas-ad-plan-report.pptx',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
      tags: ['Presentation', 'Google Ads'],
    },
    {
      title: 'GAS數據簡報',
      subtitle: '廣告數據分析與成效彙整',
      desc: '將廣告數據、趨勢洞察與優化方向整理為清楚的簡報脈絡，協助快速掌握投放成效與後續決策重點。',
      file: '/presentations/gas-data-presentation.pptx',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      tags: ['Presentation', 'Analytics'],
    },
  ];

  const technologyUses = [
    { title: 'Marketing Landing Page', tech: 'Next.js、TypeScript、Tailwind、GA4、Vercel' },
    { title: 'Analytics Dashboard', tech: 'React、Chart.js、API、資料庫' },
    { title: 'AI Ad Copy Generator', tech: 'Next.js、OpenAI API、TypeScript' },
    { title: 'Booking / Contact System', tech: 'React、表單驗證、Email API、資料儲存' },
  ];

  const privacySections = [
    {
      title: '資料蒐集',
      body: '當您填寫預約或聯絡表單時，本網站可能會蒐集姓名、電話、Email、服務需求、希望日期與留言內容，用於回覆諮詢與安排後續聯繫。',
    },
    {
      title: '資料使用',
      body: '您的資料僅用於 ERIN Design Studio 專案溝通、服務回覆與必要的客戶聯繫，不會出售、出租或任意提供給無關第三方。',
    },
    {
      title: '第三方服務',
      body: '本網站可能使用 Vercel、Cloudflare Web Analytics、Google 相關服務或表單通知工具，以維持網站運作、流量分析與訊息傳遞。',
    },
    {
      title: '聯絡方式',
      body: '若您希望查詢、修改或刪除已提交的個人資料，請來信至 erin20080306@gmail.com，我們會協助處理。',
    },
  ];

  const termsSections = [
    {
      title: '服務範圍',
      body: 'ERIN Design Studio 提供網頁設計、程式開發、資料整理、自動化串接、金流串接與相關數位服務。實際服務內容、時程與費用以雙方確認的報價、合約或書面溝通為準。',
    },
    {
      title: '預約與溝通',
      body: '您透過本網站送出表單後，代表您同意我們依您提供的聯絡資訊回覆需求、安排諮詢或進行後續專案討論。',
    },
    {
      title: '智慧財產權',
      body: '專案完成前所提供的提案、設計稿、程式架構與文件仍屬 ERIN Design Studio 或原權利人所有。交付範圍與授權方式依雙方約定為準。',
    },
    {
      title: '網站內容',
      body: '本網站內容僅作為服務介紹與聯絡用途。我們會盡力維持資訊正確，但不保證所有內容在任何時間皆完整、即時或無誤。',
    },
    {
      title: '條款調整',
      body: 'ERIN Design Studio 保留視服務需求或網站營運狀況調整本條款的權利，更新後將公布於本網站。',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* 嵌入進階品牌動態 CSS */}
      <style>{`
        @keyframes maskReveal { 0% { transform: translateY(110%); } 100% { transform: translateY(0); } }
        @keyframes fadeSlideUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes bgSlowZoom { 0% { transform: scale(1.08); opacity: 0; filter: blur(10px); } 100% { transform: scale(1); opacity: 1; filter: blur(0px); } }
        .clip-wrapper { overflow: hidden; padding-bottom: 0.1em; }
        .animate-mask-reveal { transform: translateY(110%); animation: maskReveal 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-fade-up { opacity: 0; animation: fadeSlideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-bg-zoom { animation: bgSlowZoom 2s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-800 { animation-delay: 800ms; }
      `}</style>

      {/* 導覽列 */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-neutral-100 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className={`group cursor-pointer flex items-baseline gap-2 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} onClick={() => scrollToSection('home')}>
            <span className="text-2xl font-black tracking-tighter text-neutral-900 group-hover:text-neutral-600 transition-colors">ERIN.</span>
            <span className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-500 hidden md:inline-block ${scrolled ? 'text-neutral-400' : 'text-neutral-500/80'}`}>Design Studio</span>
          </div>
          <nav className={`hidden md:flex items-center space-x-10 ${isLoaded ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
            {['Services', 'Works', 'Booking'].map((item, index) => {
              const ids = ['services', 'portfolio', 'booking'];
              return (
                <button key={item} onClick={() => scrollToSection(ids[index])} className={`text-sm font-medium tracking-wide uppercase relative overflow-hidden group transition-colors ${scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}`}>
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                </button>
              );
            })}
            <button onClick={() => scrollToSection('booking')} className={`px-6 py-2.5 text-xs tracking-widest uppercase font-bold rounded-none border transition-all duration-300 ${scrolled ? 'bg-neutral-900 border-neutral-900 text-white hover:bg-white hover:text-neutral-900' : 'bg-neutral-900/90 border-neutral-900 text-white hover:bg-white hover:text-neutral-900 backdrop-blur-sm'}`}>Let's Talk</button>
          </nav>
          <button className={`md:hidden text-neutral-900 z-50 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* 手機選單 */}
        <div className={`fixed inset-0 bg-neutral-900 text-white z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-center items-center ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col space-y-8 text-center w-full px-6">
            {['Services', 'Works', 'Booking'].map((item, index) => {
              const ids = ['services', 'portfolio', 'booking'];
              const ch = ['專業服務', '精選作品', '預約諮詢'];
              return (
                <div key={item} className="overflow-hidden">
                  <button onClick={() => scrollToSection(ids[index])} className="group flex flex-col items-center w-full">
                    <span className="text-4xl font-light tracking-tighter uppercase mb-1">{item}</span>
                    <span className="text-sm text-neutral-400 tracking-widest">{ch[index]}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* 首頁 (Hero Section) */}
      <section id="home" className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-neutral-100">
        <div className={`absolute inset-0 w-full h-full opacity-0 ${isLoaded ? 'animate-bg-zoom' : ''}`}>
          <div className="absolute inset-0 bg-[#f4f4f5] opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-gradient-to-b from-purple-200/40 to-transparent rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-t from-neutral-200/60 to-transparent rounded-full blur-[120px]"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <div className="clip-wrapper mb-6">
            <h2 className={`text-sm md:text-base font-medium tracking-[0.3em] uppercase text-neutral-500 ${isLoaded ? 'animate-mask-reveal delay-100' : ''}`}>Crafting Digital Excellence</h2>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-900 leading-[0.9] mb-8 w-full max-w-5xl mx-auto flex flex-col">
            <div className="clip-wrapper"><span className={`block ${isLoaded ? 'animate-mask-reveal delay-200' : ''}`}>LOGIC</span></div>
            <div className="clip-wrapper my-2 md:my-0"><span className={`block text-neutral-400 italic font-serif ${isLoaded ? 'animate-mask-reveal delay-400' : ''}`}>&</span></div>
            <div className="clip-wrapper"><span className={`block ${isLoaded ? 'animate-mask-reveal delay-600' : ''}`}>AESTHETICS.</span></div>
          </h1>
          <p className={`text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-12 font-light ${isLoaded ? 'animate-fade-up delay-800' : 'opacity-0'}`}>
            艾琳程式設計工作室。將複雜的程式邏輯與商業需求，轉化為優雅且直覺的數位體驗。從一頁式網站到系統開發，為您的品牌打造頂級數位門面。
          </p>
          <div className={`flex flex-col sm:flex-row items-center gap-6 ${isLoaded ? 'animate-fade-up delay-800' : 'opacity-0'}`}>
            <button onClick={() => scrollToSection('booking')} className="px-10 py-4 bg-neutral-900 text-white text-sm tracking-widest uppercase font-bold hover:bg-neutral-800 transition-colors flex items-center group">
              Start Project / 開始專案
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-neutral-400 cursor-pointer ${isLoaded ? 'animate-fade-up delay-800' : 'opacity-0'}`} onClick={() => scrollToSection('services')}>
          <span className="text-[10px] uppercase tracking-widest mb-2 font-medium">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* 服務項目 (Services) */}
      <section id="services" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
            <div className="max-w-xl">
              <span className="text-sm tracking-[0.2em] uppercase text-neutral-400 font-bold mb-4 block">Expertise</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 mb-6">全方位數位服務</h2>
              <p className="text-neutral-500 font-light leading-relaxed">我們不只做設計，更提供堅實的技術後盾。讓美感與功能完美結合，助您的業務高效運轉。</p>
              <div className="mt-8 space-y-4">
                <p className="text-2xl md:text-3xl font-black tracking-tighter leading-tight text-neutral-900">
                  我協助品牌與創作者打造高轉換網站、自動化工具與 AI 輔助工作流程
                </p>
                <p className="text-base md:text-lg leading-8 text-neutral-600 font-medium">
                  結合網頁設計、前端開發、Google Sheet API、報表自動化、金流串接與 AI 工具，讓網站不只是好看，也能帶來詢問、收單與效率提升。
                </p>
              </div>
            </div>
            <div id="services-intro-copy" className="w-full max-w-xl border-l border-neutral-200 pl-5 space-y-3 md:mt-10">
              <div className={`space-y-1 transition-all duration-700 ease-out ${servicesIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
                <p className="text-sm leading-6 text-neutral-800 font-semibold tracking-[0.01em] sm:whitespace-nowrap">I build modern web applications with React, Next.js,</p>
                <p className="text-sm leading-6 text-neutral-800 font-semibold tracking-[0.01em] sm:whitespace-nowrap">TypeScript, APIs, databases, and cloud deployment.</p>
                <p className="text-sm leading-6 text-neutral-800 font-semibold tracking-[0.01em] sm:whitespace-nowrap">My projects focus on clean UI, measurable performance,</p>
                <p className="text-sm leading-6 text-neutral-800 font-semibold tracking-[0.01em] sm:whitespace-nowrap">and business-oriented results.</p>
              </div>
              <div className={`space-y-1 transition-all duration-700 ease-out ${servicesIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '180ms' }}>
                <p className="text-sm leading-6 text-neutral-700 font-semibold tracking-[0.01em] sm:whitespace-nowrap">我使用 React、Next.js、TypeScript、API、</p>
                <p className="text-sm leading-6 text-neutral-700 font-semibold tracking-[0.01em] sm:whitespace-nowrap">資料庫與雲端部署打造現代化網站與應用程式。</p>
                <p className="text-sm leading-6 text-neutral-700 font-semibold tracking-[0.01em] sm:whitespace-nowrap">我的作品不只注重介面設計，也重視效能、</p>
                <p className="text-sm leading-6 text-neutral-700 font-semibold tracking-[0.01em] sm:whitespace-nowrap">數據追蹤與商業轉換成果。</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 border-t border-neutral-200 pt-16">
            {[
              { icon: <Code />, en: 'Development', title: '客製化程式開發', desc: '依據您的獨特商業邏輯，打造穩定、安全且高效的專屬 Web 應用程式與內部系統。' },
              { icon: <Layout />, en: 'Web Design', title: '一頁式網站設計', desc: '結合現代排版與流暢動態，打造高轉化率的 Landing Page，完美呈現品牌價值。' },
              { icon: <FileSpreadsheet />, en: 'Data Process', title: '複雜報表整理', desc: '將龐雜的數據結構化、視覺化，建立清晰易讀的自動化報表與儀表板。' },
              { icon: <Database />, en: 'Google Sheet API', title: 'Google Sheet 串接', desc: '靈活運用 Google 試算表作為輕量資料庫，實現低成本的自動化與資料同步。' },
              { icon: <CreditCard />, en: 'Payment', title: '付款金流串接', desc: '無縫整合台灣各大第三方支付（如綠界、藍新、Line Pay），打造順暢結帳體驗。' },
              { icon: <Compass />, en: 'Consulting', title: '品牌架構諮詢', desc: '為您的數位產品提供宏觀架構建議，從 UI/UX 到技術選型，規劃長期發展藍圖。' }
            ].map((service, idx) => (
              <div key={idx} className="group cursor-default relative">
                <div className="text-neutral-300 mb-6 group-hover:text-neutral-900 transition-colors duration-300">
                  {React.cloneElement(service.icon, { size: 32, strokeWidth: 1.5 })}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs tracking-widest text-neutral-400 uppercase font-medium">{service.en}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-neutral-900">{service.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed text-sm">{service.desc}</p>
                <div className="w-0 h-[1px] bg-neutral-900 mt-6 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            ))}
          </div>
          <div className="mt-10 border-t border-neutral-200 pt-8 max-w-xl">
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-5">TECH USAGE / 技術使用</h3>
            <ul className="space-y-4">
              {technologyUses.map((item) => (
                <li key={item.title}>
                  <h4 className="text-sm font-semibold text-neutral-900 mb-1">{item.title}</h4>
                  <p className="text-sm leading-6 text-neutral-600 font-medium">技術：{item.tech}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 精選作品 (Works) */}
      <section id="portfolio" className="py-32 bg-neutral-950 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-20 text-center">
            <span className="text-sm tracking-[0.2em] uppercase text-neutral-500 font-bold mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">精選專案案例</h2>
          </div>
          <div className="space-y-32">
            {/* Project 1: Lyric Video App */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group cursor-pointer" onClick={() => openLink('https://lyric-video-three.vercel.app/')}>
              <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                <div className="aspect-[4/3] w-full bg-neutral-800">
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" alt="Lyric Video Creator / 動態歌詞生成系統" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Web App</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">React</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Lyric Video Creator</h3>
                <h4 className="text-xl font-medium text-neutral-400 mb-4">動態歌詞生成系統</h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8">提供直覺的 Web 介面，結合音樂與文字渲染，讓使用者能快速將音軌與歌詞結合，在瀏覽器端直接預覽並生成具備設計感的動態歌詞效果。</p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-white group-hover:text-purple-300 transition-colors w-max">
                  View Case / 查看案例 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Project 2: AURA Coffee/服飾 */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 group cursor-default">
              <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                <div className="aspect-[4/3] w-full bg-neutral-800">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" alt="AURA Coffee / 精品咖啡訂閱平台" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Web Design</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Payment</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">AURA Coffee/服飾</h3>
                <h4 className="text-xl font-medium text-neutral-400 mb-4">精品咖啡訂閱平台</h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8">為獨立精品咖啡品牌打造的專屬訂閱制網站。以極簡視覺凸顯產品高質感，後端串接綠界定期定額金流，實現完全自動化的訂閱與扣款流程。</p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-neutral-500 cursor-not-allowed w-max">Preparing Case...</div>
              </div>
            </div>

            {/* Project 3: Digital Experience */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group cursor-pointer" onClick={() => openLink('https://tinyurl.com/dfprb4ft')}>
              <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                <div className="aspect-[4/3] w-full bg-neutral-800">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Digital Experience / 專屬數位服務平台" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Web Design</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Fullstack</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Digital Experience</h3>
                <h4 className="text-xl font-medium text-neutral-400 mb-4">專屬數位服務平台</h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8">結合現代排版與流暢的前端動態，為品牌打造高度客製化的線上互動體驗，兼具視覺美感與效能，有效提升品牌形象、使用者黏著度與轉化率。</p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-white group-hover:text-purple-300 transition-colors w-max">
                  View Case / 查看案例 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Project 4: SyncTech Dashboard */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-24 group cursor-pointer" onClick={() => openLink('https://tinyurl.com/dfprb4ft')}>
              <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                <div className="aspect-[4/3] w-full bg-neutral-800">
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="SyncTech Dashboard / 進銷存管理儀表板" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">System</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Google Sheet</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">SyncTech Dashboard</h3>
                <h4 className="text-xl font-medium text-neutral-400 mb-4">進銷存管理儀表板</h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8">替中小型企業量身打造的內部管理工具。利用 Google Sheet API 作為輕量級資料中心，開發直覺的網頁介面，大幅降低員工處理複雜報表的時間成本。</p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-white group-hover:text-purple-300 transition-colors w-max">
                  View Case / 查看案例 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Project 5: Nearby Places Explorer */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group cursor-pointer" onClick={() => openLink('https://nearby-places-app.vercel.app/')}>
              <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                <div className="aspect-[4/3] w-full bg-neutral-800">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Nearby Places Explorer / 鄰近地標探索系統" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
                </div>
              </div>
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex gap-3 mb-6">
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">Map API</span>
                  <span className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">LBS</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">Nearby Places Explorer</h3>
                <h4 className="text-xl font-medium text-neutral-400 mb-4">鄰近地標探索系統</h4>
                <p className="text-neutral-400 font-light leading-relaxed mb-8">深度整合第三方地圖 API 與 LBS (適地性服務)，打造流暢的地標探索工具，自動偵測用戶位置，讓使用者能輕鬆、直覺地發掘周遭的熱門景點與店家資訊。</p>
                <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-white group-hover:text-purple-300 transition-colors w-max">
                  View Case / 查看案例 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {presentationCases.map((presentation, index) => (
              <div
                key={presentation.title}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 group cursor-pointer`}
                onClick={() => setActivePresentation(presentation)}
              >
                <div className="w-full lg:w-3/5 overflow-hidden bg-neutral-900 relative rounded-sm">
                  <div className="aspect-[4/3] w-full bg-neutral-800">
                    <img
                      src={presentation.image}
                      alt={presentation.title}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <div className="flex gap-3 mb-6">
                    {presentation.tags.map((tag) => (
                      <span key={tag} className="text-xs uppercase tracking-widest text-neutral-500 border border-neutral-700 px-3 py-1">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{presentation.title}</h3>
                  <h4 className="text-xl font-medium text-neutral-400 mb-4">{presentation.subtitle}</h4>
                  <p className="text-neutral-400 font-light leading-relaxed mb-8">{presentation.desc}</p>
                  <div className="inline-flex items-center text-sm uppercase tracking-widest font-bold text-white group-hover:text-purple-300 transition-colors w-max">
                    View Deck / 查看簡報 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 課程預約系統 */}
      <section id="booking" className="py-32 bg-[#fafafa]">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 flex flex-col justify-between">
              <div>
                <span className="text-sm tracking-[0.2em] uppercase text-neutral-400 font-bold mb-4 block">Let's Connect</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 mb-8 leading-[1.1]">準備好啟動<br/>您的專案了嗎？</h2>
                <p className="text-neutral-600 font-light leading-relaxed mb-12">填寫右方表單與我聯繫。無論是商業網站建置、系統開發委託，或是報名「網頁前端設計」一對一課程，我都會在 24 小時內親自回覆您。</p>
              </div>
              <div className="space-y-8 border-t border-neutral-200 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900"><Mail className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">Email / 電子信箱</h4>
                    <p className="text-sm font-medium">erin20080306@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900"><Clock className="w-4 h-4" /></div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-1">聯絡時間</h4>
                    <p className="text-sm font-medium">Mon - Fri, 10:00 - 18:00 (TPE)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100">
                {bookingStatus === 'success' ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center animate-in fade-in duration-700">
                    <CheckCircle2 className="w-16 h-16 text-neutral-900 mb-6" strokeWidth={1.5} />
                    <h3 className="text-3xl font-black tracking-tighter mb-4">Request Sent.</h3>
                    <p className="text-lg font-bold text-neutral-900 mb-3">已送出表單</p>
                    <p className="text-neutral-500 font-light">感謝您的來信，我已收到您的需求資訊。<br/>我將盡快與您聯繫並安排後續會議。</p>
                    <button onClick={() => setBookingStatus('idle')} className="mt-10 px-8 py-3 border border-neutral-900 text-sm tracking-widest uppercase font-bold hover:bg-neutral-900 hover:text-white transition-colors">Back to Form / 返回表單</button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-8">
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 relative group">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Name / 姓名 *</label>
                        <input required type="text" name="name" placeholder="您的姓名或公司名稱" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 placeholder-neutral-300 text-sm font-medium" />
                      </div>
                      <div className="space-y-3 relative group">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Phone / 聯絡電話 *</label>
                        <input required type="tel" name="phone" placeholder="09XX-XXX-XXX" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 placeholder-neutral-300 text-sm font-medium" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 relative group">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Email / 電子信箱 *</label>
                        <input required type="email" name="email" placeholder="example@mail.com" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 placeholder-neutral-300 text-sm font-medium" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Service / 服務類型 *</label>
                        <select required name="service" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 text-sm font-medium appearance-none cursor-pointer" defaultValue="">
                          <option value="" disabled hidden>請選擇服務項目...</option>
                          <option value="web">一頁式網站 (Web Design)</option>
                          <option value="code">程式開發 (Development)</option>
                          <option value="sheet">報表整理 (Data Process)</option>
                          <option value="payment">金流串接 (Payment API)</option>
                          <option value="course">教學課程 (Course)</option>
                          <option value="other">其他需求 (Others)</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Preferred Date / 希望日期</label>
                        <input type="date" name="preferredDate" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 text-sm font-medium uppercase" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Preferred Time / 希望時間</label>
                        <select name="preferredTime" className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 text-sm font-medium appearance-none cursor-pointer" defaultValue="">
                          <option value="">不指定 (Anytime)</option>
                          <option value="morning">上午 (Morning 10:00 - 12:00)</option>
                          <option value="afternoon">下午 (Afternoon 13:00 - 18:00)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] uppercase tracking-widest font-bold text-neutral-400 block">Message / 詳細需求</label>
                      <textarea rows="4" name="message" placeholder="請簡述您的專案需求、商業目標，或是想學習的內容..." className="w-full bg-transparent border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors text-neutral-900 placeholder-neutral-300 text-sm font-medium resize-none"></textarea>
                    </div>
                    {bookingError && (
                      <p className="text-sm font-medium text-red-600">{bookingError}</p>
                    )}
                    <div className="pt-4">
                      <button type="submit" disabled={bookingStatus === 'submitting'} className="w-full py-4 bg-[#111111] text-white text-[13px] tracking-[0.15em] font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer">
                        {bookingStatus === 'submitting' ? (
                          <span className="tracking-widest">SENDING... / 傳送中...</span>
                        ) : (
                          <span className="flex items-center tracking-widest">SUBMIT INQUIRY / 送出預約 <Send className="w-[18px] h-[18px] ml-3" strokeWidth={2} /></span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 頁尾 (Footer) */}
      <footer id="footer" className="bg-neutral-950 text-white py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2">
              <div className="text-3xl font-black tracking-tighter mb-4">ERIN.</div>
              <p className="text-neutral-500 font-light text-sm max-w-sm mb-6">專注於程式開發與數位設計的獨立工作室。致力於將複雜的商業邏輯化為優雅的數位體驗。</p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/erin19921122?igsh=d3Q2Z21ia25oZzhv&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"><Instagram className="w-4 h-4" /></a>
                <a href="https://www.threads.com/@erin19921122?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"><ThreadsIcon className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-600 mb-4 whitespace-nowrap">GOOGLE / 專業認證書連結</h4>
                  <ul className="space-y-3">
                    {certificates.map((certificate) => (
                      <li key={certificate.title}>
                        <button
                          type="button"
                          onClick={() => setActiveCertificate(certificate)}
                          title={certificate.title}
                          className="text-neutral-400 hover:text-white text-sm transition-colors text-left whitespace-nowrap"
                        >
                          {certificate.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-600 mb-4 whitespace-nowrap">CLAUDE / AI 證書連結</h4>
                  <ul className="space-y-3">
                    {claudeCertificates.map((certificate) => (
                      <li key={certificate.title}>
                        <button
                          type="button"
                          onClick={() => setActiveCertificate(certificate)}
                          title={certificate.title}
                          className="text-neutral-400 hover:text-white text-sm transition-colors text-left whitespace-nowrap"
                        >
                          {certificate.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 border-t border-neutral-900 pt-8">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-4">AI & Analytics Certifications</h3>
                <p className="text-sm leading-7 text-neutral-400 font-medium max-w-2xl">
                  我將 AI 輔助開發、網站數據追蹤與轉換優化應用在實際專案中<br className="hidden sm:block" />
                  協助客戶建立更有效率、可衡量成效的數位系統。
                </p>
              </div>
            </div>
            {/* 更新後的雙語 Navigation 區塊 */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-600 mb-6">Navigation / 網站導覽</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Services / 專業服務', id: 'services' },
                  { label: 'Works / 精選作品', id: 'portfolio' },
                  { label: 'Booking / 預約諮詢', id: 'booking' }
                ].map((item) => (
                  <li key={item.id}>
                    <button onClick={() => scrollToSection(item.id)} className="text-neutral-400 hover:text-white text-sm transition-colors text-left">{item.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* 更新後的雙語 Legal 區塊 */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-neutral-600 mb-6">Legal / 法律聲明</h4>
              <ul className="space-y-4">
                <li>
                  <button
                    type="button"
                    onClick={() => setIsPrivacyOpen(true)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors text-left"
                  >
                    Privacy Policy / 隱私權政策
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(true)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors text-left"
                  >
                    Terms of Service / 服務條款
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 tracking-wider">
            <p>&copy; {new Date().getFullYear()} ERIN DESIGN STUDIO. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">TAIPEI, TAIWAN</p>
          </div>
        </div>
      </footer>
      {activeCertificate && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title}
        >
          <button
            type="button"
            onClick={() => setActiveCertificate(null)}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 transition-colors"
            aria-label="Close certificate"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default"
            onClick={() => setActiveCertificate(null)}
            aria-label="Close certificate preview"
          />
          <img
            src={activeCertificate.image}
            alt={activeCertificate.title}
            className="relative z-10 max-h-[88vh] max-w-full bg-white object-contain shadow-2xl"
          />
        </div>
      )}
      {activePresentation && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activePresentation.title}
        >
          <button
            type="button"
            onClick={() => setActivePresentation(null)}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 transition-colors"
            aria-label="Close presentation"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default"
            onClick={() => setActivePresentation(null)}
            aria-label="Close presentation preview"
          />
          <div className="relative z-10 w-full max-w-6xl h-[84vh] bg-neutral-950 text-white shadow-2xl flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-800 px-5 md:px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1">Presentation Case</p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight">{activePresentation.title}</h2>
              </div>
              <a
                href={activePresentation.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest font-bold text-neutral-400 hover:text-white transition-colors"
              >
                Open PPTX / 開啟簡報
              </a>
            </div>
            <iframe
              title={activePresentation.title}
              src={getPresentationViewerUrl(activePresentation.file)}
              className="w-full flex-1 bg-white"
              allowFullScreen
            />
          </div>
        </div>
      )}
      {isPrivacyOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="隱私權政策"
        >
          <button
            type="button"
            onClick={() => setIsPrivacyOpen(false)}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 transition-colors"
            aria-label="Close privacy policy"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default"
            onClick={() => setIsPrivacyOpen(false)}
            aria-label="Close privacy policy"
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[86vh] overflow-y-auto bg-white text-neutral-900 p-8 md:p-10 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">Privacy Policy</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">隱私權聲明</h2>
            <p className="text-sm leading-7 text-neutral-600 mb-8">
              ERIN Design Studio 重視您的個人資料與隱私。本聲明說明本網站如何蒐集、使用與保護您主動提供的資料。
            </p>
            <div className="space-y-6">
              {privacySections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-sm font-bold tracking-widest text-neutral-900 mb-2">{section.title}</h3>
                  <p className="text-sm leading-7 text-neutral-600">{section.body}</p>
                </section>
              ))}
            </div>
            <p className="mt-8 pt-6 border-t border-neutral-200 text-xs text-neutral-400">最後更新：2026 年 6 月 2 日</p>
          </div>
        </div>
      )}
      {isTermsOpen && (
        <div
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="服務條款"
        >
          <button
            type="button"
            onClick={() => setIsTermsOpen(false)}
            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 transition-colors"
            aria-label="Close terms of service"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default"
            onClick={() => setIsTermsOpen(false)}
            aria-label="Close terms of service"
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[86vh] overflow-y-auto bg-white text-neutral-900 p-8 md:p-10 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4">Terms of Service</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">服務條款聲明</h2>
            <p className="text-sm leading-7 text-neutral-600 mb-8">
              歡迎使用 ERIN Design Studio 網站。使用本網站或送出聯絡表單，即表示您了解並同意以下基本服務條款。
            </p>
            <div className="space-y-6">
              {termsSections.map((section) => (
                <section key={section.title}>
                  <h3 className="text-sm font-bold tracking-widest text-neutral-900 mb-2">{section.title}</h3>
                  <p className="text-sm leading-7 text-neutral-600">{section.body}</p>
                </section>
              ))}
            </div>
            <p className="mt-8 pt-6 border-t border-neutral-200 text-xs text-neutral-400">最後更新：2026 年 6 月 2 日</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
