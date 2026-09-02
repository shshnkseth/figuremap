import React, { useState } from 'react';
import { STUDIO_LOGS } from '../data/editions';
import { playMicroClick } from '../utils/ambientAudio';

export default function StudioLogSection({ setCursorText }) {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="studio-log" className="py-28 sm:py-40 border-b border-[var(--border-subtle)] bg-[var(--bg-raw)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
        
        {/* Minimal Section Headline */}
        <div className="flex justify-between items-baseline text-xs font-mono-custom text-[var(--text-muted)] border-b border-[var(--border-subtle)] pb-3">
          <span>( PROCESS )</span>
          <span>THE PHYSICAL MEDIUM</span>
        </div>

        {/* 3 High-Impact Photography Plates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STUDIO_LOGS.map((log) => (
            <div
              key={log.logId}
              onClick={() => {
                playMicroClick(900);
                setActivePhoto(log);
              }}
              onMouseEnter={() => setCursorText('EXPAND')}
              onMouseLeave={() => setCursorText('')}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3 p-3 hover:border-[var(--border-active)] transition-all"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
                <img
                  src={log.image}
                  alt={log.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
              </div>

              <div className="px-2 py-1 flex justify-between items-center text-xs font-mono-custom text-[var(--text-muted)]">
                <span className="text-[var(--text-ink)]">{log.title}</span>
                <span className="text-[var(--text-dim)]">↗</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Photo Lightbox */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-pointer animate-fade-in"
        >
          <div className="max-w-3xl w-full space-y-4 text-[var(--text-ink)]" onClick={(e) => e.stopPropagation()}>
            <img 
              src={activePhoto.image} 
              alt={activePhoto.title} 
              className="w-full max-h-[70vh] object-cover rounded-2xl border border-[var(--border-subtle)]"
            />
            <div className="flex justify-between items-center text-xs font-mono-custom text-[var(--text-muted)]">
              <span className="text-[var(--text-ink)] font-serif-custom text-xl">{activePhoto.title}</span>
              <button onClick={() => setActivePhoto(null)} className="hover:text-white">CLOSE ✕</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
