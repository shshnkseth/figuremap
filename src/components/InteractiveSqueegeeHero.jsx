import React, { useState, useRef, useEffect } from 'react';
import { playSqueegeeSound, playMicroClick } from '../utils/ambientAudio';

export default function InteractiveSqueegeeHero({ onExploreEditions, setCursorText }) {
  const [sliderPos, setSliderPos] = useState(55);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handlePointerDown = () => {
    setIsDragging(true);
    playSqueegeeSound();
  };

  const handlePointerMove = (e) => {
    if (!isDragging && e.type !== 'mousemove') return;
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
      setSliderPos(pct);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      playMicroClick(900, 'sine', 0.04);
    }
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
  }, []);

  return (
    <section 
      className="relative min-h-[90vh] flex flex-col justify-between pt-16 pb-20 px-6 sm:px-12 border-b border-[var(--border-subtle)] select-none overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Subtle Registration Corners */}
      <div className="absolute top-8 left-8 text-[10px] font-mono-custom text-[var(--text-dim)] tracking-widest select-none">
        ⊕ REG.01
      </div>
      <div className="absolute top-8 right-8 text-[10px] font-mono-custom text-[var(--text-dim)] tracking-widest select-none">
        ⌖ 280GSM
      </div>

      {/* Massive Typographic Sculpture */}
      <div className="max-w-7xl mx-auto w-full pt-10 sm:pt-16 pb-8">
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-serif-custom font-normal leading-[0.88] tracking-tight text-[var(--text-ink)]">
          FIGURE<br />
          <span className="italic font-light text-[var(--text-dim)] pl-6 sm:pl-16">MAP</span>
        </h1>
        
        <div className="pt-6 flex justify-between items-baseline text-xs font-mono-custom text-[var(--text-muted)]">
          <span>The Form × The Wandering</span>
          <span>Hand-pulled silkscreen editions</span>
        </div>
      </div>

      {/* Interactive Squeegee Canvas */}
      <div className="max-w-7xl mx-auto w-full my-6">
        <div 
          ref={containerRef}
          onMouseEnter={() => setCursorText('DRAG INK ↔')}
          onMouseLeave={() => setCursorText('')}
          className="relative h-80 sm:h-[460px] md:h-[540px] rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] cursor-ew-resize shadow-2xl"
        >
          {/* Base Layer: Raw Cotton Fiber */}
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)]">
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=85"
              alt="Raw Garment Fabric"
              className="w-full h-full object-cover filter grayscale contrast-125 opacity-55"
            />
          </div>

          {/* Top Layer: Squeegee Ink Deposit */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="absolute inset-0 w-full h-full min-w-[700px] sm:min-w-[1200px]">
              <img
                src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1600&q=85"
                alt="Silkscreen Ink"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>

          {/* Squeegee Blade Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,1)] z-10 flex items-center justify-center pointer-events-auto"
            style={{ left: `${sliderPos}%` }}
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
          >
            <div className="w-9 h-9 -ml-4 rounded-full bg-[var(--text-ink)] text-[var(--bg-raw)] border border-white shadow-xl flex items-center justify-center text-[9px] font-mono-custom font-bold transform hover:scale-110 active:scale-95 transition-transform">
              ↔
            </div>
          </div>

          {/* Subtle micro label */}
          <div className="absolute bottom-5 left-6 text-[10px] font-mono-custom text-[var(--text-ink)] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
            Drag blade to wipe ink
          </div>
        </div>
      </div>

      {/* Down arrow trigger */}
      <div className="max-w-7xl mx-auto w-full flex justify-end pt-4">
        <button
          onClick={() => {
            playMicroClick(800);
            onExploreEditions();
          }}
          onMouseEnter={() => setCursorText('DOWN ↓')}
          onMouseLeave={() => setCursorText('')}
          className="text-xs font-mono-custom text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
        >
          EXPLORE EDITIONS ↓
        </button>
      </div>
    </section>
  );
}
