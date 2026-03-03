import { useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Dragon = forwardRef((props, ref) => {
    const { scene, animations } = useGLTF('/Portfolio/models/minecraft_ender_dragon.glb');
    const group = useRef();
    const mixer = useRef();

    useImperativeHandle(ref, () => group.current);

    // Setup animations if any
    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach(clip => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });
        }
    }, [animations, scene]);

    const innerGroup = useRef();

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
        const t = state.clock.getElapsedTime();

        if (innerGroup.current) {
            // Floating movement on the INNER group
            innerGroup.current.position.y = Math.sin(t * 1) * 0.5;
            // Slight rotation for detail
            innerGroup.current.rotation.x = Math.sin(t * 0.5) * 0.05;
            innerGroup.current.rotation.z = Math.cos(t * 0.5) * 0.02;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group ref={innerGroup}>
                <primitive object={scene} />
            </group>
        </group>
    );
});

Dragon.displayName = 'Dragon';

// Preload the model
useGLTF.preload('/Portfolio/models/minecraft_ender_dragon.glb');

export default Dragon;
