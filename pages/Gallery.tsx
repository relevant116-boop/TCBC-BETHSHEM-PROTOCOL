
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, 
  Share2, Shield, Loader2, CheckCircle2 
} from 'lucide-react';
import { MOCK_GALLERY, COLORS } from '../constants';
import { UserRole } from '../types';

const Gallery: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [blurActive, setBlurActive] = useState(false);
  const [view, setView] = useState<'grid' | 'album'>('grid');

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 2000);
  };

  return (
    <div className="px-5 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1E3B]">Ministry Gallery</h1>
          <p className="text-xs text-gray-500">Capture and preserve the moments</p>
        </div>
        <button 
          onClick={handleUpload}
          disabled={isUploading}
          className="w-12 h-12 rounded-full bg-[#C5A06D] text-[#0A1E3B] flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-50"
        >
          {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={24} />}
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setBlurActive(!blurActive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
            blurActive ? 'bg-[#0A1E3B] text-white border-[#0A1E3B]' : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          <Shield size={14} />
          {blurActive ? 'Privacy Blur: ON' : 'Privacy Blur: OFF'}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-xs font-bold whitespace-nowrap">
          <Filter size={14} />
          All Events
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-600 border border-gray-200 text-xs font-bold whitespace-nowrap">
          <Download size={14} />
          Bulk Zip
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search by event, member or date..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C5A06D]/20 text-sm"
        />
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-4">
        {MOCK_GALLERY.map((item) => (
          <div key={item.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm aspect-square">
            <img 
              src={item.url} 
              alt={item.title} 
              className={`w-full h-full object-cover transition-all duration-500 ${blurActive ? 'blur-sm grayscale' : ''}`}
            />
            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
              <p className="text-white text-[10px] font-bold">{item.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[8px] text-gray-300">{item.date}</span>
                <div className="flex gap-2">
                  <button className="text-white hover:text-[#C5A06D]"><Share2 size={12} /></button>
                  <button className="text-white hover:text-[#C5A06D]"><Download size={12} /></button>
                </div>
              </div>
            </div>
            {/* Status Badge */}
            {item.status === 'Approved' && (
              <div className="absolute top-2 right-2 bg-green-500 text-white p-0.5 rounded-full">
                <CheckCircle2 size={10} />
              </div>
            )}
            {item.visibility === UserRole.MEMBER && (
              <div className="absolute top-2 left-2 bg-[#0A1E3B]/80 backdrop-blur-md text-[#C5A06D] px-2 py-0.5 rounded text-[8px] font-bold">
                Members Only
              </div>
            )}
          </div>
        ))}

        {/* Empty States (PRD Requirement) */}
        {MOCK_GALLERY.length < 3 && (
          <div className="col-span-2 py-10 flex flex-col items-center text-center opacity-40">
             <div className="w-20 h-20 border-2 border-dashed border-[#0A1E3B] rounded-2xl flex items-center justify-center mb-3">
                <Shield size={32} />
             </div>
             <p className="text-sm font-medium">Add photos to populate your gallery</p>
             <p className="text-xs">Ushers on duty silhouette (SVG placeholder)</p>
          </div>
        )}
      </div>

      {/* Share to WhatsApp Simulated Feature */}
      <div className="fixed bottom-24 right-5">
         <button className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 font-bold active:scale-90 transition-all">
            <Share2 size={20} />
            <span className="text-sm">Share Album</span>
         </button>
      </div>
    </div>
  );
};

export default Gallery;
