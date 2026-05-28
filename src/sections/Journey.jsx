import { timelineData } from '../data/timeline';
import { audioEngine } from '../components/SoundToggle';

const Journey = () => {
  return (
    <div style={{ position: 'relative' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-cyan)',
        fontWeight: '800',
        marginBottom: '12px'
      }} className="text-glow-cyan">
        [ SYSTEM_CHRONOLOGY // LOG_INDEX ]
      </p>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', letterSpacing: '-0.02em', color: '#ffffff' }}>
        Journey
      </h2>

      {/* Timeline items connected by a central path */}
      <div style={{ 
        position: 'relative', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        paddingLeft: '24px',
        borderLeft: '1px dashed rgba(255, 255, 255, 0.15)'
      }}>
        {timelineData.map((item, idx) => (
          <div 
            key={item.year}
            onMouseEnter={() => audioEngine.playBlip(750, 0.04)}
            style={{
              position: 'relative',
              cursor: 'default'
            }}
          >
            {/* Glowing constellation node marker on the line */}
            <div style={{
              position: 'absolute',
              left: '-29px',
              top: '5px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: 'var(--color-cyan)',
              border: '2px solid #020108',
              boxShadow: '0 0 10px var(--color-cyan)'
            }} />

            {/* Content card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              padding: '16px 20px',
              position: 'relative',
              boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.02)',
              pointerEvents: 'auto'
            }}>
              {/* Year badge */}
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                fontSize: '11px',
                fontFamily: 'Outfit',
                fontWeight: 800,
                color: 'var(--color-cyan)',
                background: 'rgba(13, 240, 255, 0.08)',
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.05em'
              }}>
                {item.year}
              </div>

              <h4 style={{
                fontFamily: 'Outfit',
                fontSize: '14px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '8px',
                letterSpacing: '0.02em',
                maxWidth: 'calc(100% - 60px)'
              }}>
                {item.title}
              </h4>
              
              <p style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey;
