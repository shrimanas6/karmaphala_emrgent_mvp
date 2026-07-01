'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Shield, Heart, ArrowRight, ArrowLeft, Phone, CheckCircle2, Search, MapPin, Star,
  Zap, ChefHat, Wrench, Hammer, PaintBucket, Cog, Car, Stethoscope, HeartPulse, BriefcaseMedical,
  Scale, Cpu, BookOpen, GraduationCap, Flame, Camera, Scissors, Trees, Baby, PawPrint,
  UserCheck, Laptop, Settings, Users, Award, Wallet, Bell, LogOut, Power, ToggleLeft, ToggleRight,
  Loader2, Check, Clock, Navigation, Sprout, Leaf
} from 'lucide-react';

const ICONS = {
  ChefHat, Zap, Wrench, Hammer, PaintBucket, Cog, Car, Stethoscope, HeartPulse, BriefcaseMedical,
  Scale, Cpu, BookOpen, GraduationCap, Flame, Camera, Scissors, Trees, Baby, PawPrint,
  UserCheck, Laptop, Settings, Heart
};

const api = async (path, opts = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('kp_token') : null;
  const res = await fetch(`/api/${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(opts.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

const KPLogo = ({ size = 'md' }) => {
  const s = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  const dot = size === 'lg' ? 'w-12 h-12' : size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  return (
    <div className="flex items-center gap-3">
      <div className={`${dot} rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-soft relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-gold-400 opacity-70" style={{clipPath:'polygon(50% 0, 100% 0, 100% 60%, 70% 100%)'}}/>
        <Sprout className="w-1/2 h-1/2 text-white" />
      </div>
      <div className="leading-none">
        <div className={`${s} font-display font-bold`}>
          <span className="text-teal-500">Karma</span><span className="text-gold-400">Phala</span>
        </div>
        <div className="text-[9px] tracking-[0.15em] uppercase text-teal-500/70 font-semibold mt-1">The Results of One&apos;s Deeds</div>
      </div>
    </div>
  );
};

const AvatarCircle = ({ name, size = 48, verified = false }) => {
  const initials = (name || '?').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  const hue = (name?.charCodeAt(0) || 0) * 13 % 360;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="w-full h-full rounded-full flex items-center justify-center font-bold text-white shadow-soft" style={{ background: `linear-gradient(135deg, hsl(${hue}, 60%, 45%), hsl(${(hue+40)%360}, 65%, 40%))`, fontSize: size*0.38 }}>
        {initials}
      </div>
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
          <Check className="w-3 h-3 text-white" strokeWidth={4}/>
        </div>
      )}
    </div>
  );
};

// ---------- Landing ----------
const Landing = ({ onStart }) => (
  <div className="min-h-screen bg-hero-gradient">
    <div className="container max-w-6xl mx-auto px-6 pt-8 pb-16">
      <nav className="flex justify-between items-center mb-14">
        <KPLogo />
        <button onClick={onStart} className="hidden md:inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-500 transition">
          Sign In <ArrowRight className="w-4 h-4"/>
        </button>
      </nav>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="chip mb-6"><Leaf className="w-3 h-3"/> Community. Care. Karma.</div>
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] text-teal-700 mb-6">
            Trusted help,<br/>from people <span className="text-gold-400">who care.</span>
          </h1>
          <p className="text-lg text-teal-700/70 mb-8 max-w-lg">
            Reliable local helpers for elders, families and homes. Verified providers, transparent pricing, and community-driven karma &mdash; whenever you need.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <button onClick={onStart} className="btn-primary text-lg flex items-center gap-2">
              Get Started <ArrowRight className="w-5 h-5"/>
            </button>
            <button onClick={onStart} className="px-6 py-3.5 rounded-2xl border-2 border-teal-500/20 text-teal-600 font-semibold hover:border-teal-500 transition">
              I&apos;m a Helper
            </button>
          </div>
          <div className="flex gap-6 flex-wrap">
            <TrustBadge icon={Shield} label="Verified & Trusted"/>
            <TrustBadge icon={Sparkles} label="Safe & Secure"/>
            <TrustBadge icon={Heart} label="Community Care" gold/>
          </div>
        </div>

        <div className="relative">
          <div className="card-premium p-6 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold-100 opacity-60"/>
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-teal-50 opacity-70"/>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"/>
                <span className="text-sm text-teal-600 font-semibold">12 verified helpers online near you</span>
              </div>
              {[
                { name: 'Priya Sharma', role: 'Senior Care · Expert', rating: 4.9, dist: '0.8 km', price: '₹400/hr' },
                { name: 'Ramesh Kumar', role: 'Electrician · Expert', rating: 4.8, dist: '1.2 km', price: '₹350/hr' },
                { name: 'Anita Rao', role: 'Cook · Explorer', rating: 4.7, dist: '1.5 km', price: '₹300/hr' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-3 border-b border-teal-500/10 last:border-0">
                  <AvatarCircle name={p.name} verified/>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-teal-700 truncate">{p.name}</div>
                    <div className="text-xs text-teal-700/60">{p.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gold-500 font-bold justify-end"><Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400"/>{p.rating}</div>
                    <div className="text-xs text-teal-700/60">{p.dist} · {p.price}</div>
                  </div>
                </div>
              ))}
              <button onClick={onStart} className="mt-4 w-full btn-primary text-center">Find Helper Now</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-teal-700 mb-6 text-center">One account. Two modes. Endless possibilities.</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ModeCard icon={Search} title="Offer Work (Customer)" desc="Book verified cooks, electricians, caregivers, hospital companions, purohits & more — near you, right now." color="teal"/>
          <ModeCard icon={UserCheck} title="Offer Service (Helper)" desc="Turn your skills into income. Get instant nearby requests, transparent payouts, and earn Karma points." color="gold"/>
        </div>
      </div>
    </div>
  </div>
);

const TrustBadge = ({ icon: Icon, label, gold }) => (
  <div className="flex items-center gap-2">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${gold ? 'bg-gold-100' : 'bg-teal-50'}`}>
      <Icon className={`w-5 h-5 ${gold ? 'text-gold-500' : 'text-teal-500'}`}/>
    </div>
    <span className="text-sm font-semibold text-teal-700">{label}</span>
  </div>
);

const ModeCard = ({ icon: Icon, title, desc, color }) => (
  <div className="card-premium p-8 hover:-translate-y-1 transition-transform">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${color === 'gold' ? 'bg-gold-100 text-gold-500' : 'bg-teal-50 text-teal-500'}`}>
      <Icon className="w-7 h-7"/>
    </div>
    <h3 className="text-xl font-display font-bold text-teal-700 mb-2">{title}</h3>
    <p className="text-teal-700/70">{desc}</p>
  </div>
);

// ---------- Auth ----------
const AuthShell = ({ children, onBack }) => (
  <div className="min-h-screen bg-beige-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      {onBack && (
        <button onClick={onBack} className="mb-6 w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center hover:bg-teal-50 transition">
          <ArrowLeft className="w-5 h-5 text-teal-700"/>
        </button>
      )}
      <div className="card-premium p-8">
        <div className="flex justify-center mb-6"><KPLogo/></div>
        {children}
      </div>
    </div>
  </div>
);

const AuthMobile = ({ onNext, onBack }) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const submit = async () => {
    setError('');
    if (mobile.length < 10) return setError('Enter valid 10-digit mobile');
    setLoading(true);
    try {
      const full = '+91' + mobile;
      const res = await api('auth/send-otp', { method: 'POST', body: JSON.stringify({ mobile: full }) });
      onNext(full, res.demoOtp);
    } catch(e) { setError(e.message); }
    setLoading(false);
  };
  return (
    <AuthShell onBack={onBack}>
      <h2 className="text-3xl font-display font-bold text-teal-700 mb-2">Welcome to KarmaPhala</h2>
      <p className="text-teal-700/60 mb-8">Register with your mobile number to continue</p>
      <label className="block text-sm font-semibold text-teal-700 mb-2">Mobile number</label>
      <div className="flex gap-2 mb-4">
        <div className="input-field flex items-center gap-2 w-24 justify-center font-semibold text-teal-700">🇮🇳 +91</div>
        <input value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="Enter mobile number" className="input-field flex-1" inputMode="numeric"/>
      </div>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <button onClick={submit} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
        {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Get OTP <ArrowRight className="w-5 h-5"/></>}
      </button>
      <div className="mt-6 flex items-center gap-3 text-sm text-teal-700/60">
        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center"><Shield className="w-4 h-4 text-teal-500"/></div>
        We&apos;ll send a one-time password to verify your number
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[{i: Users, t:'Verified helpers'}, {i: Shield, t:'Secure OTP login'}, {i: Heart, t:'Community care'}].map((f, k) => (
          <div key={k} className="p-3 rounded-2xl bg-teal-50/60 text-center">
            <f.i className="w-6 h-6 text-teal-500 mx-auto mb-1.5"/>
            <div className="text-xs font-semibold text-teal-700">{f.t}</div>
          </div>
        ))}
      </div>
    </AuthShell>
  );
};

const AuthOtp = ({ mobile, demoOtp, onVerified, onBack }) => {
  const [digits, setDigits] = useState(['','','','','','']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(179);
  useEffect(() => { const t = setInterval(() => setSeconds(s => Math.max(0, s-1)), 1000); return () => clearInterval(t); }, []);
  const setDigit = (i, v) => {
    v = v.replace(/\D/g,'').slice(0,1);
    const arr = [...digits]; arr[i] = v; setDigits(arr);
    if (v && i < 5) document.getElementById(`otp-${i+1}`)?.focus();
  };
  const submit = async () => {
    setError('');
    const code = digits.join('');
    if (code.length !== 6) return setError('Enter 6-digit OTP');
    setLoading(true);
    try {
      const res = await api('auth/verify-otp', { method: 'POST', body: JSON.stringify({ mobile, code }) });
      localStorage.setItem('kp_token', res.token);
      onVerified(res.user, res.needsRegistration);
    } catch(e) { setError(e.message); }
    setLoading(false);
  };
  const mm = String(Math.floor(seconds/60)).padStart(2,'0');
  const ss = String(seconds%60).padStart(2,'0');
  return (
    <AuthShell onBack={onBack}>
      <h2 className="text-3xl font-display font-bold text-teal-700 mb-2 text-center">Verify your number</h2>
      <p className="text-center text-teal-700/60 mb-1">Enter the 6-digit OTP sent to</p>
      <p className="text-center text-teal-600 font-semibold mb-6">{mobile}</p>
      {demoOtp && (
        <div className="mb-5 p-3 rounded-xl bg-gold-50 border border-gold-200 text-center text-sm">
          <span className="text-gold-600 font-semibold">Demo OTP:</span> <span className="font-mono font-bold text-gold-500 tracking-widest text-lg">{demoOtp}</span>
          <button onClick={() => setDigits(demoOtp.split(''))} className="ml-2 text-xs text-teal-600 underline">Auto-fill</button>
        </div>
      )}
      <div className="flex justify-center gap-2 mb-6">
        {digits.map((d, i) => (
          <input key={i} id={`otp-${i}`} value={d} onChange={e => setDigit(i, e.target.value)}
            onKeyDown={e => e.key==='Backspace' && !d && i>0 && document.getElementById(`otp-${i-1}`)?.focus()}
            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white border-2 border-teal-500/20 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition" inputMode="numeric"/>
        ))}
      </div>
      <div className="text-center mb-6 text-sm">
        <span className="inline-flex items-center gap-2 text-teal-600"><Shield className="w-4 h-4"/> OTP is valid for <span className="text-gold-500 font-bold">{mm}:{ss}</span> minutes</span>
      </div>
      {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}
      <button onClick={submit} disabled={loading} className="btn-primary w-full">
        {loading ? <Loader2 className="w-5 h-5 animate-spin inline"/> : 'Verify OTP'}
      </button>
      <div className="mt-6 p-4 rounded-2xl bg-softgreen-light border border-softgreen">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-teal-500 mt-0.5"/>
          <div>
            <div className="font-semibold text-teal-700 mb-0.5">Secure & Private</div>
            <div className="text-xs text-teal-700/70">Your number is safe with us and used only for verification.</div>
          </div>
        </div>
      </div>
    </AuthShell>
  );
};

const CompleteProfile = ({ onDone }) => {
  const [form, setForm] = useState({ name: '', email: '', gender: '', foodPref: '', agreeTerms: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setError('');
    if (!form.name) return setError('Please enter your name');
    if (!form.gender) return setError('Please select gender');
    if (!form.foodPref) return setError('Please select food preference');
    if (!form.agreeTerms) return setError('Please agree to terms');
    setLoading(true);
    try {
      const res = await api('user/register', { method: 'POST', body: JSON.stringify(form) });
      onDone(res.user);
    } catch(e) { setError(e.message); }
    setLoading(false);
  };
  return (
    <AuthShell>
      <h2 className="text-2xl font-display font-bold text-teal-700 mb-2">Complete your profile</h2>
      <p className="text-teal-700/60 mb-6">Just a few more details to get started</p>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-teal-700 mb-1.5 block">Full name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Your full name"/>
        </div>
        <div>
          <label className="text-sm font-semibold text-teal-700 mb-1.5 block">Email (optional)</label>
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="you@example.com" type="email"/>
        </div>
        <div>
          <label className="text-sm font-semibold text-teal-700 mb-2 block">Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {['Male','Female','Other'].map(g => (
              <button key={g} onClick={() => setForm({...form, gender: g})} className={`p-3 rounded-xl border-2 font-semibold transition ${form.gender===g ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-teal-500/15 text-teal-700/70 hover:border-teal-500/40'}`}>{g}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-teal-700 mb-2 block">Food preference</label>
          <div className="grid grid-cols-2 gap-2">
            {['Veg','Non Veg'].map(g => (
              <button key={g} onClick={() => setForm({...form, foodPref: g})} className={`p-3 rounded-xl border-2 font-semibold transition ${form.foodPref===g ? 'border-gold-400 bg-gold-50 text-gold-500' : 'border-teal-500/15 text-teal-700/70 hover:border-gold-400/50'}`}>{g}</button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-teal-50 transition">
          <input type="checkbox" checked={form.agreeTerms} onChange={e => setForm({...form, agreeTerms: e.target.checked})} className="w-5 h-5 accent-teal-500"/>
          <span className="text-sm text-teal-700">I agree to the <span className="font-semibold underline">Terms & Conditions</span></span>
        </label>
      </div>
      {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
      <button onClick={submit} disabled={loading} className="btn-primary w-full mt-6">
        {loading ? <Loader2 className="w-5 h-5 animate-spin inline"/> : 'Continue'}
      </button>
    </AuthShell>
  );
};

// ---------- Dashboard ----------
const TopBar = ({ onLogout }) => (
  <div className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-teal-500/10">
    <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <KPLogo size="sm"/>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition relative">
          <Bell className="w-5 h-5 text-teal-600"/>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"/>
        </button>
        <button onClick={onLogout} className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center hover:bg-red-50 transition">
          <LogOut className="w-5 h-5 text-teal-600"/>
        </button>
      </div>
    </div>
  </div>
);

const QuickCard = ({ icon: Icon, label, onClick, color = 'teal' }) => {
  const c = { teal: 'text-teal-500 bg-teal-50', pink: 'text-pink-500 bg-pink-50', gold: 'text-gold-400 bg-gold-50', green: 'text-green-600 bg-green-50' }[color];
  return (
    <button onClick={onClick} className="card-premium p-4 hover:-translate-y-0.5 transition-transform text-left w-full">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${c}`}>
        <Icon className="w-5 h-5"/>
      </div>
      <div className="text-sm font-semibold text-teal-700">{label}</div>
    </button>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => {
  const c = color === 'gold' ? 'bg-gold-50 text-gold-500' : 'bg-teal-50 text-teal-500';
  return (
    <div className="card-premium p-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${c}`}><Icon className="w-5 h-5"/></div>
      <div className="text-xs text-teal-700/60">{label}</div>
      <div className="text-lg font-bold text-teal-700">{value}</div>
    </div>
  );
};

const CustomerDash = ({ goto }) => {
  const popularServices = [
    { name: 'Cook', icon: 'ChefHat', color: 'bg-orange-100 text-orange-600' },
    { name: 'Electrician', icon: 'Zap', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Plumber', icon: 'Wrench', color: 'bg-blue-100 text-blue-600' },
    { name: 'Senior Citizen Care', icon: 'UserCheck', color: 'bg-pink-100 text-pink-600' },
    { name: 'Hospital Assistant', icon: 'BriefcaseMedical', color: 'bg-red-100 text-red-600' },
    { name: 'Purohit', icon: 'Flame', color: 'bg-amber-100 text-amber-600' },
    { name: 'Doctor', icon: 'Stethoscope', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Nurse', icon: 'HeartPulse', color: 'bg-rose-100 text-rose-600' },
  ];
  return (
    <>
      <div className="card-premium p-5 mb-6 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-bold mb-1">Need help right now?</h3>
            <p className="text-white/80 text-sm">Verified helpers nearby, ready in minutes.</p>
          </div>
          <button onClick={() => goto('search')} className="bg-white text-teal-700 px-5 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 whitespace-nowrap">
            <Search className="w-4 h-4"/> Find Help
          </button>
        </div>
      </div>

      <button onClick={() => goto('search')} className="w-full mb-6 p-4 rounded-2xl bg-red-500 text-white flex items-center justify-between shadow-premium hover:bg-red-600 transition">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-ring"/>
            <Zap className="w-5 h-5"/>
          </div>
          <div className="text-left">
            <div className="font-bold">Emergency Help</div>
            <div className="text-xs text-white/80">Find nearest online helper instantly</div>
          </div>
        </div>
        <ArrowRight className="w-5 h-5"/>
      </button>

      <h2 className="text-lg font-display font-bold text-teal-700 mb-3">Popular Services</h2>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {popularServices.map(s => {
          const Icon = ICONS[s.icon] || Heart;
          return (
            <button key={s.name} onClick={() => { localStorage.setItem('kp_profession', s.name); goto('search'); }} className="card-premium p-3 flex flex-col items-center hover:-translate-y-1 transition-transform">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${s.color}`}>
                <Icon className="w-6 h-6"/>
              </div>
              <div className="text-xs font-semibold text-teal-700 text-center leading-tight">{s.name}</div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <QuickCard icon={Clock} label="Recent Bookings" onClick={() => goto('bookings')} color="teal"/>
        <QuickCard icon={Heart} label="Favourites" color="pink"/>
        <QuickCard icon={Wallet} label="Wallet" color="gold"/>
        <QuickCard icon={Award} label="Karma Points" color="green"/>
      </div>
    </>
  );
};

const ProviderDash = ({ user, setUser, goto }) => {
  const [online, setOnline] = useState(user.profile?.isOnline || false);
  const [incoming, setIncoming] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  const toggleOnline = async () => {
    const newVal = !online;
    setOnline(newVal);
    try {
      await api('provider/toggle-online', { method: 'POST', body: JSON.stringify({ online: newVal }) });
      setUser({ ...user, profile: { ...user.profile, isOnline: newVal }});
    } catch { setOnline(!newVal); }
  };

  const loadBookings = useCallback(async () => {
    try {
      const res = await api('bookings/list?role=provider');
      setIncoming(res.bookings.filter(b => b.status === 'pending'));
      setMyBookings(res.bookings.filter(b => b.status !== 'pending'));
    } catch {}
  }, []);

  useEffect(() => { loadBookings(); const t = setInterval(loadBookings, 4000); return () => clearInterval(t); }, [loadBookings]);

  const totalEarnings = myBookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.amount || 0), 0);
  const activeJob = myBookings.find(b => ['accepted','started'].includes(b.status));

  const handleAction = async (id, action) => {
    try { await api(`bookings/${id}/${action}`, { method: 'POST' }); loadBookings(); } catch(e) { alert(e.message); }
  };

  return (
    <>
      <div className={`card-premium p-5 mb-6 ${online ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' : 'bg-white'}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className={`text-sm ${online ? 'text-white/80' : 'text-teal-700/60'}`}>You are</div>
            <div className={`text-2xl font-display font-bold ${online ? 'text-white' : 'text-teal-700'}`}>{online ? 'ONLINE' : 'OFFLINE'}</div>
            <div className={`text-xs mt-1 ${online ? 'text-white/70' : 'text-teal-700/60'}`}>{online ? 'Visible to customers nearby' : 'Turn on to receive requests'}</div>
          </div>
          <button onClick={toggleOnline} className={`w-16 h-16 rounded-full flex items-center justify-center shadow-premium transition ${online ? 'bg-white' : 'bg-teal-500'}`}>
            <Power className={`w-7 h-7 ${online ? 'text-green-500' : 'text-white'}`}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Today" value={`₹${totalEarnings}`} icon={Wallet} color="gold"/>
        <StatCard label="Jobs" value={user.provider?.completedJobs || 0} icon={CheckCircle2} color="teal"/>
        <StatCard label="Rating" value={(user.provider?.rating || 4.5).toFixed(1)} icon={Star} color="gold"/>
      </div>

      {activeJob && (
        <div className="card-premium p-4 mb-6 border-l-4 border-gold-400">
          <div className="flex items-center justify-between mb-2">
            <div className="chip chip-gold">Active Job</div>
            <div className="text-xs text-teal-700/60">{new Date(activeJob.createdAt).toLocaleTimeString()}</div>
          </div>
          <div className="font-bold text-teal-700">{activeJob.customerName} · {activeJob.service}</div>
          <div className="text-sm text-teal-700/60 mb-3">{activeJob.notes || 'No additional notes'}</div>
          <button onClick={() => { localStorage.setItem('kp_active_booking', activeJob.id); goto('tracking'); }} className="btn-primary w-full">Open Job</button>
        </div>
      )}

      {incoming.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-display font-bold text-teal-700 mb-3 flex items-center gap-2">
            Incoming Requests <span className="chip chip-gold animate-pulse">{incoming.length}</span>
          </h2>
          {incoming.map(b => (
            <div key={b.id} className="card-premium p-4 mb-3 border-l-4 border-teal-500">
              <div className="flex items-start gap-3 mb-3">
                <AvatarCircle name={b.customerName} size={40}/>
                <div className="flex-1">
                  <div className="font-bold text-teal-700">{b.customerName}</div>
                  <div className="text-sm text-teal-700/70">{b.service} · {b.duration}</div>
                  {b.notes && <div className="text-xs text-teal-700/60 mt-1 italic">&quot;{b.notes}&quot;</div>}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gold-500">₹{b.pricePerHour * (parseInt(b.duration)||2)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleAction(b.id, 'reject')} className="py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition">Reject</button>
                <button onClick={() => handleAction(b.id, 'accept')} className="py-2.5 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition">Accept</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!activeJob && incoming.length === 0 && (
        <div className="card-premium p-8 text-center text-teal-700/60">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-7 h-7 text-teal-500"/>
          </div>
          <div className="font-semibold text-teal-700 mb-1">No requests yet</div>
          <div className="text-sm">Stay online — a customer nearby may need you soon.</div>
        </div>
      )}
    </>
  );
};

const Dashboard = ({ user, setUser, onLogout, goto }) => {
  const isProvider = user.profile?.mode === 'provider';
  const [switching, setSwitching] = useState(false);
  const toggleMode = async () => {
    setSwitching(true);
    const newMode = isProvider ? 'customer' : 'provider';
    if (newMode === 'provider' && !user.provider) { setSwitching(false); return goto('provider-setup'); }
    try {
      const res = await api('user/switch-mode', { method: 'POST', body: JSON.stringify({ mode: newMode }) });
      setUser(res.user);
    } catch(e) { alert(e.message); }
    setSwitching(false);
  };
  return (
    <div className="min-h-screen bg-beige-100 pb-20">
      <TopBar onLogout={onLogout}/>
      <div className="container max-w-5xl mx-auto px-4 pt-6">
        <div className="card-premium p-5 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-teal-700/60">Namaste,</div>
              <h1 className="text-2xl font-display font-bold text-teal-700">{user.name || 'Friend'} 🙏</h1>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="chip chip-gold"><Sparkles className="w-3 h-3"/> {user.profile?.karmaPoints || 0} Karma</span>
                <span className={`chip ${isProvider ? 'chip-gold' : ''}`}>{isProvider ? '🛠️ Provider Mode' : '🔍 Customer Mode'}</span>
              </div>
            </div>
            <button onClick={toggleMode} disabled={switching} className="text-right group shrink-0">
              <div className="text-xs text-teal-700/60 mb-1">Switch to</div>
              <div className="flex items-center gap-2 font-semibold text-teal-600 group-hover:text-teal-500">
                {switching ? <Loader2 className="w-5 h-5 animate-spin"/> : isProvider ? <ToggleRight className="w-8 h-8 text-gold-400"/> : <ToggleLeft className="w-8 h-8"/>}
                <span>{isProvider ? 'Customer' : 'Provider'}</span>
              </div>
            </button>
          </div>
        </div>
        {isProvider ? <ProviderDash user={user} setUser={setUser} goto={goto}/> : <CustomerDash goto={goto}/>}
      </div>
    </div>
  );
};

// ---------- Provider Setup ----------
const ProviderSetup = ({ setUser, onDone, onBack }) => {
  const [step, setStep] = useState(1);
  const [meta, setMeta] = useState({ professions: [], additionalSkills: [] });
  const [form, setForm] = useState({
    profession: '', level: 'Scout', pricePerHour: 300, experience: '1 year',
    languages: ['Hindi'], additionalSkills: [], address: '',
    location: { lat: 28.5589, lng: 77.2069 }
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => { api('meta').then(setMeta); }, []);
  const toggleSkill = (s) => setForm(f => ({ ...f, additionalSkills: f.additionalSkills.includes(s) ? f.additionalSkills.filter(x => x !== s) : [...f.additionalSkills, s] }));
  const toggleLang = (l) => setForm(f => ({ ...f, languages: f.languages.includes(l) ? f.languages.filter(x => x !== l) : [...f.languages, l] }));
  const submit = async () => {
    setLoading(true);
    try { const res = await api('provider/setup', { method: 'POST', body: JSON.stringify(form) }); setUser(res.user); onDone(); }
    catch(e) { alert(e.message); }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-beige-100">
      <div className="container max-w-2xl mx-auto px-4 py-6">
        <button onClick={onBack} className="mb-4 flex items-center gap-2 text-teal-700 font-semibold"><ArrowLeft className="w-4 h-4"/> Back</button>
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold text-teal-700">Become a Helper</h1>
            <div className="chip">Step {step} of 4</div>
          </div>
          <div className="w-full h-1.5 bg-teal-50 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-gold-400 transition-all" style={{width: `${step*25}%`}}/>
          </div>
          {step === 1 && (
            <div>
              <h3 className="font-display font-bold text-lg text-teal-700 mb-3">Choose your profession</h3>
              <p className="text-sm text-teal-700/60 mb-4">Pick what you do best. You can add more later.</p>
              <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                {meta.professions.map(p => {
                  const Icon = ICONS[p.icon] || Heart;
                  const sel = form.profession === p.name;
                  return (
                    <button key={p.name} onClick={() => setForm({...form, profession: p.name})} className={`p-3 rounded-2xl border-2 flex flex-col items-center transition ${sel ? 'border-teal-500 bg-teal-50' : 'border-teal-500/15 hover:border-teal-500/40'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 ${sel ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-500'}`}><Icon className="w-5 h-5"/></div>
                      <div className="text-xs font-semibold text-teal-700 text-center leading-tight">{p.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h3 className="font-display font-bold text-lg text-teal-700 mb-3">Your expertise level</h3>
              <div className="space-y-2 mb-6">
                {[
                  { l: 'Beginner', d: '0-1 year experience' },
                  { l: 'Scout', d: '1-3 years experience' },
                  { l: 'Explorer', d: '3-6 years experience' },
                  { l: 'Expert', d: '6+ years experience' },
                ].map(x => (
                  <button key={x.l} onClick={() => setForm({...form, level: x.l})} className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition ${form.level===x.l ? 'border-gold-400 bg-gold-50' : 'border-teal-500/15 hover:border-teal-500/40'}`}>
                    <div className="text-left">
                      <div className="font-semibold text-teal-700">{x.l}</div>
                      <div className="text-xs text-teal-700/60">{x.d}</div>
                    </div>
                    {form.level===x.l && <CheckCircle2 className="w-5 h-5 text-gold-400"/>}
                  </button>
                ))}
              </div>
              <label className="block text-sm font-semibold text-teal-700 mb-1.5">Price per hour (₹)</label>
              <input type="number" value={form.pricePerHour} onChange={e => setForm({...form, pricePerHour: e.target.value})} className="input-field mb-4"/>
              <label className="block text-sm font-semibold text-teal-700 mb-1.5">Experience</label>
              <input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} placeholder="e.g. 5 years" className="input-field"/>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3 className="font-display font-bold text-lg text-teal-700 mb-3">Additional skills</h3>
              <p className="text-sm text-teal-700/60 mb-4">Select any extra services you can offer.</p>
              <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto">
                {meta.additionalSkills.map(s => (
                  <button key={s} onClick={() => toggleSkill(s)} className={`px-3 py-2 rounded-full text-sm font-semibold border-2 transition ${form.additionalSkills.includes(s) ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-teal-700 border-teal-500/20 hover:border-teal-500'}`}>{s}</button>
                ))}
              </div>
              <div className="mt-6">
                <label className="text-sm font-semibold text-teal-700 mb-2 block">Languages</label>
                <div className="flex flex-wrap gap-2">
                  {['Hindi','English','Tamil','Telugu','Bengali','Marathi','Punjabi','Malayalam','Kannada','Sanskrit'].map(l => (
                    <button key={l} onClick={() => toggleLang(l)} className={`px-3 py-1.5 rounded-full text-sm border-2 transition ${form.languages.includes(l) ? 'bg-gold-400 text-white border-gold-400' : 'bg-white text-teal-700 border-teal-500/20'}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h3 className="font-display font-bold text-lg text-teal-700 mb-3">Where do you serve?</h3>
              <label className="block text-sm font-semibold text-teal-700 mb-1.5">Address</label>
              <input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Area, City" className="input-field mb-4"/>
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-500/10">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-500 mt-0.5"/>
                  <div className="text-sm">
                    <div className="font-semibold text-teal-700 mb-0.5">Location captured</div>
                    <div className="text-teal-700/70 text-xs">Green Park, New Delhi (28.5589, 77.2069) — GPS auto-updates when you&apos;re online.</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-softgreen-light">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-teal-500 mt-0.5"/>
                  <div className="text-sm">
                    <div className="font-semibold text-teal-700 mb-0.5">Verification</div>
                    <div className="text-teal-700/70 text-xs">For MVP demo, you&apos;re auto-verified. In production, upload Aadhaar + Voter ID + selfie for admin review.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8 gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(step-1)} className="px-6 py-3 rounded-xl border-2 border-teal-500/20 text-teal-700 font-semibold hover:border-teal-500 transition">Back</button>
            ) : <span/>}
            {step < 4 ? (
              <button onClick={() => setStep(step+1)} disabled={step===1 && !form.profession} className="btn-primary flex items-center gap-2 ml-auto">Next <ArrowRight className="w-5 h-5"/></button>
            ) : (
              <button onClick={submit} disabled={loading} className="btn-primary flex items-center gap-2 ml-auto">
                {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Finish & Go Online <Sparkles className="w-5 h-5"/></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Search ----------
const ProviderCard = ({ p, onSelect }) => (
  <div onClick={onSelect} className="card-premium p-4 mb-3 cursor-pointer hover:-translate-y-0.5 transition-transform">
    <div className="flex gap-3">
      <AvatarCircle name={p.name} size={56} verified={p.isVerified}/>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-bold text-teal-700 truncate">{p.name}</div>
            <div className="text-sm text-teal-700/70">{p.profession} · <span className="text-gold-500 font-semibold">{p.level}</span></div>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-sm font-bold text-gold-500 justify-end"><Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400"/>{p.rating}</div>
            <div className="text-xs text-teal-700/60">{p.completedJobs} jobs</div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
          <span className="chip"><MapPin className="w-3 h-3"/> {p.distanceKm} km</span>
          <span className="chip"><Clock className="w-3 h-3"/> ~{p.etaMinutes} min</span>
          <span className="chip chip-gold">₹{p.pricePerHour}/hr</span>
          <span className="chip chip-green"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"/> Online</span>
        </div>
      </div>
    </div>
  </div>
);

const SearchScreen = ({ goto, onBack }) => {
  const [profession, setProfession] = useState(typeof window !== 'undefined' && localStorage.getItem('kp_profession') || 'All');
  const [radius, setRadius] = useState(5);
  const [gender, setGender] = useState('Any');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({ professions: [] });
  const [showFemaleAsk, setShowFemaleAsk] = useState(false);

  useEffect(() => { api('meta').then(setMeta); if (typeof window !== 'undefined') localStorage.removeItem('kp_profession'); }, []);

  const search = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ lat: '28.5589', lng: '77.2069', radius: String(radius) });
      if (profession !== 'All') params.set('profession', profession);
      if (gender !== 'Any') params.set('gender', gender);
      const res = await api(`providers/search?${params}`);
      setResults(res.results);
      if (gender === 'Female' && res.results.length === 0) setShowFemaleAsk(true);
    } catch(e) { console.error(e); }
    setLoading(false);
  }, [profession, radius, gender]);

  useEffect(() => { search(); }, [search]);

  return (
    <div className="min-h-screen bg-beige-100 pb-8">
      <div className="sticky top-0 z-30 bg-white border-b border-teal-500/10">
        <div className="container max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-teal-700"/></button>
          <div className="flex-1">
            <div className="text-xs text-teal-700/60">Searching near</div>
            <div className="font-semibold text-teal-700 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> Green Park, New Delhi</div>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 pt-4">
        <div className="card-premium p-4 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', ...meta.professions.map(p => p.name)].map(p => (
              <button key={p} onClick={() => setProfession(p)} className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${profession===p ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-700 hover:bg-teal-100'}`}>{p}</button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <div className="text-xs font-semibold text-teal-700">Radius:</div>
            {[5,10,15,25].map(r => (
              <button key={r} onClick={() => setRadius(r)} className={`px-3 py-1 rounded-full text-xs font-bold ${radius===r ? 'bg-gold-400 text-white' : 'bg-white border border-teal-500/20 text-teal-700'}`}>{r} km</button>
            ))}
            <div className="text-xs font-semibold text-teal-700 ml-2">Gender:</div>
            {['Any','Female','Male'].map(g => (
              <button key={g} onClick={() => setGender(g)} className={`px-3 py-1 rounded-full text-xs font-bold ${gender===g ? 'bg-teal-500 text-white' : 'bg-white border border-teal-500/20 text-teal-700'}`}>{g}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-teal-700/60"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-teal-500"/> Finding helpers near you...</div>
        ) : results.length === 0 ? (
          <div className="card-premium p-8 text-center">
            <Search className="w-10 h-10 text-teal-500 mx-auto mb-3"/>
            <div className="font-semibold text-teal-700 mb-1">No helpers found</div>
            <div className="text-sm text-teal-700/60 mb-4">Try increasing radius or changing filters.</div>
            {showFemaleAsk && (
              <button onClick={() => { setGender('Any'); setShowFemaleAsk(false); }} className="btn-primary">See verified male helpers?</button>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-teal-700/70">{results.length} verified helpers within {radius} km</div>
              <div className="text-xs chip chip-green"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"/> Live</div>
            </div>
            {results.map(p => (
              <ProviderCard key={p.id} p={p} onSelect={() => { localStorage.setItem('kp_selected_provider', JSON.stringify(p)); goto('provider-detail'); }}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Provider Detail ----------
const ProviderDetail = ({ goto, onBack }) => {
  const p = useMemo(() => { try { return JSON.parse(localStorage.getItem('kp_selected_provider') || '{}'); } catch { return {}; } }, []);
  const [duration, setDuration] = useState('2 hours');
  const [notes, setNotes] = useState('');
  const [creating, setCreating] = useState(false);
  const book = async () => {
    setCreating(true);
    try {
      const res = await api('bookings/create', { method: 'POST', body: JSON.stringify({
        providerId: p.id, service: p.profession, notes, duration,
        customerLocation: { lat: 28.5589, lng: 77.2069 }
      })});
      localStorage.setItem('kp_active_booking', res.booking.id);
      goto('tracking');
    } catch(e) { alert(e.message); }
    setCreating(false);
  };
  const hours = parseInt(duration) || 2;
  const total = (p.pricePerHour || 300) * hours;
  return (
    <div className="min-h-screen bg-beige-100 pb-24">
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 text-white px-4 pt-4 pb-16">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4"><ArrowLeft className="w-5 h-5"/></button>
        <div className="flex items-center gap-4">
          <AvatarCircle name={p.name} size={72} verified={p.isVerified}/>
          <div>
            <h1 className="text-2xl font-display font-bold">{p.name}</h1>
            <div className="text-white/80">{p.profession} · {p.level}</div>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <Star className="w-4 h-4 fill-gold-300 text-gold-300"/> {p.rating} · {p.completedJobs} jobs
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-2xl mx-auto px-4 -mt-10">
        <div className="card-premium p-5 mb-4">
          <div className="grid grid-cols-3 gap-3 mb-4 text-center">
            <div><div className="text-xs text-teal-700/60">Distance</div><div className="font-bold text-teal-700">{p.distanceKm} km</div></div>
            <div><div className="text-xs text-teal-700/60">ETA</div><div className="font-bold text-teal-700">~{p.etaMinutes} min</div></div>
            <div><div className="text-xs text-teal-700/60">Price</div><div className="font-bold text-gold-500">₹{p.pricePerHour}/hr</div></div>
          </div>
          <div className="pt-4 border-t border-teal-500/10">
            <div className="text-xs text-teal-700/60 mb-1">Experience</div>
            <div className="text-teal-700 mb-3">{p.experience}</div>
            <div className="text-xs text-teal-700/60 mb-1">Languages</div>
            <div className="flex gap-1.5 flex-wrap mb-3">
              {(p.languages || []).map(l => <span key={l} className="chip">{l}</span>)}
            </div>
            {p.additionalSkills?.length > 0 && (<>
              <div className="text-xs text-teal-700/60 mb-1">Additional skills</div>
              <div className="flex gap-1.5 flex-wrap">
                {p.additionalSkills.map(s => <span key={s} className="chip chip-gold">{s}</span>)}
              </div>
            </>)}
          </div>
        </div>
        <div className="card-premium p-5">
          <h3 className="font-display font-bold text-teal-700 mb-3">Create booking</h3>
          <label className="text-sm font-semibold text-teal-700 mb-1.5 block">Duration</label>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['1 hour','2 hours','4 hours','8 hours'].map(d => (
              <button key={d} onClick={() => setDuration(d)} className={`p-2.5 rounded-xl border-2 text-sm font-semibold transition ${duration===d ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-teal-500/15 text-teal-700/70'}`}>{d}</button>
            ))}
          </div>
          <label className="text-sm font-semibold text-teal-700 mb-1.5 block">Additional notes (optional)</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add any details to help the helper" className="input-field resize-none mb-4"/>
          <div className="p-4 rounded-2xl bg-teal-50 flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-teal-700/60">Estimated total</div>
              <div className="text-2xl font-bold text-teal-700">₹{total}</div>
            </div>
            <div className="text-right text-xs text-teal-700/60">
              <div>{hours} × ₹{p.pricePerHour}</div>
              <div>Paid after job</div>
            </div>
          </div>
          <button onClick={book} disabled={creating} className="btn-primary w-full flex items-center justify-center gap-2">
            {creating ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Request Help <ArrowRight className="w-5 h-5"/></>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ---------- Tracking ----------
const Tracking = ({ user, goto, onBack }) => {
  const bookingId = typeof window !== 'undefined' ? localStorage.getItem('kp_active_booking') : null;
  const [booking, setBooking] = useState(null);
  const [startOtp, setStartOtp] = useState(null);
  const [endOtp, setEndOtp] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [showRate, setShowRate] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const isProvider = user.profile?.mode === 'provider';

  const load = useCallback(async () => {
    if (!bookingId) return;
    try { const res = await api(`bookings/${bookingId}`); setBooking(res.booking); } catch {}
  }, [bookingId]);

  useEffect(() => { load(); const t = setInterval(load, 2500); return () => clearInterval(t); }, [load]);

  if (!booking) return <div className="min-h-screen bg-beige-100 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-teal-500"/></div>;

  const generateStart = async () => { const r = await api(`bookings/${bookingId}/start-otp`, { method: 'POST' }); setStartOtp(r.otp); };
  const verifyStart = async () => { try { await api(`bookings/${bookingId}/verify-start`, { method: 'POST', body: JSON.stringify({ otp: otpInput }) }); setOtpInput(''); load(); } catch(e){ alert(e.message); } };
  const generateEnd = async () => { const r = await api(`bookings/${bookingId}/end-otp`, { method: 'POST' }); setEndOtp(r.otp); };
  const verifyEnd = async () => { try { await api(`bookings/${bookingId}/verify-end`, { method: 'POST', body: JSON.stringify({ otp: otpInput }) }); setOtpInput(''); load(); setShowRate(true); } catch(e){ alert(e.message); } };
  const submitRating = async () => { await api(`bookings/${bookingId}/rate`, { method: 'POST', body: JSON.stringify({ rating, review }) }); localStorage.removeItem('kp_active_booking'); goto('home'); };

  const otherName = isProvider ? booking.customerName : booking.providerName;
  const statusLabel = {
    pending: 'Waiting for helper to accept...',
    accepted: 'Helper accepted! On the way',
    started: 'Job in progress',
    completed: 'Job completed',
    rejected: 'Request rejected',
    cancelled: 'Booking cancelled',
  }[booking.status];

  return (
    <div className="min-h-screen bg-beige-100 pb-8">
      <div className="bg-white border-b border-teal-500/10 sticky top-0 z-30">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-teal-700"/></button>
          <div className="flex-1">
            <div className="text-xs text-teal-700/60">Live booking</div>
            <div className="font-semibold text-teal-700">{booking.service}</div>
          </div>
          <div className="chip chip-gold animate-pulse">{booking.status.toUpperCase()}</div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 pt-4">
        <div className="card-premium p-0 mb-4 overflow-hidden relative h-52 bg-gradient-to-br from-teal-100 via-softgreen-light to-teal-50">
          <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(0,93,99,0.15) 0, transparent 50%), radial-gradient(circle at 70% 60%, rgba(217,154,34,0.15) 0, transparent 50%)'}}/>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path d="M 50 150 Q 150 100 200 100 T 350 50" stroke="#005D63" strokeWidth="3" fill="none" strokeDasharray="6 4" opacity="0.5"/>
          </svg>
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-teal-500 animate-pulse-ring"/>
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center relative"><Heart className="w-4 h-4 text-white"/></div>
            </div>
            <div className="text-xs font-bold text-teal-700 mt-1">You</div>
          </div>
          <div className="absolute right-8 top-1/3">
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center border-4 border-white shadow-lg"><Navigation className="w-4 h-4 text-white"/></div>
            <div className="text-xs font-bold text-gold-600 mt-1 text-right">{otherName?.split(' ')[0]}</div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-xl p-2.5 flex items-center justify-between shadow-soft">
            <div className="text-xs">
              <div className="text-teal-700/60">Status</div>
              <div className="font-bold text-teal-700">{statusLabel}</div>
            </div>
            {booking.status === 'accepted' && <div className="text-right text-xs"><div className="text-teal-700/60">ETA</div><div className="font-bold text-gold-500">~8 min</div></div>}
          </div>
        </div>

        <div className="card-premium p-4 mb-4">
          <div className="flex items-center gap-3">
            <AvatarCircle name={otherName} verified size={48}/>
            <div className="flex-1">
              <div className="font-bold text-teal-700">{otherName}</div>
              <div className="text-sm text-teal-700/60">{booking.service} · {booking.duration}</div>
            </div>
            <a href="tel:+919999999999" className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center hover:scale-105 transition"><Phone className="w-4 h-4 text-white"/></a>
          </div>
        </div>

        {booking.status === 'accepted' && (
          <div className="card-premium p-5">
            {isProvider ? (
              <>
                <h3 className="font-display font-bold text-teal-700 mb-2">Reached destination?</h3>
                <p className="text-sm text-teal-700/70 mb-3">Ask the customer to share the 4-digit Start OTP.</p>
                <input value={otpInput} onChange={e => setOtpInput(e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4} placeholder="Enter 4-digit OTP" className="input-field mb-3 text-center text-2xl tracking-widest font-bold"/>
                <button onClick={verifyStart} className="btn-primary w-full">Start Job</button>
              </>
            ) : (
              <>
                <h3 className="font-display font-bold text-teal-700 mb-2">Helper arrived?</h3>
                <p className="text-sm text-teal-700/70 mb-3">Generate a Start OTP and share it with the helper to begin.</p>
                {!startOtp ? (
                  <button onClick={generateStart} className="btn-gold w-full">Generate Start OTP</button>
                ) : (
                  <div className="text-center p-4 rounded-2xl bg-gold-50 border-2 border-gold-200">
                    <div className="text-xs text-gold-600 mb-1">Share this Start OTP</div>
                    <div className="text-4xl font-bold text-gold-500 tracking-widest">{startOtp}</div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {booking.status === 'started' && (
          <div className="card-premium p-5">
            {isProvider ? (
              <>
                <h3 className="font-display font-bold text-teal-700 mb-2">Job finished?</h3>
                <p className="text-sm text-teal-700/70 mb-3">Ask the customer to share the End OTP to complete.</p>
                <input value={otpInput} onChange={e => setOtpInput(e.target.value.replace(/\D/g,'').slice(0,4))} maxLength={4} placeholder="Enter 4-digit End OTP" className="input-field mb-3 text-center text-2xl tracking-widest font-bold"/>
                <button onClick={verifyEnd} className="btn-primary w-full">Complete Job</button>
              </>
            ) : (
              <>
                <h3 className="font-display font-bold text-teal-700 mb-2">Job in progress</h3>
                <p className="text-sm text-teal-700/70 mb-3">Generate an End OTP when the work is done.</p>
                {!endOtp ? (
                  <button onClick={generateEnd} className="btn-gold w-full">Generate End OTP</button>
                ) : (
                  <div className="text-center p-4 rounded-2xl bg-gold-50 border-2 border-gold-200">
                    <div className="text-xs text-gold-600 mb-1">Share this End OTP</div>
                    <div className="text-4xl font-bold text-gold-500 tracking-widest">{endOtp}</div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {booking.status === 'completed' && !showRate && (
          <div className="card-premium p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-500"/>
            </div>
            <h3 className="font-display font-bold text-xl text-teal-700 mb-1">Job Completed! 🎉</h3>
            <p className="text-teal-700/70 mb-3">Amount: <span className="font-bold text-gold-500">₹{booking.amount}</span></p>
            <div className="inline-flex items-center gap-2 chip chip-gold mb-4"><Sparkles className="w-3 h-3"/> +25 Karma earned!</div>
            <button onClick={() => setShowRate(true)} className="btn-primary w-full">Rate & Finish</button>
          </div>
        )}

        {(booking.status === 'completed' && showRate) && (
          <div className="card-premium p-5">
            <h3 className="font-display font-bold text-teal-700 mb-3">Rate {otherName}</h3>
            <div className="flex justify-center gap-2 mb-4">
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRating(n)}><Star className={`w-10 h-10 ${n<=rating ? 'fill-gold-400 text-gold-400' : 'text-teal-200'}`}/></button>
              ))}
            </div>
            <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Share your experience (optional)" rows={3} className="input-field resize-none mb-4"/>
            <button onClick={submitRating} className="btn-primary w-full">Submit</button>
          </div>
        )}

        {booking.status === 'pending' && (
          <div className="card-premium p-5 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto mb-2"/>
            <div className="font-semibold text-teal-700">Notifying helper...</div>
            <div className="text-sm text-teal-700/60 mt-1">This usually takes a few seconds.</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Bookings List ----------
const BookingsList = ({ user, goto, onBack }) => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => { api(`bookings/list?role=${user.profile?.mode || 'customer'}`).then(r => setBookings(r.bookings)).catch(()=>{}); }, [user]);
  return (
    <div className="min-h-screen bg-beige-100 pb-8">
      <div className="bg-white border-b border-teal-500/10">
        <div className="container max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-teal-700"/></button>
          <h1 className="font-display font-bold text-teal-700 text-lg">Your Bookings</h1>
        </div>
      </div>
      <div className="container max-w-2xl mx-auto px-4 pt-4">
        {bookings.length === 0 ? (
          <div className="card-premium p-8 text-center text-teal-700/60">No bookings yet</div>
        ) : bookings.map(b => (
          <div key={b.id} className="card-premium p-4 mb-3 cursor-pointer" onClick={() => { localStorage.setItem('kp_active_booking', b.id); goto('tracking'); }}>
            <div className="flex justify-between mb-1">
              <div className="font-bold text-teal-700">{b.service}</div>
              <div className="chip chip-gold text-xs">{b.status}</div>
            </div>
            <div className="text-sm text-teal-700/70">with {user.profile?.mode === 'provider' ? b.customerName : b.providerName}</div>
            <div className="text-xs text-teal-700/50 mt-1">{new Date(b.createdAt).toLocaleString()}</div>
            {b.rating && <div className="mt-2 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400"/><span className="text-sm font-bold text-gold-500">{b.rating}</span></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Root ----------
function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [pendingMobile, setPendingMobile] = useState(null);
  const [pendingOtp, setPendingOtp] = useState(null);

  useEffect(() => {
    const token = typeof window !== 'undefined' && localStorage.getItem('kp_token');
    if (!token) return;
    api('user/me')
      .then(r => {
        setUser(r.user);
        if (r.user.needsRegistration || !r.user.name) setView('complete-profile');
        else setView('home');
      })
      .catch(() => { try { localStorage.removeItem('kp_token'); } catch {} });
  }, []);

  const logout = () => { try { localStorage.clear(); } catch {} ; setUser(null); setView('landing'); };

  return (
    <div key={view}>
      {view === 'landing' && <Landing onStart={() => setView('auth-mobile')}/>}
      {view === 'auth-mobile' && <AuthMobile onBack={() => setView('landing')} onNext={(m, o) => { setPendingMobile(m); setPendingOtp(o); setView('auth-otp'); }}/>}
      {view === 'auth-otp' && <AuthOtp mobile={pendingMobile} demoOtp={pendingOtp} onBack={() => setView('auth-mobile')} onVerified={(u, needsReg) => { setUser(u); setView(needsReg ? 'complete-profile' : 'home'); }}/>}
      {view === 'complete-profile' && <CompleteProfile onDone={u => { setUser(u); setView('home'); }}/>}
      {view === 'home' && user && <Dashboard user={user} setUser={setUser} onLogout={logout} goto={setView}/>}
      {view === 'provider-setup' && user && <ProviderSetup setUser={setUser} onDone={() => setView('home')} onBack={() => setView('home')}/>}
      {view === 'search' && user && <SearchScreen goto={setView} onBack={() => setView('home')}/>}
      {view === 'provider-detail' && user && <ProviderDetail goto={setView} onBack={() => setView('search')}/>}
      {view === 'tracking' && user && <Tracking user={user} goto={setView} onBack={() => setView('home')}/>}
      {view === 'bookings' && user && <BookingsList user={user} goto={setView} onBack={() => setView('home')}/>}
    </div>
  );
}

export default App;
