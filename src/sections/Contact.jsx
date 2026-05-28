import { useState } from 'react';
import { audioEngine } from '../components/SoundToggle';

const Contact = () => {
  const [form, setForm] = useState({ name: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleConnect = (type) => {
    const nameVal = form.name.trim();
    const msgVal = form.message.trim();
    
    // Construct message body
    let bodyText = '';
    if (msgVal) {
      if (nameVal) {
        bodyText = `Hello! I am ${nameVal}. ${msgVal}`;
      } else {
        bodyText = msgVal;
      }
    } else if (nameVal) {
      bodyText = `Hello! I am ${nameVal}.`;
    }

    if (type === 'whatsapp') {
      audioEngine.playSweep();
      // WhatsApp chat redirection URL with pre-filled message (without leading +)
      const waUrl = `https://wa.me/919996912003${bodyText ? `?text=${encodeURIComponent(bodyText)}` : ''}`;
      window.open(waUrl, '_blank');
    } else if (type === 'email') {
      audioEngine.playSweep();
      // Email mailto redirection URL with body text
      const emailUrl = `mailto:geetanshmalik337@gmail.com?subject=Portfolio Contact${bodyText ? `&body=${encodeURIComponent(bodyText)}` : ''}`;
      window.location.href = emailUrl;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <p style={{ 
        textTransform: 'uppercase', 
        letterSpacing: '0.15em', 
        fontSize: '11px', 
        color: 'var(--color-emerald)',
        fontWeight: '800',
        marginBottom: '12px'
      }} className="text-glow-cyan">
        [ SYSTEM_CONNECT // SIGNAL_HUB ]
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
        {/* Left Side: Contact Information & Direct Buttons */}
        <div>
          <h2 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '20px', 
            letterSpacing: '-0.04em', 
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 1.1
          }} className="text-glow-cyan">
            Lets Connect
          </h2>
          
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.6', 
            marginBottom: '28px',
            maxWidth: '450px'
          }}>
            Reach out via my official handles. Use the form on the right to draft a message and send it directly through WhatsApp or Email.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', pointerEvents: 'auto' }}>
            <a 
              href="mailto:geetanshmalik337@gmail.com"
              onMouseEnter={() => audioEngine.playBlip(800, 0.03)}
              style={{ 
                color: '#fff', 
                fontSize: '13px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <span style={{ color: 'var(--color-emerald)', fontSize: '16px' }}>✉</span> geetanshmalik337@gmail.com
            </a>
            
            <a 
              href="https://www.linkedin.com/in/geetansh-malik-650b53251"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioEngine.playBlip(800, 0.03)}
              style={{ 
                color: '#fff', 
                fontSize: '13px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <span style={{ color: 'var(--color-emerald)', fontSize: '16px' }}>☄</span> linkedin.com/in/geetansh-malik
            </a>
            
            <a 
              href="https://github.com/GeetanshMalik"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioEngine.playBlip(800, 0.03)}
              style={{ 
                color: '#fff', 
                fontSize: '13px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
              <span style={{ color: 'var(--color-emerald)', fontSize: '16px' }}>⚛</span> github.com/GeetanshMalik
            </a>

            {/* Direct WhatsApp "Wa Me" Button */}
            <a 
              href="https://wa.me/919996912003"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audioEngine.playBlip(800, 0.03)}
              style={{ 
                color: '#fff', 
                fontSize: '13px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                padding: '10px 14px',
                background: 'rgba(37, 211, 102, 0.06)',
                border: '1px solid rgba(37, 211, 102, 0.2)',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#25D366';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(37, 211, 102, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ color: '#25D366', fontSize: '16px', fontWeight: 'bold' }}>💬</span> Wa Me (Direct WhatsApp Chat)
            </a>
          </div>

          <a 
            href="./resume.pdf"
            download="GeetanshMalik_Resume.pdf"
            onMouseEnter={() => audioEngine.playBlip(1100, 0.05)}
            style={{ textDecoration: 'none', marginTop: '20px', display: 'block', pointerEvents: 'auto' }}
          >
            <button className="btn-cosmic" style={{ width: '100%', fontSize: '11px', padding: '10px 0' }}>
              DOWNLOAD RESUME DATA
            </button>
          </a>
        </div>

        {/* Right Side: Optional Form and Submission Buttons */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px solid rgba(255, 255, 255, 0.04)',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.01)',
          pointerEvents: 'auto'
        }}>
          <h3 style={{
            fontSize: '11px',
            fontFamily: 'Outfit',
            fontWeight: 800,
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            letterSpacing: '0.05em'
          }}>
            DRAFT SIGNAL CARRIER (OPTIONAL)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ 
                fontFamily: 'Outfit', 
                fontSize: '10px', 
                fontWeight: 800, 
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)'
              }}>YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex. Geetansh Malik"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'white',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '12.5px',
                  outline: 'none',
                  pointerEvents: 'auto'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ 
                fontFamily: 'Outfit', 
                fontSize: '10px', 
                fontWeight: 800, 
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)'
              }}>TRANSMISSION MESSAGE</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your message here (optional)..."
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: 'white',
                  fontFamily: 'Plus Jakarta Sans',
                  fontSize: '12.5px',
                  outline: 'none',
                  resize: 'none',
                  pointerEvents: 'auto'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <button 
                type="button"
                onClick={() => handleConnect('whatsapp')}
                onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
                className="btn-cosmic"
                style={{
                  borderColor: 'rgba(37, 211, 102, 0.4)',
                  background: 'rgba(37, 211, 102, 0.05)',
                  color: '#ffffff',
                  fontSize: '11px',
                  padding: '12px 10px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(37, 211, 102, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.4)';
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                💬 Wa Me
              </button>

              <button 
                type="button"
                onClick={() => handleConnect('email')}
                onMouseEnter={() => audioEngine.playBlip(600, 0.04)}
                className="btn-cosmic"
                style={{
                  borderColor: 'rgba(13, 240, 255, 0.4)',
                  background: 'rgba(13, 240, 255, 0.03)',
                  color: '#ffffff',
                  fontSize: '11px',
                  padding: '12px 10px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-cyan)';
                  e.currentTarget.style.background = 'rgba(13, 240, 255, 0.08)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(13, 240, 255, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(13, 240, 255, 0.4)';
                  e.currentTarget.style.background = 'rgba(13, 240, 255, 0.03)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                ✉ Email Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
