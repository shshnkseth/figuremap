import React, { useState } from 'react';
import { X, MessageCircle, ArrowRight, Layers, MapPin, Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EditionModal({ edition, onClose, onOpenAcquire }) {
  if (!edition) return null;

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const allImages = [edition.heroImage, edition.productImage, ...edition.detailImages];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-2 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl my-4 sm:my-8 bg-[var(--bg-raw)] text-[var(--text-ink)] border border-[var(--border-subtle)] rounded-xl shadow-2xl overflow-hidden">
        
        {/* Top Sticky Nav within Modal */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[var(--bg-raw)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-mono-custom">
            <span className="px-2 py-0.5 bg-[var(--text-ink)] text-[var(--bg-raw)] font-bold rounded">
              EDITION {edition.editionNumber}
            </span>
            <span className="text-[var(--text-muted)] tracking-wider">
              {edition.code}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenAcquire(edition);
              }}
              className="px-3 py-1.5 bg-[var(--accent-rust)] text-white text-xs font-mono-custom uppercase font-semibold rounded hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>DM TO RESERVE</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-12">
          
          {/* Headline & Artist Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono-custom text-[var(--accent-rust)] uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{edition.artist.location} • {edition.artist.discipline}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif-custom font-normal text-[var(--text-ink)] leading-tight">
              {edition.title}
            </h1>
            
            <p className="text-sm font-mono-custom text-[var(--text-muted)]">
              An archival silkscreen edition conceived with <strong className="text-[var(--text-ink)]">{edition.artist.name}</strong> ({edition.artist.instagram})
            </p>
          </div>

          {/* Interactive Image Carousel */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden bg-[var(--bg-card)] aspect-[16/10] border border-[var(--border-subtle)]">
              <img
                src={allImages[currentImgIndex]}
                alt={`${edition.title} detail view`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Carousel Controls */}
              <button
                onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 text-[10px] font-mono-custom bg-black/70 text-white px-2 py-1 rounded">
                PLATE {currentImgIndex + 1} OF {allImages.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`relative w-20 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-all ${currentImgIndex === idx ? 'border-[var(--accent-rust)] scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Story & Artist Dialogue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-[var(--border-subtle)]">
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xs font-mono-custom uppercase tracking-wider text-[var(--accent-rust)]">
                THE CONCEPT & ESSENCE
              </h3>
              
              <blockquote className="text-xl sm:text-2xl font-serif-custom italic text-[var(--text-ink)] leading-snug border-l-2 border-[var(--accent-rust)] pl-4">
                "{edition.artistQuote}"
              </blockquote>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-sans">
                {edition.story}
              </p>

              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-2">
                <div className="text-xs font-mono-custom uppercase text-[var(--text-ink)] font-semibold">
                  ABOUT THE COLLABORATOR: {edition.artist.name}
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {edition.artist.bio}
                </p>
                <div className="text-xs font-mono-custom text-[var(--accent-rust)] pt-1">
                  Follow work: {edition.artist.instagram}
                </div>
              </div>
            </div>

            {/* Silkscreen Technical Specs Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4 font-mono-custom text-xs">
                <div className="text-xs font-bold text-[var(--text-ink)] uppercase border-b border-[var(--border-subtle)] pb-2 flex items-center justify-between">
                  <span>SILKSCREEN SPECIFICATION</span>
                  <Layers className="w-4 h-4 text-[var(--accent-rust)]" />
                </div>

                <div className="space-y-3 text-[11px] text-[var(--text-muted)]">
                  <div>
                    <div className="text-[var(--text-dim)] uppercase">Garment:</div>
                    <div className="text-[var(--text-ink)] font-medium">{edition.screenprintSpecs.garment}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-dim)] uppercase">Ink Pass:</div>
                    <div className="text-[var(--text-ink)] font-medium">{edition.screenprintSpecs.ink}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-dim)] uppercase">Silhouette:</div>
                    <div className="text-[var(--text-ink)] font-medium">{edition.screenprintSpecs.silhouette}</div>
                  </div>
                  <div>
                    <div className="text-[var(--text-dim)] uppercase">Production:</div>
                    <div className="text-[var(--accent-rust)] font-medium">{edition.screenprintSpecs.run}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-base font-serif-custom text-[var(--text-ink)] font-bold">
                    {edition.screenprintSpecs.price}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenAcquire(edition);
                  }}
                  className="w-full py-3.5 bg-[var(--text-ink)] text-[var(--bg-raw)] hover:bg-[var(--accent-rust)] hover:text-white font-mono-custom text-xs uppercase tracking-widest font-bold rounded-full transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>DM TO ACQUIRE</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
