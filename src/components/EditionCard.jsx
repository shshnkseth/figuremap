import React, { useState, useRef } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function EditionCard({ edition, onSelectEdition, onOpenAcquire, setCursorText }) {
  const [activeTab, setActiveTab] = useState('lookbook');
  const [isXray, setIsXray] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / rect.height) * -6,
      y: (x / rect.width) * 6
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setCursorText('');
  };

  const currentImage = activeTab === 'garment' 
    ? edition.productImage 
    : (activeTab === 'detail' ? edition.detailImages[0] : edition.heroImage);

  return (
    <article className="py-24 sm:py-40 border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8">
        
        {/* Clean Edition Identifier */}
        <div className="flex items-center justify-between text-xs font-mono-custom text-[var(--text-muted)] pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent-rust)] font-bold">( {edition.editionNumber} )</span>
            <span className="tracking-wider">{edition.code}</span>
          </div>
          <span>{edition.artist.location}</span>
        </div>

        {/* Large Monograph Title */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h2 
            onClick={() => {
              playMicroClick(1000);
              onSelectEdition(edition);
            }}
            onMouseEnter={() => setCursorText('VIEW ↗')}
            onMouseLeave={() => setCursorText('')}
            className="text-4xl sm:text-7xl md:text-8xl font-serif-custom font-normal text-[var(--text-ink)] hover:text-[var(--accent-rust)] transition-colors cursor-pointer leading-[0.95]"
          >
            {edition.title}
          </h2>

          <div className="text-xs font-mono-custom text-[var(--text-muted)]">
            With <span className="text-[var(--text-ink)]">{edition.artist.name}</span>
          </div>
        </div>

        {/* Interactive Visual Canvas with Stencil / Film X-Ray Interaction */}
        <div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setCursorText('HOLD X-RAY')}
          onClick={() => {
            playMicroClick(900);
            onSelectEdition(edition);
          }}
          onMouseDown={() => setIsXray(true)}
          onMouseUp={() => setIsXray(false)}
          onTouchStart={() => setIsXray(true)}
          onTouchEnd={() => setIsXray(false)}
          className={`relative rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] cursor-pointer transition-all duration-300 min-h-[460px] sm:min-h-[620px] shadow-2xl group ${isXray ? 'ring-2 ring-[var(--accent-rust)]' : ''}`}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <img
            src={currentImage}
            alt={edition.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isXray ? 'invert contrast-200 hue-rotate-180 brightness-90 filter' : ''}`}
          />

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-raw)] via-transparent to-transparent opacity-60 pointer-events-none"></div>

          {/* Micro Plate Switcher */}
          <div 
            className="absolute top-6 left-6 flex gap-1.5 p-1 rounded-full bg-[var(--bg-raw)]/80 backdrop-blur-md border border-[var(--border-subtle)] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {['lookbook', 'garment', 'detail'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  playMicroClick(1100);
                  setActiveTab(tab);
                }}
                className={`px-3 py-1 text-[10px] font-mono-custom uppercase rounded-full transition-all ${activeTab === tab ? 'bg-[var(--text-ink)] text-[var(--bg-raw)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-ink)]'}`}
              >
                {tab === 'lookbook' ? 'Lookbook' : (tab === 'garment' ? 'Tee' : 'Ink')}
              </button>
            ))}
          </div>

          {/* Stencil X-Ray status label */}
          <div className="absolute top-6 right-6 text-[10px] font-mono-custom text-[var(--text-dim)] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
            {isXray ? 'STENCIL EMULSION VIEW' : 'PRESS & HOLD: STENCIL X-RAY'}
          </div>

          {/* Bottom Row inside Artifact */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-xs font-mono-custom text-[var(--text-ink)] pointer-events-none">
            <span className="italic font-serif-custom text-base sm:text-lg">"{edition.artistQuote}"</span>
            <span className="flex items-center gap-1 text-[var(--accent-rust)] group-hover:translate-x-1 transition-transform">
              <span>View Piece</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Single Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs font-mono-custom">
          <div className="text-[var(--text-muted)]">
            {edition.screenprintSpecs.garment} • {edition.screenprintSpecs.ink}
          </div>

          <button
            onClick={() => {
              playMicroClick(800);
              onOpenAcquire(edition);
            }}
            onMouseEnter={() => setCursorText('ACQUIRE')}
            onMouseLeave={() => setCursorText('')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--text-ink)] text-[var(--bg-raw)] hover:bg-[var(--accent-rust)] hover:text-white font-bold rounded-full transition-all active:scale-95 self-start sm:self-auto"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>DM TO ACQUIRE ({edition.screenprintSpecs.price.split('/')[0].trim()})</span>
          </button>
        </div>

      </div>
    </article>
  );
}
