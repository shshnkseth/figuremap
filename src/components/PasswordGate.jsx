import React, { useState } from 'react';
import { ArrowRight, Lock, KeyRound } from 'lucide-react';

export default function PasswordGate({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleanPin = pin.trim().toLowerCase();
    
    if (cleanPin === 'screen') {
      sessionStorage.setItem('figuremap_unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-[#090909] text-[#D9D9D9] flex flex-col items-center justify-center p-6 select-none">
      {/* Subtle Background Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Center Gate Card */}
      <div className={`relative z-10 w-full max-w-sm flex flex-col items-center text-center transition-transform duration-300 ${shaking ? 'animate-shake' : ''}`}>
        
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/images/logo-white.png"
            alt="FIGURE MAP"
            className="h-9 sm:h-11 w-auto object-contain mx-auto"
          />
        </div>

        {/* Security Meta */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#888] uppercase mb-4">
          <Lock className="w-3 h-3 text-[var(--accent,#D9532F)]" />
          <span>Restricted Access // Private Archive</span>
        </div>

        <p className="text-xs text-[#666] font-mono max-w-xs mb-8">
          This project is undisclosed. Enter key to view the archive.
        </p>

        {/* Password / PIN Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative flex items-center">
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(false);
              }}
              placeholder="ENTER PIN"
              className={`w-full bg-[#121212] border ${error ? 'border-red-500/80 text-red-400' : 'border-[#262626] focus:border-[#D9D9D9] text-[#D9D9D9]'} rounded-none py-3.5 px-4 font-mono text-sm tracking-[0.2em] placeholder:text-[#444] placeholder:tracking-widest focus:outline-none transition-colors text-center`}
            />
            <button
              type="submit"
              aria-label="Unlock archive"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#888] hover:text-[#FFF] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="text-[11px] font-mono text-red-500 mt-3 tracking-wider animate-fadeIn">
              ACCESS DENIED — INVALID PIN
            </div>
          )}
        </form>

        {/* Technical Stamp */}
        <div className="mt-16 text-[9px] font-mono text-[#444] tracking-widest uppercase">
          Figure Map © 2026 // St. Pölten &amp; Vienna
        </div>

      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out both;
        }
      `}</style>
    </div>
  );
}
