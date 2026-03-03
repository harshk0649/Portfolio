import { useRef, forwardRef, useImperativeHandle, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Steve = forwardRef((props, ref) => {
    const { scene, animations } = useGLTF('/Portfolio/models/minecraft_steve_character.glb');
    const group = useRef();
    const mixer = useRef();

    useImperativeHandle(ref, () => group.current);

    // Setup animations if any exist in the GLB
    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach(clip => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });
        }
    }, [animations, scene]);

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
        const t = state.clock.getElapsedTime();
        if (group.current) {
            // Slower head bob for more "survival" feel if no animation
            if (!mixer.current) {
                group.current.position.y = props.position?.[1] + Math.sin(t * 2) * 0.05;
            }
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    );
});

Steve.displayName = 'Steve';

// Preload the model
useGLTF.preload('/Portfolio/models/minecraft_steve_character.glb');

export default Steve;
