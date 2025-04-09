import React, { useRef, Suspense } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated sphere component
const AnimatedSphere = () => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshPhongMaterial
        ref={materialRef}
        color="#4f46e5"
        shininess={100}
        wireframe={true}
      />
    </mesh>
  );
};

// Loading fallback
const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-pulse text-white opacity-50">Loading...</div>
  </div>
);

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 h-screen">
      {/* Three.js Canvas Background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#0a0a0a']} />
          <fog attach="fog" args={['#0a0a0a', 5, 18]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <AnimatedSphere />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900 pointer-events-none"></div>
      
      {/* Content */}
      <div className="relative px-6 lg:px-8 h-full flex items-center">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            {/* Logo/Badge */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full p-3 bg-indigo-500 bg-opacity-10 text-white ring-1 ring-indigo-500 ring-opacity-30">
                <svg className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12L3 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7L12 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 16L16 12L12 12L12 8L16 8L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            
            {/* Tagline */}
            <p className="mt-6 text-xl leading-8 text-indigo-300 font-semibold max-w-3xl mx-auto">
              Revolutionizing campus dining with immersive digital experiences
            </p>
            
            {/* Subheading */}
            <p className="mt-4 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
              {process.env.NEXT_PUBLIC_APP_DESCRIPTION}
            </p>
            
            {/* Call to action buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/Outlets" className="rounded-md bg-transparent px-5 py-3 text-base font-semibold text-gray-100 ring-1 ring-white ring-opacity-25 hover:bg-white hover:text-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all duration-300">
                Get Started
              </Link>
              <Link href="/" className="rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;