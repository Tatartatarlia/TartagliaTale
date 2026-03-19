// src/components/ParticleEffect.jsx
import { useEffect, useRef } from 'react';
import '../styles/ParticleEffect.css';

export default function ParticleEffect() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    // 创建20个粒子
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(particle);
    }
  }, []);

  return <div className="particle-container" ref={containerRef}></div>;
}