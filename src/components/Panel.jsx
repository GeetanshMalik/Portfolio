import { useEffect, useRef, useState } from 'react';
import styles from './Panel.module.css';

const Panel = ({ children, id, active, isTransparent, style, className }) => {
  const panelRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => {
      if (panelRef.current) {
        observer.unobserve(panelRef.current);
      }
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={panelRef} 
      className={`${styles.sectionContainer} ${isVisible ? styles.visible : ''} ${className || ''}`}
      style={style}
    >
      {isTransparent ? (
        <div style={{ pointerEvents: 'none', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {children}
        </div>
      ) : (
        <div className={`glass-panel ${styles.panelContent} ${active ? styles.activePanel : ''}`}>
          {children}
        </div>
      )}
    </section>
  );
};

export default Panel;
