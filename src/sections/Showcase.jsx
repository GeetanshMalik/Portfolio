import { useState, useRef, useEffect } from 'react';
import { audioEngine } from '../components/SoundToggle';

// 10 showcase images — replace files in /public/showcase/ with your real screenshots
const showcaseImages = [
  { src: '/showcase/img_01.png', fallbackGrad: 'linear-gradient(135deg, #7c3aed 0%, #ff1b76 100%)' },
  { src: '/showcase/img_02.png', fallbackGrad: 'linear-gradient(135deg, #0df0ff 0%, #7c3aed 100%)' },
  { src: '/showcase/img_03.png', fallbackGrad: 'linear-gradient(135deg, #10b981 0%, #0df0ff 100%)' },
  { src: '/showcase/img_04.png', fallbackGrad: 'linear-gradient(135deg, #ffaa00 0%, #ff1b76 100%)' },
  { src: '/showcase/img_05.png', fallbackGrad: 'linear-gradient(135deg, #ff1b76 0%, #7c3aed 100%)' },
  { src: '/showcase/img_06.png', fallbackGrad: 'linear-gradient(135deg, #eab308 0%, #10b981 100%)' },
  { src: '/showcase/img_07.png', fallbackGrad: 'linear-gradient(135deg, #3f37c9 0%, #0df0ff 100%)' },
  { src: '/showcase/img_08.png', fallbackGrad: 'linear-gradient(135deg, #ff5500 0%, #eab308 100%)' },
  { src: '/showcase/img_09.png', fallbackGrad: 'linear-gradient(135deg, #00ffcc 0%, #7c3aed 100%)' },
  { src: '/showcase/img_10.png', fallbackGrad: 'linear-gradient(135deg, #ee00ff 0%, #ff1b76 100%)' },
];

const Showcase = () => {
  const scrollRef = useRef(null);
  const [imgErr, setImgErr] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  const handleImgError = (idx) => {
    setImgErr(prev => ({ ...prev, [idx]: true }));
  };

  // Infinite cyclic scroll: when user scrolls near the edges, silently jump
  // We render 3 copies of the images: [clone-end] [originals] [clone-start]
  // and reposition silently when near a boundary.
  const totalItems = showcaseImages.length;
  const tripled = [...showcaseImages, ...showcaseImages, ...showcaseImages];
  const CARD_W = 480;
  const GAP = 18;
  const itemWidth = CARD_W + GAP;

  // On mount, scroll to the middle set (the "real" set)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = totalItems * itemWidth;
    }
  }, []);

  // Handle infinite wrap on scroll
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const oneSetWidth = totalItems * itemWidth;

    // If scrolled past the third set, jump back to the second
    if (el.scrollLeft >= oneSetWidth * 2) {
      el.scrollLeft -= oneSetWidth;
    }
    // If scrolled before the first set, jump forward to the second
    if (el.scrollLeft <= 0) {
      el.scrollLeft += oneSetWidth;
    }
  };

  // Arrow button scrolling
  const handleArrow = (direction) => {
    audioEngine.playBlip(1000, 0.05);
    if (scrollRef.current) {
      const offset = direction === 'left' ? -itemWidth : itemWidth;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Mouse drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    scrollStart.current = scrollRef.current?.scrollLeft || 0;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStart.current;
    scrollRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px', 
      margin: '0 auto',
      pointerEvents: 'auto'
    }}>
      {/* Heading ABOVE the card — like Jupiter pattern */}
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-cyan)',
        fontWeight: '800',
        marginBottom: '12px'
      }} className="text-glow-cyan">
        [ SYSTEM_GALLERY // VISUAL_REGISTRY ]
      </p>
      
      <h2 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '24px', 
        letterSpacing: '-0.02em', 
        color: '#ffffff' 
      }}>
        Project Showcase
      </h2>

      {/* Glass postcard containing only images */}
      <div className="glass-panel" style={{ 
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Arrow Buttons */}
        <button
          onClick={() => handleArrow('left')}
          aria-label="Scroll left"
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(10, 10, 16, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-cyan)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        <button
          onClick={() => handleArrow('right')}
          aria-label="Scroll right"
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(10, 10, 16, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-cyan)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>

        {/* Cyclic Image Belt */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
            padding: '4px 0',
            userSelect: 'none'
          }}
        >
          <style>{`
            .showcase-belt::-webkit-scrollbar { display: none; }
          `}</style>

          {tripled.map((item, idx) => {
            const realIdx = idx % totalItems;
            const useFallback = imgErr[realIdx];

            return (
              <div
                key={idx}
                style={{
                  flex: `0 0 ${CARD_W}px`,
                  height: '320px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(13, 240, 255, 0.35)';
                  e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {useFallback ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: item.fallbackGrad,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 0)',
                      backgroundSize: '14px 14px',
                      opacity: 0.4
                    }} />
                    <span style={{
                      fontFamily: 'Outfit',
                      fontWeight: 800,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                      zIndex: 1,
                      letterSpacing: '0.03em'
                    }}>
                      IMG {String(realIdx + 1).padStart(2, '0')}
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={`Showcase ${realIdx + 1}`}
                    onError={() => handleImgError(realIdx)}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      background: '#0a0a10',
                      pointerEvents: 'none'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle hint */}
        <p style={{
          textAlign: 'center',
          fontSize: '10px',
          color: 'var(--text-muted)',
          marginTop: '12px',
          fontFamily: 'Outfit',
          fontWeight: 600,
          letterSpacing: '0.04em'
        }}>
          SWIPE OR DRAG TO BROWSE • CYCLIC BELT
        </p>
      </div>
    </div>
  );
};

export default Showcase;
