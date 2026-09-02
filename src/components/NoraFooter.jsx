import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function NoraFooter({ onOpenManifesto, onOpenCollab }) {
  const scrollToTop = () => {
    playMicroClick(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-raw)] text-[var(--text-ink)] pt-16 pb-12 px-6 sm:px-10 transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Section: Collab Banner */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-12 border-b border-[var(--border-subtle)]">
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-5xl font-serif-custom font-normal text-[var(--text-ink)]">
              Propose an Edition.
            </h3>
            <p className="text-xs font-mono-custom text-[var(--text-muted)]">
              Open dialogue with artists across all unconventional practices.
            </p>
          </div>

          <button
            onClick={() => {
              playMicroClick(1000);
              onOpenCollab();
            }}
            className="px-6 py-3 rounded-lg bg-[var(--text-ink)] text-[var(--bg-raw)] font-mono-custom text-xs uppercase font-bold hover:bg-[var(--accent-rust)] hover:text-white transition-colors self-start sm:self-auto"
          >
            START DIALOGUE ↗
          </button>
        </div>

        {/* 3-Column Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-xs font-mono-custom text-[var(--text-muted)]">
          
          <div className="space-y-3">
            <div className="font-display-custom text-sm font-bold uppercase text-[var(--text-ink)] tracking-wider">
              FIGURE MAP
            </div>
            <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
              An art-led physical apparel journal exploring form and wandering trajectory through limited screen-printed pieces.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-ink)] font-bold">
              Index
            </div>
            <ul className="space-y-1.5">
              <li><a href="#editions" className="hover:text-[var(--text-ink)] transition-colors">• Current Editions</a></li>
              <li><a href="#manifesto" className="hover:text-[var(--text-ink)] transition-colors">• Concept: Figure × Map</a></li>
              <li><a href="#studio" className="hover:text-[var(--text-ink)] transition-colors">• Studio Notes</a></li>
              <li><button onClick={onOpenCollab} className="hover:text-[var(--text-ink)] transition-colors">• Submit Collaboration</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-ink)] font-bold">
              Direct Inquiries
            </div>
            <ul className="space-y-1.5">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[var(--text-ink)] transition-colors">
                  • Instagram (@figuremap.archive)
                </a>
              </li>
              <li>
                <a href="mailto:studio@figuremap.archive" className="hover:text-[var(--text-ink)] transition-colors">
                  • studio@figuremap.archive
                </a>
              </li>
              <li className="pt-2 text-[10px] text-[var(--text-dim)]">
                DM on Instagram or WhatsApp anytime for piece reservation.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-custom text-[var(--text-dim)]">
          <div className="flex items-center gap-3">
            <span>© 2026 FIGURE MAP. ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <span>HAND-PULLED EDITIONS</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
