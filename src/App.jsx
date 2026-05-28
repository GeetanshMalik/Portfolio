import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Constellation from './components/Constellation';
import { planetsData } from './data/planets';
import ParticleField from './components/ParticleField';
import Navbar from './components/Navbar';
import SoundToggle from './components/SoundToggle';
import Panel from './components/Panel';

// Section imports
import Hero from './sections/Hero';
import About from './sections/About';
import Capabilities from './sections/Capabilities';
import Journey from './sections/Journey';
import ProjectArchive from './sections/ProjectArchive';
import Flagships from './sections/Flagships';
import Achievements from './sections/Achievements';
import Showcase from './sections/Showcase';
import Contact from './sections/Contact';

const App = () => {
  const [activeSection, setActiveSection] = useState('sun');

  // Scroll spy to detect active viewport section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const node of planetsData) {
        const el = document.getElementById(node.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(node.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* 3D Fixed Background Canvas */}
      <div className="canvas-background">
        <Canvas camera={{ fov: 60, near: 0.1, far: 200 }}>
          <Suspense fallback={null}>
            <ParticleField count={2000} />
            <Constellation activeSection={activeSection} />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating 2D HUD Navigation overlay */}
      <Navbar activeSection={activeSection} />
      <SoundToggle />

      {/* 2D Scrollable Panels Overlay */}
      <main className="scroll-content">
        <Panel 
          id="sun" 
          active={activeSection === 'sun'}
          style={{ minHeight: '100vh' }}
        >
          <Hero />
        </Panel>
        
        <Panel id="mercury" active={activeSection === 'mercury'}>
          <About />
        </Panel>
        
        <Panel 
          id="venus" 
          active={activeSection === 'venus'} 
          isTransparent={true}
          style={{ minHeight: '110vh' }}
        >
          {/* Venus has no 2D card overlay - only 3D orbiting skills */}
        </Panel>
        <Panel 
          id="earth" 
          active={activeSection === 'earth'}
          style={{ minHeight: '210vh' }}
        >
          <Journey />
        </Panel>
        
        <Panel 
          id="mars" 
          active={activeSection === 'mars'}
          style={{ minHeight: '210vh' }}
        >
          <ProjectArchive />
        </Panel>
        
        <Panel 
          id="jupiter" 
          active={activeSection === 'jupiter'}
          isTransparent={true}
          style={{ minHeight: '135vh' }}
        >
          <Flagships />
        </Panel>

        <Panel 
          id="saturn" 
          active={activeSection === 'saturn'}
          style={{ minHeight: '185vh' }}
        >
          <Achievements />
        </Panel>

        <Panel 
          id="uranus" 
          active={activeSection === 'uranus'}
          isTransparent={true}
          style={{ minHeight: '185vh' }}
        >
          <Showcase />
        </Panel>
        
        <Panel id="neptune" active={activeSection === 'neptune'}>
          <Contact />
        </Panel>
      </main>
    </div>
  );
};

export default App;
