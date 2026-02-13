import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Wolf = (props) => {
    const group = useRef();
    const tail = useRef();
    const head = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (tail.current) {
            tail.current.rotation.z = Math.sin(t * 10) * 0.2;
        }
        if (head.current) {
            head.current.rotation.y = Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Body */}
            <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[0.6, 0.6, 1.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>

            {/* Head */}
            <group ref={head} position={[0, 1.2, 0.6]}>
                <mesh position={[0, 0, 0.2]}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="#dddddd" />
                </mesh>
                {/* Nose */}
                <mesh position={[0, -0.1, 0.5]}>
                    <boxGeometry args={[0.2, 0.2, 0.3]} />
                    <meshStandardMaterial color="#dddddd" />
                </mesh>
            </group>

            {/* Legs (Static for now) */}
            <mesh position={[-0.2, 0.3, 0.5]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>
            <mesh position={[0.2, 0.3, 0.5]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>
            <mesh position={[-0.2, 0.3, -0.5]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>
            <mesh position={[0.2, 0.3, -0.5]}>
                <boxGeometry args={[0.2, 0.6, 0.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>

            {/* Tail */}
            <group ref={tail} position={[0, 0.8, -0.6]}>
                <mesh position={[0, 0, -0.3]} rotation={[0.5, 0, 0]}>
                    <boxGeometry args={[0.15, 0.15, 0.6]} />
                    <meshStandardMaterial color="#dddddd" />
                </mesh>
            </group>
        </group>
    );
};

export default Wolf;
