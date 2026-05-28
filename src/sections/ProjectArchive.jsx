import { archivedProjects } from '../data/projects';
import { audioEngine } from '../components/SoundToggle';
import { useState } from 'react';

const ProjectArchive = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1050px', margin: '0 auto' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-magenta)',
        fontWeight: '800',
        marginBottom: '12px'
      }} className="text-glow-magenta">
        [ SYSTEM_ARCHIVE // CATALOG_REGISTRY ]
      </p>
      
      <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', letterSpacing: '-0.02em', color: '#ffffff' }}>
        Project Galaxy
      </h2>

      <p style={{ 
        fontSize: '14.5px', 
        color: 'var(--text-secondary)', 
        lineHeight: '1.6', 
        marginBottom: '32px',
        maxWidth: '700px'
      }}>
        A comprehensive listing of applications, experiments, and systems built throughout my engineering journey, incorporating both resume flagships and independent utilities.
      </p>

      {/* Grid console of archived items without scrollbar */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '12px',
        pointerEvents: 'auto',
        width: '100%'
      }}>
        {archivedProjects.map((proj, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={proj.id || proj.name}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                audioEngine.playBlip(950, 0.02);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                background: 'rgba(10, 10, 16, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${isHovered ? proj.color : 'rgba(255, 255, 255, 0.06)'}`,
                borderRadius: '10px',
                padding: '16px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
                transform: isHovered ? 'translateY(-4px) scale(1.015)' : 'translateY(0) scale(1)',
                boxShadow: isHovered 
                  ? `0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px ${proj.color}20, inset 0 1px 0 rgba(255,255,255,0.08)` 
                  : '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '8px',
                height: '100%'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '6px' }}>
                  <span style={{
                    fontFamily: 'Outfit',
                    fontWeight: 800,
                    fontSize: '14px',
                    color: '#ffffff',
                    letterSpacing: '0.02em',
                    lineHeight: '1.2'
                  }}>{proj.name}</span>
                  <span style={{
                    fontSize: '8px',
                    color: proj.color,
                    background: `${proj.color}15`,
                    border: `1px solid ${proj.color}30`,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontFamily: 'Outfit',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    whiteSpace: 'nowrap'
                  }}>{proj.category}</span>
                </div>
                
                <p style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.45',
                  marginBottom: '8px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>{proj.overview || proj.desc}</p>
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                {/* Tech badges */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '4px',
                  marginBottom: '0px'
                }}>
                  {proj.tech.slice(0, 4).map((t) => (
                    <span key={t} style={{
                      fontSize: '8.5px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '1px 5px',
                      borderRadius: '3px',
                      fontFamily: 'monospace'
                    }}>{t}</span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span style={{
                      fontSize: '8.5px',
                      color: 'rgba(255, 255, 255, 0.35)',
                      padding: '1px 3px',
                      fontFamily: 'monospace'
                    }}>+{proj.tech.length - 4}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectArchive;
