import React, { useState } from 'react';
import { STUDIO_LOGS } from '../data/editions';
import { ArrowUpRight } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function NoraStudio({ setCursorText }) {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <section id="studio" className="py-20 sm:py-28 px-6 sm:px-10 border-b border-[var(--border-subtle)] bg-[var(--bg-raw)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column (Sticky Title) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono-custom text-[var(--accent-rust)] uppercase tracking-wider">
            ( 02 / THE MEDIUM )
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-custom font-normal text-[var(--text-ink)] leading-tight">
            Hand-Pulled<br />
            <span className="italic text-[var(--text-muted)] font-light">Silkscreen</span>.
          </h2>
          <p className="text-xs font-mono-custom text-[var(--text-muted)] leading-relaxed pt-2">
            No automated industrial presses. Registration quirks, ink density, and unbleached cotton fibers are celebrated.
          </p>
        </div>

        {/* Right Column (3 Process Cards) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STUDIO_LOGS.map((log) => (
            <div
              key={log.logId}
              onClick={() => {
                playMicroClick(900);
                setSelectedLog(log);
              }}
              onMouseEnter={() => setCursorText('READ')}
              onMouseLeave={() => setCursorText('')}
              className="group cursor-pointer rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--border-active)] transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] overflow-hidden bg-black">
                <img
                  src={log.image}
                  alt={log.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono-custom text-[var(--accent-rust)]">{log.date}</div>
                  <h3 className="text-base font-serif-custom font-normal text-[var(--text-ink)] group-hover:text-[var(--accent-rust)] transition-colors mt-1">
                    {log.title}
                  </h3>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono-custom text-[var(--text-muted)]">
                  <span>Entry</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:text-[var(--accent-rust)] transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Selected Studio Log Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-[var(--bg-raw)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl text-[var(--text-ink)]">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <span className="text-xs font-mono-custom text-[var(--accent-rust)]">{selectedLog.logId} • {selectedLog.date}</span>
              <button onClick={() => setSelectedLog(null)} className="text-xs font-mono-custom text-[var(--text-muted)] hover:text-white">CLOSE ✕</button>
            </div>
            
            <img src={selectedLog.image} alt={selectedLog.title} className="w-full h-64 object-cover rounded-xl" />
            
            <h3 className="text-2xl font-serif-custom">{selectedLog.title}</h3>
            
            <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed">
              {selectedLog.excerpt}
            </p>

            <button
              onClick={() => setSelectedLog(null)}
              className="w-full py-3 bg-[var(--text-ink)] text-[var(--bg-raw)] font-mono-custom text-xs uppercase font-bold rounded-lg hover:bg-[var(--accent-rust)] hover:text-white transition-colors"
            >
              BACK TO JOURNAL
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
