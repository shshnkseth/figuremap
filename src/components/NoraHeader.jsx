import React, { useState, useEffect } from 'react';
import { Moon, Sun, Volume2, VolumeX, Sparkles, MessageCircle } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function NoraHeader({
  theme,
  toggleTheme,
  audioPlaying,
  toggleAudio,
  onOpenCollab,
  onOpenManifesto,
  onOpenGeneralInquiry,
  setCursorText
}) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-raw)]/90 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between text-xs font-mono-custom">
        
        {/* Brand Name */}
        <div
          onClick={() => {
            playMicroClick(800);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onMouseEnter={() => setCursorText('TOP')}
          onMouseLeave={() => setCursorText('')}
          className="cursor-pointer group flex items-center gap-3"
        >
          <span className="font-display-custom tracking-[0.25em] text-base sm:text-lg font-bold uppercase text-[var(--text-ink)] group-hover:text-[var(--accent-rust)] transition-colors">
            FIGURE MAP
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-rust)]"></span>
        </div>

        {/* Center Nav Links (Nora Vale style) */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-wider text-[var(--text-muted)]">
          <a
            href="#editions"
            onClick={() => playMicroClick(900)}
            className="hover:text-[var(--text-ink)] transition-colors flex items-center gap-1.5"
          >
            <span>Editions</span>
            <span className="text-[10px] text-[var(--text-dim)]">(04)</span>
          </a>

          <a
            href="#manifesto"
            onClick={() => playMicroClick(900)}
            className="hover:text-[var(--text-ink)] transition-colors"
          >
            Concept
          </a>

          <a
            href="#studio"
            onClick={() => playMicroClick(900)}
            className="hover:text-[var(--text-ink)] transition-colors"
          >
            Studio
          </a>

          <button
            onClick={() => {
              playMicroClick(1000);
              onOpenCollab();
            }}
            className="hover:text-[var(--text-ink)] transition-colors"
          >
            Collaborate
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          
          {/* Sound toggle */}
          <button
            onClick={() => {
              playMicroClick(1100);
              toggleAudio();
            }}
            onMouseEnter={() => setCursorText(audioPlaying ? 'MUTE' : 'SOUND')}
            onMouseLeave={() => setCursorText('')}
            className={`p-2 rounded-md border border-[var(--border-subtle)] hover:border-[var(--text-ink)] transition-colors ${audioPlaying ? 'text-[var(--accent-rust)] border-[var(--accent-rust)]' : 'text-[var(--text-muted)]'}`}
            title="Toggle Ambient Audio"
          >
            {audioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => {
              playMicroClick(1300);
              toggleTheme();
            }}
            onMouseEnter={() => setCursorText('THEME')}
            onMouseLeave={() => setCursorText('')}
            className="p-2 rounded-md border border-[var(--border-subtle)] hover:border-[var(--text-ink)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* DM Order / Inquire Button */}
          <button
            onClick={() => {
              playMicroClick(1000);
              onOpenGeneralInquiry();
            }}
            onMouseEnter={() => setCursorText('INQUIRE')}
            onMouseLeave={() => setCursorText('')}
            className="px-3.5 py-1.5 rounded-md bg-[var(--text-ink)] text-[var(--bg-raw)] font-bold hover:bg-[var(--accent-rust)] hover:text-white transition-all text-[11px] flex items-center gap-1.5"
          >
            <MessageCircle className="w-3 h-3" />
            <span>DM INQUIRY</span>
          </button>
        </div>

      </div>
    </header>
  );
}
