import { audioEngine } from '../components/SoundToggle';

const About = () => {
  return (
    <div style={{ position: 'relative' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: '#aaaaaa',
        fontWeight: '800',
        marginBottom: '12px'
      }}>
        [ CONSOLE // PERSONAL_DOSSIER ]
      </p>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', letterSpacing: '-0.02em', color: '#ffffff' }}>
        About Me
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <p style={{
          fontSize: '14.5px',
          color: 'var(--text-primary)',
          lineHeight: '1.7',
          fontWeight: 500
        }}>
          Hey there! My name is <strong>Geetansh Malik</strong>. I'm a Computer Science student at Vellore Institute of Technology (VIT) with a deep-seated love for programming and intelligent systems. 
        </p>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7'
        }}>
          For me, writing code isn't just about building functional software—it's a creative playground where I can bring complex ideas to life. What started as basic scripting quickly transformed into an obsession with full-stack systems and the emerging frontier of <strong>Agentic AI</strong>. I get excited about constructing autonomous agent loops, designing clean vector search databases, and setting up secure sandboxed code execution environments.
        </p>

        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: '1.7'
        }}>
          Beyond academic projects, I love building independent products. I've designed and launched native mobile experiences, even getting one of my apps published on the <strong>Indus Appstore</strong>. I enjoy finding elegant solutions to tricky integration challenges, squeezing out every last millisecond of performance, and designing interfaces that feel fluid and alive.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '15px', 
          marginTop: '12px' 
        }}>
          <div 
            onMouseEnter={() => audioEngine.playBlip(750, 0.03)}
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              padding: '14px',
              cursor: 'default'
            }}
          >
            <h4 style={{ fontSize: '11px', color: '#aaaaaa', marginBottom: '4px', letterSpacing: '0.05em' }}>CORE INTERESTS</h4>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              Agentic Workflows, LLM Orchestration, Full-Stack Architecture, Hybrid Mobile Apps.
            </span>
          </div>

          <div 
            onMouseEnter={() => audioEngine.playBlip(750, 0.03)}
            style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              padding: '14px',
              cursor: 'default'
            }}
          >
            <h4 style={{ fontSize: '11px', color: '#aaaaaa', marginBottom: '4px', letterSpacing: '0.05em' }}>PHILOSOPHY</h4>
            <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              Build tools that feel like magic, automate the mundane, and never stop learning.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
