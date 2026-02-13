import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Steve = (props) => {
    const group = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const head = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Walking animation
        if (leftLeg.current && rightLeg.current) {
            leftLeg.current.rotation.x = Math.sin(t * 5) * 0.5;
            rightLeg.current.rotation.x = Math.sin(t * 5 + Math.PI) * 0.5;
        }

        // Arm swing
        if (leftArm.current && rightArm.current) {
            leftArm.current.rotation.x = Math.sin(t * 5 + Math.PI) * 0.5;
            rightArm.current.rotation.x = Math.sin(t * 5) * 0.5;
        }

        // Head bob
        if (head.current) {
            head.current.rotation.y = Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            {/* Head */}
            <mesh ref={head} position={[0, 2.8, 0]}>
                <boxGeometry args={[0.8, 0.8, 0.8]} />
                <meshStandardMaterial color="#f0bca6" /> {/* Skin */}
                <mesh position={[0, 0.1, 0.41]}>
                    <planeGeometry args={[0.6, 0.2]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
            </mesh>

            {/* Body */}
            <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[0.8, 1.2, 0.4]} />
                <meshStandardMaterial color="#00aaaa" /> {/* Cyan Shirt */}
            </mesh>

            {/* Right Arm */}
            <group ref={rightArm} position={[0.6, 2.2, 0]}>
                <mesh position={[0, -0.6, 0]}>
                    <boxGeometry args={[0.4, 1.2, 0.4]} />
                    <meshStandardMaterial color="#f0bca6" />
                </mesh>
                <mesh position={[0, -0.4, 0]}> {/* Sleeve */}
                    <boxGeometry args={[0.42, 0.4, 0.42]} />
                    <meshStandardMaterial color="#00aaaa" />
                </mesh>
            </group>

            {/* Left Arm */}
            <group ref={leftArm} position={[-0.6, 2.2, 0]}>
                <mesh position={[0, -0.6, 0]}>
                    <boxGeometry args={[0.4, 1.2, 0.4]} />
                    <meshStandardMaterial color="#f0bca6" />
                </mesh>
                <mesh position={[0, -0.4, 0]}> {/* Sleeve */}
                    <boxGeometry args={[0.42, 0.4, 0.42]} />
                    <meshStandardMaterial color="#00aaaa" />
                </mesh>
            </group>

            {/* Right Leg */}
            <group ref={rightLeg} position={[0.2, 1.2, 0]}>
                <mesh position={[0, -0.6, 0]}>
                    <boxGeometry args={[0.4, 1.2, 0.4]} />
                    <meshStandardMaterial color="#3333cc" /> {/* Blue Pants */}
                </mesh>
            </group>

            {/* Left Leg */}
            <group ref={leftLeg} position={[-0.2, 1.2, 0]}>
                <mesh position={[0, -0.6, 0]}>
                    <boxGeometry args={[0.4, 1.2, 0.4]} />
                    <meshStandardMaterial color="#3333cc" />
                </mesh>
            </group>
        </group>
    );
};

export default Steve;
