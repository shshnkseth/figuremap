import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function NoraHero({ onExplore, onOpenCollab, setCursorText }) {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 px-6 sm:px-10 border-b border-[var(--border-subtle)] bg-[var(--bg-raw)]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Top Status Pill */}
        <div className="flex items-center gap-2.5 text-xs font-mono-custom text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Screen-Printed Silkscreen Editions</span>
          <span className="text-[var(--text-dim)]">•</span>
          <span>Tokyo / Berlin / Marseille / Global Archive</span>
        </div>

        {/* Hero Main Headline (Nora Vale Typography style) */}
        <div className="max-w-5xl space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-custom font-normal leading-[1.04] tracking-tight text-[var(--text-ink)]">
            Hand-pulled apparel exploring the <span className="italic font-light text-[var(--accent-rust)]">form</span> and the <span className="italic font-light text-[var(--text-muted)]">wandering</span> path.
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-muted)] font-sans max-w-2xl leading-relaxed">
            Figure Map partners with artists across unconventional fields—creating physical screen-printed pieces and documenting the journey.
          </p>
        </div>

        {/* Bottom Quick Row */}
        <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[var(--border-subtle)] text-xs font-mono-custom text-[var(--text-muted)]">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[var(--text-dim)]">MEDIUM: </span>
              <span className="text-[var(--text-ink)]">Hand Silkscreen (280–300 GSM)</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[var(--text-dim)]">RUNS: </span>
              <span className="text-[var(--text-ink)]">Numbered Editions Only</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playMicroClick(900);
                onExplore();
              }}
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
              className="flex items-center gap-2 text-[var(--text-ink)] hover:text-[var(--accent-rust)] transition-colors"
            >
              <span>Scroll to Editions</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
