import { audioEngine } from '../components/SoundToggle';

const Hero = () => {
  const handleScrollTo = (id) => {
    audioEngine.playBlip(1100, 0.1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <p style={{ 
        fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', 
        color: 'var(--text-secondary)',
        marginBottom: '8px',
        fontWeight: '500',
        fontFamily: 'Outfit, sans-serif'
      }}>
        Hi, I am
      </p>
      
      <h1 style={{ 
        fontSize: 'clamp(3.5rem, 8vw, 6rem)', 
        lineHeight: '1.05', 
        marginBottom: '12px',
        fontWeight: 800,
        fontFamily: 'Outfit, sans-serif',
        letterSpacing: '-0.04em'
      }}>
        <span className="bg-gradient-cosmic" style={{ 
          background: 'linear-gradient(90deg, #ffffff, var(--color-cyan))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Geetansh Malik
        </span>
      </h1>
      
      <h2 style={{ 
        fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', 
        fontWeight: '700',
        color: 'var(--color-cyan)',
        fontFamily: 'Outfit, sans-serif',
        letterSpacing: '0.01em',
        marginBottom: '20px'
      }} className="text-glow-cyan">
        Futuristic AI Engineer
      </h2>
      
      <p style={{ 
        fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', 
        color: 'var(--text-secondary)', 
        lineHeight: '1.65', 
        maxWidth: '640px',
        marginBottom: '40px',
        fontWeight: '500'
      }}>
        Building intelligent AI systems, autonomous workflows, and immersive digital experiences
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
        gap: '12px',
        maxWidth: '650px',
        width: '100%'
      }}>
        <button 
          className="btn-cosmic btn-primary"
          onClick={() => handleScrollTo('mercury')}
          onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
          style={{ width: '100%' }}
        >
          EXPLORE UNIVERSE
        </button>
        
        <button 
          className="btn-cosmic"
          onClick={() => handleScrollTo('jupiter')}
          onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
          style={{ width: '100%' }}
        >
          VIEW FLAGSHIPS
        </button>
        
        <a 
          href="/GeetanshMalik_Resume (1).pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', display: 'flex', width: '100%' }}
        >
          <button 
            className="btn-cosmic"
            style={{ width: '100%', height: '100%' }}
            onClick={() => audioEngine.playBlip(1200, 0.1)}
            onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
          >
            OPEN RESUME
          </button>
        </a>

        <button 
          className="btn-cosmic"
          onClick={() => handleScrollTo('neptune')}
          onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
          style={{ width: '100%' }}
        >
          CONTACT SIGNAL
        </button>
      </div>
    </div>
  );
};

export default Hero;
