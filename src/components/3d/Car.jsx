import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Car = forwardRef((props, ref) => {
    const wheel1 = useRef();
    const wheel2 = useRef();
    const wheel3 = useRef();
    const wheel4 = useRef();

    useFrame((state) => {
        // Rotate wheels if the car is moving (logic handled by parent usually, but we can add simple idle rotation if needed, skipping for now)
        // actually we can pass speed prop
    });

    return (
        <group ref={ref} {...props} dispose={null}>
            {/* Car Body */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[2, 0.8, 4]} />
                <meshStandardMaterial color="#cc3333" />
            </mesh>

            {/* Cabin */}
            <mesh position={[0, 1.2, -0.5]}>
                <boxGeometry args={[1.8, 0.7, 2]} />
                <meshStandardMaterial color="#992222" />
            </mesh>

            {/* Windows */}
            <mesh position={[0, 1.2, -0.5]}>
                <boxGeometry args={[1.85, 0.6, 1.8]} />
                <meshStandardMaterial color="#33ccff" />
            </mesh>

            {/* Wheels */}
            <group position={[-1, 0.4, 1.5]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
            <group position={[1, 0.4, 1.5]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
            <group position={[-1, 0.4, -1.5]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>
            <group position={[1, 0.4, -1.5]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </group>

            {/* Headlights */}
            <mesh position={[-0.6, 0.6, 2.01]}>
                <boxGeometry args={[0.4, 0.2, 0.1]} />
                <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={5} />
            </mesh>
            <mesh position={[0.6, 0.6, 2.01]}>
                <boxGeometry args={[0.4, 0.2, 0.1]} />
                <meshStandardMaterial color="#ffffcc" emissive="#ffffcc" emissiveIntensity={5} />
            </mesh>
        </group>
    );
});

export default Car;
