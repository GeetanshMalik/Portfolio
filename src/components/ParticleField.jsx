import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 3500 }) => {
  const pointsRef = useRef();
  const brightPointsRef = useRef();

  // Create random star positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    
    // Choose beautiful cosmic colors (cyan, purple, pink, white)
    const palettes = [
      new THREE.Color('#00f0ff'), // Cyan
      new THREE.Color('#ff007f'), // Magenta
      new THREE.Color('#8b5cf6'), // Purple
      new THREE.Color('#ffffff'), // White
    ];

    for (let i = 0; i < count; i++) {
      // Generate in a sphere shell (r: 25 to 90) centered on origin
      const r = 25 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random color from palette
      const color = palettes[Math.floor(Math.random() * palettes.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    
    return [pos, cols];
  }, [count]);

  // Create bright stars/distant planets
  const [brightPos, brightCols] = useMemo(() => {
    const countBright = 90;
    const pos = new Float32Array(countBright * 3);
    const cols = new Float32Array(countBright * 3);

    const brightPalettes = [
      new THREE.Color('#ffaa00'), // Gold
      new THREE.Color('#0df0ff'), // Bright Cyan
      new THREE.Color('#ff1b76'), // Bright Pink
      new THREE.Color('#7c3aed'), // Bright Purple
    ];

    for (let i = 0; i < countBright; i++) {
      // Distribute farther out (r: 70 to 110)
      const r = 70 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = brightPalettes[Math.floor(Math.random() * brightPalettes.length)];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, []);

  // Animate the rotation and drift of the starfields
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const cam = state.camera;
    
    // Centering the starfields completely on the camera's position (X, Y, Z)
    // with a slight mouse-based offset to create depth/parallax.
    const targetX = cam.position.x + (state.pointer.x * 3.5);
    const targetY = cam.position.y + (state.pointer.y * 3.5);
    const targetZ = cam.position.z;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.08;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.08;
    pointsRef.current.position.z = targetZ;
    
    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.02;

    if (brightPointsRef.current) {
      const brightTargetX = cam.position.x + (state.pointer.x * 2.0);
      const brightTargetY = cam.position.y + (state.pointer.y * 2.0);
      
      brightPointsRef.current.position.x += (brightTargetX - brightPointsRef.current.position.x) * 0.06;
      brightPointsRef.current.position.y += (brightTargetY - brightPointsRef.current.position.y) * 0.06;
      brightPointsRef.current.position.z = targetZ;
      
      brightPointsRef.current.rotation.y = -time * 0.005; // Rotate in opposite direction
      brightPointsRef.current.rotation.x = Math.cos(time * 0.02) * 0.01;
    }
  });

  return (
    <group>
      {/* Soft background stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Brighter distant planets and stars */}
      <points ref={brightPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[brightPos, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[brightCols, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default ParticleField;
