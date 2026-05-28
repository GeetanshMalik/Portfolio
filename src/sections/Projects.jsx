import { useState } from 'react';
import { audioEngine } from '../components/SoundToggle';

const projectsList = [
  {
    title: 'NEBULA PORTAL',
    tech: ['React Three Fiber', 'GLSL Shaders', 'GSAP'],
    desc: 'An immersive 3D space flight simulator that renders real-time procedurally generated galaxies and portals using custom noise fragment shaders.',
    accent: '#ff007f'
  },
  {
    title: 'HOLO OS',
    tech: ['Three.js', 'Web Audio API', 'React'],
    desc: 'A browser-based retro-futuristic operating system mockup equipped with live synth instruments, interactive 3D folders, and spatial terminal.',
    accent: '#00f0ff'
  },
  {
    title: 'ORBITAL LEDGER',
    tech: ['WebGL', 'Chart.js', 'CSS Grid'],
    desc: 'A finance visualizer projecting transactions onto a rotating 3D globe with interactive particle streams linking global commerce hubs.',
    accent: '#f59e0b'
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const handleSelect = (index) => {
    if (index === activeProject) return;
    audioEngine.playSweep();
    setActiveProject(index);
  };

  return (
    <div>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-magenta)',
        fontWeight: '700',
        marginBottom: '10px'
      }} className="text-glow-magenta">
        [ LOG_02 // SYSTEM_ARCHIVES ]
      </p>
      
      <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>
        SELECTED <span className="bg-gradient-cosmic">WORKS</span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        {/* Project Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {projectsList.map((proj, idx) => (
            <button
              key={proj.title}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => audioEngine.playBlip(700, 0.03)}
              style={{
                background: idx === activeProject ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                border: 'none',
                borderLeft: `3px solid ${idx === activeProject ? proj.accent : 'rgba(255, 255, 255, 0.1)'}`,
                color: idx === activeProject ? '#fff' : 'var(--text-secondary)',
                padding: '15px',
                textAlign: 'left',
                fontFamily: 'Outfit',
                fontSize: '14px',
                fontWeight: '700',
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                pointerEvents: 'auto'
              }}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* Project Detail Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '15px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '220px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {projectsList[activeProject].tech.map(t => (
                <span 
                  key={t}
                  style={{
                    fontSize: '10px',
                    fontFamily: 'Outfit',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '3px 10px',
                    borderRadius: '10px',
                    color: projectsList[activeProject].accent
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            
            <p style={{ 
              color: 'var(--text-primary)', 
              fontSize: '15px',
              lineHeight: '1.6' 
            }}>
              {projectsList[activeProject].desc}
            </p>
          </div>

          <a 
            href="#contact"
            onMouseEnter={() => audioEngine.playBlip(900, 0.05)}
            onClick={() => audioEngine.playBlip(1200, 0.1)}
            style={{
              color: '#fff',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              marginTop: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              alignSelf: 'flex-start',
              pointerEvents: 'auto'
            }}
          >
            REQUEST COMPILE / LAUNCH DEMO 
            <span style={{ color: projectsList[activeProject].accent }}>➔</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
