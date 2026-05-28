import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Html } from '@react-three/drei';
import * as THREE from 'three';
import { planetsData } from '../data/planets';
// flagshipProjects import removed since moons are no longer rendered in 3D
import { audioEngine } from './SoundToggle';

// Technical skills for Venus orbital stars (excluding soft skills)
const venusSkills = [
  { name: 'LangGraph', color: '#ff007f' },
  { name: 'RAG / AI', color: '#ff1b76' },
  { name: 'ChromaDB', color: '#8b5cf6' },
  { name: 'Next.js', color: '#0df0ff' },
  { name: 'React', color: '#38bdf8' },
  { name: 'React Native', color: '#f59e0b' },
  { name: 'Node.js', color: '#10b981' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Redis', color: '#ef4444' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git / GitHub', color: '#ffffff' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Python', color: '#38bdf8' }
];

// SVGs for technical skills
const SkillLogo = ({ name }) => {
  const style = { width: '16px', height: '16px', display: 'block' };
  switch (name) {
    case 'React':
    case 'React Native':
      return (
        <svg style={style} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="2.05" fill="#38bdf8"/>
          <g stroke="#38bdf8" strokeWidth="1">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'Next.js':
      return (
        <svg style={style} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M152.54 153.2L73.18 50.77V129.2H58V48H73.18L139.77 134.42C128.87 143.62 115 149.2 100 149.2C72.82 149.2 50.8 127.18 50.8 100C50.8 85 56.38 71.13 65.58 60.23L54.78 49.43C42.82 62.5 35.6 79.9 35.6 100C35.6 135.58 64.42 164.4 100 164.4C120.1 164.4 137.5 157.18 150.57 145.22L152.54 153.2ZM123.6 48H138.8V124.2H123.6V48Z" fill="#ffffff"/>
        </svg>
      );
    case 'Node.js':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm-1.5 15.5l-5-2.9v-5.8l5 2.9v5.8zm1.5-7.4l-5-2.9 5-2.9 5 2.9-5 2.9zm5 4.5l-5 2.9v-5.8l5-2.9v5.8z" fill="#10b981" opacity="0.8"/>
        </svg>
      );
    case 'FastAPI':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="#009688" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9h-6l3-7L5 15h6l-3 7z"/>
        </svg>
      );
    case 'Redis':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      );
    case 'Docker':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="#2496ed" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="10" width="3" height="3" rx="0.5"/>
          <rect x="6" y="10" width="3" height="3" rx="0.5"/>
          <rect x="10" y="10" width="3" height="3" rx="0.5"/>
          <rect x="6" y="6" width="3" height="3" rx="0.5"/>
          <path d="M2 15.5C2 17 6 18 12 18s10-1 10-2.5V13h-20v2.5z"/>
        </svg>
      );
    case 'Git / GitHub':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      );
    case 'LangGraph':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#ff007f" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="5" r="3" fill="#ff007f"/>
          <circle cx="5" cy="18" r="3"/>
          <circle cx="19" cy="18" r="3"/>
          <path d="M10 7.5L7 15.5M14 7.5L17 15.5M8 18h8" strokeLinecap="round"/>
        </svg>
      );
    case 'RAG / AI':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#ff1b76" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round"/>
          <path d="M9 9h6v6H9z" fill="#ff1b76" opacity="0.3"/>
          <path d="M9 12h6M12 9v6" strokeLinecap="round"/>
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" strokeLinecap="round"/>
        </svg>
      );
    case 'ChromaDB':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      );
    case 'MongoDB':
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#47a248" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1.5C12 1.5 6 7.5 6 12C6 16.5 12 22.5 12 22.5C12 22.5 18 16.5 18 12C18 7.5 12 1.5 12 1.5ZM12 18V6" strokeLinecap="round"/>
        </svg>
      );
    case 'Python':
      return (
        <svg style={style} viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 0C24.6 0 26.3 13.3 26.3 13.3L26.4 27.6H55.4V31.7H14.1C14.1 14.1 0 16 0 46C0 76 13 74 13 74L23.2 74V60C23.2 46.1 34.6 34.8 48.5 34.8H81.7C81.7 34.8 95.8 33 95.8 13.3C95.8 -6.4 75 0 55 0Z" fill="#38bdf8"/>
          <path d="M55 110C85.4 110 83.7 96.7 83.7 96.7L83.6 82.4H54.6V78.3H95.9C95.9 95.9 110 94 110 64C110 34 97 36 97 36L86.8 36V50C86.8 63.9 75.4 75.2 61.5 75.2H28.3C28.3 75.2 14.2 77 14.2 96.7C14.2 116.4 35 110 55 110Z" fill="#eab308"/>
        </svg>
      );
    default:
      return (
        <svg style={style} viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 18l6-6-6-6M8 6L2 12l6 6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
};

// Procedural Canvas Texture Generator — high detail realistic planetary surfaces
const generatePlanetTexture = (id, baseColor, secondColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  
  // Fill base color gradient (pole-to-equator gradient for depth)
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, secondColor || '#05050a');
  grad.addColorStop(0.3, baseColor);
  grad.addColorStop(0.7, baseColor);
  grad.addColorStop(1, secondColor || '#05050a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Helper: add procedural noise spots for surface roughness
  const addNoise = (count, minR, maxR, color) => {
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, minR + Math.random() * (maxR - minR), 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Helper: add horizontal atmospheric bands
  const addBands = (count, colors, bandHeight) => {
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = colors[i % colors.length];
      const y = (H / count) * i + (Math.random() - 0.5) * 6;
      const h = bandHeight + Math.random() * (bandHeight * 0.5);
      ctx.fillRect(0, y, W, h);
    }
  };

  // Draw specific texture maps based on planet characteristics
  if (id === 'sun') {
    // Dense solar plasma with granulation
    addNoise(120, 8, 60, 'rgba(255, 235, 150, 0.12)');
    addNoise(80, 15, 50, 'rgba(255, 100, 0, 0.15)');
    addNoise(40, 5, 20, 'rgba(255, 200, 80, 0.2)');
    // Solar flare hotspots
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, 40 + Math.random() * 30);
      radGrad.addColorStop(0, 'rgba(255, 255, 200, 0.35)');
      radGrad.addColorStop(1, 'rgba(255, 120, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(x - 70, y - 70, 140, 140);
    }
  } else if (id === 'mercury') {
    // Dense crater field with rim highlights
    addNoise(200, 2, 8, 'rgba(20, 20, 20, 0.25)');
    for (let i = 0; i < 80; i++) {
      const cx = Math.random() * W;
      const cy = Math.random() * H;
      const r = 3 + Math.random() * 14;
      // Dark crater basin
      ctx.fillStyle = 'rgba(30, 30, 30, 0.35)';
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      // Bright rim highlight
      ctx.strokeStyle = 'rgba(120, 120, 110, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx - 1, cy - 1, r, 0, Math.PI * 2); ctx.stroke();
    }
    addNoise(100, 1, 3, 'rgba(90, 85, 75, 0.15)');
  } else if (id === 'venus') {
    // Thick sulfuric cloud bands with turbulence
    addBands(20, [
      'rgba(255, 240, 180, 0.06)',
      'rgba(220, 190, 130, 0.08)',
      'rgba(200, 170, 100, 0.05)',
    ], 14);
    // Swirling cloud vortices
    ctx.strokeStyle = 'rgba(255, 245, 200, 0.06)';
    ctx.lineWidth = 18;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 28);
      ctx.bezierCurveTo(W * 0.25, i * 28 + 50, W * 0.75, i * 28 - 50, W, i * 28);
      ctx.stroke();
    }
    addNoise(60, 10, 35, 'rgba(210, 180, 120, 0.06)');
  } else if (id === 'earth') {
    // Ocean depth variation
    addNoise(40, 20, 60, 'rgba(15, 60, 120, 0.2)');
    // Large continent masses
    const continents = [
      { x: W * 0.25, y: H * 0.35, r: 70 },
      { x: W * 0.45, y: H * 0.3, r: 55 },
      { x: W * 0.7, y: H * 0.5, r: 80 },
      { x: W * 0.15, y: H * 0.65, r: 40 },
      { x: W * 0.85, y: H * 0.4, r: 50 },
    ];
    continents.forEach(c => {
      const cGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      cGrad.addColorStop(0, 'rgba(40, 130, 40, 0.6)');
      cGrad.addColorStop(0.6, 'rgba(60, 140, 50, 0.4)');
      cGrad.addColorStop(1, 'rgba(30, 100, 30, 0)');
      ctx.fillStyle = cGrad;
      ctx.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
    });
    // Smaller land patches
    addNoise(25, 12, 30, 'rgba(50, 130, 45, 0.35)');
    // Mountain highlands
    addNoise(15, 5, 12, 'rgba(110, 90, 60, 0.3)');
    // Scattered cloud wisps
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 10;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      const y = Math.random() * H;
      ctx.moveTo(Math.random() * W * 0.3, y);
      ctx.bezierCurveTo(W * 0.3, y + 20, W * 0.6, y - 15, W * 0.7 + Math.random() * W * 0.3, y);
      ctx.stroke();
    }
    // Polar ice caps
    const polarGrad = ctx.createLinearGradient(0, 0, 0, 20);
    polarGrad.addColorStop(0, 'rgba(230, 240, 255, 0.8)');
    polarGrad.addColorStop(1, 'rgba(230, 240, 255, 0)');
    ctx.fillStyle = polarGrad;
    ctx.fillRect(0, 0, W, 20);
    const polarGrad2 = ctx.createLinearGradient(0, H - 20, 0, H);
    polarGrad2.addColorStop(0, 'rgba(230, 240, 255, 0)');
    polarGrad2.addColorStop(1, 'rgba(230, 240, 255, 0.7)');
    ctx.fillStyle = polarGrad2;
    ctx.fillRect(0, H - 20, W, 20);
  } else if (id === 'mars') {
    // Rust-red terrain variation
    addNoise(100, 5, 25, 'rgba(90, 25, 5, 0.3)');
    addNoise(60, 8, 35, 'rgba(70, 18, 3, 0.25)');
    // Olympus Mons style volcanic features
    for (let i = 0; i < 5; i++) {
      const cx = Math.random() * W;
      const cy = H * 0.3 + Math.random() * H * 0.4;
      const vGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      vGrad.addColorStop(0, 'rgba(50, 12, 2, 0.5)');
      vGrad.addColorStop(1, 'rgba(50, 12, 2, 0)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(cx - 30, cy - 30, 60, 60);
    }
    // Valles Marineris canyon streak
    ctx.strokeStyle = 'rgba(40, 10, 0, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(W * 0.2, H * 0.5);
    ctx.bezierCurveTo(W * 0.4, H * 0.48, W * 0.6, H * 0.52, W * 0.8, H * 0.5);
    ctx.stroke();
    // White polar caps
    const marsNorthGrad = ctx.createLinearGradient(0, 0, 0, 22);
    marsNorthGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    marsNorthGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = marsNorthGrad;
    ctx.fillRect(0, 0, W, 22);
    const marsSouthGrad = ctx.createLinearGradient(0, H - 18, 0, H);
    marsSouthGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    marsSouthGrad.addColorStop(1, 'rgba(255, 255, 255, 0.65)');
    ctx.fillStyle = marsSouthGrad;
    ctx.fillRect(0, H - 18, W, 18);
  } else if (id === 'jupiter') {
    // Dense multi-color horizontal gas bands
    addBands(30, [
      'rgba(160, 100, 50, 0.3)',
      'rgba(220, 170, 110, 0.2)',
      'rgba(255, 255, 255, 0.1)',
      'rgba(180, 120, 70, 0.25)',
      'rgba(140, 80, 40, 0.2)',
    ], 10);
    // Turbulent swirl details
    addNoise(50, 6, 20, 'rgba(100, 60, 20, 0.15)');
    // Great Red Spot storm
    const grsX = W * 0.62;
    const grsY = H * 0.6;
    const grsGrad = ctx.createRadialGradient(grsX, grsY, 0, grsX, grsY, 32);
    grsGrad.addColorStop(0, 'rgba(200, 50, 10, 0.9)');
    grsGrad.addColorStop(0.5, 'rgba(180, 45, 10, 0.6)');
    grsGrad.addColorStop(1, 'rgba(150, 40, 10, 0)');
    ctx.fillStyle = grsGrad;
    ctx.beginPath();
    ctx.ellipse(grsX, grsY, 32, 16, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (id === 'saturn') {
    // Pale gold gas bands
    addBands(20, [
      'rgba(220, 190, 130, 0.15)',
      'rgba(255, 255, 255, 0.06)',
      'rgba(200, 170, 100, 0.12)',
      'rgba(180, 150, 80, 0.1)',
    ], 14);
    addNoise(30, 10, 30, 'rgba(200, 175, 120, 0.08)');
  } else if (id === 'uranus') {
    // Subtle blue-green haze bands
    addBands(12, [
      'rgba(80, 140, 255, 0.08)',
      'rgba(100, 200, 220, 0.06)',
    ], 20);
    addNoise(20, 15, 40, 'rgba(90, 160, 255, 0.06)');
  } else if (id === 'neptune') {
    // Deep blue storm systems
    addBands(10, [
      'rgba(60, 60, 200, 0.1)',
      'rgba(100, 100, 255, 0.08)',
    ], 22);
    // Dark spots (storm analogues)
    for (let i = 0; i < 4; i++) {
      const sx = Math.random() * W;
      const sy = Math.random() * H;
      const sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 18);
      sGrad.addColorStop(0, 'rgba(20, 20, 80, 0.5)');
      sGrad.addColorStop(1, 'rgba(20, 20, 80, 0)');
      ctx.fillStyle = sGrad;
      ctx.fillRect(sx - 20, sy - 20, 40, 40);
    }
    addNoise(15, 5, 15, 'rgba(255, 255, 255, 0.08)');
  }

  // Global surface noise pass for all planets (adds realism grain)
  if (id !== 'sun') {
    addNoise(300, 1, 3, 'rgba(0, 0, 0, 0.04)');
    addNoise(150, 1, 2, 'rgba(255, 255, 255, 0.02)');
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
};

// Camera controller tracking scroll positions
const CameraController = ({ activeSection }) => {
  const { camera, size } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 10));
  const currentPos = useRef(new THREE.Vector3(0, 0, 20));

  useFrame(() => {
    let targetVector;
    let posVector;

    // Calculate aspect multiplier to push the camera back on narrow viewports
    const aspect = size.width / size.height;
    const aspectMultiplier = aspect < 1.25 ? 1.3 / aspect : 1.0;

    const activePlanet = planetsData.find(p => p.id === activeSection) || planetsData[0];
    const basePos = new THREE.Vector3(...activePlanet.position);
    
    let targetOffset;
    let cameraOffset;
    
    switch (activePlanet.id) {
      case 'sun':
        targetOffset = new THREE.Vector3(-1.8, 0, 0);
        cameraOffset = new THREE.Vector3(-1.8, 0.3, 8.5);
        break;
      case 'mercury':
        targetOffset = new THREE.Vector3(-1.5, 0, 0);
        cameraOffset = new THREE.Vector3(-1.5, 0.2, 4.2);
        break;
      case 'venus':
        targetOffset = new THREE.Vector3(0, 0, 0);
        cameraOffset = new THREE.Vector3(0, 0, 7.5);
        break;
      case 'earth':
        targetOffset = new THREE.Vector3(1.5, 0, 0);
        cameraOffset = new THREE.Vector3(1.5, 0.2, 5.8);
        break;
      case 'mars':
        targetOffset = new THREE.Vector3(-1.5, 0, 0);
        cameraOffset = new THREE.Vector3(-1.5, 0.2, 5.8);
        break;
      case 'jupiter':
        targetOffset = new THREE.Vector3(2.2, 0, 0);
        cameraOffset = new THREE.Vector3(2.2, 0.4, 9.5);
        break;
      case 'saturn':
        targetOffset = new THREE.Vector3(-2.5, 0, 0);
        cameraOffset = new THREE.Vector3(-2.5, 0.5, 10.5);
        break;
      case 'uranus':
        targetOffset = new THREE.Vector3(1.8, 0, 0);
        cameraOffset = new THREE.Vector3(1.8, 0.3, 7.0);
        break;
      case 'neptune':
        targetOffset = new THREE.Vector3(0, 0, 0);
        cameraOffset = new THREE.Vector3(0, 0.2, 7.0);
        break;
      default:
        targetOffset = new THREE.Vector3(0, 0, 0);
        cameraOffset = new THREE.Vector3(0, 0, 6.0);
    }
    
    cameraOffset.z = cameraOffset.z * aspectMultiplier;
    
    targetVector = basePos.clone().add(targetOffset);
    posVector = basePos.clone().add(cameraOffset);

    currentPos.current.lerp(posVector, 0.04);
    currentTarget.current.lerp(targetVector, 0.04);
    
    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
};

// Saturn rings
const SaturnRings = ({ color }) => {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.3, 0, 0]}>
      <ringGeometry args={[1.5, 2.7, 64]} />
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.4} 
        side={THREE.DoubleSide} 
        roughness={0.9}
      />
    </mesh>
  );
};

// Earth Moon
const EarthMoon = () => {
  const moonRef = useRef();
  const texture = useMemo(() => generatePlanetTexture('mercury', '#888888', '#333333'), []);

  useFrame((state) => {
    if (!moonRef.current) return;
    const time = state.clock.getElapsedTime();
    moonRef.current.position.set(
      Math.sin(time * 0.8) * 1.4,
      Math.cos(time * 0.8) * 0.3,
      Math.cos(time * 0.8) * 1.4
    );
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshStandardMaterial map={texture} roughness={0.9} />
    </mesh>
  );
};

// Constellation lines data in deep background space
const constellationsData = [
  {
    name: 'Ursa Major',
    color: '#0df0ff',
    points: [
      [-18, 8, -97],
      [-15, 7, -97],
      [-14, 5, -97],
      [-14, 3, -97],
      [-17, 2, -97],
      [-19, 4, -97],
      [-17, 5, -97]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 2]
    ]
  },
  {
    name: 'Orion',
    color: '#ff007f',
    points: [
      [15, 6, -128],
      [18, 7, -128],
      [17, 3, -128],
      [14, 2, -128],
      [16, -2, -128],
      [19, -1, -128],
      [15.5, 3.2, -128],
      [16.5, 3.0, -128],
      [17.5, 2.8, -128]
    ],
    connections: [
      [0, 1], [0, 6], [1, 8], [6, 7], [7, 8], [6, 4], [8, 5]
    ]
  },
  {
    name: 'Cassiopeia',
    color: '#8b5cf6',
    points: [
      [-10, -5, -148],
      [-7, -3, -148],
      [-8, -7, -148],
      [-4, -6, -148],
      [-2, -9, -148]
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4]
    ]
  }
];

// Distant glowing exoplanets in deep space
const DeepSpaceExoplanet = ({ position, size, color, name, baseColor, secondColor }) => {
  const meshRef = useRef();
  const texture = useMemo(() => generatePlanetTexture(name, baseColor, secondColor), [name, baseColor, secondColor]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = time * 0.01;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.8}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
      {/* Outer glow aura */}
      <mesh>
        <sphereGeometry args={[size * 1.15, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Rocky asteroid component tumbling in deep space
const Asteroid = ({ data }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * data.rotSpeedX;
    ref.current.rotation.y = time * data.rotSpeedY;
    ref.current.rotation.z = time * data.rotSpeedZ;
    
    // Slow drifting bobbing
    ref.current.position.y = data.y + Math.sin(time * 0.15 + data.seed) * 0.4;
    ref.current.position.x = data.x + Math.cos(time * 0.08 + data.seed) * 0.2;
  });

  return (
    <mesh ref={ref} position={[data.x, data.y, data.z]}>
      <dodecahedronGeometry args={[data.size, 1]} />
      <meshStandardMaterial 
        color="#2b2b30" 
        roughness={0.95} 
        metalness={0.1}
      />
    </mesh>
  );
};

// Generates drifting asteroid field in the background
const DeepSpaceAsteroids = () => {
  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 35; i++) {
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? -16 - Math.random() * 12 : 16 + Math.random() * 12;
      const y = -10 + Math.random() * 20;
      const z = -75 - Math.random() * 90; // Spread from Jupiter area down to Neptune area
      const size = 0.12 + Math.random() * 0.38;
      const speedX = (Math.random() - 0.5) * 0.02;
      const speedY = (Math.random() - 0.5) * 0.02;
      const rotSpeedX = 0.05 + Math.random() * 0.2;
      const rotSpeedY = 0.05 + Math.random() * 0.2;
      const rotSpeedZ = 0.05 + Math.random() * 0.2;
      const seed = Math.random() * 100;
      arr.push({ x, y, z, size, speedX, speedY, rotSpeedX, rotSpeedY, rotSpeedZ, seed });
    }
    return arr;
  }, []);

  return (
    <group>
      {asteroids.map((ast, idx) => (
        <Asteroid key={idx} data={ast} />
      ))}
    </group>
  );
};

// Main wrapper for deep space background items
const DeepSpaceBackground = () => {
  return (
    <group>
      {/* Kepler-186f (orange-red) - near Jupiter */}
      <DeepSpaceExoplanet
        position={[-18, 6, -80]}
        size={0.65}
        color="#ff5500"
        name="kepler"
        baseColor="#aa3300"
        secondColor="#220500"
      />
      {/* Gliese-581g (cyan/teal) - near Saturn */}
      <DeepSpaceExoplanet
        position={[20, -6, -102]}
        size={0.8}
        color="#00ffcc"
        name="gliese"
        baseColor="#006655"
        secondColor="#001111"
      />
      {/* LTT-1445Ab (purple/magenta) - near Uranus */}
      <DeepSpaceExoplanet
        position={[-22, -10, -125]}
        size={0.7}
        color="#ee00ff"
        name="ltt"
        baseColor="#660077"
        secondColor="#110022"
      />
      {/* Kepler-22b (emerald green) - near Neptune */}
      <DeepSpaceExoplanet
        position={[18, 10, -148]}
        size={0.75}
        color="#39ff14"
        name="kepler22b"
        baseColor="#007722"
        secondColor="#002205"
      />

      {/* Constellation line networks */}
      {constellationsData.map((constellation) => (
        <group key={constellation.name}>
          {constellation.connections.map(([p1, p2], edgeIdx) => (
            <Line
              key={edgeIdx}
              points={[
                constellation.points[p1],
                constellation.points[p2]
              ]}
              color={constellation.color}
              lineWidth={0.5}
              transparent
              opacity={0.2}
            />
          ))}
          {constellation.points.map((pt, ptIdx) => (
            <mesh key={ptIdx} position={pt}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial
                color={constellation.color}
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Drifting Asteroid Belt */}
      <DeepSpaceAsteroids />
    </group>
  );
};

// Orbiting Tech Star (Meteoroid) for Venus
const TechStar = ({ skill, index }) => {
  const starRef = useRef();
  const divRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!starRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Orbital rotation coordinates around Venus center
    const angle = time * 0.12 + (index * Math.PI * 2) / venusSkills.length;
    const radius = 2.4 + Math.sin(time * 0.3 + index) * 0.2; // Orbit breathing room

    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle * 1.5) * 0.3; // 3D vertical bobbing
    const z = Math.cos(angle) * radius;

    starRef.current.position.set(x, y, z);

    // Apply custom depth & occlusion directly to the DOM element
    if (divRef.current) {
      const isBehind = z < 0;
      const isOccludedByPlanet = isBehind && Math.abs(x) < 0.85 && Math.abs(y) < 0.6;
      
      if (isOccludedByPlanet) {
        // Smoothly fade out when sliding behind the planet body
        const fadeStart = 0.85;
        const opacity = Math.max(0, (Math.abs(x) - 0.45) / (fadeStart - 0.45));
        divRef.current.style.opacity = opacity;
        divRef.current.style.pointerEvents = 'none';
      } else {
        divRef.current.style.pointerEvents = 'auto';
        // Depth scale: background elements look smaller (scale 0.8) than foreground (scale 1.0)
        const scaleVal = 0.82 + ((z + radius) / (2 * radius)) * 0.18;
        
        divRef.current.style.transform = `scale(${hovered ? 1.08 : scaleVal})`;
        divRef.current.style.opacity = hovered ? 1 : (isBehind ? 0.45 : 0.95);
        divRef.current.style.borderColor = hovered ? skill.color : (isBehind ? 'rgba(255,255,255,0.05)' : `rgba(255,255,255,0.12)`);
        divRef.current.style.boxShadow = hovered 
          ? `0 0 15px ${skill.color}50, inset 0 1px 0 rgba(255,255,255,0.1)` 
          : '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)';
        // z-index: higher for foreground elements
        divRef.current.style.zIndex = isBehind ? 1 : 10;
      }
    }
  });

  return (
    <group ref={starRef}>
      {/* Tiny anchor point */}
      <mesh>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color={skill.color} transparent opacity={0.6} />
      </mesh>

      {/* HTML floating tag for the skill logo */}
      <Html distanceFactor={14} center>
        <div 
          ref={divRef}
          onMouseEnter={() => {
            setHovered(true);
            audioEngine.playBlip(900, 0.02);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOver={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'default';
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            background: 'rgba(10, 10, 16, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid rgba(255, 255, 255, 0.12)`,
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.02em',
            pointerEvents: 'auto',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
        >
          <SkillLogo name={skill.name} />
          <span>{skill.name}</span>
        </div>
      </Html>
    </group>
  );
};

// Planet Node
const PlanetNode = ({ data, active, onHover, children }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Cache canvas procedural texture to prevent rendering overhead
  const texture = useMemo(() => {
    if (data.id === 'sun') return generatePlanetTexture(data.id, '#ffaa00', '#cc3300');
    if (data.id === 'mercury') return generatePlanetTexture(data.id, '#6b6b6b', '#2d2d2d');
    if (data.id === 'venus') return generatePlanetTexture(data.id, '#cca76a', '#4a371c');
    if (data.id === 'earth') return generatePlanetTexture(data.id, '#206095', '#0f2c42');
    if (data.id === 'mars') return generatePlanetTexture(data.id, '#b33d0e', '#3d1203');
    if (data.id === 'jupiter') return generatePlanetTexture(data.id, '#bf8d4c', '#402a11');
    if (data.id === 'saturn') return generatePlanetTexture(data.id, '#cca55a', '#3d2b12');
    if (data.id === 'uranus') return generatePlanetTexture(data.id, '#5588ff', '#182b54');
    return generatePlanetTexture(data.id, '#3f37c9', '#120f4c');
  }, [data.id]);

  // Determine custom float speed & intensity based on planet ID and active state
  const floatSpeed = useMemo(() => {
    if (data.id === 'jupiter') return 0.12; // Jupiter floats extremely slow for easy moon clicking
    if (data.id === 'venus' && active) return 0.25; // Venus slows down when active
    return active ? 0.6 : 1.2; // All other planets slow down slightly when active
  }, [data.id, active]);

  const floatIntensity = useMemo(() => {
    if (data.id === 'jupiter') return 0.06; // Keep Jupiter extremely steady
    if (active) return 0.15; // Reduce bobbing when active to keep in frame
    return 0.35;
  }, [data.id, active]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    meshRef.current.scale.setScalar(
      1 + Math.sin(time * 1.5 + data.position[0]) * 0.03 + (hovered ? 0.08 : 0)
    );
    
    // Slow down rotation speed when active/selected
    const rotationSpeed = data.id === 'jupiter' ? 0.02 : (data.id === 'venus' && active ? 0.03 : (active ? 0.06 : 0.12));
    meshRef.current.rotation.y = time * rotationSpeed;
  });

  return (
    <Float floatIntensity={floatIntensity} speed={floatSpeed} rotationIntensity={0.15}>
      <group position={data.position}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(data.id);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover(null);
          }}
        >
          <sphereGeometry args={[data.size, 64, 64]} />
          {/* Sun material – bright, not affected by lighting */}
          {data.id === 'sun' ? (
            <meshBasicMaterial
              map={texture}
              color={data.color}
              toneMapped={false}
            />
          ) : (
            <meshStandardMaterial
              map={texture}
              roughness={0.85}
              metalness={0.08}
              emissive={"#000000"}
              emissiveIntensity={0}
            />
          )}

        </mesh>
        
        {/* Sun aura – bright additive halo */}
        {data.id === 'sun' && (
          <mesh scale={1.3}>
            <sphereGeometry args={[data.size * 1.05, 64, 64]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {data.hasRings && <SaturnRings color={data.color} />}
        
        {children}

        {/* Planet name label */}
        <Html distanceFactor={16} center position={[0, -data.size - 0.5, 0]}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.95)',
            background: 'rgba(4, 4, 6, 0.9)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            padding: '3px 8px',
            borderRadius: '4px',
            fontSize: '8.5px',
            fontFamily: 'Outfit',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: active || hovered ? 1 : 0.7,
            transform: `scale(${active || hovered ? 1.03 : 1})`,
            transition: 'all 0.2s ease',
            borderLeft: `2.5px solid ${data.color}`
          }}>
            {data.name}
          </div>
        </Html>
      </group>
    </Float>
  );
};

const Constellation = ({ activeSection }) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={2.2} />
      <directionalLight position={[-15, 10, 5]} intensity={1.2} />
      <directionalLight position={[5, -8, -10]} intensity={0.4} color="#334466" />

      {/* Deep space background elements */}
      <DeepSpaceBackground />

      {/* Render all individual planets */}
      {planetsData.map((planet) => (
        <PlanetNode
          key={planet.id}
          data={planet}
          active={activeSection === planet.id}
          onHover={setHoveredNode}
        >
          {planet.hasMoon && <EarthMoon />}
          
          {/* Orbiting Tech Stack Stars surrounding Venus */}
          {planet.id === 'venus' && 
            venusSkills.map((skill, idx) => (
              <TechStar 
                key={skill.name} 
                skill={skill} 
                index={idx} 
              />
            ))
          }
        </PlanetNode>
      ))}

      {/* Camera manager */}
      <CameraController activeSection={activeSection} />
    </>
  );
};

export default Constellation;
