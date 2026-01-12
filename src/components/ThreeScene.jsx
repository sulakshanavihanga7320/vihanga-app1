import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

const ThreeScene = () => {
    return (
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#9333ea" />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                        <Sphere args={[1, 32, 32]} scale={1.4}>
                            <MeshDistortMaterial
                                color="#4f46e5"
                                speed={2}
                                distort={0.3}
                                radius={1}
                            />
                        </Sphere>
                    </Float>
                </Suspense>

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default ThreeScene;
