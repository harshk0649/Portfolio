import { useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Wolf = forwardRef((props, ref) => {
    const { scene, animations } = useGLTF('/Portfolio/models/wolf_dog_minecraft.glb');
    const group = useRef();
    const mixer = useRef();

    useImperativeHandle(ref, () => group.current);

    // Setup animations if any
    useEffect(() => {
        if (animations && animations.length > 0) {
            mixer.current = new THREE.AnimationMixer(scene);
            animations.forEach(clip => {
                mixer.current.clipAction(clip).play();
            });
        }
    }, [animations, scene]);

    const innerGroup = useRef();

    useFrame((state, delta) => {
        if (mixer.current) mixer.current.update(delta);
        const t = state.clock.getElapsedTime();

        if (innerGroup.current) {
            // "Minecraft" style jumping/floating
            innerGroup.current.position.y = Math.abs(Math.sin(t * 3)) * 0.4;
            // Slight tilt when moving
            innerGroup.current.rotation.z = Math.sin(t * 2) * 0.05;
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

Wolf.displayName = 'Wolf';

// Preload the model
useGLTF.preload('/Portfolio/models/wolf_dog_minecraft.glb');

export default Wolf;
