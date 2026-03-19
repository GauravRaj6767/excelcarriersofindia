import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import type { Mesh } from "three";

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

      {/* Second ring — diagonal orbit, centered on globe */}
      <mesh rotation={[Math.PI / 2.35, Math.PI / 2.35, 0]}>
        <torusGeometry args={[2.5, 0.02, 19, 100]} />
        <meshBasicMaterial color="#00D4AA" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#6C63FF" />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#00D4AA" />
      <Globe />
    </>
  );
}

export function GlobeCanvas() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}