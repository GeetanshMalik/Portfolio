import { useEffect, useState, useRef } from 'react';
import { audioEngine } from '../components/SoundToggle';

const statsData = [
  { value: 12, label: 'TOTAL PROJECTS BUILT', suffix: '+' },
  { value: 1, label: 'APP PUBLISHED', suffix: '' },
  { value: 11, label: 'DEPLOYED APPLICATIONS', suffix: '' },
  { value: 2, label: 'ENGINEERING INTERNSHIPS', suffix: '' }
];

const StatCounter = ({ value, label, suffix }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef();

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const timer = setInterval(() => {
          start += increment;
          if (start >= value) {
            setCount(value);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [value]);

  return (
    <div 
      ref={elementRef}
      onMouseEnter={() => audioEngine.playBlip(1000, 0.03)}
      style={{
        background: 'rgba(255, 255, 255, 0.01)',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '10px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'default',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.01)'
      }}
    >
      <div style={{
        fontFamily: 'Outfit',
        fontWeight: 800,
        fontSize: '2.5rem',
        color: 'var(--color-gold)',
        marginBottom: '6px',
        letterSpacing: '-0.02em',
        lineHeight: 1
      }}>
        {count}{suffix}
      </div>
      
      <div style={{
        fontSize: '10px',
        fontFamily: 'Outfit',
        fontWeight: 800,
        color: 'var(--text-secondary)',
        letterSpacing: '0.1em'
      }}>
        {label}
      </div>
    </div>
  );
};

const Achievements = () => {
  return (
    <div style={{ position: 'relative' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-gold)',
        fontWeight: '800',
        marginBottom: '12px'
      }} className="text-glow-cyan">
        [ SYSTEM_RECORDS // STATS_PORT ]
      </p>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', letterSpacing: '-0.02em', color: '#ffffff' }}>
        Achievements
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '15px' 
      }}>
        {statsData.map((stat) => (
          <StatCounter 
            key={stat.label} 
            value={stat.value} 
            label={stat.label} 
            suffix={stat.suffix} 
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
