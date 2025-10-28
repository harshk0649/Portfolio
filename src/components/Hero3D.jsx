import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Torus, Ring, Cylinder, Cone } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Floating Particles Component with Code Symbols
const FloatingParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = Array.from({ length: 80 }, (_, i) => {
    const symbols = ['{', '}', '<', '>', '[', ']', '(', ')', '/', '\\', '*', '+', '-', '=', '!', '?'];
    const symbol = symbols[i % symbols.length];

    return (
      <Text
        key={i}
        position={[
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
        ]}
        fontSize={0.3}
        color="#00ff88"
        font="/fonts/mono.woff"
        anchorX="center"
        anchorY="middle"
      >
        {symbol}
      </Text>
    );
  });

  return <group ref={particlesRef}>{particles}</group>;
};

// Floating Tech Stack Icons (Simplified 3D representations)
const TechIcon = ({ position, color, scale = 1, type }) => {
  const iconRef = useRef();

  useFrame((state) => {
    if (iconRef.current) {
      iconRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      iconRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      iconRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  let geometry;
  switch (type) {
    case 'react':
      geometry = <Torus args={[0.8, 0.2, 8, 16]} />;
      break;
    case 'node':
      geometry = <Cylinder args={[0.6, 0.6, 1.2, 8]} />;
      break;
    case 'python':
      geometry = <Cone args={[0.7, 1.4, 8]} />;
      break;
    case 'database':
      geometry = <Cylinder args={[0.5, 0.5, 1.5, 16]} />;
      break;
    case 'cloud':
      geometry = <Sphere args={[0.8, 16, 16]} />;
      break;
    default:
      geometry = <boxGeometry args={[1, 1, 1]} />;
  }

  return (
    <mesh ref={iconRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// AI/ML Neural Network Visualization
const NeuralNetwork = () => {
  const networkRef = useRef();

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const nodes = [];
  const connections = [];

  // Create neural network nodes
  for (let layer = 0; layer < 4; layer++) {
    for (let node = 0; node < (layer === 0 ? 3 : layer === 3 ? 2 : 4); node++) {
      const x = (layer - 1.5) * 3;
      const y = (node - 1.5) * 1.5;
      const z = -5;

      nodes.push(
        <mesh key={`node-${layer}-${node}`} position={[x, y, z]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial
            color="#ff6b6b"
            emissive="#ff6b6b"
            emissiveIntensity={0.3}
          />
        </mesh>
      );

      // Add connections between layers
      if (layer < 3) {
        for (let nextNode = 0; nextNode < (layer === 2 ? 2 : 4); nextNode++) {
          const nextX = (layer + 0.5 - 1.5) * 3;
          const nextY = (nextNode - 1.5) * 1.5;
          const nextZ = -5;

          connections.push(
            <line key={`connection-${layer}-${node}-${nextNode}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([x, y, z, nextX, nextY, nextZ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ff88" opacity={0.3} transparent />
            </line>
          );
        }
      }
    }
  }

  return (
    <group ref={networkRef}>
      {nodes}
      {connections}
    </group>
  );
};

// Floating Cube Component with Enhanced Effects
const FloatingCube = ({ position, color, scale = 1 }) => {
  const cubeRef = useRef();

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      cubeRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      cubeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={cubeRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.1}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Border-Filling 3D Elements with Coding Theme
const BorderElements = () => {
  const elementsRef = useRef();

  useFrame((state) => {
    if (elementsRef.current) {
      elementsRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  const borderElements = [];
  const numElements = 24;

  for (let i = 0; i < numElements; i++) {
    const angle = (i / numElements) * Math.PI * 2;
    const radius = 8;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    // Alternate between different coding-themed shapes
    const shapes = ['cube', 'sphere', 'octahedron', 'tetrahedron'];
    const shape = shapes[i % shapes.length];

    let geometry;
    switch (shape) {
      case 'cube':
        geometry = <boxGeometry args={[0.25, 0.25, 0.25]} />;
        break;
      case 'sphere':
        geometry = <sphereGeometry args={[0.15, 8, 8]} />;
        break;
      case 'octahedron':
        geometry = <octahedronGeometry args={[0.2]} />;
        break;
      case 'tetrahedron':
        geometry = <tetrahedronGeometry args={[0.2]} />;
        break;
      default:
        geometry = <boxGeometry args={[0.25, 0.25, 0.25]} />;
    }

    // Coding-themed colors (neon greens, blues, purples)
    const colors = ['#00ff88', '#0088ff', '#ff0088', '#8800ff', '#00ffff', '#ff8800'];
    const color = colors[i % colors.length];

    borderElements.push(
      <mesh key={i} position={[x, y, -2]}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    );
  }

  return <group ref={elementsRef}>{borderElements}</group>;
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />

        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 1, 1]} intensity={1.2} />
        <pointLight position={[-2, -1, -1]} intensity={0.7} color="#667eea" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.8} />
        <pointLight position={[3, -3, -2]} intensity={0.5} color="#00ff88" />

        {/* Main Sphere - AI/ML Brain */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
          <Sphere args={[1, 100, 200]} scale={2.7}>
            <MeshDistortMaterial
              color="#667eea"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>

        {/* Tech Stack Icons */}
        <TechIcon position={[-5, 3, -3]} color="#61dafb" scale={0.6} type="react" />
        <TechIcon position={[5, 2, -4]} color="#68c847" scale={0.5} type="node" />
        <TechIcon position={[-4, -2, -2]} color="#3776ab" scale={0.7} type="python" />
        <TechIcon position={[4, -3, -3]} color="#336791" scale={0.6} type="database" />
        <TechIcon position={[0, 4, -4]} color="#ff6b35" scale={0.5} type="cloud" />

        {/* AI/ML Neural Network */}
        <NeuralNetwork />

        {/* Floating Geometric Shapes */}
        <FloatingCube position={[-4, 2, -2]} color="#ff6b6b" scale={0.8} />
        <FloatingCube position={[4, -1, -3]} color="#4ecdc4" scale={0.6} />
        <FloatingCube position={[0, -3, -1]} color="#45b7d1" scale={0.7} />

        {/* Additional Coding 3D Elements */}
        <FloatingCube position={[-2, 4, -3]} color="#00ff88" scale={0.5} />
        <FloatingCube position={[3, 3, -2]} color="#0088ff" scale={0.4} />
        <FloatingCube position={[-3, -2, -4]} color="#ff0088" scale={0.6} />
        <FloatingCube position={[2, -4, -1]} color="#8800ff" scale={0.5} />

        {/* Border-Filling Elements */}
        <BorderElements />

        {/* Floating Code Symbol Particles */}
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default Hero3D;
