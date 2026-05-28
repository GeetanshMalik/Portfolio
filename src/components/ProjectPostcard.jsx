import { useState, useEffect, useRef } from 'react';
import styles from './ProjectPostcard.module.css';
import { audioEngine } from './SoundToggle';

const ProjectPostcard = ({ project, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  // Handle slide/fade in transition on mount
  useEffect(() => {
    if (project) {
      // Trigger smooth transition
      const timer = requestAnimationFrame(() => setIsOpen(true));
      return () => cancelAnimationFrame(timer);
    } else {
      setIsOpen(false);
    }
  }, [project]);

  // Handle closing with animation
  const handleClose = () => {
    audioEngine.playSweep();
    setIsOpen(false);
    // Wait for animation to finish before calling parent onClose
    setTimeout(() => {
      onClose();
    }, 300); // matches CSS transition time (0.4s cubic-bezier)
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (!project) return null;

  return (
    <div 
      className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef} 
        className={`${styles.modal} ${isOpen ? styles.modalVisible : ''}`}
        style={{
          boxShadow: `0 24px 60px rgba(0, 0, 0, 0.85), 0 0 40px ${project.color}15, inset 0 1px 1px rgba(255, 255, 255, 0.05)`,
          borderColor: `${project.color}33`
        }}
      >
        <button 
          onClick={handleClose}
          className={styles.closeButton}
          onMouseEnter={() => audioEngine.playBlip(700, 0.03)}
        >
          CLOSE SIGNAL [Esc]
        </button>

        <div className={styles.contentGrid}>
          {/* Left Column: Image & Feature Lists */}
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className={styles.projectImage}
                  onError={(e) => {
                    // If image fails to load (since user will place it later), hide image tag and show placeholder
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={styles.placeholderImage}
                style={{ display: project.image ? 'none' : 'flex' }}
              >
                <svg className={styles.placeholderIcon} viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <div className={styles.placeholderText}>[ Awaiting screenshot ]</div>
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <h4 className={styles.specHeader}>KEY FEATURES</h4>
              <ul className={styles.featuresList}>
                {project.features.map((feat, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.bullet} style={{ color: project.color }}>•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Title, Overview, Tech details & Actions */}
          <div className={styles.detailSection}>
            <div>
              <span 
                style={{
                  fontSize: '9px',
                  fontFamily: 'Outfit',
                  fontWeight: 800,
                  color: project.color,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: `1px solid ${project.color}40`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: `${project.color}08`,
                  display: 'inline-block',
                  marginBottom: '14px'
                }}
              >
                FLAGSHIP PROJECT // {project.tagline}
              </span>
              
              <h3 style={{ fontSize: '2.2rem', color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: '1.1' }}>
                {project.name}
              </h3>
              
              <p className={styles.overviewText}>
                {project.overview}
              </p>

              <div className={styles.sectionHeader}>System Architecture</div>
              <div className={styles.architectureBox}>
                {project.architecture}
              </div>

              <div className={styles.sectionHeader}>Engineering Challenge</div>
              <p className={styles.challengeText}>
                {project.challenges}
              </p>
            </div>

            {/* Links at the bottom */}
            <div className={styles.linksRow}>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                className={styles.linkBtn}
                onMouseEnter={() => audioEngine.playBlip(900, 0.03)}
              >
                <button className="btn-cosmic" style={{ width: '100%', padding: '10px 0', fontSize: '11px' }}>
                  GITHUB ARCHIVE
                </button>
              </a>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noreferrer"
                className={styles.linkBtn}
                onMouseEnter={() => audioEngine.playBlip(900, 0.03)}
              >
                <button 
                  className="btn-cosmic btn-primary" 
                  style={{ 
                    width: '100%', 
                    padding: '10px 0', 
                    fontSize: '11px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ffffff',
                    color: '#020108',
                    boxShadow: `0 0 15px ${project.color}30`
                  }}
                >
                  DEPLOYED SIGNAL
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPostcard;
