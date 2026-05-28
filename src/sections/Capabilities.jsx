const Capabilities = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-gold)',
        fontWeight: '800',
        marginBottom: '16px'
      }} className="text-glow-cyan">
        [ SYSTEM_CAPABILITIES // ACTIVE ]
      </p>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '16px', letterSpacing: '-0.02em', color: '#ffffff' }}>
        Capabilities
      </h2>

      <div style={{
        display: 'inline-block',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.01)',
        padding: '16px 24px',
        borderRadius: '10px',
        maxWidth: '500px',
        boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.02)'
      }}>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '10px' }}>
          Explore the interactive cluster of **technical skill stars** and meteoroids orbiting Venus in the 3D space.
        </p>
        <div style={{
          fontSize: '10.5px',
          fontFamily: 'Outfit',
          fontWeight: 800,
          color: 'var(--color-gold)',
          letterSpacing: '0.05em'
        }}>
          [ HOVER CAPABILITY METEOROIDS IN VIEWPORT ]
        </div>
      </div>
    </div>
  );
};

export default Capabilities;
