import React, { useState, useEffect, useRef } from 'react';
import { getStoredCollections } from '../utils/cmsStore';

export default function VinylArtworkSection({ onSelectAlbum }) {
  const [partners, setPartners] = useState(() => {
    return getStoredCollections().filter((i) => i.tag === 'partner');
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleUpdate = () => {
      const list = getStoredCollections().filter((i) => i.tag === 'partner');
      setPartners(list);
      if (activeIndex >= list.length) {
        setActiveIndex(Math.max(0, list.length - 1));
      }
    };
    window.addEventListener('figuremap_collections_updated', handleUpdate);
    return () => window.removeEventListener('figuremap_collections_updated', handleUpdate);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const idx = Math.min(partners.length - 1, Math.floor(progress * partners.length));
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [partners.length]);

  if (partners.length === 0) return null;

  const activeAlbum = partners[activeIndex] || partners[0];
  const albumId = String(activeIndex + 1).padStart(2, '0');

  return (
    <section className="albums" id="partners" ref={containerRef}>
      <div className="albums__pin" id="albumsPin">
        
        {/* Interactive Vinyl / Sleeve Visual Presentation */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          
          {/* Active Album Vinyl + Sleeve Centerpiece */}
          <div 
            onClick={() => onSelectAlbum({
              id: activeAlbum.id,
              title: activeAlbum.title,
              image: activeAlbum.media,
              description: activeAlbum.description,
            })}
            className="relative w-[320px] sm:w-[480px] md:w-[560px] aspect-square cursor-pointer group"
          >
            {/* Vinyl Record slipping out behind */}
            <div 
              className="absolute top-4 right-[-20%] sm:right-[-35%] w-[90%] aspect-square rounded-full bg-[#111] border border-white/10 shadow-2xl flex items-center justify-center transition-all duration-700 transform group-hover:translate-x-6 animate-[spin_12s_linear_infinite]"
              style={{
                backgroundImage: 'radial-gradient(circle, #222 2px, transparent 3px), repeating-radial-gradient(circle, #0e0e0e 0, #0e0e0e 3px, #181818 4px, #0e0e0e 5px)'
              }}
            >
              {/* Center Vinyl Label */}
              <div className="w-24 sm:w-36 aspect-square rounded-full overflow-hidden border-2 border-white/30 flex items-center justify-center bg-[#090909]">
                <img
                  src={activeAlbum.media}
                  alt={activeAlbum.title}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute w-4 h-4 rounded-full bg-[#090909] border border-white/40"></div>
            </div>

            {/* Album Outer Cardboard Sleeve */}
            <div className="relative z-10 w-full h-full rounded-sm overflow-hidden bg-[#141414] border border-[var(--line)] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <img
                src={activeAlbum.media}
                alt={activeAlbum.title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono-custom text-[#d9d9d9]">
                <div>
                  <div className="text-base sm:text-xl font-serif-custom font-bold">{activeAlbum.title}</div>
                  <div className="text-[10px] text-[var(--ink-dim)]">Partner: {activeAlbum.partnerName || 'Avant-Garde Studio'}</div>
                  <div className="text-[9px] text-[var(--accent)] mt-0.5">{activeAlbum.technique || `${activeAlbum.month} ${activeAlbum.year}`}</div>
                </div>
                <div className="text-[10px] uppercase border border-[var(--line)] px-2 py-0.5 rounded">
                  DM TO RESERVE
                </div>
              </div>
            </div>
          </div>

          {/* Quick manual indicator / next buttons */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col gap-2 z-20">
            {partners.map((alb, i) => (
              <button
                key={alb.id}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-8 rounded-full transition-all ${activeIndex === i ? 'bg-[#d9d9d9] scale-y-125' : 'bg-[#d9d9d9]/25 hover:bg-[#d9d9d9]/60'}`}
                title={alb.title}
              />
            ))}
          </div>

        </div>

        {/* Bottom Left Title */}
        <h3 className="albums__title" id="albumTitle" aria-live="polite">
          {activeAlbum.title} — {activeAlbum.partnerName || 'Figure Map Edition'}
        </h3>

        {/* Bottom Right Meta */}
        <div className="albums__meta">
          <span className="albums__num">
            <span className="albums__num-dash">/</span>
            <span id="albumNum">{albumId}</span>
          </span>
        </div>

      </div>
    </section>
  );
}
