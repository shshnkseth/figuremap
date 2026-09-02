import React from 'react';
import { X, Compass, Layers, Sparkles, Feather } from 'lucide-react';
import { BRAND_MANIFESTO } from '../data/editions';

export default function ManifestoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[var(--bg-raw)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-10 space-y-8 shadow-2xl text-[var(--text-ink)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono-custom text-[var(--accent-rust)]">
            <Compass className="w-4 h-4" />
            <span>FOUNDATIONAL MANIFESTO</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-serif-custom font-normal leading-tight">
            The Philosophy of <span className="italic text-[var(--accent-rust)]">Figure Map</span>
          </h2>
          <div className="text-xs font-mono-custom text-[var(--text-muted)]">
            ARCHIVAL STATEMENT NO. 001 / SCREEN-PRINTED SOUL
          </div>
        </div>

        {/* The Two Pillars */}
        <div className="space-y-6">
          <div className="p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="text-xs font-mono-custom text-[var(--accent-rust)] font-bold tracking-widest uppercase">
              FIGURE
            </div>
            <p className="text-sm sm:text-base font-serif-custom text-[var(--text-ink)] leading-relaxed">
              The human form, the individual silhouette, the posture of standing against gravity. It is who we are at rest and who we transform into when kinetic energy takes over.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-2">
            <div className="text-xs font-mono-custom text-[var(--accent-rust)] font-bold tracking-widest uppercase">
              MAP
            </div>
            <p className="text-sm sm:text-base font-serif-custom text-[var(--text-ink)] leading-relaxed">
              Direction, wandering, discovering, getting lost, finding the rhythm in uncharted coordinates. A map is not a fixed route—it is the memory of having traversed terrain.
            </p>
          </div>
        </div>

        {/* Screen-Printing Raw DNA Section */}
        <div className="space-y-3 pt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-sans">
          <div className="text-xs font-mono-custom text-[var(--text-ink)] uppercase font-semibold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--accent-rust)]" />
            <span>THE HAND, THE INK, THE IMPERFECTION</span>
          </div>
          <p>
            Because every single piece is physically hand-screen-printed in our studio, we deliberately refuse corporate symmetry. The slight variance of squeegee angle, the registration quirks, the microscopic bleeds into heavyweight organic cotton fibers—these are not defects. They are proof of human presence.
          </p>
          <p>
            Figure Map is a living journal. We do not mass manufacture; we collaborate with artists to tell one singular story per edition.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[var(--text-ink)] text-[var(--bg-raw)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded hover:bg-[var(--accent-rust)] hover:text-white transition-colors"
        >
          EXPLORE THE ARCHIVE
        </button>

      </div>
    </div>
  );
}
