import { useState, useEffect, useRef } from 'react';
import { allProjects } from '../data/projects';
import { audioEngine } from '../components/SoundToggle';

const Flagships = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipingDir, setSwipingDir] = useState(null); // 'left', 'right', or null
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // Keyboard navigation for card deck
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle if in viewport/focused
      const el = document.getElementById('jupiter');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inViewport || isAnimating) return;

      if (e.key === 'ArrowRight') {
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft') {
        handleSwipe('left');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSwipingDir(direction);
    audioEngine.playSweep();

    // After animation finishes, change index and reset animation state
    setTimeout(() => {
      if (direction === 'right') {
        setCurrentIndex((prev) => (prev + 1) % allProjects.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + allProjects.length) % allProjects.length);
      }
      setSwipingDir(null);
      setIsAnimating(false);
    }, 450); // matches CSS transition time
  };

  // Touch Swipe Handlers for mobile responsiveness
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    const diff = touchStart.current - touchEnd.current;
    
    // Require minimum swipe threshold (e.g. 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSwipe('right'); // swiped left -> show next
      } else {
        handleSwipe('left'); // swiped right -> show prev
      }
    }
    // reset values
    touchStart.current = 0;
    touchEnd.current = 0;
  };

  return (
    <div 
      id="jupiter-deck-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '750px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        pointerEvents: 'auto'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <p style={{ 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          fontSize: '11px', 
          color: 'var(--color-cyan)',
          fontWeight: '800',
          marginBottom: '10px'
        }} className="text-glow-cyan">
          [ ORBITAL_DECK // TRANSMISSION_STATION ]
        </p>
        <h2 style={{ fontSize: '2.4rem', letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '8px' }}>
          Project Registry
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Swipe left/right or use controls to cycle through all 11 project nodes.
        </p>
      </div>

      {/* Cards Deck Container */}
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: '420px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none'
        }}
      >
        {allProjects.map((project, idx) => {
          // Calculate relative index position in the circular deck
          const diff = (idx - currentIndex + allProjects.length) % allProjects.length;
          
          // We only render/show the top 3 cards in the stack. Others are hidden behind.
          const isTopCard = diff === 0;
          const isSecondCard = diff === 1;
          const isThirdCard = diff === 2;
          const isVisible = isTopCard || isSecondCard || isThirdCard;

          if (!isVisible && !(isAnimating && idx === currentIndex)) return null;

          // Animations and styling offsets
          let transformStyle = '';
          let opacityStyle = 0;
          let zIndexStyle = 0;

          if (isTopCard) {
            opacityStyle = 1;
            zIndexStyle = 30;
            if (isAnimating) {
              // Fly off animation
              transformStyle = swipingDir === 'right' 
                ? 'translateX(140%) rotate(18deg) scale(0.95)' 
                : 'translateX(-140%) rotate(-18deg) scale(0.95)';
              opacityStyle = 0.2;
            } else {
              transformStyle = 'translateX(0) rotate(0) scale(1)';
            }
          } else if (isSecondCard) {
            opacityStyle = 0.75;
            zIndexStyle = 20;
            // Slide up if top card is flying off
            transformStyle = isAnimating 
              ? 'translateY(0) scale(1)' 
              : 'translateY(16px) scale(0.96)';
          } else if (isThirdCard) {
            opacityStyle = 0.45;
            zIndexStyle = 10;
            transformStyle = isAnimating 
              ? 'translateY(16px) scale(0.96)' 
              : 'translateY(32px) scale(0.92)';
          }

          return (
            <div
              key={project.id || project.name}
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: '560px',
                height: '380px',
                background: 'rgba(12, 12, 20, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${isTopCard ? project.color : 'rgba(255, 255, 255, 0.08)'}`,
                borderRadius: '16px',
                padding: '30px',
                boxShadow: isTopCard 
                  ? `0 20px 40px rgba(0, 0, 0, 0.75), 0 0 25px ${project.color}15, inset 0 1px 0 rgba(255, 255, 255, 0.05)` 
                  : '0 10px 25px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
                opacity: opacityStyle,
                zIndex: zIndexStyle,
                transform: transformStyle,
                transition: isAnimating && isTopCard 
                  ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease' 
                  : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, border-color 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pointerEvents: isTopCard && !isAnimating ? 'auto' : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '10px' }}>
                  <div>
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'Outfit',
                      fontWeight: 800,
                      color: project.color,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      border: `1px solid ${project.color}35`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: `${project.color}08`,
                      display: 'inline-block',
                      marginBottom: '6px'
                    }}>
                      SYSTEM INDEX: {idx + 1} / {allProjects.length}
                    </span>
                    <h3 style={{ fontSize: '1.8rem', color: '#ffffff', letterSpacing: '-0.02em', margin: '4px 0 0 0', lineHeight: '1.2' }}>
                      {project.name}
                    </h3>
                  </div>
                  
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'Outfit',
                    fontWeight: 700,
                    color: project.color,
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}25`,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>{project.category}</span>
                </div>

                <p style={{
                  fontSize: '13.5px',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.55',
                  marginBottom: '16px'
                }}>{project.overview}</p>

                <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px', fontFamily: 'Outfit', fontWeight: 700 }}>System Architecture</div>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: 'rgba(255, 255, 255, 0.85)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  marginBottom: '16px',
                  lineHeight: '1.4',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {project.architecture}
                </div>
              </div>

              <div>
                {/* Tech Stack badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{
                      fontSize: '9.5px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: 'monospace'
                    }}>{t}</span>
                  ))}
                </div>

                {/* Direct Action buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    onMouseEnter={() => audioEngine.playBlip(1000, 0.03)}
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <button className="btn-cosmic" style={{ width: '100%', padding: '9px 0', fontSize: '10.5px' }}>
                      GITHUB ARCHIVE
                    </button>
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    onMouseEnter={() => audioEngine.playBlip(1000, 0.03)}
                    style={{ textDecoration: 'none', flex: 1 }}
                  >
                    <button 
                      className="btn-cosmic btn-primary" 
                      style={{ 
                        width: '100%', 
                        padding: '9px 0', 
                        fontSize: '10.5px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #ffffff',
                        color: '#020108',
                        boxShadow: `0 0 15px ${project.color}25`
                      }}
                    >
                      DEPLOYED SIGNAL
                    </button>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Navigation Buttons */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '24px', 
          marginTop: '24px' 
        }}
      >
        <button
          onClick={() => handleSwipe('left')}
          onMouseEnter={() => audioEngine.playBlip(600, 0.03)}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto'
          }}
          title="Previous Card (Left Arrow)"
        >
          ❮
        </button>

        <span style={{
          fontSize: '12px',
          fontFamily: 'Outfit',
          color: 'var(--text-secondary)',
          letterSpacing: '0.05em'
        }}>
          {currentIndex + 1} / {allProjects.length}
        </span>

        <button
          onClick={() => handleSwipe('right')}
          onMouseEnter={() => audioEngine.playBlip(600, 0.03)}
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.2s ease',
            pointerEvents: 'auto'
          }}
          title="Next Card (Right Arrow)"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Flagships;
