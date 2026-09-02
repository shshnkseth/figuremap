import React, { useEffect, useRef } from 'react';

export default function EyeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600;
    };

    window.addEventListener('resize', handleResize);

    let mouse = { x: width / 2, y: height / 2 };
    let targetEye = { x: 0, y: 0 };
    let currentEye = { x: 0, y: 0 };
    let blinkProgress = 1; // 1 = open, 0 = closed
    let isBlinking = false;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - (rect.left + rect.width / 2);
      const clientY = e.clientY - (rect.top + rect.height / 2);
      
      const maxDist = rect.width / 2;
      targetEye.x = Math.max(-1, Math.min(1, clientX / maxDist));
      targetEye.y = Math.max(-1, Math.min(1, clientY / maxDist));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Periodic organic blink
    const triggerBlink = () => {
      isBlinking = true;
      setTimeout(() => {
        isBlinking = false;
      }, 160);
      setTimeout(triggerBlink, 3000 + Math.random() * 4000);
    };
    const blinkTimeout = setTimeout(triggerBlink, 2500);

    const render = () => {
      // Lerp pupil position
      currentEye.x += (targetEye.x - currentEye.x) * 0.08;
      currentEye.y += (targetEye.y - currentEye.y) * 0.08;

      if (isBlinking) {
        blinkProgress = Math.max(0.05, blinkProgress - 0.25);
      } else {
        blinkProgress = Math.min(1, blinkProgress + 0.18);
      }

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const eyeRadius = Math.min(width, height) * 0.44;

      ctx.save();
      ctx.translate(cx, cy);

      // Eye contour (Almond shape)
      ctx.beginPath();
      const eyeWidth = eyeRadius * 1.95;
      const eyeHeight = eyeRadius * 1.05 * blinkProgress;

      ctx.moveTo(-eyeWidth / 2, 0);
      ctx.bezierCurveTo(
        -eyeWidth / 4, -eyeHeight,
        eyeWidth / 4, -eyeHeight,
        eyeWidth / 2, 0
      );
      ctx.bezierCurveTo(
        eyeWidth / 4, eyeHeight,
        -eyeWidth / 4, eyeHeight,
        -eyeWidth / 2, 0
      );
      ctx.closePath();

      ctx.strokeStyle = '#D9D9D9';
      ctx.lineWidth = Math.max(2, width * 0.0035);
      ctx.stroke();

      // Clip inside eye for iris & pupil
      ctx.clip();

      // Iris center calculation
      const maxPupilOffset = eyeRadius * 0.38;
      const px = currentEye.x * maxPupilOffset;
      const py = currentEye.y * (maxPupilOffset * 0.65);
      const irisRadius = eyeRadius * 0.58;

      // Outer Iris Ring
      ctx.beginPath();
      ctx.arc(px, py, irisRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#D9D9D9';
      ctx.lineWidth = Math.max(1.5, width * 0.0025);
      ctx.stroke();

      // Concentric Iris Rings & Radial Spoke Lines (Meinhard Taxer graphic aesthetic)
      const rings = 4;
      for (let r = 1; r <= rings; r++) {
        ctx.beginPath();
        ctx.arc(px, py, (irisRadius * r) / (rings + 1), 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(217, 217, 217, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Radial spokes
      const spokes = 24;
      for (let i = 0; i < spokes; i++) {
        const angle = (i * Math.PI * 2) / spokes;
        const innerR = irisRadius * 0.32;
        const outerR = irisRadius * 0.98;
        ctx.beginPath();
        ctx.moveTo(px + Math.cos(angle) * innerR, py + Math.sin(angle) * innerR);
        ctx.lineTo(px + Math.cos(angle) * outerR, py + Math.sin(angle) * outerR);
        ctx.strokeStyle = 'rgba(217, 217, 217, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Pupil (Deep black with bright ring)
      const pupilRadius = irisRadius * 0.35;
      ctx.beginPath();
      ctx.arc(px, py, pupilRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#090909';
      ctx.fill();
      ctx.strokeStyle = '#D9D9D9';
      ctx.lineWidth = Math.max(2, width * 0.003);
      ctx.stroke();

      // Center Catchlight / Gaze glint
      ctx.beginPath();
      ctx.arc(px - pupilRadius * 0.35, py - pupilRadius * 0.35, pupilRadius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(blinkTimeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="work__eye" aria-label="Interactive Eye Animation" />;
}
