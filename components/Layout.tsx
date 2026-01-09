
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, Image as ImageIcon, BrainCircuit, BookOpen, 
  Menu, User, LogOut, Bell, ShieldCheck, Settings 
} from 'lucide-react';
import { COLORS, MOCK_USER } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', icon: <Home size={24} />, label: 'Home' },
    { to: '/gallery', icon: <ImageIcon size={24} />, label: 'Gallery' },
    { to: '/trivia', icon: <BrainCircuit size={24} />, label: 'Trivia' },
    { to: '/scripture', icon: <BookOpen size={24} />, label: 'Word' },
  ];

  const adminItems = [
    { to: '/admin', icon: <ShieldCheck size={20} />, label: 'Admin Panel' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F2EC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0A1E3B] text-white shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C5A06D] rounded-full flex items-center justify-center p-1">
             <img src="https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&q=80&w=200&h=200" alt="TCBC Logo" className="rounded-full" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-[#C5A06D]">TCBC BETHSHEM</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-widest">Protocol & Ushering</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-1 text-[#C5A06D]">
            <Bell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1">
            <Menu size={24} className="text-[#C5A06D]" />
          </button>
        </div>
      </header>

      {/* Side Drawer (Admin) */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                <img src={MOCK_USER.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-[#C5A06D]" />
                <div>
                  <p className="font-bold text-[#0A1E3B]">{MOCK_USER.name}</p>
                  <p className="text-xs text-gray-500">{MOCK_USER.role}</p>
                </div>
              </div>
              
              <nav className="flex-1 space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Main Menu</p>
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive ? 'bg-[#0A1E3B] text-[#C5A06D]' : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}

                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-6 mb-2">Admin Tools</p>
                {adminItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive ? 'bg-[#C5A06D] text-[#0A1E3B]' : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              <button className="mt-auto flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-24">
        {children}
      </main>

      {/* Bottom Nav (Mobile Persistent) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0A1E3B] border-t border-[#C5A06D]/30 px-6 py-3 flex justify-between items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-[#C5A06D] scale-110' : 'text-gray-400'
              }`
            }
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
