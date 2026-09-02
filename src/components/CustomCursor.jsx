import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor({ cursorText, cursorVariant }) {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const animate = () => {
      // Smooth lerp trailing physics
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'transform' }}
    >
      {cursorText ? (
        <div className="px-3.5 py-1.5 rounded-full bg-[var(--text-ink)] text-[var(--bg-raw)] text-[10px] font-mono-custom tracking-widest uppercase font-bold shadow-2xl flex items-center gap-1.5 border border-[var(--border-active)] backdrop-blur-md animate-fade-in scale-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-rust)] animate-pulse"></span>
          <span>{cursorText}</span>
        </div>
      ) : cursorVariant === 'card' ? (
        <div className="w-10 h-10 rounded-full border border-[var(--accent-rust)] bg-[var(--accent-rust)]/20 backdrop-blur-sm flex items-center justify-center text-[9px] font-mono-custom text-white uppercase">
          VIEW
        </div>
      ) : (
        <div className="w-3 h-3 rounded-full bg-[var(--text-ink)] opacity-75 mix-blend-difference transition-transform duration-150"></div>
      )}
    </div>
  );
}
