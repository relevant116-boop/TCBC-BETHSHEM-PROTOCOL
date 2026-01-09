
import React from 'react';
import { 
  QrCode, Users, Calendar, MessageCircle, 
  ChevronRight, Trophy, BookOpen 
} from 'lucide-react';
import { COLORS, MOCK_USER, MOCK_SCRIPTURE } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="px-5 pt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Card */}
      <section className="relative overflow-hidden bg-[#0A1E3B] rounded-2xl p-6 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">Shalom, {MOCK_USER.name.split(' ')[0]}</h2>
          <p className="text-sm opacity-80 mb-4">TCBC Protocol Registry is active. Have a blessed duty today!</p>
          <div className="flex gap-3">
            <button className="bg-[#C5A06D] text-[#0A1E3B] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <QrCode size={18} />
              Duty Check-In
            </button>
            <button className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg font-semibold text-sm border border-white/20 active:scale-95 transition-all">
              My Stats
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A06D] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-[#C5A06D] opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Scripture Widget */}
      <section className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[#C5A06D]">
            <BookOpen size={18} />
            <h3 className="font-bold text-xs uppercase tracking-widest">Word of the Day</h3>
          </div>
          <span className="text-[10px] text-gray-400 font-medium">{MOCK_SCRIPTURE.reference} ({MOCK_SCRIPTURE.version})</span>
        </div>
        <p className="text-[#0A1E3B] font-medium italic leading-relaxed text-sm">
          "{MOCK_SCRIPTURE.verse}"
        </p>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 active:scale-95 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={20} />
          </div>
          <span className="text-xs font-bold text-[#0A1E3B]">Member Roster</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 active:scale-95 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <Calendar size={20} />
          </div>
          <span className="text-xs font-bold text-[#0A1E3B]">Duty Calendar</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 active:scale-95 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <MessageCircle size={20} />
          </div>
          <span className="text-xs font-bold text-[#0A1E3B]">Ministry Chat</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-2 active:scale-95 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gold-50 flex items-center justify-center text-[#C5A06D]">
            <Trophy size={20} />
          </div>
          <span className="text-xs font-bold text-[#0A1E3B]">Trivia Leaderboard</span>
        </div>
      </section>

      {/* Announcements */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#0A1E3B]">Latest Announcements</h3>
          <button className="text-xs text-[#C5A06D] font-bold flex items-center">See all <ChevronRight size={14} /></button>
        </div>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[#C5A06D] flex gap-4">
               <div className="flex-1">
                 <h4 className="font-bold text-sm text-[#0A1E3B]">Emergency Meeting: Protocol Strategy</h4>
                 <p className="text-xs text-gray-500 mt-1 line-clamp-1">All members are requested to join the Zoom call at 7 PM...</p>
                 <span className="text-[10px] text-gray-400 mt-2 block">2 hours ago • Admin</span>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
