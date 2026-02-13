import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, Text, Float, PerspectiveCamera, Environment, Stars, Instance, Instances } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState, useEffect, forwardRef, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

// --- Procedural Assets ---

const HighResCar = forwardRef(({ ...props }, ref) => {
    // Car Group with Headlights attached
    const leftHeadlight = useRef();
    const rightHeadlight = useRef();

    // Sync refs
    useFrame(() => {
        if (ref && ref.current && leftHeadlight.current && rightHeadlight.current) {
            // Target the light far ahead
            const target = new THREE.Vector3(0, 0, 20);
            leftHeadlight.current.target.position.copy(target);
            leftHeadlight.current.target.updateMatrixWorld();
            rightHeadlight.current.target.position.copy(target);
            rightHeadlight.current.target.updateMatrixWorld();
        }
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Chassis */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 0.6, 4.5]} />
                <meshStandardMaterial color="#b91c1c" metalness={0.8} roughness={0.2} envMapIntensity={1.5} />
            </mesh>

            {/* Upper Body / Cabin */}
            <mesh position={[0, 1.2, -0.5]} castShadow receiveShadow>
                <boxGeometry args={[1.8, 0.7, 2.5]} />
                <meshStandardMaterial color="#991b1b" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Windshield */}
            <mesh position={[0, 1.2, 0.85]} rotation={[Math.PI / 6, 0, 0]}>
                <planeGeometry args={[1.7, 0.8]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>

            {/* Spoiler */}
            <mesh position={[0, 1.2, -2.1]}>
                <boxGeometry args={[2.2, 0.1, 0.6]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[-0.8, 0.9, -2.1]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            <mesh position={[0.8, 0.9, -2.1]}>
                <cylinderGeometry args={[0.05, 0.05, 0.6]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Wheels */}
            <group position={[-1.1, 0.4, 1.6]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.6, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.31, 0, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                    <meshStandardMaterial color="#ddd" metalness={0.8} />
                </mesh>
            </group>
            <group position={[1.1, 0.4, 1.6]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.6, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.31, 0, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                    <meshStandardMaterial color="#ddd" metalness={0.8} />
                </mesh>
            </group>
            <group position={[-1.1, 0.4, -1.8]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.7, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.36, 0, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                    <meshStandardMaterial color="#ddd" metalness={0.8} />
                </mesh>
            </group>
            <group position={[1.1, 0.4, -1.8]}>
                <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.7, 32]} />
                    <meshStandardMaterial color="#111" roughness={0.9} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} position={[0.36, 0, 0]}>
                    <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                    <meshStandardMaterial color="#ddd" metalness={0.8} />
                </mesh>
            </group>

            {/* Headlights Mesh */}
            <mesh position={[-0.6, 0.6, 2.26]}>
                <boxGeometry args={[0.6, 0.3, 0.1]} />
                <meshStandardMaterial color="#fff" emissive="#ccffff" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.6, 0.6, 2.26]}>
                <boxGeometry args={[0.6, 0.3, 0.1]} />
                <meshStandardMaterial color="#fff" emissive="#ccffff" emissiveIntensity={5} />
            </mesh>

            {/* Taillights */}
            <mesh position={[-0.7, 0.7, -2.26]}>
                <boxGeometry args={[0.6, 0.2, 0.1]} />
                <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.7, 0.7, -2.26]}>
                <boxGeometry args={[0.6, 0.2, 0.1]} />
                <meshStandardMaterial color="#f00" emissive="#f00" emissiveIntensity={5} />
            </mesh>

            {/* ACTUAL SPOTLIGHTS for Headlights */}
            <spotLight
                ref={leftHeadlight}
                position={[-0.6, 0.6, 2.5]}
                angle={0.6}
                penumbra={0.2}
                intensity={8}
                distance={50}
                color="#fff"
                castShadow
            />
            <spotLight
                ref={rightHeadlight}
                position={[0.6, 0.6, 2.5]}
                angle={0.6}
                penumbra={0.2}
                intensity={8}
                distance={50}
                color="#fff"
                castShadow
            />

        </group>
    );
});

// --- OPTIMIZATION WITH INSTANCES ---

const CityInstances = () => {
    return (
        <Instances range={100} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} /> {/* Base geometry will be scaled */}
            <meshStandardMaterial color="#475569" roughness={0.2} />
            <CityContext.Consumer>
                {(value) => value}
            </CityContext.Consumer>
        </Instances>
    )
}

const TreeInstances = ({ children }) => {
    // Tree Trunk
    return (
        <Instances range={100} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
            <meshStandardMaterial color="#451a03" />
            {children}
        </Instances>
    )
}
const TreeTopInstances = ({ children }) => {
    // Tree Top
    return (
        <Instances range={100} castShadow receiveShadow>
            <coneGeometry args={[3, 8, 8]} />
            <meshStandardMaterial color="#166534" />
            {children}
        </Instances>
    )
}


const CityBlock = ({ position }) => {
    // Because we have random heights/widths, using pure Instance for EVERYTHING is hard without prop drilling.
    // For now, to solve the immediate "Context Lost" crash which usually comes from Too Many Draw Calls:
    // We will stick to simple meshes but REDUCE count or simplify geometry first. 
    // A better approach for procedural city with random sizes is:
    // Reuse geometry, but scale via matrices in Instances. 

    // However, simpler fix: Just use standard meshes but keep geometry simple. 
    // The crash might be due to creating new geometry every frame or render?
    // No, the previous code was creating geometries inside the map loop, which is fine as long as count isn't massive.
    // But let's check text rendering. Text is expensive.

    const height = Math.random() * 10 + 5;
    const width = 5 + Math.random() * 3;

    return (
        <group position={position}>
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, width]} />
                <meshStandardMaterial color={Math.random() > 0.5 ? "#1e293b" : "#334155"} roughness={0.2} />
            </mesh>
        </group>
    );
}

const Tree = ({ position }) => (
    <group position={position}>
        <mesh position={[0, 2, 0]} castShadow>
            <cylinderGeometry args={[0.5, 0.8, 4, 8]} />
            <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0, 6, 0]} castShadow>
            <coneGeometry args={[3, 8, 8]} />
            <meshStandardMaterial color="#166534" />
        </mesh>
    </group>
);


// --- ROAD LOGIC ---

const CurveRoad = () => {
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -50),
            new THREE.Vector3(-20, 0, -100),
            new THREE.Vector3(-30, 0, -180),
            new THREE.Vector3(20, 0, -250),
            new THREE.Vector3(60, 5, -350),
            new THREE.Vector3(20, 0, -450),
            new THREE.Vector3(-40, 0, -550),
            new THREE.Vector3(0, 0, -650),
        ]);
    }, []);

    const tubeGeometry = useMemo(() => {
        // Radius = 6
        return new THREE.TubeGeometry(curve, 200, 6, 12, false); // reduced segments
    }, [curve]);

    return { curve, tubeGeometry };
};

const Experience = () => {
    const scroll = useScroll();
    const carRef = useRef();
    const { curve, tubeGeometry } = CurveRoad();
    const [points, setPoints] = useState([]);

    useEffect(() => {
        setPoints(curve.getPoints(150)); // Reduced points for performance
    }, [curve]);

    useFrame((state) => {
        const offset = scroll.offset; // 0 to 1

        // Calculate position on the curve
        const t = Math.min(0.999, offset);
        const point = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        if (carRef.current) {
            carRef.current.position.copy(point).add(new THREE.Vector3(0, 6.1, 0));

            // Look Ahead
            const lookAtPoint = curve.getPointAt(Math.min(1, t + 0.001));
            carRef.current.lookAt(lookAtPoint.add(new THREE.Vector3(0, 6.1, 0)));

            // --- Third Person Camera Logic ---
            const cameraOffset = tangent.clone().multiplyScalar(-18).add(new THREE.Vector3(0, 10, 0));
            const targetCamPos = carRef.current.position.clone().add(cameraOffset);

            state.camera.position.lerp(targetCamPos, 0.1);
            state.camera.lookAt(carRef.current.position.clone().add(new THREE.Vector3(0, 2, 0)));
        }
    });

    return (
        <>
            <ambientLight intensity={0.1} />
            <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="night" />

            {/* The Car */}
            <HighResCar ref={carRef} scale={1} />

            {/* The Road Visual */}
            <mesh geometry={tubeGeometry} receiveShadow position={[0, 0, 0]}>
                <meshStandardMaterial color="#1f2937" roughness={0.4} />
            </mesh>

            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -20, 0]} receiveShadow>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial color="#020617" roughness={1} />
            </mesh>

            {/* Optimized Environment Generation */}
            {points.map((p, i) => {
                if (i % 3 !== 0) return null; // Reduce density for fewer draw calls

                const width = 20 + Math.random() * 10;
                const tangent = curve.getTangentAt(i / 150);
                const up = new THREE.Vector3(0, 1, 0);
                const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

                const leftPos = p.clone().add(right.clone().multiplyScalar(-width));
                const rightPos = p.clone().add(right.clone().multiplyScalar(width));

                leftPos.y = -5;
                rightPos.y = -5;

                return (
                    <group key={i}>
                        <CityBlock position={leftPos} />
                        <Tree position={rightPos} />
                    </group>
                )
            })}

            {/* Checkpoints - Removed invalid font URL */}
            <Checkpoint position={[0, 10, -50]} text="Start" color="#4ade80" />
            <Checkpoint position={[-20, 10, -100]} text="Education" color="#60a5fa" />
            <Checkpoint position={[20, 10, -250]} text="Experience" color="#c084fc" />
            <Checkpoint position={[0, 10, -650]} text="Future" color="#facc15" />

        </>
    );
};

const Checkpoint = ({ position, text, color }) => (
    <group position={position}>
        <Float speed={2} floatIntensity={1}>
            <Text
                position={[0, 5, 0]}
                fontSize={5}
                color={color}
                anchorX="center"
                anchorY="middle"
                // Removed invalid font prop to use default, which is safe
                outlineWidth={0.2}
                outlineColor="#000"
            >
                {text}
            </Text>
        </Float>
        <mesh position={[0, -10, 0]}>
            <cylinderGeometry args={[3, 3, 1, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
        <pointLight position={[0, 0, 0]} intensity={5} color={color} distance={30} />
    </group>
);


const LifeJourney = () => {
    return (
        <div className="w-full h-screen bg-black relative">
            {/* Overlay UI */}
            <div className="absolute top-6 left-6 z-50">
                <Link to="/" className="px-6 py-3 bg-black/60 backdrop-blur rounded text-white font-minecraft border-2 border-white/20 hover:bg-white/10 transition-all font-['Press_Start_2P'] text-xs">
                    ← BACK TO BASE
                </Link>
            </div>

            <div className="absolute bottom-10 center z-50 pointer-events-none text-white text-center w-full opacity-70">
                <p className="text-[10px] font-['Press_Start_2P'] text-yellow-400 animate-pulse">SCROLL TO DRIVE</p>
            </div>

            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={60} />
                <fog attach="fog" args={['#020617', 20, 150]} />

                <Suspense fallback={null}>
                    <ScrollControls pages={8} damping={0.2}>
                        <Experience />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default LifeJourney;
