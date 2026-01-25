import { Canvas, useLoader } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface STLModelConfig {
  url: string;
  position?: [number, number, number];
  scale?: number;
  quantity?: number;
}

interface PhysicsSTLProps {
  config: STLModelConfig;
  delay: number;
  color: string;
}

// Generate a random pastel color
function generateRandomColor(): string {
  const hue = Math.random() * 360;
  const saturation = 90;
  const lightness = 70;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function PhysicsSTL({ config, delay, color }: PhysicsSTLProps) {
  const geometry = useLoader(STLLoader, config.url);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  const position = [
    (Math.random() - 0.5) * 7,
    15,
    (Math.random() - 0.5) * 3,
  ] as const;

  const scale = config.scale || 1;

  return (
    <RigidBody
      position={position}
      colliders="cuboid"
      restitution={0.2}
      friction={0.3}
      linearDamping={0.5}
      angularDamping={0.5}
      canSleep={true}
    >
      <mesh geometry={geometry} scale={scale} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    </RigidBody>
  );
}

function Ground() {
  return (
    <RigidBody type="fixed" colliders="cuboid" friction={0.4}>
      <mesh position={[0, -3, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[10, 6, 0.25]} />
        <meshStandardMaterial
          color="#f5dcb1"
          roughness={0.7}
          metalness={0.0}
          onBeforeCompile={(shader) => {
            shader.vertexShader = `
              varying vec2 vUv;
              varying vec3 vPosition;
              ${shader.vertexShader}
            `.replace(
              `#include <begin_vertex>`,
              `#include <begin_vertex>
              vUv = uv;
              vPosition = position;
              `,
            );

            shader.fragmentShader = `
              varying vec2 vUv;
              varying vec3 vPosition;
              ${shader.fragmentShader}
            `.replace(
              `#include <color_fragment>`,
              `#include <color_fragment>
              // Round the corners by discarding fragments near edges
              vec2 pos = vPosition.xy;
              float width = 10.0;
              float height = 6.0;
              float radius = 0.5;
              
              // Calculate distance from corner
              vec2 corner = abs(pos) - vec2(width/2.0 - radius, height/2.0 - radius);
              float cornerDist = length(max(corner, 0.0));
              
              // Discard fragments outside the rounded rectangle
              if (cornerDist > radius) {
                discard;
              }
              
              // Birch plywood texture
              // Subtle horizontal grain
              float noise1 = fract(sin(dot(vUv * vec2(2.0, 30.0), vec2(12.9898, 78.233))) * 43758.5453);
              float grain = sin(vUv.y * 60.0 + noise1 * 4.0) * 0.08;
              
              // Random knots and imperfections
              float noise2 = fract(sin(dot(vUv * 15.0, vec2(93.989, 67.345))) * 28474.3347);
              float knots = smoothstep(0.97, 1.0, noise2) * -0.2;
              
              // Slight color variation across surface
              float variation = sin(vUv.x * 2.5 + vUv.y * 1.5) * 0.04;
              
              // Lighter streaks (characteristic of birch)
              float streaks = step(0.85, fract(sin(vUv.y * 25.0) * 43.0)) * 0.1;
              
              diffuseColor.rgb *= (1.0 + grain + knots + variation + streaks);
              `,
            );
          }}
        />
      </mesh>
    </RigidBody>
  );
}

export interface Props {
  models: STLModelConfig[];
  height?: string;
  backgroundColor?: string;
  enableReset?: boolean;
  dropDelay?: number;
  className?: string;
}

export default function STLPileViewer({
  models,
  backgroundColor = "rgba(0,0,0,0)",
  dropDelay = 50,
  className,
}: Props) {
  // Expand models based on quantity and randomize order
  const expandedModels = models.flatMap((model) => {
    const quantity = model.quantity || 1;
    return Array.from({ length: quantity }, () => ({
      ...model,
      color: generateRandomColor(),
    }));
  });

  // Shuffle the expanded models array
  const shuffledModels = [...expandedModels].sort(() => Math.random() - 0.5);

  return (
    <div
      style={{ position: "relative", marginTop: "calc((50vh + 144px) * -1)" }}
    >
      <div
        className={className}
        style={{
          width: "100%",
          height: "100vh",
          margin: "2rem auto",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Canvas
          camera={{ position: [0, 3, 15], fov: 35 }}
          shadows
          style={{ background: backgroundColor }}
        >
          {/* Ambient light for overall scene brightness */}
          <ambientLight intensity={0.4} />

          {/* Main key light - simulates overhead/window light */}
          <directionalLight
            castShadow
            position={[5, 8, 5]}
            intensity={1.2}
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0001}
          />

          {/* Fill light - softens shadows from the opposite side */}
          <directionalLight position={[-3, 3, -5]} intensity={0.3} />

          {/* Rim/back light - adds definition and separates objects from background */}
          <directionalLight position={[-5, 5, -8]} intensity={0.5} />

          {/* Subtle top light for additional depth */}
          <pointLight position={[0, 10, 0]} intensity={0.3} distance={15} />

          <Suspense fallback={null}>
            <Physics gravity={[0, -9.81, 0]}>
              <Ground />
              {shuffledModels.map((model, index) => (
                <PhysicsSTL
                  key={index}
                  config={model}
                  delay={index * dropDelay}
                  color={model.color}
                />
              ))}
            </Physics>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
