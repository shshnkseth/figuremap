import React, { useState } from 'react';

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
      setTimeout(() => setShaking(false), 450);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white text-black flex items-center justify-center p-6">
      <div className={`w-full max-w-xs text-center ${shaking ? 'animate-shake' : ''}`}>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            autoFocus
            value={pin}
            onChange={(e) => {
              const val = e.target.value;
              setPin(val);
              if (error) setError(false);
              // Instant auto-unlock if typed
              if (val.trim().toLowerCase() === 'screen') {
                sessionStorage.setItem('figuremap_unlocked', 'true');
                onUnlock();
              }
            }}
            placeholder="enter pin"
            className="w-full bg-transparent border-b border-black/20 focus:border-black text-black py-2.5 px-2 text-center text-sm font-sans tracking-[0.25em] placeholder:text-black/30 placeholder:tracking-[0.2em] focus:outline-none transition-colors"
            style={{ fontFamily: "var(--text, 'Plus Jakarta Sans', sans-serif)" }}
          />
        </form>

        {error && (
          <div 
            className="text-[10px] tracking-widest text-black/50 mt-3 uppercase"
            style={{ fontFamily: "var(--micro, 'Space Mono', monospace)" }}
          >
            incorrect pin
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.35s ease-in-out both;
        }
      `}</style>
    </div>
  );
}
