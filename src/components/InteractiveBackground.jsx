import React, { useState, useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null); // Use ref for the effect to ensure clean destruction

  useEffect(() => {
    if (!effectRef.current && window.VANTA && vantaRef.current) {
      effectRef.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0a0a0a, // Slightly brighter black for visibility
        shininess: 15.0, // Added some subtle shimmer to make waves visible
        waveHeight: 12.0,
        waveSpeed: 0.6,
        zoom: 1.0,
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      id="vanta-bg"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        backgroundColor: '#050505', // Base fallback color
      }}
    />
  );
};

export default InteractiveBackground;
