import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function AcquireModal({ item, onClose }) {
  const [selectedSize, setSelectedSize] = useState('L');
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const title = item.title || item.name || "Figure Map Edition";
  const dmText = `Hey Figure Map, I'd like to acquire [${title}] in Size: ${selectedSize}. Please send acquisition coordinates.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dmText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(dmText)}`;
  const instagramUrl = `https://instagram.com/direct/inbox/`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0a0a0a] text-[#d9d9d9] border border-[var(--line)] rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[var(--line)] pb-4">
          <div>
            <div className="text-[10px] font-mono-custom text-[var(--ink-dim)] uppercase tracking-wider">
              EDITION ACQUISITION
            </div>
            <h2 className="text-2xl font-serif-custom text-[#d9d9d9] mt-1">{title}</h2>
          </div>
          <button onClick={onClose} className="text-[#888] hover:text-[#fff] p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview */}
        {(item.image || item.cover) && (
          <div className="aspect-[16/10] overflow-hidden rounded-sm bg-[#111] border border-[var(--line)]">
            <img 
              src={item.image || item.cover} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Size Selection */}
        <div className="space-y-2">
          <div className="text-xs font-mono-custom text-[var(--ink-dim)] uppercase">
            CHOOSE SILHOUETTE SIZE (OVERSIZED BOXY CUT)
          </div>
          <div className="grid grid-cols-5 gap-2">
            {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`py-2 text-xs font-mono-custom border transition-all ${selectedSize === sz ? 'bg-[#d9d9d9] text-[#090909] font-bold border-[#d9d9d9]' : 'border-[var(--line)] text-[#888] hover:border-[#d9d9d9] hover:text-[#d9d9d9]'}`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Preformatted DM text */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono-custom">
            <span className="text-[var(--ink-dim)]">ORDER MESSAGE</span>
            <button onClick={copyToClipboard} className="text-xs text-[var(--accent)] hover:underline flex items-center gap-1">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
          <div className="p-3 bg-[#141414] border border-[var(--line)] text-xs font-mono-custom text-[var(--ink-dim)] leading-relaxed select-all">
            "{dmText}"
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={copyToClipboard}
            className="w-full py-3 bg-[#d9d9d9] text-[#090909] hover:bg-white font-mono-custom text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>SEND VIA INSTAGRAM DM</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 border border-[var(--line)] hover:border-[#d9d9d9] font-mono-custom text-xs uppercase text-[#d9d9d9] transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-green-400" />
            <span>SEND VIA WHATSAPP</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="text-[10px] font-mono-custom text-[var(--ink-dim)] text-center">
          Every piece is hand-pulled through silkscreen in studio and numbered.
        </div>

      </div>
    </div>
  );
}
