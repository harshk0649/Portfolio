import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, PerspectiveCamera, Environment, Stars, Instance, Instances, RoundedBox, useTexture } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// --- Pro Voxel Assets ---

const HighResCar = forwardRef(({ ...props }, ref) => {
    // Car Group with Headlights attached
    const leftHeadlight = useRef();
    const rightHeadlight = useRef();

    useFrame(() => {
        if (ref && ref.current && leftHeadlight.current && rightHeadlight.current) {
            const target = new THREE.Vector3(0, 0, 30);
            leftHeadlight.current.target.position.copy(target);
            leftHeadlight.current.target.updateMatrixWorld();
            rightHeadlight.current.target.position.copy(target);
            rightHeadlight.current.target.updateMatrixWorld();
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Chassis - Rounded for Premium Feel */}
            <RoundedBox args={[2.2, 0.7, 4.8]} radius={0.1} smoothness={4} position={[0, 0.7, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#991b1b" metalness={0.6} roughness={0.2} envMapIntensity={1.5} />
            </RoundedBox>

            {/* Cabin */}
            <RoundedBox args={[1.9, 0.8, 2.8]} radius={0.05} smoothness={4} position={[0, 1.35, -0.6]} castShadow receiveShadow>
                <meshStandardMaterial color="#7f1d1d" metalness={0.6} roughness={0.2} />
            </RoundedBox>

            {/* Windshield */}
            <mesh position={[0, 1.3, 0.9]} rotation={[Math.PI / 5, 0, 0]}>
                <planeGeometry args={[1.8, 0.9]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} metalness={0.9} roughness={0} />
            </mesh>

            {/* Spoiler */}
            <RoundedBox args={[2.4, 0.1, 0.8]} radius={0.05} smoothness={4} position={[0, 1.4, -2.4]}>
                <meshStandardMaterial color="#111" />
            </RoundedBox>
            <mesh position={[-0.9, 1.0, -2.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.9, 1.0, -2.4]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Wheels - Detailed */}
            {[[-1.2, 1.8], [1.2, 1.8], [-1.2, -1.8], [1.2, -1.8]].map((pos, i) => (
                <group key={i} position={[pos[0], 0.45, pos[1]]}>
                    <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                        <cylinderGeometry args={[0.45, 0.45, 0.7, 32]} />
                        <meshStandardMaterial color="#171717" roughness={0.8} />
                    </mesh>
                    {/* HUB */}
                    <mesh rotation={[0, 0, Math.PI / 2]} position={[pos[0] > 0 ? 0.36 : -0.36, 0, 0]}>
                        <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                        <meshStandardMaterial color="#e5e5e5" metalness={0.8} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            {/* Headlights Glow */}
            <mesh position={[-0.7, 0.7, 2.41]}>
                <boxGeometry args={[0.6, 0.25, 0.1]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.7, 0.7, 2.41]}>
                <boxGeometry args={[0.6, 0.25, 0.1]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={5} />
            </mesh>

            {/* Tail Lights Glow */}
            <mesh position={[-0.7, 0.8, -2.41]}>
                <boxGeometry args={[0.6, 0.2, 0.1]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
            </mesh>
            <mesh position={[0.7, 0.8, -2.41]}>
                <boxGeometry args={[0.6, 0.2, 0.1]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
            </mesh>

            <spotLight ref={leftHeadlight} position={[-0.6, 0.7, 2.5]} angle={0.5} penumbra={0.5} intensity={10} distance={60} color="#fff" castShadow />
            <spotLight ref={rightHeadlight} position={[0.6, 0.7, 2.5]} angle={0.5} penumbra={0.5} intensity={10} distance={60} color="#fff" castShadow />

        </group>
    );
});

// --- Dense Environment Instances ---

const Buildings = () => (
    <Instances range={200} castShadow receiveShadow>
        <RoundedBox args={[1, 1, 1]} radius={0.02} smoothness={2} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.3} />
        <CityContext.Consumer>{(value) => value}</CityContext.Consumer>
    </Instances>
)

const CityBlock = ({ position }) => {
    // Pro Voxel Buildings - varying sizes
    const height = Math.random() * 8 + 4;
    const width = 4 + Math.random() * 3;
    const depth = 4 + Math.random() * 3;

    return (
        <group position={position}>
            {/* Main Building Body */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial color={Math.random() > 0.6 ? "#1e293b" : "#0f172a"} roughness={0.3} />
            </mesh>

            {/* Glowing Windows - Pro look: random grid */}
            {Array.from({ length: Math.floor(height) }).map((_, y) => (
                Array.from({ length: Math.floor(width / 1.5) }).map((__, x) => (
                    Math.random() > 0.5 && (
                        <mesh key={`${x}-${y}`} position={[
                            (x - width / 3) * 1.5,
                            y + 1,
                            depth / 2 + 0.05
                        ]}>
                            <planeGeometry args={[0.6, 0.6]} />
                            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} toneMapped={false} />
                        </mesh>
                    )
                ))
            ))}
        </group>
    );
}

const Trees = () => (
    // Placeholder for Instance logic if we were using purely raw instances
    // But for now we use functional component distribution for ease of "Look" customization
    null
)

const VoxelTree = ({ position }) => {
    // Dense, cute, professional voxel tree
    return (
        <group position={position}>
            {/* Trunk */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <boxGeometry args={[0.8, 3, 0.8]} />
                <meshStandardMaterial color="#3f2e26" />
            </mesh>
            {/* Leaves Blocks - Dense/Layered for "Pro" look */}
            <mesh position={[0, 4, 0]} castShadow>
                <boxGeometry args={[3, 2, 3]} />
                <meshStandardMaterial color="#15803d" />
            </mesh>
            <mesh position={[0, 5.5, 0]} castShadow>
                <boxGeometry args={[2, 1.5, 2]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
            <mesh position={[0, 6.5, 0]} castShadow>
                <boxGeometry args={[1, 0.8, 1]} />
                <meshStandardMaterial color="#22c55e" />
            </mesh>
        </group>
    )
}

const StreetLight = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <mesh position={[0, 3, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 6]} />
            <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[1, 5.8, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 2]} />
            <meshStandardMaterial color="#333" />
        </mesh>
        <group position={[2, 5.5, 0]}>
            <boxGeometry args={[0.5, 0.2, 0.5]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
            <spotLight
                position={[0, -0.5, 0]}
                angle={0.8}
                penumbra={0.5}
                intensity={5}
                distance={15}
                color="#fbbf24"
                target-position={[0, -10, 0]}
            />
        </group>
    </group>
)

// --- CHECKPOINTS w/ BILLBOARDS ---

const InfoBillboard = ({ position, title, content, rotation = [0, 0, 0] }) => (
    <group position={position} rotation={rotation}>
        {/* Post - Moved back to avoid blocking road/text */}
        <mesh position={[0, -2, -1]}>
            <cylinderGeometry args={[0.5, 0.5, 20]} />
            <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Board - Even larger and lifted higher */}
        <group position={[0, 8, -0.5]}>
            <RoundedBox args={[22, 14, 0.6]} radius={0.2} smoothness={2}>
                <meshStandardMaterial color="#0f172a" />
            </RoundedBox>
            {/* Border Glow */}
            <mesh position={[0, 0, -0.1]}>
                <boxGeometry args={[22.3, 14.3, 0.4]} />
                <meshStandardMaterial color="#fff" emissive="#f97316" emissiveIntensity={0.8} />
            </mesh>

            {/* Text Content - Larger and clearer */}
            <Text position={[0, 4, 0.4]} fontSize={1.8} color="#fbbf24" anchorX="center" anchorY="middle" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                {title}
            </Text>
            <Text position={[0, -1, 0.4]} fontSize={1.0} maxWidth={20} color="#cbd5e1" lineHeight={1.6} anchorX="center" anchorY="middle" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                {content}
            </Text>
        </group>

        {/* Hologram Base */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 3, 32]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" opacity={0.5} transparent />
        </mesh>
    </group>
)

// --- ROAD LOGIC ---
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
        return new THREE.TubeGeometry(curve, 500, 7, 24, false); // more segments for longer road
    }, [curve]);

    return { curve, tubeGeometry };
};

const Experience = () => {
    const scroll = useScroll();
    const carRef = useRef();
    const { curve, tubeGeometry } = CurveRoad();
    const [points, setPoints] = useState([]);

    useEffect(() => {
        setPoints(curve.getPoints(150)); // More sample points
    }, [curve]);

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

            const cameraOffset = tangent.clone().multiplyScalar(-15).add(new THREE.Vector3(0, 8, 0));
            const targetCamPos = carRef.current.position.clone().add(cameraOffset);

            state.camera.position.lerp(targetCamPos, 0.08);
            state.camera.lookAt(carRef.current.position.clone().add(new THREE.Vector3(0, 2, 0)));
        }
    });

    return (
        <>
            <ambientLight intensity={0.6} color="#ffd1b3" />
            <Stars radius={300} depth={50} count={3000} factor={4} saturation={0.5} fade speed={0.5} />
            <Environment preset="sunset" />
            <fog attach="fog" args={['#ff7e5f', 30, 220]} />

            {/* The Car */}
            <HighResCar ref={carRef} />

            {/* Road */}
            <mesh geometry={tubeGeometry} receiveShadow position={[0, 0, 0]}>
                <meshStandardMaterial color="#1f1f1f" roughness={0.3} />
            </mesh>

            {/* Ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -25, 0]} receiveShadow>
                <planeGeometry args={[4000, 4000]} />
                <meshStandardMaterial color="#020617" roughness={1} />
            </mesh>

            {/* Dense Environment */}
            {points.map((p, i) => {
                const tangent = curve.getTangentAt(i / 150);
                const up = new THREE.Vector3(0, 1, 0);
                const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

                const dist = 18 + Math.random() * 25;
                const leftPos = p.clone().add(right.clone().multiplyScalar(-dist));
                const rightPos = p.clone().add(right.clone().multiplyScalar(dist));
                const terrainY = p.y - 10;
                leftPos.y = terrainY;
                rightPos.y = terrainY;

                const lightDist = 9;
                const leftLightPos = p.clone().add(right.clone().multiplyScalar(-lightDist));
                const rightLightPos = p.clone().add(right.clone().multiplyScalar(lightDist));
                leftLightPos.y = p.y;
                rightLightPos.y = p.y;

                return (
                    <group key={i}>
                        {i % 2 === 0 && <CityBlock position={leftPos} />}
                        <VoxelTree position={rightPos} />
                        {i % 5 === 0 && (
                            <StreetLight position={leftLightPos} rotation={[0, -Math.PI / 4, 0]} />
                        )}
                    </group>
                )
            })}

            {/* BILLBOARDS AT CHECKPOINTS - Strategically aligned with curve */}
            <InfoBillboard
                position={[25, 7, -60]}
                rotation={[0, -0.3, 0]}
                title="My collage"
                content="Completed B.Tech CSE at GNDU with CGPA 8.0. Strengthened core concepts in algorithms and database systems."
            />
            <InfoBillboard
                position={[-60, 8, -180]}
                rotation={[0, 0.5, 0]}
                title="My Internship"
                content="MERN Stack Intern. Developed full-stack modules and integrated REST APIs."
            />
            <InfoBillboard
                position={[45, 8, -320]}
                rotation={[0, -0.4, 0]}
                title="Cybertron Technologies"
                content="Jr. Software Developer working on secure backend systems and RESTful APIs."
            />
            <InfoBillboard
                position={[20, 12, -480]}
                rotation={[0, 1.2, 0]}
                title="Lerning Era"
                content="Strengthened fundamentals in system design, databases, and backend architecture "
            />
            <InfoBillboard
                position={[45, 8, -660]}
                rotation={[0, -0.2, 0]}
                title="Cybersecurity"
                content="Exploring secure coding practices, API protection strategies, authentication flows, and vulnerability awareness in backend systems."
            />
            <InfoBillboard
                position={[-65, 10, -860]}
                rotation={[0, 0.4, 0]}
                title="Next Phase"
                content="Advancing toward cloud-native architectures, distributed systems, and high-performance backend engineering at scale"
            />

            {/* Floating Finish Line */}
            <group position={[0, 10, -1000]}>
                <Text fontSize={10} color="#fbbf24" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                    THE END?
                </Text>
                <Text position={[0, -8, 0]} fontSize={4} color="#fff" font="https://raw.githubusercontent.com/google/fonts/main/ofl/pressstart2p/PressStart2P-Regular.ttf">
                    New Game+ Available
                </Text>
            </group>

        </>
    );
};


const LifeJourney = () => {
    return (
        <div className="w-full h-screen bg-black relative">
            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-50">
                <Link to="/" className="px-6 py-3 bg-black/60 backdrop-blur rounded text-white border-2 border-white/20 hover:bg-white/10 hover:scale-105 transition-all font-['Press_Start_2P'] text-xs">
                    ← BASE
                </Link>
            </div>

            <div className="absolute bottom-10 w-full text-center z-50 pointer-events-none">
                <p className="text-[10px] font-['Press_Start_2P'] text-yellow-400 animate-pulse drop-shadow-md">SCROLL TO ACCELERATE</p>
            </div>

            <Canvas shadows dpr={[1, 2]}> {/* DPR optimization */}
                <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={60} />

                <Suspense fallback={null}>
                    <ScrollControls pages={15} damping={0.15}> {/* Balanced pages for tighter spacing */}
                        <Experience />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LifeJourney;
