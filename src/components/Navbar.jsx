import { audioEngine } from './SoundToggle';
import styles from './Navbar.module.css';
import { planetsData } from '../data/planets';

const Navbar = ({ activeSection }) => {
  const handleClick = (id) => {
    audioEngine.playBlip(1000, 0.1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onMouseEnter={() => audioEngine.playBlip(440, 0.05)}>
        <span>GEETANSH</span>
        <span className={styles.dot}>.</span>
        <span>MALIK</span>
      </div>
      
      <ul className={styles.navLinks}>
        {planetsData.map((node) => (
          <li key={node.id}>
            <button
              onClick={() => handleClick(node.id)}
              onMouseEnter={() => audioEngine.playBlip(700, 0.03)}
              className={`${styles.navItem} ${activeSection === node.id ? styles.active : ''}`}
              style={{ '--accent': node.color }}
            >
              <span className={styles.indicator} />
              <span className={styles.linkText}>{node.sectionName}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
