import React from 'react';
import { playMicroClick } from '../utils/ambientAudio';

export default function Footer({ onOpenManifesto, onOpenCollab }) {
  const scrollToTop = () => {
    playMicroClick(800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-raw)] text-[var(--text-ink)] py-20 px-6 sm:px-12 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs font-mono-custom text-[var(--text-muted)]">
        
        <div className="flex items-center gap-4">
          <span className="font-display-custom tracking-[0.25em] text-sm font-bold text-[var(--text-ink)]">
            FIGURE MAP
          </span>
          <span className="text-[var(--text-dim)]">•</span>
          <span>SCREENPRINT ARCHIVE</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--text-ink)] transition-colors"
          >
            INSTAGRAM ↗
          </a>

          <button
            onClick={onOpenCollab}
            className="hover:text-[var(--text-ink)] transition-colors"
          >
            PROPOSE COLLAB ↗
          </button>

          <button
            onClick={scrollToTop}
            className="text-[var(--text-ink)] hover:text-[var(--accent-rust)] transition-colors"
          >
            TOP ↑
          </button>
        </div>

      </div>
    </footer>
  );
}
