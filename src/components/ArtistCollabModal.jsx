import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { playMicroClick } from '../utils/ambientAudio';

export default function ArtistCollabModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    medium: '',
    location: '',
    portfolio: '',
    concept: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    playMicroClick(1400);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[var(--bg-raw)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl text-[var(--text-ink)]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <div>
            <span className="text-[10px] font-mono-custom uppercase tracking-widest text-[var(--accent-rust)]">
              COLLABORATION ARCHIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-custom font-normal">
              Propose an Edition
            </h2>
          </div>
          <button
            onClick={() => {
              playMicroClick(800);
              onClose();
            }}
            className="p-2 rounded-full hover:bg-[var(--border-subtle)] text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[var(--accent-rust)] mx-auto" />
            <h3 className="text-2xl font-serif-custom">Proposal Received</h3>
            <p className="text-xs font-mono-custom text-[var(--text-muted)] max-w-md mx-auto leading-relaxed">
              We review every dialogue in the studio. If the rhythm connects with Figure Map, we will reach out to start silkscreen test passes.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[var(--text-ink)] text-[var(--bg-raw)] font-mono-custom text-xs uppercase font-bold rounded-full hover:bg-[var(--accent-rust)] hover:text-white transition-colors"
            >
              RETURN TO JOURNAL
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono-custom text-xs">
            <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
              Figure Map partners with artists and individuals from all unconventional fields to create a dedicated hand-screenprinted piece.
            </p>

            <div className="space-y-1">
              <label className="text-[11px] text-[var(--text-muted)] uppercase">Your Name / Handle *</label>
              <input
                required
                type="text"
                placeholder="e.g. Kai Vance (@kaivance)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-ink)] focus:border-[var(--accent-rust)] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] text-[var(--text-muted)] uppercase">Your Medium / Expression *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Movement, Modular tape, Spray..."
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-ink)] focus:border-[var(--accent-rust)] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-[var(--text-muted)] uppercase">Location *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Tokyo / Berlin / Bristol"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-ink)] focus:border-[var(--accent-rust)] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[var(--text-muted)] uppercase">Link to Work / Visuals *</label>
              <input
                required
                type="text"
                placeholder="https://..."
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-ink)] focus:border-[var(--accent-rust)] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-[var(--text-muted)] uppercase">Brief Idea (Optional)</label>
              <textarea
                rows={3}
                placeholder="What motion, sound, or visual memory would we translate onto cotton?"
                value={formData.concept}
                onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                className="w-full px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-ink)] focus:border-[var(--accent-rust)] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[var(--accent-rust)] text-white font-mono-custom text-xs uppercase tracking-widest font-bold rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND PROPOSAL</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
