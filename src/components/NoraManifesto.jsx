import React from 'react';
import { BRAND_MANIFESTO } from '../data/editions';

export default function NoraManifesto() {
  return (
    <section id="manifesto" className="py-20 sm:py-28 px-6 sm:px-10 border-b border-[var(--border-subtle)] bg-[var(--bg-raw)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column (Sticky Title) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono-custom text-[var(--accent-rust)] uppercase tracking-wider">
            ( 01 / THE PHILOSOPHY )
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-custom font-normal text-[var(--text-ink)] leading-tight">
            FIGURE<br />
            <span className="italic text-[var(--text-muted)] font-light">meets</span> MAP.
          </h2>
        </div>

        {/* Right Column (Minimalist Explanation) */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="text-xs font-mono-custom text-[var(--accent-rust)] font-bold uppercase">
                FIGURE — [THE FORM]
              </div>
              <p className="text-sm font-sans text-[var(--text-muted)] leading-relaxed">
                The human, the individual, the silhouette, the form we become through kinetic movement and lived time.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] space-y-3">
              <div className="text-xs font-mono-custom text-[var(--accent-rust)] font-bold uppercase">
                MAP — [THE TRAJECTORY]
              </div>
              <p className="text-sm font-sans text-[var(--text-muted)] leading-relaxed">
                Direction, wandering, discovering, getting lost, finding coordinates through concrete, noise, and rhythm.
              </p>
            </div>
          </div>

          <p className="text-base font-serif-custom italic text-[var(--text-muted)] leading-relaxed border-l border-[var(--accent-rust)] pl-5">
            "{BRAND_MANIFESTO.philosophy}"
          </p>
        </div>

      </div>
    </section>
  );
}
