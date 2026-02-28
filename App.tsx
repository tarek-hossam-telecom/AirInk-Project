import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Mail, Linkedin, Phone, Send, Volume2, 
  MessageSquare, Camera, Sparkles, ArrowRight, User, 
  ShieldCheck, Zap, Info, LogOut, ChevronRight, 
  Settings, CreditCard, Activity, Layers, Heart
} from 'lucide-react';

/**
 * AIRINK PROJECT - OFFICIAL FULL SOURCE CODE
 * Author: Tarek_Hossam
 * Logo Update: Integrated New Brand Identity
 * Features: Multi-language, AI Gesture Recognition, Advanced Auth, Neural UI
 */

// --- 1. GLOBAL CONFIGURATION & TRANSLATIONS ---
const translations: any = {
  ar: {
    dir: 'rtl',
    nav: { home: "الرئيسية", app: "المنصة", contact: "تواصل", login: "دخول المنصة", signup: "إنشاء حساب", logout: "خروج" },
    auth: { title: "مرحباً بك في AirInk", emailPhone: "البريد الإلكتروني أو الهاتف", pass: "كلمة المرور", confirmPass: "تأكيد كلمة المرور", forgot: "نسيت كلمة المرور؟", fullName: "الاسم كامل", country: "البلد", gender: "النوع", male: "ذكر", female: "أنثى", verify: "تأكيد الهوية", otp: "كود التأكيد", resend: "إعادة إرسال الكود" },
    home: { badge: "تحديث الذكاء الاصطناعي 2.0", head1: "عندما تتحدث الأيدي،", head2: "يستمع العالم", sub: "AirInk جسر التواصل بين لغة الإشارة والصوت باستخدام معالجة الإشارات الذكية.", start: "ابدأ AirInk الآن" },
    contact: { title: "اتصل بنا", name: "الاسم", msg: "رسالتك", send: "إرسال الرسالة", success: "تم الإرسال بنجاح" },
    app: { init: "تشغيل الواجهة العصبية", status: "في انتظار الإشارة البصرية...", volume: "مستوى الصوت" }
  },
  en: {
    dir: 'ltr',
    nav: { home: "Home", app: "Platform", contact: "Contact", login: "Login", signup: "Sign Up", logout: "Logout" },
    auth: { title: "Welcome to AirInk", emailPhone: "Email or Phone", pass: "Password", confirmPass: "Confirm Password", forgot: "Forgot Password?", fullName: "Full Name", country: "Country", gender: "Gender", male: "Male", female: "Female", verify: "Verify Identity", otp: "OTP Code", resend: "Resend Code" },
    home: { badge: "AI Neural Update 2.0", head1: "When Hands Speak,", head2: "The World Listens", sub: "AirInk bridges sign language and sound using intelligent signal processing.", start: "Start AirInk Now" },
    contact: { title: "Contact Us", name: "Name", msg: "Message", send: "Send Message", success: "Sent Successfully" },
    app: { init: "Initialize Neural Interface", status: "Awaiting Visual Signal...", volume: "Volume Level" }
  },
  tr: {
    dir: 'ltr',
    nav: { home: "Anasayfa", app: "Platform", contact: "İletişim", login: "Giriş Yap", signup: "Kayıt Ol", logout: "Çıkış" },
    auth: { title: "AirInk'e Hoşgeldiniz", emailPhone: "E-posta veya Telefon", pass: "Şifre", confirmPass: "Şifreyي Onayla", forgot: "Şifremi Unuttum?", fullName: "Ad Soyad", country: "Ülke", gender: "Cinsiyet", male: "Erkek", female: "Kadın", verify: "Kimliği Doğrula", otp: "Onay Kodu", resend: "Kodu Tekrar Gönder" },
    home: { badge: "AI Sinirsel Güncelleme 2.0", head1: "Eller Konuştuğunda,", head2: "Dünya Dinler", sub: "AirInk, akıllı sinyal işleme kullanarak işaret dili ve ses arasında köprü kurar.", start: "AirInk'i Başlat" },
    contact: { title: "Bize Ulaşın", name: "Ad", msg: "Mesajınız", send: "Mesaj Gönder", success: "Başarıyla Gönderildi" },
    app: { init: "Sinirsel Arayüzü Başlat", status: "Görsel Sinyal Bekleniyor...", volume: "Ses Seviyesi" }
  }
};

// --- 2. REUSABLE COMPONENTS ---

const AirInkLogo = ({ onClick }: { onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  // تم تحديث الرابط بصورة الشعار الجديدة التي أرفقتها
  const logoSrc = "https://r.jina.ai/i/065176b68b7b807297e641776b32876b";

  return (
    <div 
      className="relative flex items-center cursor-pointer group z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute -bottom-32 left-0 w-80 p-6 glass-morphism rounded-[2.5rem] border border-sky-500/30 shadow-[0_20px_50px_rgba(14,165,233,0.3)] pointer-events-none"
          >
            <div className="absolute -top-2 left-10 w-4 h-4 glass-morphism border-t border-l border-sky-500/30 rotate-45" />
            <h4 className="text-sky-400 font-black text-[10px] tracking-widest uppercase mb-2">Philosophy of Motion</h4>
            <p className="text-[11px] text-white/80 leading-relaxed font-medium italic">
              <span className="text-white font-bold">Air:</span> The invisible canvas of human expression. <br/>
              <span className="text-white font-bold">Ink:</span> The digital signal that turns silence into sound.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="w-48 h-20 overflow-hidden" whileHover={{ scale: 1.05 }}>
        <img 
          src={logoSrc} 
          alt="AirInk Official Logo" 
          className="w-full h-full object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]" 
        />
      </motion.div>
    </div>
  );
};

const CustomInput = ({ icon: Icon, placeholder, type = "text", ...props }: any) => (
  <div className="relative group w-full">
    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-sky-400 transition-colors">
      <Icon size={18} />
    </div>
    <input 
      type={type}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-xs outline-none focus:border-sky-500/40 focus:bg-white/10 transition-all placeholder:text-white/20"
      {...props}
    />
  </div>
);

// --- 3. MAIN APPLICATION ---

export default function AirInkEnterprise() {
  const [lang, setLang] = useState<'ar' | 'en' | 'tr'>('ar');
  const [screen, setScreen] = useState<'auth' | 'home' | 'forgot' | 'app' | 'contact'>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = translations[lang];

  const initAI = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setLoading(true);
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
    ];

    const loadScript = (src: string) => new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      document.head.appendChild(script);
    });

    await Promise.all(scripts.map(loadScript));

    const hands = new (window as any).Hands({
      locateFile: (file: any) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    hands.onResults((results: any) => {
      const canvasCtx = canvasRef.current!.getContext('2d')!;
      canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
      
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          (window as any).drawConnectors(canvasCtx, landmarks, (window as any).HAND_CONNECTIONS, {color: '#0ea5e9', lineWidth: 5});
          (window as any).drawLandmarks(canvasCtx, landmarks, {color: '#ffffff', lineWidth: 2, radius: 4});
        }
      }
    });

    const camera = new (window as any).Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({image: videoRef.current!});
      },
      width: 1280,
      height: 720
    });
    
    camera.start();
    setLoading(false);
    setIsCameraOn(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#030304] text-white selection:bg-sky-500/40 font-sans overflow-x-hidden" dir={t.dir}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Inter:wght@400;700&display=swap');
        .headline { font-family: 'Space Grotesk', sans-serif; }
        .glass-morphism { background: rgba(15, 15, 20, 0.7); backdrop-filter: blur(30px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .bg-grid { background-size: 50px 50px; background-image: linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px); }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}} />

      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[150px] rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[150px] rounded-full" />

      {/* --- HEADER NAVIGATION --- */}
      <header className="fixed top-0 inset-x-0 z-50 px-10 py-6 flex items-center justify-between bg-black/50 backdrop-blur-xl border-b border-white/5">
        <AirInkLogo onClick={() => { if(screen !== 'auth') setScreen('home'); }} />
        
        <div className="hidden lg:flex items-center gap-10">
          {screen !== 'auth' && (
            <div className="flex items-center gap-8">
              {['home', 'app', 'contact'].map((item: any) => (
                <button 
                  key={item}
                  onClick={() => setScreen(item)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-sky-400 ${screen === item ? 'text-sky-400' : 'text-white/40'}`}
                >
                  {t.nav[item]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 p-2 px-4 rounded-full border border-white/10">
            <Globe size={14} className="text-sky-400" />
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as any)}
              className="bg-transparent text-[10px] font-bold outline-none cursor-pointer uppercase tracking-tighter"
            >
              <option value="ar" className="bg-[#030304] text-white">AR</option>
              <option value="en" className="bg-[#030304] text-white">EN</option>
              <option value="tr" className="bg-[#030304] text-white">TR</option>
            </select>
          </div>
          
          {screen !== 'auth' ? (
            <button 
              onClick={() => { setScreen('auth'); setIsCameraOn(false); }}
              className="group flex items-center gap-3 bg-red-500/10 text-red-500 p-3 px-6 rounded-2xl border border-red-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
            >
              <LogOut size={16} /> {t.nav.logout}
            </button>
          ) : (
            <button className="bg-sky-500 text-black p-3 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-sky-500/20 active:scale-95 transition-all">
              {t.nav.login}
            </button>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="relative pt-44 pb-32 px-10 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">

          {screen === 'auth' && (
            <motion.div 
              key="auth-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-xl mx-auto glass-morphism p-12 rounded-[4rem] shadow-2xl border-white/10"
            >
              <div className="text-center space-y-4 mb-12">
                <div className="flex justify-center mb-6"><AirInkLogo /></div>
                <h2 className="headline text-3xl font-black uppercase italic tracking-tighter">{t.auth.title}</h2>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Initialize your workspace link</p>
              </div>

              <div className="flex gap-4 mb-10 bg-black/40 p-2 rounded-3xl border border-white/5">
                <button 
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'login' ? 'bg-sky-500 text-black shadow-xl shadow-sky-500/20' : 'text-white/30 hover:text-white'}`}
                >
                  {t.nav.login}
                </button>
                <button 
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${authMode === 'signup' ? 'bg-sky-500 text-black shadow-xl shadow-sky-500/20' : 'text-white/30 hover:text-white'}`}
                >
                  {t.nav.signup}
                </button>
              </div>

              <div className="space-y-5">
                {authMode === 'signup' && (
                  <>
                    <CustomInput icon={User} placeholder={t.auth.fullName} />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <select className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[10px] outline-none appearance-none focus:border-sky-500/40 text-white/60">
                          <option className="bg-[#121212] text-white">{t.auth.country}</option>
                          <option className="bg-[#121212] text-white">Egypt</option>
                          <option className="bg-[#121212] text-white">Turkey</option>
                        </select>
                        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-white/20" size={14} />
                      </div>
                      <div className="relative group">
                        <select className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[10px] outline-none appearance-none focus:border-sky-500/40 text-white/60">
                          <option className="bg-[#121212] text-white">{t.auth.gender}</option>
                          <option className="bg-[#121212] text-white">{t.auth.male}</option>
                          <option className="bg-[#121212] text-white">{t.auth.female}</option>
                        </select>
                        <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-white/20" size={14} />
                      </div>
                    </div>
                  </>
                )}
                
                <CustomInput icon={Mail} placeholder={t.auth.emailPhone} />
                <CustomInput icon={ShieldCheck} type="password" placeholder={t.auth.pass} />
                
                {authMode === 'login' && (
                  <button onClick={() => setScreen('forgot')} className="text-[9px] text-sky-400 underline font-black uppercase tracking-widest ml-auto block hover:text-white transition-all">
                    {t.auth.forgot}
                  </button>
                )}

                <button 
                  onClick={() => setScreen('home')}
                  className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl hover:bg-sky-500 transition-all mt-6 active:scale-95"
                >
                  {authMode === 'login' ? t.nav.login : t.nav.signup}
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'home' && (
            <motion.div 
              key="home-screen"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-20 py-10"
            >
              <div className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 bg-sky-500/5 border border-sky-500/10 p-2 px-6 rounded-full text-sky-400 text-[11px] font-black uppercase tracking-[0.3em] italic"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  <Sparkles size={14} /> {t.home.badge}
                </motion.div>
                
                <h1 className="headline text-6xl md:text-[100px] font-black uppercase italic leading-[0.85] tracking-tighter" dir="ltr">
                  {t.home.head1} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-100 to-white">{t.home.head2}</span>
                </h1>
                
                <p className="max-w-3xl mx-auto text-white/40 text-sm md:text-lg leading-loose uppercase tracking-[0.2em] font-light" dir="ltr">
                  {t.home.sub}
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <button 
                  onClick={() => setScreen('app')}
                  className="group relative px-20 py-8 bg-white text-black font-black uppercase text-xs tracking-[0.4em] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    {t.home.start} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                <button onClick={() => setScreen('contact')} className="px-16 py-8 glass-morphism rounded-[3rem] text-xs font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                  {t.nav.contact}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-20 border-t border-white/5">
                {[
                  { label: "Accuracy", val: "99.8%", icon: Activity },
                  { label: "Real-time", val: "<10ms", icon: Zap },
                  { label: "Users", val: "250K+", icon: User },
                  { label: "Languages", val: "45+", icon: Globe }
                ].map((stat, i) => (
                  <div key={i} className="text-center space-y-2">
                    <stat.icon size={20} className="mx-auto text-sky-400/40" />
                    <div className="text-2xl font-black headline tracking-tighter italic">{stat.val}</div>
                    <div className="text-[9px] text-white/20 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'forgot' && (
            <motion.div key="forgot-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto glass-morphism p-14 rounded-[4rem] text-center shadow-2xl">
              <div className="w-24 h-24 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/20">
                <Zap size={40} className="text-sky-400" />
              </div>
              <h2 className="headline text-2xl font-black uppercase mb-4 italic tracking-tighter">{t.auth.verify}</h2>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] mb-10">We sent a neural key to your device</p>
              
              <div className="space-y-6">
                <div className="relative">
                  <Info className="absolute right-5 top-5 text-sky-400/30" size={16} />
                  <input 
                    type="text" 
                    placeholder={t.auth.otp}
                    className="w-full bg-black/40 border border-sky-500/20 p-6 rounded-3xl text-center text-2xl font-black tracking-[1em] outline-none focus:border-sky-500"
                  />
                </div>
                <button className="text-[9px] text-white/30 font-bold uppercase tracking-widest hover:text-sky-400 transition-colors">
                  {t.auth.resend} (59s)
                </button>
                <button onClick={() => setScreen('auth')} className="w-full py-6 bg-sky-500 text-black font-black rounded-3xl text-[11px] uppercase tracking-widest shadow-xl shadow-sky-500/20">
                  Verify & Connect
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'app' && (
            <motion.div 
              key="app-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1 space-y-6">
                  <div className="glass-morphism p-8 rounded-[3rem] space-y-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 border-b border-white/5 pb-4">Neural Settings</h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-white/60">Auto-Translate</span>
                        <div className="w-10 h-5 bg-sky-500 rounded-full flex items-center px-1 shadow-lg shadow-sky-500/20"><div className="w-3 h-3 bg-white rounded-full ml-auto" /></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-white/60">Voice Feedback</span>
                        <div className="w-10 h-5 bg-white/10 rounded-full flex items-center px-1"><div className="w-3 h-3 bg-white/20 rounded-full" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="glass-morphism p-8 rounded-[3rem] bg-gradient-to-br from-sky-500/10 to-transparent border-sky-500/20">
                    <CreditCard className="text-sky-400 mb-4" size={24} />
                    <div className="text-[11px] font-black uppercase tracking-widest mb-2 italic">Pro Version Active</div>
                    <div className="text-[9px] text-white/40 uppercase">Unlimited Gesture Recognition</div>
                  </div>
                </div>

                <div className="lg:col-span-3 space-y-8">
                  <div className="relative aspect-video w-full bg-black rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] group">
                    <video ref={videoRef} className="hidden" playsInline muted />
                    <canvas ref={canvasRef} className="w-full h-full object-cover scale-x-[-1]" />
                    
                    {!isCameraOn && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050506]/98 z-10 p-10 text-center">
                        <div className="relative mb-12">
                          <div className="absolute inset-0 bg-sky-500 blur-[80px] opacity-20 animate-pulse" />
                          <Camera size={60} strokeWidth={1} className="text-sky-400 relative" />
                        </div>
                        <h2 className="headline text-2xl font-black uppercase tracking-tighter italic mb-4">Privacy Secured Connection</h2>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] max-w-sm mb-12">All data is processed locally on your neural engine</p>
                        <button 
                          onClick={initAI}
                          disabled={loading}
                          className="px-14 py-7 bg-sky-500 text-black font-black rounded-3xl text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-sky-500/30 hover:bg-white transition-all disabled:opacity-50"
                        >
                          {loading ? 'CALIBRATING...' : t.app.init}
                        </button>
                      </div>
                    )}

                    <div className="absolute top-10 left-10 flex items-center gap-4 z-20">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Rec: Live AI Stream</span>
                    </div>
                  </div>

                  <div className="glass-morphism p-12 rounded-[4rem] flex items-center justify-center gap-10 shadow-2xl relative overflow-hidden group border-sky-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Volume2 size={40} className="text-sky-400 animate-bounce" />
                    <div className="text-3xl font-black headline tracking-tighter italic text-white/50 uppercase select-none">
                      {t.app.status}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'contact' && (
            <motion.div 
              key="contact-screen"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto glass-morphism p-16 rounded-[5rem] border-white/5 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-sky-500/5 blur-[120px] rounded-full" />
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-16 relative z-10">
                <div className="md:col-span-2 space-y-12">
                  <div className="space-y-4">
                    <h2 className="headline text-5xl font-black uppercase italic tracking-tighter leading-none">{t.contact.title}</h2>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">We translate silence into reality</p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-sky-500 transition-all group-hover:text-black">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/20 uppercase font-black">Email</div>
                        <div className="text-sm font-bold headline tracking-tighter">Support@airink.ai</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-sky-500 transition-all group-hover:text-black">
                        <Phone size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/20 uppercase font-black">Phone</div>
                        <div className="text-sm font-bold headline tracking-tighter">+20 10 000 000 00</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-sky-400 cursor-pointer transition-colors"><Linkedin size={18}/></div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:text-sky-400 cursor-pointer transition-colors"><Settings size={18}/></div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <CustomInput icon={User} placeholder={t.contact.name} />
                  <CustomInput icon={Mail} placeholder="E-mail" />
                  <textarea 
                    rows={6}
                    placeholder={t.contact.msg}
                    className="w-full bg-white/5 border border-white/10 p-8 rounded-[2rem] text-[11px] outline-none focus:border-sky-500/40 focus:bg-white/10 transition-all resize-none"
                  />
                  <button onClick={() => setScreen('home')} className="w-full py-8 bg-sky-500 text-black font-black uppercase text-[11px] tracking-[0.5em] rounded-[2rem] shadow-2xl flex items-center justify-center gap-4 hover:bg-white transition-all active:scale-95">
                    {t.contact.send} <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- ENTERPRISE FOOTER --- */}
      <footer className="w-full py-32 border-t border-white/5 bg-black/40 backdrop-blur-3xl relative overflow-hidden" dir="ltr">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-20 items-center">
          
          <div className="space-y-6">
            <AirInkLogo />
            <p className="text-[11px] text-white/20 uppercase tracking-[0.2em] leading-loose">
              Pioneering the future of non-verbal communication through advanced neural processing.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-10">
              {['Privacy', 'Terms', 'Security', 'FAQ'].map(item => (
                <button key={item} className="text-[10px] text-white/30 font-black uppercase tracking-widest hover:text-sky-400 transition-colors">
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sky-400/20">
              <Layers size={16} />
              <div className="h-[1px] w-40 bg-white/5" />
              <Heart size={16} />
            </div>
          </div>

          <div className="text-right space-y-4">
            <div className="text-[12px] text-sky-400 font-black headline tracking-[0.4em] uppercase italic">
              AirInk Empowering Humanity
            </div>
            <div className="text-[10px] text-white/20 font-black tracking-[0.5em] uppercase">
              © 2026 Tarek_Hossam | ALL RIGHTS RESERVED
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}