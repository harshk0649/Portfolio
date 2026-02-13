import { useRef } from 'react';

const RoadSegment = ({ position, length = 10 }) => {
    return (
        <group position={position}>
            {/* Road Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, length]} />
                <meshStandardMaterial color="#444" />
            </mesh>

            {/* Stripe */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[0.4, length]} />
                <meshStandardMaterial color="#fff" />
            </mesh>

            {/* Grass Sidewalks */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, -0.01, 0]}>
                <planeGeometry args={[4, length]} />
                <meshStandardMaterial color="#55aa55" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.01, 0]}>
                <planeGeometry args={[4, length]} />
                <meshStandardMaterial color="#55aa55" />
            </mesh>
        </group>
    );
};

export default RoadSegment;
