import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Steve = forwardRef((props, ref) => {
    const group = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const head = useRef();

    useImperativeHandle(ref, () => group.current);

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
            <mesh ref={head} position={[0, 1.4, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshStandardMaterial color="#f0bca6" /> {/* Skin */}
                {/* Face feature */}
                <mesh position={[0, 0, 0.21]}>
                    <boxGeometry args={[0.3, 0.1, 0.01]} />
                    <meshStandardMaterial color="#331d15" />
                </mesh>
            </mesh>

            {/* Body */}
            <mesh position={[0, 0.9, 0]}>
                <boxGeometry args={[0.4, 0.6, 0.2]} />
                <meshStandardMaterial color="#00aaaa" /> {/* Cyan Shirt */}
            </mesh>

            {/* Right Arm */}
            <group ref={rightArm} position={[0.3, 1.1, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#f0bca6" />
                </mesh>
                <mesh position={[0, -0.1, 0]}> {/* Sleeve */}
                    <boxGeometry args={[0.21, 0.2, 0.21]} />
                    <meshStandardMaterial color="#00aaaa" />
                </mesh>
            </group>

            {/* Left Arm */}
            <group ref={leftArm} position={[-0.3, 1.1, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#f0bca6" />
                </mesh>
                <mesh position={[0, -0.1, 0]}> {/* Sleeve */}
                    <boxGeometry args={[0.21, 0.2, 0.21]} />
                    <meshStandardMaterial color="#00aaaa" />
                </mesh>
            </group>

            {/* Right Leg */}
            <group ref={rightLeg} position={[0.1, 0.6, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#3333cc" /> {/* Blue Pants */}
                </mesh>
            </group>

            {/* Left Leg */}
            <group ref={leftLeg} position={[-0.1, 0.6, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <boxGeometry args={[0.2, 0.6, 0.2]} />
                    <meshStandardMaterial color="#3333cc" />
                </mesh>
            </group>
        </group>
    );
});

Steve.displayName = 'Steve';

export default Steve;
