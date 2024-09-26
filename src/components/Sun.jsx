import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import StarField from "./StarField";

// Sun component
const Sun = () => {
  const sunRef = useRef();

  // Load a texture for the sun (optional, if you have a texture)
  const sunTexture = useTexture("/images/2k_sun.jpg"); // Replace with the path to your sun texture

  // Optional: Rotate the sun over time
  useFrame(() => {
    sunRef.current.rotation.y += 0.002; // Slow rotation to simulate the sun's movement
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}> {/* Position the sun at the center */}
      {/* Sun geometry */}
      <sphereGeometry args={[1, 32, 32]} /> {/* A sphere representing the sun */}
      {/* Sun material */}
      <meshStandardMaterial 
        map={sunTexture} 
        emissive={"#ffaa00"} 
        emissiveIntensity={1} // Reduce emissive intensity for performance
        metalness={0.1} 
        roughness={0.5} // Adjust roughness for a less shiny effect (less rendering complexity)
      />
      {/* Point light to simulate the sun's light */}
      <pointLight 
        intensity={5} // Lower light intensity for performance
        distance={100}  // Reduce light range to limit its impact
        decay={5} 
        color={"#ffffff"} 
      />
    </mesh>
  );
};

export default Sun;

