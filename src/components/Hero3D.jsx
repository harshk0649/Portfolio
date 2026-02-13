import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, Torus, Ring, Cylinder, Cone, Trail, Stars, Environment, TorusKnot, Icosahedron, Dodecahedron, Octahedron, Box, Plane, MeshTransmissionMaterial, Sphere as DreiSphere } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Neural Network Core - Advanced Brain-like Structure
const NeuralCore = () => {
  const coreRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.05;
      coreRef.current.rotation.y = time * 0.08;
      coreRef.current.rotation.z = time * 0.03;
      coreRef.current.scale.setScalar(1 + Math.sin(time * 1.2) * 0.05);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
      <group ref={coreRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        {/* Central Brain Structure */}
        <TorusKnot args={[2.5, 0.8, 200, 32]} position={[0, 0, 0]}>
          <MeshTransmissionMaterial
            color={hovered ? "#00aaff" : "#ff6b9d"}
            thickness={0.5}
            roughness={0}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.02}
            backside={true}
          />
        </TorusKnot>

        {/* Neural Connections */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 4;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = Math.sin(angle * 2) * 1.5;

          return (
            <Trail key={i} width={0.02} length={8} color="#00aaff" attenuation={(t) => t * t}>
              <Icosahedron args={[0.15]} position={[x, y, z]}>
                <meshStandardMaterial
                  color="#00aaff"
                  emissive="#00aaff"
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.9}
                />
              </Icosahedron>
            </Trail>
          );
        })}

        {/* Energy Pulses */}
        <Ring args={[3.5, 3.8, 64]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#ff6b9d" transparent opacity={0.3} />
        </Ring>
        <Ring args={[4.5, 4.8, 64]} rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00aaff" transparent opacity={0.2} />
        </Ring>
      </group>
    </Float>
  );
};

// DNA Helix - Molecular Structure
const DNAHelix = () => {
  const helixRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (helixRef.current) {
      helixRef.current.rotation.y = time * 0.1;
      helixRef.current.position.y = Math.sin(time * 0.5) * 0.5;
    }
  });

  const helix = [];
  for (let i = 0; i < 20; i++) {
    const t = i / 20;
    const angle = t * Math.PI * 4;
    const radius = 0.8;
    const height = t * 8 - 4;

    // Two strands
    helix.push(
      <Float key={`strand1-${i}`} speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
        <Sphere args={[0.08]} position={[
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ]}>
          <meshStandardMaterial color="#ff6b9d" emissive="#ff6b9d" emissiveIntensity={0.4} />
        </Sphere>
      </Float>
    );

    helix.push(
      <Float key={`strand2-${i}`} speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
        <Sphere args={[0.08]} position={[
          Math.cos(angle + Math.PI) * radius,
          height,
          Math.sin(angle + Math.PI) * radius
        ]}>
          <meshStandardMaterial color="#00aaff" emissive="#00aaff" emissiveIntensity={0.4} />
        </Sphere>
      </Float>
    );

    // Connecting rungs
    if (i < 19) {
      const nextT = (i + 1) / 20;
      const nextAngle = nextT * Math.PI * 4;
      const nextHeight = nextT * 8 - 4;

      helix.push(
        <Cylinder key={`rung-${i}`} args={[0.02, 0.02, Math.sqrt(
          Math.pow(Math.cos(nextAngle) * radius - Math.cos(angle) * radius, 2) +
          Math.pow(nextHeight - height, 2) +
          Math.pow(Math.sin(nextAngle) * radius - Math.sin(angle) * radius, 2)
        )]} position={[
          (Math.cos(angle) * radius + Math.cos(nextAngle) * radius) / 2,
          (height + nextHeight) / 2,
          (Math.sin(angle) * radius + Math.sin(nextAngle) * radius) / 2
        ]} rotation={[
          Math.atan2(nextHeight - height, Math.sqrt(
            Math.pow(Math.cos(nextAngle) * radius - Math.cos(angle) * radius, 2) +
            Math.pow(Math.sin(nextAngle) * radius - Math.sin(angle) * radius, 2)
          )),
          0,
          Math.atan2(
            Math.sin(nextAngle) * radius - Math.sin(angle) * radius,
            Math.cos(nextAngle) * radius - Math.cos(angle) * radius
          )
        ]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </Cylinder>
      );
    }
  }

  return <group ref={helixRef} position={[6, 0, 0]}>{helix}</group>;
};

// Quantum Particles - Advanced Particle System
const QuantumParticles = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.rotation.x = time * 0.02;
      particlesRef.current.rotation.z = time * 0.03;
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 8 + Math.random() * 4;

      return (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.3} floatIntensity={0.2}>
          <DreiSphere args={[0.05 + Math.random() * 0.1]} position={[
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          ]}>
            <meshStandardMaterial
              color={["#ff6b9d", "#00aaff", "#ffd93d", "#6bcf7f"][Math.floor(Math.random() * 4)]}
              emissive={["#ff6b9d", "#00aaff", "#ffd93d", "#6bcf7f"][Math.floor(Math.random() * 4)]}
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </DreiSphere>
        </Float>
      );
    });
  }, []);

  return <group ref={particlesRef}>{particles}</group>;
};

// Holographic Interface - Futuristic UI Elements
const HolographicInterface = () => {
  const interfaceRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (interfaceRef.current) {
      interfaceRef.current.rotation.y = time * 0.05;
    }
  });

  const interfaces = [];
  const data = [
    "Neural Network Active",
    "Quantum Computing Online",
    "AI Processing: 99.9%",
    "Data Streams: ∞",
    "Innovation Engine: ON"
  ];

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const radius = 12;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    interfaces.push(
      <Float key={i} speed={0.3} rotationIntensity={0.1} floatIntensity={0.1}>
        <group position={[x, 2, z]}>
          {/* Holographic Screen */}
          <Plane args={[3, 2]} rotation={[0, angle, 0]}>
            <meshBasicMaterial color="#001122" transparent opacity={0.7} />
          </Plane>
          {/* Text */}
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color="#00aaff"
            font="/fonts/mono.woff"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.8}
          >
            {data[i]}
          </Text>
          {/* Scanning Line */}
          <Plane args={[3, 0.02]} position={[0, -0.8, 0.02]} rotation={[0, angle, 0]}>
            <meshBasicMaterial color="#ff6b9d" transparent opacity={0.8} />
          </Plane>
        </group>
      </Float>
    );
  }

  return <group ref={interfaceRef}>{interfaces}</group>;
};

// Morphing Crystal - Dynamic Geometric Form
const MorphingCrystal = () => {
  const crystalRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (crystalRef.current) {
      crystalRef.current.rotation.x = time * 0.1;
      crystalRef.current.rotation.y = time * 0.15;
      crystalRef.current.rotation.z = time * 0.08;
      crystalRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <group ref={crystalRef} position={[-6, 0, 0]}>
        {/* Main Crystal */}
        <Octahedron args={[1.5]}>
          <MeshTransmissionMaterial
            color="#ffd93d"
            thickness={0.3}
            roughness={0}
            transmission={0.8}
            ior={1.8}
            chromaticAberration={0.05}
            backside={true}
          />
        </Octahedron>

        {/* Orbiting Fragments */}
        {Array.from({ length: 6 }, (_, i) => (
          <Float key={i} speed={2} rotationIntensity={1} floatIntensity={0.5}>
            <Dodecahedron args={[0.2]} position={[
              Math.cos(i * Math.PI / 3) * 3,
              Math.sin(i * Math.PI / 3) * 1.5,
              Math.sin(i * Math.PI / 3) * 2
            ]}>
              <meshStandardMaterial
                color="#6bcf7f"
                emissive="#6bcf7f"
                emissiveIntensity={0.5}
                transparent
                opacity={0.9}
              />
            </Dodecahedron>
          </Float>
        ))}
      </group>
    </Float>
  );
};

// Energy Vortex - Spiral Energy Field
const EnergyVortex = () => {
  const vortexRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (vortexRef.current) {
      vortexRef.current.rotation.y = time * 0.2;
    }
  });

  const vortex = [];
  for (let i = 0; i < 16; i++) {
    const t = i / 16;
    const angle = t * Math.PI * 6;
    const radius = t * 10;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = t * 6 - 3;

    vortex.push(
      <Trail key={i} width={0.03} length={12} color="#ffd93d" attenuation={(t) => t * t}>
        <Cone args={[0.1, 0.3]} position={[x, y, z]} rotation={[0, 0, angle]}>
          <meshStandardMaterial color="#ffd93d" emissive="#ffd93d" emissiveIntensity={0.7} />
        </Cone>
      </Trail>
    );
  }

  return <group ref={vortexRef} position={[0, -8, 0]}>{vortex}</group>;
};

// Floating Geometries - Additional Moving 3D Models for More Filling
const FloatingGeometries = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  const geometries = [];
  const shapes = [
    { component: Box, args: [1], color: "#ff6b9d", emissive: "#ff6b9d" },
    { component: Sphere, args: [0.8], color: "#00aaff", emissive: "#00aaff" },
    { component: Torus, args: [0.6, 0.2], color: "#ffd93d", emissive: "#ffd93d" },
    { component: Cone, args: [0.5, 1], color: "#6bcf7f", emissive: "#6bcf7f" },
    { component: Cylinder, args: [0.4, 0.4, 1], color: "#ff4500", emissive: "#ff4500" },
    { component: Octahedron, args: [0.7], color: "#8a2be2", emissive: "#8a2be2" },
    { component: Dodecahedron, args: [0.6], color: "#ffa500", emissive: "#ffa500" },
    { component: Icosahedron, args: [0.5], color: "#00ff7f", emissive: "#00ff7f" },
  ];

  for (let i = 0; i < 20; i++) {
    const shape = shapes[i % shapes.length];
    const angle = (i / 20) * Math.PI * 2;
    const radius = 8 + Math.random() * 4;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 10;

    geometries.push(
      <Float key={i} speed={0.5 + Math.random() * 0.5} rotationIntensity={0.5 + Math.random() * 0.5} floatIntensity={0.3 + Math.random() * 0.3}>
        <shape.component args={shape.args} position={[x, y, z]}>
          <meshStandardMaterial
            color={shape.color}
            emissive={shape.emissive}
            emissiveIntensity={0.4 + Math.random() * 0.3}
            transparent
            opacity={0.8}
          />
        </shape.component>
      </Float>
    );
  }

  return <group ref={groupRef}>{geometries}</group>;
};

// Creative Particle Swarm - Dynamic Swarm of Particles
const ParticleSwarm = () => {
  const swarmRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (swarmRef.current) {
      swarmRef.current.rotation.x = time * 0.03;
      swarmRef.current.rotation.z = time * 0.04;
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 12 + Math.random() * 6;

      return (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5} floatIntensity={0.4}>
          <DreiSphere args={[0.03 + Math.random() * 0.05]} position={[
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          ]}>
            <meshStandardMaterial
              color={["#ff6b9d", "#00aaff", "#ffd93d", "#6bcf7f", "#ff4500"][Math.floor(Math.random() * 5)]}
              emissive={["#ff6b9d", "#00aaff", "#ffd93d", "#6bcf7f", "#ff4500"][Math.floor(Math.random() * 5)]}
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </DreiSphere>
        </Float>
      );
    });
  }, []);

  return <group ref={swarmRef}>{particles}</group>;
};

// Morphing Torus Field - Creative Torus Arrangements
const MorphingTorusField = () => {
  const fieldRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (fieldRef.current) {
      fieldRef.current.rotation.y = time * 0.08;
      fieldRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
    }
  });

  const toruses = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 10;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 3) * 2;

    toruses.push(
      <Float key={i} speed={0.8} rotationIntensity={0.6} floatIntensity={0.4}>
        <Torus args={[1, 0.3, 16, 100]} position={[x, y, z]} rotation={[angle, angle * 2, angle * 0.5]}>
          <MeshTransmissionMaterial
            color={["#ff6b9d", "#00aaff", "#ffd93d", "#6bcf7f"][i % 4]}
            thickness={0.2}
            roughness={0}
            transmission={0.7}
            ior={1.6}
            chromaticAberration={0.03}
            backside={true}
          />
        </Torus>
      </Float>
    );
  }

  return <group ref={fieldRef}>{toruses}</group>;
};

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.05} />

        {/* Advanced Lighting Setup */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#00aaff" />
        <spotLight position={[0, 20, 0]} angle={0.4} penumbra={1} intensity={1.5} color="#ff6b9d" />
        <pointLight position={[10, -10, 10]} intensity={1} color="#ffd93d" />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#6bcf7f" />

        {/* Enhanced Environment */}
        <Environment preset="dawn" />
        <Stars radius={300} depth={100} count={15000} factor={8} saturation={0} fade speed={0.2} />

        {/* Core Components */}
        <NeuralCore />
        <DNAHelix />
        <QuantumParticles />
        <HolographicInterface />
        <MorphingCrystal />
        <EnergyVortex />

        {/* Additional Creative 3D Elements */}
        <FloatingGeometries />
        <ParticleSwarm />
        <MorphingTorusField />

        {/* Atmospheric Effects */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
          <ringGeometry args={[15, 25, 128]} />
          <meshBasicMaterial color="#00aaff" transparent opacity={0.02} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Hero3D;
