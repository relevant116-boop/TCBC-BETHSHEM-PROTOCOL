
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Trivia from './pages/Trivia';
import Word from './pages/Word';

// Splash Screen Component
const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative animate-in fade-in duration-1000">
        {/* Logo Container */}
        <div className="w-32 h-32 bg-[#0A1E3B] rounded-full flex items-center justify-center shadow-2xl relative z-10">
           <div className="w-20 h-20 border-4 border-[#C5A06D] rounded-full animate-[spin_4s_linear_infinite] absolute"></div>
           <ShieldCheck size={64} className="text-[#C5A06D] animate-pulse" />
        </div>
        {/* Gold Ripple Effect */}
        <div className="absolute inset-0 bg-[#C5A06D] rounded-full animate-[ping_2s_ease-out_infinite] opacity-20"></div>
      </div>
      
      <div className="mt-12 text-center animate-in slide-in-from-bottom duration-1000 delay-500">
        <h1 className="text-2xl font-black text-[#0A1E3B] tracking-tight">TCBC BETHSHEM</h1>
        <p className="text-sm font-bold text-[#C5A06D] uppercase tracking-[0.3em] mt-1">Protocol & Ushering</p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <Loader2 className="animate-spin text-[#0A1E3B]" size={24} />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Version 2.0.26</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/scripture" element={<Word />} />
          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
