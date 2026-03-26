import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

const CONTINENTS: [number, number][][] = [
  [[-168,71],[-140,70],[-120,60],[-105,49],[-95,49],[-85,45],[-75,45],[-65,47],[-55,47],[-60,40],[-75,35],[-80,25],[-90,20],[-105,20],[-120,30],[-125,38],[-130,50],[-140,58],[-155,60],[-165,65],[-168,71]],
  [[-75,12],[-65,10],[-60,5],[-50,5],[-35,-5],[-35,-15],[-40,-25],[-55,-35],[-65,-40],[-70,-50],[-65,-55],[-70,-52],[-75,-45],[-70,-35],[-70,-25],[-70,-15],[-80,-5],[-80,5],[-75,12]],
  [[0,50],[10,55],[20,60],[30,65],[25,70],[15,70],[10,58],[5,58],[0,55],[-5,48],[0,44],[10,44],[20,45],[25,50],[20,55],[10,52],[0,50]],
  [[-5,35],[15,38],[30,30],[40,15],[45,5],[40,-5],[35,-20],[30,-35],[20,-35],[15,-25],[10,-15],[5,-5],[0,5],[-5,10],[-15,10],[-18,15],[-18,25],[-10,30],[-5,35]],
  [[30,70],[50,70],[80,75],[100,72],[130,70],[140,60],[140,40],[130,30],[120,25],[105,20],[100,5],[95,5],[85,20],[75,25],[65,25],[55,25],[45,30],[40,38],[30,42],[25,45],[30,55],[40,65],[30,70]],
  [[115,-22],[125,-15],[135,-12],[140,-20],[150,-25],[150,-38],[140,-40],[130,-35],[120,-30],[115,-22]],
  [[-45,83],[-25,83],[-20,75],[-30,68],[-45,65],[-55,70],[-60,78],[-45,83]],
];

function createGlobeTexture(isDark: boolean): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Ocean background
  ctx.fillStyle = isDark ? "#0a1628" : "#c8dff5";
  ctx.fillRect(0, 0, size, size);

  // Grid lines
  ctx.strokeStyle = isDark ? "rgba(100,140,255,0.4)" : "rgba(80,120,220,0.35)";
  ctx.lineWidth = 1.2;
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = ((90 - lat) / 180) * size;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * size;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
  }

  // Continents
  ctx.fillStyle = isDark ? "#1a3a7a" : "#2255cc";
  ctx.strokeStyle = isDark ? "#2a5aaa" : "#1a44bb";
  ctx.lineWidth = 2;
  for (const polygon of CONTINENTS) {
    ctx.beginPath();
    polygon.forEach(([lng, lat], i) => {
      const x = ((lng + 180) / 360) * size;
      const y = ((90 - lat) / 180) * size;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

function Globe({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createGlobeTexture(isDark), [isDark]);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_s, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3;
  });

  const sphereColor = isDark ? "#1a2a4a" : "#dce8f8";
  const gridColor = isDark ? "#4466cc" : "#3355bb";
  const specularColor = isDark ? "#6688ff" : "#aabbff";

  return (
    <group ref={groupRef}>
      {/* Main globe sphere */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          map={texture}
          color={sphereColor}
          shininess={isDark ? 60 : 80}
          specular={new THREE.Color(specularColor)}
        />
      </Sphere>
      {/* Grid overlay */}
      <Sphere args={[2.02, 32, 32]}>
        <meshBasicMaterial
          color={gridColor}
          wireframe
          transparent
          opacity={isDark ? 0.12 : 0.1}
        />
      </Sphere>
    </group>
  );
}

function ECILetters({ isDark }: { isDark: boolean }) {
  const letterColor = isDark ? "#4488ff" : "#1a44cc";
  const letterEmissive = isDark ? "#1133aa" : "#0a2266";

  // Position E, C, I manually above the globe
  const letters = [
    { char: "E", x: -1.1 },
    { char: "C", x: 0 },
    { char: "I", x: 1.1 },
  ];

  return (
    <>
      {letters.map(({ char, x }) => (
        <Center key={char} position={[x, 2.85, 0]}>
          <Text3D
            font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
            size={0.65}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.04}
            bevelSize={0.02}
            bevelSegments={4}
          >
            {char}
            <meshStandardMaterial
              color={letterColor}
              emissive={letterEmissive}
              emissiveIntensity={isDark ? 0.4 : 0.1}
              metalness={0.3}
              roughness={0.3}
            />
          </Text3D>
        </Center>
      ))}
    </>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 1.0} />
      <pointLight position={[6, 8, 6]} intensity={isDark ? 1.5 : 1.2} color={isDark ? "#aabbff" : "#ffffff"} castShadow />
      <pointLight position={[-6, -4, -4]} intensity={isDark ? 0.4 : 0.2} color={isDark ? "#4466ff" : "#8899cc"} />
      <Globe isDark={isDark} />
      <ECILetters isDark={isDark} />
    </>
  );
}

export function GlobeCanvas({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="relative h-full w-full"
      style={{
        maskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 70%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.8, 7.5], fov: 40 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "default",
        }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const handleContextLost = (e: Event) => {
            e.preventDefault();
            setTimeout(() => { try { gl.forceContextRestore(); } catch (_) { /**/ } }, 300);
          };
          canvas.addEventListener("webglcontextlost", handleContextLost);
          return () => canvas.removeEventListener("webglcontextlost", handleContextLost);
        }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
