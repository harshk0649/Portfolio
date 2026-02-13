import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Dragon = (props) => {
    const group = useRef();
    const leftWing = useRef();
    const rightWing = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (leftWing.current && rightWing.current) {
            leftWing.current.rotation.z = Math.sin(t * 8) * 0.5;
            rightWing.current.rotation.z = -Math.sin(t * 8) * 0.5;
        }
        if (group.current) {
            group.current.position.y = 8 + Math.sin(t * 1) * 2;
            group.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 1, 3]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.5, 1.8]}>
                <boxGeometry args={[0.8, 0.8, 1.2]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Eyes */}
            <mesh position={[0.25, 0.6, 2.2]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#a0f" emissive="#a0f" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.25, 0.6, 2.2]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshStandardMaterial color="#a0f" emissive="#a0f" emissiveIntensity={2} />
            </mesh>


            {/* Wings */}
            <group ref={leftWing} position={[0.5, 0.5, 0.5]}>
                <mesh position={[1.5, 0, 0]}>
                    <boxGeometry args={[3, 0.1, 2]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </group>
            <group ref={rightWing} position={[-0.5, 0.5, 0.5]}>
                <mesh position={[-1.5, 0, 0]}>
                    <boxGeometry args={[3, 0.1, 2]} />
                    <meshStandardMaterial color="#222" />
                </mesh>
            </group>

            {/* Tail */}
            <mesh position={[0, 0, -2]}>
                <boxGeometry args={[0.6, 0.6, 2]} />
                <meshStandardMaterial color="#111" />
            </mesh>
        </group>
    );
};

export default Dragon;
