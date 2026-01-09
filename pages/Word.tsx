
import React, { useRef } from 'react';
import { Share2, Download, Volume2, Copy, BookOpen, Quote } from 'lucide-react';
import { MOCK_SCRIPTURE, COLORS } from '../constants';

const Word: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Word from TCBC Bethshem',
          text: `"${MOCK_SCRIPTURE.verse}" - ${MOCK_SCRIPTURE.reference}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleTTS = () => {
    const utterance = new SpeechSynthesisUtterance(`${MOCK_SCRIPTURE.reference}. ${MOCK_SCRIPTURE.verse}`);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${MOCK_SCRIPTURE.verse}" - ${MOCK_SCRIPTURE.reference}`);
    alert('Verse copied to clipboard!');
  };

  return (
    <div className="px-5 pt-6 space-y-8 h-full">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-[#0A1E3B]">The Living Word</h1>
        <p className="text-xs text-[#C5A06D] font-bold uppercase tracking-widest">Daily Spiritual Nourishment</p>
      </div>

      {/* Share Card Content */}
      <div className="relative group perspective-1000">
        <div 
          ref={cardRef}
          className="aspect-square w-full bg-[#0A1E3B] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center p-8 text-center"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 30, 59, 0.8), rgba(10, 30, 59, 0.8)), url(${MOCK_SCRIPTURE.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Logo Watermark (PRD Req) */}
          <div className="absolute top-6 left-6 opacity-40">
            <BookOpen size={24} className="text-[#C5A06D]" />
          </div>
          
          <div className="absolute bottom-6 right-6 opacity-30 flex items-center gap-2">
            <div className="text-[8px] text-right font-bold text-white uppercase tracking-tighter">
              TCBC Bethshem<br/>Protocol Ministry
            </div>
          </div>

          <Quote className="text-[#C5A06D] opacity-20 absolute top-12 scale-[4]" />

          <div className="relative z-10 space-y-6">
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic drop-shadow-md">
              "{MOCK_SCRIPTURE.verse}"
            </p>
            
            <div className="inline-block px-4 py-2 bg-[#C5A06D] text-[#0A1E3B] rounded-full font-black text-xs uppercase shadow-lg">
              {MOCK_SCRIPTURE.reference}
            </div>
          </div>
        </div>

        {/* Action Tray Overlay */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6 px-8 py-4 w-[90%]">
          <button onClick={handleTTS} className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#C5A06D] transition-colors">
            <Volume2 size={20} />
            <span className="text-[10px] font-bold">Read</span>
          </button>
          <div className="w-px h-8 bg-gray-100"></div>
          <button onClick={handleCopy} className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#C5A06D] transition-colors">
            <Copy size={20} />
            <span className="text-[10px] font-bold">Copy</span>
          </button>
          <div className="w-px h-8 bg-gray-100"></div>
          <button onClick={handleShare} className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#C5A06D] transition-colors">
            <Share2 size={20} />
            <span className="text-[10px] font-bold">Share</span>
          </button>
          <div className="w-px h-8 bg-gray-100"></div>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#C5A06D] transition-colors">
            <Download size={20} />
            <span className="text-[10px] font-bold">Image</span>
          </button>
        </div>
      </div>

      <div className="pt-10 space-y-6">
        <h3 className="font-bold text-[#0A1E3B] border-b border-gray-100 pb-2">Recent Reflections</h3>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-4 items-start p-3 hover:bg-white rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#F5F2EC] flex items-center justify-center text-[#C5A06D]">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0A1E3B]">Isaiah 40:31</h4>
                <p className="text-xs text-gray-500 line-clamp-1">"But they who wait for the LORD shall renew their strength..."</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Shared on 12 Mar 2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Word;
