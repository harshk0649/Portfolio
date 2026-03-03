import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, PerspectiveCamera, Environment, Stars, useGLTF, RoundedBox, Sky } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// --- Pro Voxel Assets ---

const HighResCar = forwardRef(({ ...props }, ref) => {
    const { scene, animations } = useGLTF('/Portfolio/models/transformers_revenge_of_the_fallen_bumblebee_car.glb');
    const mixer = useRef();

    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            // Play all animations or just the first one
            animations.forEach(clip => {
                mixer.current.clipAction(clip).play();
            });
        }
    }, [animations, scene]);

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            <primitive object={scene} scale={2.0} rotation={[0, Math.PI, 0]} position={[0, -1, 0]} />
        </group>
    );
});

useGLTF.preload('/Portfolio/models/transformers_revenge_of_the_fallen_bumblebee_car.glb');

const VoxelBuilding = ({ position }) => {
    const height = 12 + Math.random() * 12;
    const width = 8 + Math.random() * 6;
    const depth = 8 + Math.random() * 6;
    const color = Math.random() > 0.5 ? "#1e293b" : "#0f172a";

    return (
        <group position={position}>
            {/* Main Body */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Roof Detail */}
            <mesh position={[0, height + 1, 0]}>
                <boxGeometry args={[width + 1, 2, depth + 1]} />
                <meshStandardMaterial color="#334155" />
            </mesh>

            {/* Glowing Windows Array - Front side */}
            {Array.from({ length: 3 }).map((_, i) => (
                <mesh key={`win-${i}`} position={[0, height - 3 - (i * 5), depth / 2 + 0.1]}>
                    <planeGeometry args={[width * 0.7, 1.5]} />
                    <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} toneMapped={false} />
                </mesh>
            ))}

            {/* Glowing Windows Array - Back side */}
            <mesh position={[0, height - 6, -depth / 2 - 0.1]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[width * 0.6, 1.2]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1} toneMapped={false} />
            </mesh>
        </group>
    );
}

const VoxelTree = ({ position }) => {
    const scale = 1.8 + Math.random() * 0.5;
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[1.2, 4, 1.2]} />
                <meshStandardMaterial color="#3f2e26" />
            </mesh>
            {/* Layered Foliage for Minecraft "Pro" look */}
            <mesh position={[0, 5, 0]} castShadow>
                <boxGeometry args={[5, 3, 5]} />
                <meshStandardMaterial color="#15803d" />
            </mesh>
            <mesh position={[0, 7.5, 0]} castShadow>
                <boxGeometry args={[4, 2.5, 4]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
            <mesh position={[0, 9, 0]} castShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#22c55e" />
            </mesh>
        </group>
    )
}

const StreetLight = ({ position, rotation }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 5, 0]}>
      <cylinderGeometry args={[0.2, 0.25, 10, 8]} />
      <meshStandardMaterial color="#333" />
    </mesh>

    <mesh position={[1, 9, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[0.15, 0.15, 2, 8]} />
      <meshStandardMaterial color="#333" />
    </mesh>

    <group position={[2, 8.8, 0]}>
      <mesh>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
    </group>
  </group>
);

const InfoBillboard = forwardRef(({ position, title, content, rotation = [0, 0, 0] }, ref) => (
    <group ref={ref} position={position} rotation={rotation}>
        {/* Post - Robust support for massive board */}
        <mesh position={[0, -5, -2]}>
            <cylinderGeometry args={[0.8, 0.8, 40, 8]} />
            <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Reverted Board Size for Readability */}
        <group position={[0, 15, -0.5]}>
            <RoundedBox args={[40, 28, 0.8]} radius={0.5} smoothness={1}>
                <meshStandardMaterial color="#050810" />
            </RoundedBox>
            {/* Border Glow - Sharp and Clear */}
            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[40.5, 28.5, 0.5]} />
                <meshStandardMaterial color="#fff" emissive="#f97316" emissiveIntensity={1.4} toneMapped={false} />
            </mesh>

            {/* Title - Clearly separated at the top */}
            <Text position={[0, 9.5, 0.5]} fontSize={2.5} color="#fbbf24" anchorX="center" anchorY="middle" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                {title}
            </Text>

            {/* Divider Line */}
            <mesh position={[0, 7, 0.5]}>
                <boxGeometry args={[32, 0.2, 0.1]} />
                <meshStandardMaterial color="#fbbf24" opacity={0.3} transparent />
            </mesh>

            {/* Content - Readable Font Size */}
            <Text position={[0, -2, 0.5]} fontSize={1.2} maxWidth={34} color="#cbd5e1" lineHeight={1.9} anchorX="center" anchorY="middle" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                {content}
            </Text>
        </group>

        {/* Hologram Base */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 3, 32]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" opacity={0.5} transparent />
        </mesh>
    </group>
));

const VoxelMountain = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[40, 20, 40]} />
            <meshStandardMaterial color="#4a5568" roughness={1} />
        </mesh>
        <mesh position={[0, 22, 0]} castShadow>
            <boxGeometry args={[25, 12, 25]} />
            <meshStandardMaterial color="#2d3748" roughness={1} />
        </mesh>
        <mesh position={[0, 30, 0]} castShadow>
            <boxGeometry args={[12, 8, 12]} />
            <meshStandardMaterial color="#718096" roughness={1} />
        </mesh>
    </group>
);

const VoxelCloud = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        <mesh castShadow>
            <boxGeometry args={[10, 4, 6]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
        <mesh position={[4, 2, 0]}>
            <boxGeometry args={[6, 3, 5]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
        <mesh position={[-3, -1, 2]}>
            <boxGeometry args={[7, 3, 4]} />
            <meshStandardMaterial color="white" opacity={0.8} transparent />
        </mesh>
    </group>
);

const CurveRoad = () => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -60),
            new THREE.Vector3(-15, 0, -120),
            new THREE.Vector3(-40, 2, -200),
            new THREE.Vector3(10, 0, -320),
            new THREE.Vector3(50, 4, -480),
            new THREE.Vector3(10, 0, -660),
            new THREE.Vector3(-30, 2, -860),
            new THREE.Vector3(0, 0, -1100),
        ]);
    }, []);

    const tubeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 300, 7, 12, false); // Reduced resolution for performance
    }, [curve]);

    return { curve, tubeGeometry };
};

const Experience = () => {
    const scroll = useScroll();
    const carRef = useRef();
    const { curve, tubeGeometry } = CurveRoad();
    const points = useMemo(() => curve.getPoints(100), [curve]); // Reduced point count

    useFrame((state) => {
        const offset = scroll.offset;
        const t = Math.min(0.999, offset);
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        if (carRef.current) {
            const carPos = point.clone().add(new THREE.Vector3(0, 7.1, 0));
            carRef.current.position.lerp(carPos, 0.2);

            const lookAtPoint = curve.getPointAt(Math.min(1, t + 0.01));
            const targetLook = lookAtPoint.clone().add(new THREE.Vector3(0, 7.1, 0));
            carRef.current.lookAt(targetLook);

            const cameraOffset = tangent.clone().multiplyScalar(-18).add(new THREE.Vector3(0, 6, 0));
            const targetCamPos = carRef.current.position.clone().add(cameraOffset);

            state.camera.position.lerp(targetCamPos, 0.08);
            state.camera.lookAt(carRef.current.position.clone().add(new THREE.Vector3(0, 5, 0)));
        }
    });

    return (
        <>
            <Sky
                distance={450000}
                sunPosition={[100, 10, -1000]}
                inclination={0.6}
                azimuth={0.25}
            />
            <ambientLight intensity={0.4} color="#ffd1b3" />
            <directionalLight position={[10, 20, 10]} intensity={1.5} color="#fd5e53" castShadow />
            <Stars radius={300} depth={50} count={2000} factor={4} saturation={0.5} fade speed={0.5} />
            <Environment preset="sunset" />
            <fog attach="fog" args={['#ff7e5f', 30, 250]} />

            {/* The Car */}
            <HighResCar ref={carRef} />

            {/* Road */}
            <group>
                <mesh geometry={tubeGeometry} receiveShadow position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                </mesh>
                {/* Visual road markers - Dashed lines */}
                {points.map((p, i) => (
                    <group key={`road-detail-${i}`}>
                        {i % 10 === 0 && (
                            <mesh position={p.clone().add(new THREE.Vector3(0, 0.1, 0))} rotation={[-Math.PI / 2, 0, 0]}>
                                <planeGeometry args={[0.5, 4]} />
                                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} toneMapped={false} />
                            </mesh>
                        )}
                        {/* Road Rails */}
                        {i % 4 === 0 && (
                            <>
                                <mesh position={p.clone().add(new THREE.Vector3(-7.5, 0.5, 0))}>
                                    <boxGeometry args={[0.5, 0.5, 2]} />
                                    <meshStandardMaterial color="#334155" />
                                </mesh>
                                <mesh position={p.clone().add(new THREE.Vector3(7.5, 0.5, 0))}>
                                    <boxGeometry args={[0.5, 0.5, 2]} />
                                    <meshStandardMaterial color="#334155" />
                                </mesh>
                            </>
                        )}
                    </group>
                ))}
            </group>

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -25, 0]} receiveShadow>
                <planeGeometry args={[4000, 4000]} />
                <meshStandardMaterial color="#1a0f0a" roughness={1} />
            </mesh>

            {/* Background Mountains */}
            <VoxelMountain position={[-150, -10, -400]} scale={2.5} />
            <VoxelMountain position={[200, -10, -700]} scale={3} />
            <VoxelMountain position={[-250, -10, -900]} scale={3.5} />
            <VoxelMountain position={[180, -10, -200]} scale={2} />

            {/* Voxel Clouds */}
            <VoxelCloud position={[50, 60, -200]} scale={2} />
            <VoxelCloud position={[-80, 70, -500]} scale={3} />
            <VoxelCloud position={[100, 55, -800]} scale={2.5} />
            <VoxelCloud position={[-120, 65, -300]} scale={1.8} />

            {/* Optimized Environment - Mixed on both sides */}
            {points.map((p, i) => {
                if (i % 2 !== 0) return null;
                const tangent = curve.getTangentAt(i / 100);
                const up = new THREE.Vector3(0, 1, 0);
                const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

                const leftDist = 35 + Math.random() * 25;
                const rightDist = 35 + Math.random() * 25;
                const leftPos = p.clone().add(right.clone().multiplyScalar(-leftDist));
                const rightPos = p.clone().add(right.clone().multiplyScalar(rightDist));

                const terrainY = p.y - 12;
                leftPos.y = terrainY;
                rightPos.y = terrainY;

                const leftType = Math.random();
                const rightType = Math.random();

                return (
                    <group key={i}>
                        {/* Left Side */}
                        {leftType < 0.3 && <VoxelBuilding position={leftPos} />}
                        {leftType >= 0.3 && leftType < 0.7 && <VoxelTree position={leftPos} />}

                        {/* Right Side */}
                        {rightType < 0.3 && <VoxelBuilding position={rightPos} />}
                        {rightType >= 0.3 && rightType < 0.7 && <VoxelTree position={rightPos} />}

                        {/* Streetlights only on left every 10 steps */}
                        {i % 10 === 0 && (
                            <StreetLight
                                position={p.clone().add(right.clone().multiplyScalar(-10))}
                                rotation={[0, -Math.PI / 4, 0]}
                            />
                        )}
                    </group>
                )
            })}

            {/* Reverted Placement for immediate visibility */}
            <InfoBillboard position={[55, 8, -70]} rotation={[0, -0.4, 0]} title="MY COLLEGE" content="Completed B.Tech CSE at GNDU with CGPA 8.0. Strengthened core concepts in algorithms and database systems. Focused on software engineering principles and data structures." />
            <InfoBillboard position={[-65, 8, -190]} rotation={[0, 0.5, 0]} title="MY INTERNSHIP" content="MERN Stack Intern at Solitaire Infosys. Developed full-stack modules and integrated REST APIs. Gained hands-on experience with MongoDB, Express, React, and Node.js for modern web apps." />
            <InfoBillboard position={[60, 8, -340]} rotation={[0, -0.5, 0]} title="CYBERTRON TECH" content="Jr. Software Developer working on secure backend systems and RESTful APIs. Building scalable solutions with Spring Boot and Django. Focusing on system optimization." />
            <InfoBillboard position={[-60, 12, -490]} rotation={[0, 0.4, 0]} title="LEARNING ERA" content="Strengthened fundamentals in system design, databases, and backend architecture. Mastered the art of building efficient and maintainable codebases." />
            <InfoBillboard position={[65, 8, -670]} rotation={[0, -0.3, 0]} title="CYBERSECURITY" content="Exploring secure coding practices, API protection strategies, authentication flows, and vulnerability awareness in backend systems to ensure robust protection." />
            <InfoBillboard position={[-70, 10, -870]} rotation={[0, 0.6, 0]} title="NEXT PHASE" content="Advancing toward cloud-native architectures, distributed systems, and high-performance backend engineering at scale to tackle complex modern challenges." />

            <group position={[0, 10, -1000]}>
                <Text fontSize={10} color="#fbbf24" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">THE END?</Text>
                <Text position={[0, -8, 0]} fontSize={4} color="#fff" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">New Game+ Available</Text>
            </group>
        </>
    );
};

const LifeJourney = () => {
    return (
        <div className="w-full h-screen bg-black relative">
            <div className="absolute top-6 left-6 z-50">
                <Link to="/" className="px-6 py-3 bg-black/60 backdrop-blur rounded text-white border-2 border-white/20 hover:bg-white/10 hover:scale-105 transition-all font-['Press_Start_2P'] text-xs">
                    ← BASE
                </Link>
            </div>
            <Canvas shadows dpr={[1, 1.5]}> {/* Cap DPR for perf */}
                <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={60} />
                <Suspense fallback={null}>
                    <ScrollControls pages={15} damping={0.1}>
                        <Experience />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LifeJourney;
