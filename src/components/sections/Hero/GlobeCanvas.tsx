import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import type { Mesh, BufferGeometry, Points } from "three";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group>
      {/* Solid globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#0a0a20"
          transparent
          opacity={0.9}
          shininess={10}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere ref={wireRef} args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#6C63FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#6C63FF" transparent opacity={0.3} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.5, 0.008, 16, 100]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function CityDots() {
  const pointsRef = useRef<Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Approximate city positions on sphere (lat/lon to xyz)
    const cities = [
      [28.6, 77.2], // Delhi
      [19.1, 72.9], // Mumbai
      [13.1, 80.3], // Chennai
      [22.6, 88.4], // Kolkata
      [12.97, 77.6], // Bangalore
      [17.4, 78.5], // Hyderabad
      [23.0, 72.6], // Ahmedabad
      [26.9, 75.8], // Jaipur
      [27.7, 85.3], // Kathmandu (Nepal)
      [23.7, 90.4], // Dhaka (Bangladesh)
      [27.5, 89.6], // Thimphu (Bhutan)
      [25.6, 85.1], // Patna
      [21.15, 79.1], // Nagpur
      [15.4, 73.9], // Goa
      [11.0, 76.9], // Coimbatore
    ];

    cities.forEach(([lat, lon]) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + 180) * Math.PI) / 180;
      const r = 2.05;
      positions.push(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    });

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry as BufferGeometry}>
      <pointsMaterial color="#FF6B35" size={0.08} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#6C63FF" />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#00D4AA" />
      <Globe />
      <CityDots />
    </>
  );
}

export function GlobeCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
