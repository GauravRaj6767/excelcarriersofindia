import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
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

  // Ocean
  ctx.fillStyle = isDark ? "#0d1b3e" : "#b8d4f0";
  ctx.fillRect(0, 0, size, size);

  // Grid lines
  ctx.strokeStyle = isDark ? "rgba(140,120,255,0.45)" : "rgba(30,80,180,0.25)";
  ctx.lineWidth = 1.2;
  for (let lat = -90; lat <= 90; lat += 30) {
    const y = ((90 - lat) / 180) * size;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(size, y); ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * size;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, size); ctx.stroke();
  }

  // Continents — brighter in dark mode
  ctx.fillStyle = isDark ? "#7c8fa8" : "#7da870";
  ctx.strokeStyle = isDark ? "#a0b4cc" : "#5a8050";
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

  useEffect(() => { return () => { texture.dispose(); }; }, [texture]);

  const gridColor = isDark ? "#8b80ff" : "#2563eb";

  useFrame((_state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <>
      <group ref={groupRef}>
        <Sphere args={[2, 64, 64]}>
          <meshPhongMaterial
            map={texture}
            shininess={isDark ? 20 : 30}
            specular={new THREE.Color(isDark ? "#8b80ff" : "#90caf9")}
          />
        </Sphere>
        <Sphere args={[2.01, 28, 28]}>
          <meshBasicMaterial color={gridColor} wireframe transparent opacity={isDark ? 0.1 : 0.08} />
        </Sphere>
      </group>

    </>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.9 : 1.3} />
      <pointLight position={[8, 8, 8]} intensity={isDark ? 1.2 : 0.5} color={isDark ? "#a090ff" : "#93c5fd"} />
      <pointLight position={[-8, -4, -8]} intensity={isDark ? 0.4 : 0.15} color={isDark ? "#00D4AA" : "#bae6fd"} />
      <Globe isDark={isDark} />
    </>
  );
}

// Curved ECI text rendered as SVG arc
function CurvedECI({ isDark }: { isDark: boolean }) {
  const color = isDark ? "#ffffff" : "#1a56db";
  const glowFilter = isDark
    ? `drop-shadow(0 0 6px rgba(108,99,255,0.9)) drop-shadow(0 0 14px rgba(108,99,255,0.5))`
    : `drop-shadow(0 0 5px rgba(26,86,219,0.6)) drop-shadow(0 0 10px rgba(26,86,219,0.3))`;

  // Arc: center shifted down, larger radius = text sits higher above globe surface
  const cx = 100, cy = 112, r = 90;
  const startAngle = -110 * (Math.PI / 180);
  const endAngle = -70 * (Math.PI / 180);
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);

  // Wider arc for text to sit on: -130° to -50°
  const tStartAngle = -130 * (Math.PI / 180);
  const tEndAngle = -50 * (Math.PI / 180);
  const tx1 = cx + r * Math.cos(tStartAngle);
  const ty1 = cy + r * Math.sin(tStartAngle);
  const tx2 = cx + r * Math.cos(tEndAngle);
  const ty2 = cy + r * Math.sin(tEndAngle);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
      style={{ filter: glowFilter }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        overflow="visible"
      >
        <defs>
          <path
            id="eci-arc"
            d={`M ${tx1} ${ty1} A ${r} ${r} 0 0 1 ${tx2} ${ty2}`}
            fill="none"
          />
        </defs>
        <text
          fontFamily="'Space Grotesk', 'Inter', Arial, sans-serif"
          fontSize="19"
          fontWeight="800"
          fill={color}
          letterSpacing="8"
        >
          <textPath href="#eci-arc" startOffset="50%" textAnchor="middle">
            E C I
          </textPath>
        </text>
        {/* invisible ref arcs just to keep defs clean */}
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="none" />
      </svg>
    </div>
  );
}

export function GlobeCanvas({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative h-full w-full">
      <CurvedECI isDark={isDark} />

      <Canvas
        // Tilt camera slightly downward to show top of globe like the logo
        camera={{ position: [0, 1.5, 7.5], fov: 38 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "default",
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const handleContextLost = (e: Event) => {
            e.preventDefault();
            setTimeout(() => { try { gl.forceContextRestore(); } catch (_) { /* noop */ } }, 300);
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
