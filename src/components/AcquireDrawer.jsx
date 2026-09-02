import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Send, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function AcquireDrawer({ edition, onClose }) {
  if (!edition) return null;

  const [selectedSize, setSelectedSize] = useState('L');
  const [copied, setCopied] = useState(false);
  const [reservedStatus, setReservedStatus] = useState(false);

  const sizes = [
    { label: 'S', chest: '54 cm / 21.2 in', length: '71 cm' },
    { label: 'M', chest: '57 cm / 22.4 in', length: '74 cm' },
    { label: 'L', chest: '60 cm / 23.6 in', length: '77 cm' },
    { label: 'XL', chest: '64 cm / 25.2 in', length: '80 cm' },
    { label: 'XXL', chest: '68 cm / 26.7 in', length: '82 cm' },
  ];

  const dmText = `Hey Figure Map, I'd like to acquire [${edition.code}] by ${edition.artist.name} in Size: ${selectedSize}. Please send acquisition details and shipping coordinates.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dmText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSimulateReserve = () => {
    setReservedStatus(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D9532F', '#D4A373', '#F3EFE6']
    });
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(dmText)}`;
  const instagramUrl = `https://instagram.com/direct/inbox/`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-lg bg-[var(--bg-raw)] text-[var(--text-ink)] h-full overflow-y-auto border-l border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
        
        {/* Top Bar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-mono-custom uppercase tracking-widest text-[var(--accent-rust)]">
                ACQUISITION INQUIRY
              </span>
              <h2 className="text-xl font-serif-custom font-normal">
                {edition.title}
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-ink)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Summary Spec Card */}
          <div className="flex gap-4 p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] items-center">
            <img
              src={edition.productImage}
              alt={edition.title}
              className="w-16 h-16 object-cover rounded border border-[var(--border-subtle)]"
            />
            <div className="text-xs font-mono-custom space-y-1">
              <div className="font-bold text-[var(--text-ink)]">{edition.code}</div>
              <div className="text-[var(--text-muted)]">{edition.screenprintSpecs.garment}</div>
              <div className="text-[var(--accent-rust)] font-bold">{edition.screenprintSpecs.price}</div>
            </div>
          </div>

          {/* Step 1: Select Silhouette Size */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono-custom">
              <span className="uppercase text-[var(--text-muted)]">1. CHOOSE SIZE (BOXY CUT)</span>
              <span className="text-[10px] text-[var(--text-dim)]">UNISEX OVERSIZED FIT</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedSize(s.label)}
                  className={`py-2.5 text-xs font-mono-custom font-bold rounded border transition-all ${selectedSize === s.label ? 'border-[var(--accent-rust)] bg-[var(--accent-rust)] text-white' : 'border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:border-[var(--text-ink)] hover:text-[var(--text-ink)]'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="text-[10px] font-mono-custom text-[var(--text-dim)] text-center">
              Selected size width: {sizes.find((s) => s.label === selectedSize)?.chest}
            </div>
          </div>

          {/* Step 2: DM Message Template */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex justify-between items-center text-xs font-mono-custom">
              <span className="uppercase text-[var(--text-muted)]">2. DIRECT MESSAGE ORDER TEXT</span>
              <button
                onClick={copyToClipboard}
                className="text-[10px] text-[var(--accent-rust)] hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "COPIED" : "COPY TEXT"}</span>
              </button>
            </div>

            <div className="p-3.5 rounded bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs font-mono-custom text-[var(--text-muted)] leading-relaxed select-all">
              "{dmText}"
            </div>
          </div>

          {/* Step 3: Direct DM Buttons */}
          <div className="space-y-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={copyToClipboard}
              className="w-full py-3 px-4 bg-[var(--text-ink)] text-[var(--bg-raw)] hover:bg-[var(--accent-rust)] hover:text-white font-mono-custom text-xs uppercase tracking-widest font-bold rounded transition-all flex items-center justify-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>SEND VIA INSTAGRAM DM</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 border border-[var(--border-subtle)] hover:border-[var(--text-ink)] text-[var(--text-ink)] font-mono-custom text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-500" />
              <span>SEND VIA WHATSAPP</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            <button
              onClick={copyToClipboard}
              className="w-full py-2.5 text-[11px] font-mono-custom text-[var(--text-muted)] hover:text-[var(--text-ink)] border border-dashed border-[var(--border-subtle)] rounded transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED TO CLIPBOARD!" : "COPY MESSAGE TO PASTE ANYWHERE"}</span>
            </button>
          </div>

          {/* Reservation simulated feedback */}
          {reservedStatus && (
            <div className="p-4 rounded-lg bg-[var(--accent-rust)]/10 border border-[var(--accent-rust)]/30 text-xs font-mono-custom text-[var(--accent-rust)] space-y-1 animate-fade-in">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                HOLD CONFIRMED IN CACHE
              </div>
              <p className="text-[11px] text-[var(--text-muted)]">
                Please complete sending your message via Instagram or WhatsApp so we can tag your physical numbered certificate in the studio.
              </p>
            </div>
          )}
        </div>

        {/* Footer Notes */}
        <div className="pt-6 border-t border-[var(--border-subtle)] text-[10px] font-mono-custom text-[var(--text-dim)] space-y-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-rust)]" />
            <span>HAND-PULLED IN STUDIO • NUMBERED CERTIFICATE INCLUDED</span>
          </div>
          <p>
            Because we screen-print every piece manually, please allow 3-5 days for ink curing, edge inspection, and hand-numbering before dispatch.
          </p>
        </div>

      </div>
    </div>
  );
}
