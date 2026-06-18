"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useProgress, useTexture, QuadraticBezierLine } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";

function GlobeLoader() {
  const { progress } = useProgress();
  const setGlobeLoaded = useAppStore((state) => state.setGlobeLoaded);
  
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setGlobeLoaded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [progress, setGlobeLoaded]);
  
  return null;
}

// The 5 main hubs
const CITIES = [
  { name: "NEW YORK", lat: 40.7, lon: -74.0 },
  { name: "LONDON", lat: 51.5, lon: -0.1 },
  { name: "DUBAI", lat: 25.2, lon: 55.3 },
  { name: "SINGAPORE", lat: 1.35, lon: 103.8 },
  { name: "SYDNEY", lat: -33.9, lon: 151.2 },
];

const DEG2RAD = Math.PI / 180;

// Helper to convert lat/lon to 3D sphere coordinates
function getPosFromLatLon(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lon + 180) * DEG2RAD;
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

// --------------------------------------------------------
// Dynamic Traffic Particle System (Living Cities)
// --------------------------------------------------------
function TrafficSystem({ R }: { R: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 8000; // Massively increased count for global data nodes
  
  const [positions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    
    // Distribute particles densely around major hubs, and some globally
    for (let i = 0; i < count; i++) {
       const isHub = Math.random() > 0.3; // 70% chance to be near a hub
       let lat, lon;
       if (isHub) {
         const city = CITIES[Math.floor(Math.random() * CITIES.length)];
         // Gaussian-like spread around city
         lat = city.lat + (Math.random() + Math.random() - 1) * 15;
         lon = city.lon + (Math.random() + Math.random() - 1) * 20;
       } else {
         // Random global landmass (roughly)
         lat = (Math.random() - 0.5) * 140;
         lon = (Math.random() - 0.5) * 360;
       }
       
       const v = getPosFromLatLon(lat, lon, R * 1.002);
       pos[i*3] = v.x;
       pos[i*3+1] = v.y;
       pos[i*3+2] = v.z;
       ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, ph];
  }, [R]);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color("#FFC040") }
    },
    vertexShader: `
      attribute float phase;
      varying float vAlpha;
      uniform float time;
      void main() {
        // Pulsate rapidly like flickering traffic/streetlights
        vAlpha = (sin(time * 5.0 + phase) + 1.0) * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        // Size attenuates with distance
        gl_PointSize = (4.0 * vAlpha + 1.0) * (15.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying float vAlpha;
      void main() {
        // Circular soft point
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;
        float alpha = (0.5 - r) * 2.0 * vAlpha * 0.9;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-phase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  );
}

// --------------------------------------------------------
// Globe Grid (Graticule)
// --------------------------------------------------------
function GlobeGrid({ R }: { R: number }) {
  const lineGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = R * 1.005; // Pushed out further to guarantee it clears the bump map

    // Latitudes
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (90 - lat) * DEG2RAD;
      for (let lon = -180; lon < 180; lon += 5) {
        const t1 = (lon + 180) * DEG2RAD;
        const t2 = (lon + 5 + 180) * DEG2RAD;
        points.push(
          new THREE.Vector3(-(radius * Math.sin(phi) * Math.cos(t1)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(t1)),
          new THREE.Vector3(-(radius * Math.sin(phi) * Math.cos(t2)), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(t2))
        );
      }
    }

    // Longitudes
    for (let lon = -180; lon < 180; lon += 20) {
      const t = (lon + 180) * DEG2RAD;
      for (let lat = -90; lat < 90; lat += 5) {
        const p1 = (90 - lat) * DEG2RAD;
        const p2 = (90 - (lat + 5)) * DEG2RAD;
        points.push(
          new THREE.Vector3(-(radius * Math.sin(p1) * Math.cos(t)), radius * Math.cos(p1), radius * Math.sin(p1) * Math.sin(t)),
          new THREE.Vector3(-(radius * Math.sin(p2) * Math.cos(t)), radius * Math.cos(p2), radius * Math.sin(p2) * Math.sin(t))
        );
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [R]);

  return (
    <lineSegments geometry={lineGeo}>
      {/* Used AdditiveBlending and bumped opacity so the dark brown color is actually visible against the black ocean */}
      <lineBasicMaterial color="#a08545" transparent opacity={0.3} depthTest={true} depthWrite={false} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

// --------------------------------------------------------
// Connection Lines (Web)
// --------------------------------------------------------
function ConnectionLines({ R }: { R: number }) {
  const lines = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < CITIES.length; i++) {
      for (let j = i + 1; j < CITIES.length; j++) {
        const p1 = getPosFromLatLon(CITIES[i].lat, CITIES[i].lon, R);
        const p2 = getPosFromLatLon(CITIES[j].lat, CITIES[j].lon, R);
        
        const mid = p1.clone().lerp(p2, 0.5);
        const dist = p1.distanceTo(p2);
        // Elevate the control point based on distance to make a nice arc
        const ctrl = mid.clone().normalize().multiplyScalar(R + dist * 0.3);
        
        pairs.push({ p1, p2, ctrl });
      }
    }
    return pairs;
  }, [R]);

  return (
    <group>
      {lines.map((l, idx) => (
        <QuadraticBezierLine
          key={idx}
          start={l.p1}
          end={l.p2}
          mid={l.ctrl}
          color="#FFD700" // Sharp golden color
          lineWidth={1.2} // Slightly thicker for sharpness
          transparent
          opacity={0.65}
          depthTest={true}
          blending={THREE.AdditiveBlending}
        />
      ))}
    </group>
  );
}

// --------------------------------------------------------
// Floating Dust Particles
// --------------------------------------------------------
function FloatingParticles({ R }: { R: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 80;
  
  const [positions, params1, params2] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const p1 = new Float32Array(count * 4); // r, theta, phi, speedTheta
    const p2 = new Float32Array(count * 4); // speedPhi, phase, size, baseAlpha
    
    for(let i=0; i<count; i++) {
       const r = R + Math.random() * (R * 0.15); // just outside sphere
       const theta = Math.random() * Math.PI * 2;
       const phi = Math.acos((Math.random() * 2) - 1);
       const speedTheta = (Math.random() - 0.5) * 0.15;
       const speedPhi = (Math.random() - 0.5) * 0.15;
       const phase = Math.random() * Math.PI * 2;
       const size = 3.0 + Math.random() * 4.0; // Increased size to 3.0-7.0px
       const baseAlpha = 0.4 + Math.random() * 0.6; // Increased base alpha to 0.4-1.0
       
       p1[i*4 + 0] = r;
       p1[i*4 + 1] = theta;
       p1[i*4 + 2] = phi;
       p1[i*4 + 3] = speedTheta;
       
       p2[i*4 + 0] = speedPhi;
       p2[i*4 + 1] = phase;
       p2[i*4 + 2] = size;
       p2[i*4 + 3] = baseAlpha;
    }
    return [pos, p1, p2];
  }, [R]);

  useFrame((state) => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderArgs = useMemo(() => ({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(200/255, 170/255, 90/255) }
    },
    vertexShader: `
      attribute vec4 params1;
      attribute vec4 params2;
      
      varying float vAlpha;
      uniform float time;
      
      void main() {
        float r = params1.x;
        float theta = params1.y + params1.w * time;
        float phi = params1.z + params2.x * time;
        float phase = params2.y;
        float size = params2.z;
        float baseAlpha = params2.w;
        
        vec3 pos;
        pos.x = r * sin(phi) * cos(theta);
        pos.z = r * sin(phi) * sin(theta);
        pos.y = r * cos(phi);
        
        vAlpha = baseAlpha * (0.3 + 0.7 * abs(sin(time + phase))); // Keep a minimum opacity
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (40.0 / -mvPosition.z); // Increased perspective scale
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying float vAlpha;
      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        float alpha = (0.5 - dist) * 2.0 * vAlpha;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  }), []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-params1" count={count} array={params1} itemSize={4} />
        <bufferAttribute attach="attributes-params2" count={count} array={params2} itemSize={4} />
      </bufferGeometry>
      <shaderMaterial args={[shaderArgs]} />
    </points>
  );
}

// --------------------------------------------------------
// Satellites
// --------------------------------------------------------
function SatelliteRing({ radius, tiltX, tiltZ, speed, color }: any) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
  });

  const ringGeo = useMemo(() => new THREE.RingGeometry(radius, radius + 0.015, 64), [radius]);
  
  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <mesh geometry={ringGeo} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.1} />
      </mesh>
      <group ref={groupRef}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

// --------------------------------------------------------
// Smart Center-Triggered City Marker
// --------------------------------------------------------
function CityMarker({ city, R }: { city: any; R: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hasActivated, setHasActivated] = useState(false);
  const [visible, setVisible] = useState(false);

  const pos = getPosFromLatLon(city.lat, city.lon, R);
  const labelPos = getPosFromLatLon(city.lat, city.lon, R * 1.15);

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;
    const normal = pos.clone().normalize().applyMatrix3(new THREE.Matrix3().getNormalMatrix(groupRef.current.matrixWorld));
    const cameraDir = camera.position.clone().sub(groupRef.current.position).normalize();
    const dot = normal.dot(cameraDir);
    
    setVisible(dot > 0.0); // Only render DOM when somewhat facing

    if (!hasActivated && dot > 0.5) {
      setHasActivated(true);
    }
    if (hasActivated && dot < 0.1) {
      setHasActivated(false);
    }
    
    // Ping scale
    if (groupRef.current.children[0]) {
      const scale = hasActivated ? 1.0 + Math.sin(clock.elapsedTime * 6) * 0.3 : 1;
      groupRef.current.children[0].scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      {/* Glowing base dot & Aura */}
      <mesh position={pos}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={hasActivated ? 1.0 : 0.3} toneMapped={false} />
      </mesh>
      
      {/* Outer Pulse Ring */}
      <mesh position={pos}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#FFC040" transparent opacity={hasActivated ? 0.4 : 0} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>

      <Html position={labelPos} center style={{ pointerEvents: 'none' }}>
        <div 
          className="flex flex-col items-center pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ 
            opacity: hasActivated ? 1 : 0, 
            transform: hasActivated ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.8)',
            filter: hasActivated ? 'blur(0px)' : 'blur(8px)'
          }}
        >
          {/* Dynamic drawing line */}
          <div className="w-[1px] h-10 bg-gradient-to-t from-[#FFC040] to-transparent origin-bottom transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
               style={{ transform: hasActivated ? 'scaleY(1)' : 'scaleY(0)' }} />
          
          <div className="px-3 py-1 bg-[#050402]/90 border border-gold-500/60 backdrop-blur-sm whitespace-nowrap overflow-hidden">
            <div className="transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                 style={{ transform: hasActivated ? 'translateY(0)' : 'translateY(120%)' }}>
              <span className="text-[10px] tracking-[0.2em] text-gold-300 drop-shadow-md">
                {city.name}
              </span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load high-res NASA textures
  // We use earth-night for the dark base with baked lights, topology for mountains, water for ocean gloss
  const [colorMap, bumpMap, specularMap] = useTexture([
    "https://unpkg.com/three-globe/example/img/earth-night.jpg",
    "https://unpkg.com/three-globe/example/img/earth-topology.png",
    "https://unpkg.com/three-globe/example/img/earth-water.png",
  ]);

  // Generate a completely random initial rotation state so the starting view is unpredictable
  const initialRotationY = useMemo(() => Math.random() * Math.PI * 2, []);
  
  // Randomize the atmospheric tilt slightly for a totally unique angle each load
  const initialRotationX = useMemo(() => (Math.random() * 0.3 - 0.15) + 12 * (Math.PI / 180), []);
  const initialRotationZ = useMemo(() => (Math.random() * 0.3 - 0.15), []);

  useFrame((state) => {
    if (earthRef.current) {
      const t = state.clock.elapsedTime;
      // Completely even, unpredictable rotation layered onto the random initial longitude.
      // Every country now has an exactly equal probability of appearing in front.
      earthRef.current.rotation.y = initialRotationY + (t * 0.04);
      
      // Keep the subtle vertical/tilt organic drift
      earthRef.current.rotation.x = initialRotationX + Math.sin(t * 0.12) * 0.04;
      earthRef.current.rotation.z = initialRotationZ + Math.cos(t * 0.08) * 0.025;
    }
    if (cloudsRef.current) {
      // Clouds drift independently to maintain atmospheric realism
      cloudsRef.current.rotation.y += 0.02;
    }
  });

  const R = 10; // Base Radius

  return (
    <group ref={earthRef} rotation={[12 * DEG2RAD, 0, 0]}>
      {/* 1. Base Earth Sphere */}
      <mesh>
        <sphereGeometry args={[R, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          emissiveMap={colorMap}
          emissive={new THREE.Color(0xffffff)}
          emissiveIntensity={1.8} // Boosted visibility
          bumpMap={bumpMap}
          bumpScale={0.2}
          specularMap={specularMap}
          specular={new THREE.Color("rgba(200, 230, 255, 1)")} 
          shininess={60} // Sharper specular highlight
        />
      </mesh>

      {/* Dynamic Traffic System */}
      <TrafficSystem R={R} />
      
      {/* Globe Graticule Grid */}
      <GlobeGrid R={R} />
      
      {/* Floating Dust Particles */}
      <FloatingParticles R={R} />
      
      {/* City Connections (Web) */}
      <ConnectionLines R={R} />
      
      {/* Orbital Satellite Rings */}
      <SatelliteRing radius={R * 1.3} tiltX={0.2} tiltZ={0.3} speed={0.15} color="#e0f0ff" />
      <SatelliteRing radius={R * 1.5} tiltX={-0.4} tiltZ={0.1} speed={-0.1} color="#FFD060" />
      <SatelliteRing radius={R * 1.7} tiltX={0.8} tiltZ={-0.2} speed={0.08} color="#ffffff" />

      {/* 3. City Markers & HTML Labels (Occluded smartly) */}
      {CITIES.map((city, idx) => (
        <CityMarker key={idx} city={city} R={R} />
      ))}
    </group>
  );
}

export function HeroGlobe() {
  return (
    // Fixed layout: right half of screen
    <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full flex items-center justify-center pointer-events-none">
      <div className="w-[1000px] h-[1000px] max-w-full max-h-full">
        <Canvas
          camera={{ position: [0, 0, 22], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <GlobeLoader />
          
          {/* Increased ambient light for better overall visibility */}
          <ambientLight intensity={0.15} />
          
          {/* Rim light perfectly positioned behind and above to create the circular lining effect */}
          <directionalLight
            position={[0, 40, -15]} 
            intensity={3.5}
            color="#ffffff" 
          />

          {/* Faint front light to ensure the landmasses are visible */}
          <directionalLight
            position={[0, 0, 20]}
            intensity={0.4}
            color="#a0c0ff"
          />

          <Earth />

          {/* Allow user to softly rotate the globe manually if desired (optional, disable zoom/pan) */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            rotateSpeed={0.4}
          />
        </Canvas>
      </div>
      
      {/* Massive shadow gradient overlay to hide the bottom right, maintaining the crescent look */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#000000] via-[#020305]/80 to-transparent pointer-events-none mix-blend-multiply" />
    </div>
  );
}
