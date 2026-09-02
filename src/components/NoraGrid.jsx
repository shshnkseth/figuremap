import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, Eye } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function NoraGrid({ editions, onSelectEdition, onOpenAcquire, setCursorText }) {
  const [activeTabs, setActiveTabs] = useState({});

  const handleTabChange = (editionId, tab, e) => {
    e.stopPropagation();
    playMicroClick(1100);
    setActiveTabs(prev => ({ ...prev, [editionId]: tab }));
  };

  return (
    <section id="editions" className="py-20 sm:py-28 px-6 sm:px-10 border-b border-[var(--border-subtle)] bg-[var(--bg-raw)]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between text-xs font-mono-custom text-[var(--text-muted)] pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--text-ink)] font-bold">Featured Editions</span>
            <span className="text-[var(--text-dim)]">•</span>
            <span>Archival Collaborative Pieces</span>
          </div>
          <span>( 0{editions.length} Items )</span>
        </div>

        {/* 2-Column Minimalist Card Grid (Exact Nora Vale Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {editions.map((edition) => {
            const currentTab = activeTabs[edition.id] || 'lookbook';
            const displayImage = currentTab === 'garment' 
              ? edition.productImage 
              : (currentTab === 'detail' ? edition.detailImages[0] : edition.heroImage);

            return (
              <div
                key={edition.id}
                onClick={() => {
                  playMicroClick(900);
                  onSelectEdition(edition);
                }}
                onMouseEnter={() => setCursorText('VIEW')}
                onMouseLeave={() => setCursorText('')}
                className="group cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-active)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with 4:5 / 16:11 Aspect Ratio */}
                <div className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-[var(--bg-raw)] border-b border-[var(--border-subtle)]">
                  <img
                    src={displayImage}
                    alt={edition.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Micro Plate Switcher */}
                  <div 
                    className="absolute top-4 left-4 flex gap-1 p-1 rounded-md bg-[var(--bg-raw)]/80 backdrop-blur-md border border-[var(--border-subtle)] z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {['lookbook', 'garment', 'detail'].map((tab) => (
                      <button
                        key={tab}
                        onClick={(e) => handleTabChange(edition.id, tab, e)}
                        className={`px-2.5 py-1 text-[10px] font-mono-custom uppercase rounded transition-colors ${currentTab === tab ? 'bg-[var(--text-ink)] text-[var(--bg-raw)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'}`}
                      >
                        {tab === 'lookbook' ? 'Look' : (tab === 'garment' ? 'Tee' : 'Ink')}
                      </button>
                    ))}
                  </div>

                  {/* Edition Code Badge */}
                  <div className="absolute top-4 right-4 text-[10px] font-mono-custom text-[var(--text-dim)] bg-black/60 px-2.5 py-1 rounded backdrop-blur-sm">
                    {edition.code.split('/')[1]?.trim() || edition.code}
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playMicroClick(1000);
                        onSelectEdition(edition);
                      }}
                      className="px-4 py-2 rounded-md bg-[var(--bg-raw)] text-[var(--text-ink)] font-mono-custom text-xs uppercase font-bold hover:bg-[var(--accent-rust)] hover:text-white transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Story</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playMicroClick(800);
                        onOpenAcquire(edition);
                      }}
                      className="px-4 py-2 rounded-md bg-[var(--accent-rust)] text-white font-mono-custom text-xs uppercase font-bold hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>DM to Buy</span>
                    </button>
                  </div>
                </div>

                {/* Card Details Row (Clean Framer style) */}
                <div className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-serif-custom font-normal text-[var(--text-ink)] group-hover:text-[var(--accent-rust)] transition-colors">
                      {edition.title}
                    </h3>
                    <span className="text-xs font-mono-custom text-[var(--text-ink)] font-bold">
                      {edition.screenprintSpecs.price.split('/')[0].trim()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono-custom text-[var(--text-muted)] pt-1">
                    <span>With {edition.artist.name} ({edition.artist.location})</span>
                    <span className="text-[11px] text-[var(--accent-rust)] flex items-center gap-1">
                      <span>Acquire</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>

                  <p className="text-xs font-sans text-[var(--text-muted)] line-clamp-1 italic pt-1">
                    "{edition.artistQuote}"
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
