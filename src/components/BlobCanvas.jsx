import React, { useEffect, useRef } from 'react';

/**
 * Boundary-free Dusty & Sparkly Magnetic Ferrofluid Simulation
 * Features a tactile "Pinch Effect":
 * - Pressing/dragging (or hovering closely) pinches the fluid into a narrow neck and needle-point cone.
 * - Squeezes particles radially toward the magnetic axis (Z-pinch constriction).
 * - Releasing snaps the fluid back with elastic viscous recoil.
 */
export default function BlobCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle Generation: ~4,500 fine dusty particles
    const NUM_PARTICLES = 4500;
    const particles = [];

    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < NUM_PARTICLES; i++) {
      const theta = 2 * Math.PI * i / phi;
      const u = (i / NUM_PARTICLES) * 2 - 1; // -1 to 1
      const lat = Math.asin(u);

      const rand = Math.random();
      let type; // 'core', 'surface', 'halo', 'mote'
      let layerRad;
      let baseSize;

      if (rand < 0.35) {
        // Core dense fluid
        type = 'core';
        layerRad = 0.15 + Math.random() * 0.45;
        baseSize = 0.5 + Math.random() * 0.9;
      } else if (rand < 0.72) {
        // Viscous surface & spiking layer
        type = 'surface';
        layerRad = 0.65 + Math.random() * 0.35;
        baseSize = 0.6 + Math.random() * 1.1;
      } else if (rand < 0.90) {
        // Near-field magnetic dust halo
        type = 'halo';
        layerRad = 1.05 + Math.random() * 0.55;
        baseSize = 0.4 + Math.random() * 0.8;
      } else {
        // Ambient drifting cosmic dust motes
        type = 'mote';
        layerRad = 1.6 + Math.random() * 1.2;
        baseSize = 0.3 + Math.random() * 0.6;
      }

      const nx = Math.cos(lat) * Math.cos(theta);
      const ny = Math.sin(lat);
      const nz = Math.cos(lat) * Math.sin(theta);

      const sparkleSpeed = 0.5 + Math.random() * 1.0;
      const sparklePhase = Math.random() * Math.PI * 2;
      const orbitSpeed = (0.05 + Math.random() * 0.15) * (Math.random() > 0.5 ? 1 : -1);

      particles.push({
        nx, ny, nz,
        theta, lat,
        baseR: layerRad,
        type,
        baseSize,
        sparkleSpeed,
        sparklePhase,
        orbitSpeed,
        // Physics state
        vx: 0,
        vy: 0,
        vz: 0,
        dispX: 0,
        dispY: 0,
        dispZ: 0,
      });
    }

    // Magnet (Cursor) & Pinch State
    const magnet = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      targetStrength: 0,
      isPinching: false,
      pinchAmount: 0,
      releasePulse: 0,
    };

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      magnet.targetX = e.clientX - cx;
      magnet.targetY = e.clientY - cy;

      const dist = Math.hypot(magnet.targetX, magnet.targetY);
      const maxDim = Math.max(window.innerWidth, window.innerHeight);

      // Smooth magnetic falloff
      magnet.targetStrength = Math.max(0.2, Math.min(1.8, 1.6 / (1 + (dist / (maxDim * 0.28)) * 0.9)));
    };

    const handlePointerDown = (e) => {
      magnet.isPinching = true;
      handleMouseMove(e);
    };

    const handlePointerUp = () => {
      if (magnet.isPinching) {
        magnet.isPinching = false;
        // Release snap recoil
        magnet.releasePulse = 1.0;
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        magnet.isPinching = true;
        handleMouseMove(e.touches[0]);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMouseMove(e.touches[0]);
      }
    };

    const handleTouchEnd = () => {
      handlePointerUp();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    let rotX = 0;
    let rotY = 0;
    let time = 0;

    const render = () => {
      time += 0.005;

      // Cursor & Pinch Interpolation
      magnet.x += (magnet.targetX - magnet.x) * 0.055;
      magnet.y += (magnet.targetY - magnet.y) * 0.055;
      magnet.strength += (magnet.targetStrength - magnet.strength) * 0.05;

      const targetPinch = magnet.isPinching ? 1.0 : 0.0;
      magnet.pinchAmount += (targetPinch - magnet.pinchAmount) * 0.12;
      magnet.releasePulse *= 0.91;

      // Base fluid drift
      rotX += (Math.sin(time * 0.15) * 0.08 - rotX) * 0.015;
      rotY += 0.0008;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.16;

      // Magnetic vector in 2D screen plane
      const magDist = Math.hypot(magnet.x, magnet.y) || 1;
      const magDirX = magnet.x / magDist;
      const magDirY = magnet.y / magDist;

      // Total magnetic influence factor (amplified during pinch)
      const pinchMultiplier = 1.0 + magnet.pinchAmount * 1.5;
      const currentMagnetPower = (magnet.strength * pinchMultiplier) + magnet.releasePulse * 0.6;

      const projectedDots = [];

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particles[i];

        // 3D Spherical Coordinates with subtle ambient orbital drift
        let currentTheta = p.theta;
        if (p.type === 'halo' || p.type === 'mote') {
          currentTheta += time * 0.02 * p.orbitSpeed;
        }

        const baseNx = Math.cos(p.lat) * Math.cos(currentTheta);
        const baseNy = Math.sin(p.lat);
        const baseNz = Math.cos(p.lat) * Math.sin(currentTheta);

        let bx = baseNx * baseRadius;
        let by = baseNy * baseRadius;
        let bz = baseNz * baseRadius;

        // 3D rotation
        let x1 = bx * cosY - bz * sinY;
        let z1 = bx * sinY + bz * cosY;
        let y1 = by;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const normDist = Math.hypot(x2, y2, z2) || 1;
        const dirX = x2 / normDist;
        const dirY = y2 / normDist;
        const dirZ = z2 / normDist;

        // Facing the magnetic pole
        const dotMag = dirX * magDirX + dirY * magDirY;
        const facingMagnet = Math.max(0, dotMag);

        // 1. Organic Surface Fluid Waves
        const wave = Math.sin(dirX * 3.0 + time * 0.4) * Math.cos(dirY * 3.0 + time * 0.3) * 0.05;
        let fluidRadius = baseRadius * p.baseR * (1 + wave);

        // 2. Ferrofluid Bulge & Streamers stretching toward magnet
        if (p.type === 'core') {
          fluidRadius *= (1 + facingMagnet * currentMagnetPower * 0.35);
        } else if (p.type === 'surface') {
          fluidRadius *= (1 + facingMagnet * currentMagnetPower * 0.65);
        } else if (p.type === 'halo') {
          fluidRadius *= (1 + facingMagnet * currentMagnetPower * 0.95);
        } else {
          fluidRadius *= (1 + facingMagnet * currentMagnetPower * 1.35);
        }

        // 3. Sharp Rosensweig Spikes (narrower and sharper during pinch)
        let spikeDeform = 0;
        if (p.type === 'surface' || (p.type === 'halo' && facingMagnet > 0.3)) {
          const sPower = 4.5 + magnet.pinchAmount * 3.0;
          const s1 = Math.pow(Math.abs(Math.sin(p.theta * 5.0 + dirX * 2.5 + time * 0.25)), sPower);
          const s2 = Math.pow(Math.abs(Math.cos(p.lat * 5.0 + dirY * 2.5 - time * 0.2)), sPower);
          const spikeShape = (s1 + s2) * 0.5;

          const spikeIntensity = Math.pow(facingMagnet, 1.2 + magnet.pinchAmount * 0.6) * currentMagnetPower * 1.2;
          const ambientSpike = 0.12 * currentMagnetPower;
          spikeDeform = spikeShape * (spikeIntensity + ambientSpike) * baseRadius;
        }

        // Base target coordinate
        let targetPosX = dirX * (fluidRadius + spikeDeform);
        let targetPosY = dirY * (fluidRadius + spikeDeform);
        let targetPosZ = dirZ * (fluidRadius + spikeDeform * 0.7);

        // 4. PINCH EFFECT (Radial constriction toward the magnetic axis)
        if (facingMagnet > 0.05 && (magnet.pinchAmount > 0.02 || facingMagnet > 0.5)) {
          // Projection along the magnetic line (0 at center, 1 at magnet cursor)
          const dotAlongAxis = (targetPosX * magDirX + targetPosY * magDirY);
          const normAxisPos = Math.max(0, dotAlongAxis / magDist);

          // Transverse distance from the central magnetic axis
          const perpX = targetPosX - dotAlongAxis * magDirX;
          const perpY = targetPosY - dotAlongAxis * magDirY;

          // Pinch squeeze: greatest waist constriction along the middle/tip
          const pinchStrength = Math.min(1.0, normAxisPos * 1.4) * (0.35 + magnet.pinchAmount * 0.65);
          const constriction = Math.max(0.15, 1.0 - pinchStrength);

          // Constrict perpendicular coordinates
          targetPosX = dotAlongAxis * magDirX + perpX * constriction;
          targetPosY = dotAlongAxis * magDirY + perpY * constriction;

          // Pull tip forward along magnetic beam
          if (magnet.pinchAmount > 0.02) {
            targetPosX += magDirX * (normAxisPos * magnet.pinchAmount * baseRadius * 0.85);
            targetPosY += magDirY * (normAxisPos * magnet.pinchAmount * baseRadius * 0.85);
          }
        }

        // 5. Cursor Magnetic Attraction Dynamics
        const currentScreenX = cx + targetPosX + p.dispX;
        const currentScreenY = cy + targetPosY + p.dispY;

        const cursorCanvasX = cx + magnet.x;
        const cursorCanvasY = cy + magnet.y;

        const distToCursor = Math.hypot(currentScreenX - cursorCanvasX, currentScreenY - cursorCanvasY) || 1;
        const attractionReach = Math.min(width, height) * 0.85;

        if (distToCursor < attractionReach) {
          const pullRatio = (1 - distToCursor / attractionReach);
          const typeMultiplier = p.type === 'mote' ? 2.4 : (p.type === 'halo' ? 2.0 : (p.type === 'surface' ? 1.6 : 0.8));
          const force = Math.pow(pullRatio, 1.4) * currentMagnetPower * typeMultiplier * (1.8 + magnet.pinchAmount * 1.5);

          const angle = Math.atan2(cursorCanvasY - currentScreenY, cursorCanvasX - currentScreenX);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
          p.vz += dirZ * force * 0.3;
        }

        // Release Snap Recoil
        if (magnet.releasePulse > 0.05) {
          const recoil = magnet.releasePulse * (facingMagnet * 7.5 + 2.0);
          p.vx -= magDirX * recoil * 0.7;
          p.vy -= magDirY * recoil * 0.7;
          p.vz += (Math.random() - 0.5) * recoil;
        }

        // Viscous spring recoil & damping
        p.vx *= 0.87;
        p.vy *= 0.87;
        p.vz *= 0.87;

        p.dispX += p.vx;
        p.dispY += p.vy;
        p.dispZ += p.vz;

        p.dispX *= 0.91;
        p.dispY *= 0.91;
        p.dispZ *= 0.91;

        const finalX = targetPosX + p.dispX;
        const finalY = targetPosY + p.dispY;
        const finalZ = targetPosZ + p.dispZ;

        // 6. 3D Camera Perspective
        const cameraDist = baseRadius * 4.5;
        const perspective = cameraDist / (cameraDist - finalZ);

        const projX = cx + finalX * perspective;
        const projY = cy + finalY * perspective;

        // 7. Dusty Texture & Subtle Twinkling Sparkle Shading
        const depthNorm = Math.max(0, Math.min(1, (finalZ + baseRadius * 1.5) / (baseRadius * 3.0)));
        
        const sparkleVal = (Math.sin(time * p.sparkleSpeed + p.sparklePhase) + 1) * 0.5;
        const isSpikeTip = (spikeDeform > baseRadius * 0.18) && (facingMagnet > 0.35);
        const isPinchFocus = magnet.pinchAmount > 0.3 && facingMagnet > 0.7;

        let dotRadius = p.baseSize * (0.65 + depthNorm * 0.6) * perspective;
        let alpha = 0.18 + depthNorm * 0.55;
        let brightness = 175 + Math.floor(depthNorm * 65);

        if (p.type === 'mote') {
          alpha = 0.12 + sparkleVal * 0.45;
          brightness = 190 + Math.floor(sparkleVal * 65);
          dotRadius *= 0.85;
        } else if (p.type === 'halo') {
          alpha = 0.22 + sparkleVal * 0.4;
          brightness = 180 + Math.floor(sparkleVal * 55);
        } else if (isSpikeTip || isPinchFocus) {
          // Intense glinting when pinched or at spike tips
          dotRadius *= (1.25 + magnet.pinchAmount * 0.35);
          alpha = Math.min(1.0, 0.8 + sparkleVal * 0.2);
          brightness = 255;
        } else {
          alpha = Math.min(0.9, alpha + sparkleVal * 0.18);
          brightness = Math.min(255, brightness + Math.floor(sparkleVal * 25));
        }

        projectedDots.push({
          x: projX,
          y: projY,
          z: finalZ,
          radius: Math.max(0.35, dotRadius),
          alpha,
          brightness,
        });
      }

      // Depth sorting
      projectedDots.sort((a, b) => a.z - b.z);

      // Render Dots
      for (let i = 0; i < projectedDots.length; i++) {
        const dot = projectedDots[i];

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

        if (dot.brightness >= 250) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha})`;
        } else {
          ctx.fillStyle = `rgba(${dot.brightness}, ${dot.brightness}, ${dot.brightness}, ${dot.alpha})`;
        }
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="work__blob"
      aria-label="Interactive Dusty Magnetic Ferrofluid with Pinch Effect"
    />
  );
}
