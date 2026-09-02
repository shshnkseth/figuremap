import React from 'react';
import { ArrowDownRight, Compass, Scissors, Layers, Eye } from 'lucide-react';
import { BRAND_MANIFESTO } from '../data/editions';

export default function HeroManifesto({ onExploreEditions, onOpenManifesto }) {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-28 border-b border-[var(--border-subtle)] overflow-hidden">
      {/* Decorative background registration crosshairs */}
      <div className="absolute top-6 left-6 text-[var(--border-active)] text-xs font-mono-custom opacity-40 select-none">
        ⊕ REG.001 [Y:04.2 / X:18.9]
      </div>
      <div className="absolute top-6 right-6 text-[var(--border-active)] text-xs font-mono-custom opacity-40 select-none">
        ⌖ 280GSM / ARCHIVAL MESH
      </div>
      <div className="absolute bottom-6 right-6 text-[var(--border-active)] text-xs font-mono-custom opacity-30 select-none hidden md:block">
        [NO CORPORATE TEMPLATES — ALL HAND PULLED]
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid: Manifesto Essence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Bold Typography & Conceptual Core */}
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--border-subtle)] rounded-full text-xs font-mono-custom text-[var(--text-muted)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-rust)]"></span>
              ART-LED PHYSICAL APPAREL & COLLABORATIVE JOURNAL
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-custom font-normal leading-[1.08] tracking-tight text-[var(--text-ink)]">
              Where the human form meets the path of <span className="italic font-normal text-[var(--accent-rust)]">wandering</span>.
            </h1>

            {/* The FIGURE vs MAP Dichotomy Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-active)] transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-custom text-[var(--accent-rust)] font-semibold uppercase tracking-wider">
                  <span>FIGURE</span>
                  <span>[01 / FORM]</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  The human, the individual, the silhouette, the things we evolve into through kinetic motion and time.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-active)] transition-colors space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-custom text-[var(--accent-rust)] font-semibold uppercase tracking-wider">
                  <span>MAP</span>
                  <span>[02 / TRAJECTORY]</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans">
                  Direction, discovering, getting lost, asphalt curbs, sound waves, concrete gaps, finding your own coordinates.
                </p>
              </div>
            </div>

            {/* Screen-Printing Raw DNA Note */}
            <div className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed space-y-2 max-w-2xl">
              <p>
                Not another printed T-shirt brand. We partner with artists from <strong className="text-[var(--text-ink)] font-medium">skateboarding, underground music, graffiti, action sports, and parkour</strong>—creating a bespoke numbered physical artifact for each collaboration.
              </p>
              <p className="text-xs font-mono-custom text-[var(--text-dim)] flex items-center gap-2 pt-2">
                <Layers className="w-3.5 h-3.5 text-[var(--accent-rust)]" />
                <span>Hand-pulled squeegee passes • Bleed & registration quirks celebrated • Zero mass production</span>
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreEditions}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--text-ink)] text-[var(--bg-raw)] font-mono-custom text-xs uppercase tracking-widest font-bold rounded hover:bg-[var(--accent-rust)] hover:text-white transition-all transform active:scale-95 shadow-md"
              >
                <span>EXPLORE CURRENT EDITIONS</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenManifesto}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[var(--border-subtle)] text-[var(--text-ink)] hover:border-[var(--text-ink)] font-mono-custom text-xs uppercase tracking-wider rounded transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-[var(--accent-rust)]" />
                <span>READ MANIFESTO</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tactile Spec Box & Community Fields */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--text-muted)]">STUDIO DISCIPLINES</span>
                <span className="text-[10px] font-mono-custom text-[var(--accent-rust)]">ARCHIVE INDEX</span>
              </div>

              {/* Tag Cloud of Disciplines */}
              <div className="flex flex-wrap gap-2">
                {BRAND_MANIFESTO.disciplines.map((d, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-mono-custom border border-[var(--border-subtle)] rounded bg-[var(--bg-raw)] text-[var(--text-muted)] hover:text-[var(--text-ink)] hover:border-[var(--accent-rust)] transition-colors cursor-default"
                  >
                    #{d}
                  </span>
                ))}
              </div>

              {/* Studio Stamp Simulation */}
              <div className="p-4 border border-dashed border-[var(--border-subtle)] rounded bg-[var(--bg-raw)] text-center space-y-1">
                <div className="text-[11px] font-mono-custom text-[var(--text-dim)] uppercase tracking-widest">
                  HOW TO ACQUIRE
                </div>
                <div className="text-xs font-serif-custom italic text-[var(--text-ink)]">
                  "No automated checkout cart. Direct conversation with the maker."
                </div>
                <div className="text-[10px] font-mono-custom text-[var(--accent-rust)] pt-1">
                  DM TO RESERVE YOUR NUMBERED PIECE →
                </div>
              </div>
            </div>

            {/* Quick stats / Edition tracker */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 border border-[var(--border-subtle)] rounded bg-[var(--bg-card)]">
                <div className="text-2xl font-serif-custom font-bold text-[var(--text-ink)]">04</div>
                <div className="text-[10px] font-mono-custom uppercase text-[var(--text-muted)]">Active Editions</div>
              </div>
              <div className="p-3 border border-[var(--border-subtle)] rounded bg-[var(--bg-card)]">
                <div className="text-2xl font-serif-custom font-bold text-[var(--text-ink)]">100%</div>
                <div className="text-[10px] font-mono-custom uppercase text-[var(--text-muted)]">Hand-Pulled</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
