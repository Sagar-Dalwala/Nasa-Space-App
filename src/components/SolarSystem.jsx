import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Stars } from "@react-three/drei";
import Sun from "./Sun";

const StarfieldBackground = () => {
  const { scene } = useGLTF("/models/hyperspeed_starfield.glb");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      // Clean up the scene on component unmount
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
    };
  }, [scene]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (event) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  useFrame(() => {
    scene.rotation.y = mouse.x * 0.05;
    scene.rotation.x = mouse.y * 0.05;
  });

  return <primitive object={scene} scale={[100, 100, 100]} />;
};

// Custom component to manage zoom based on scroll
const ZoomHandler = () => {
  const { camera } = useThree(); // Access the camera object
  const zoomSpeed = 0.5;
  const minZoom = 1;
  const maxZoom = 10;

  // Handle zoom on scroll
  const handleScroll = (event) => {
    const newZoom = Math.max(
      minZoom,
      Math.min(maxZoom, camera.position.z + event.deltaY * zoomSpeed)
    );
    camera.position.z += newZoom; // Adjust the Z position of the camera
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  return null;
};

const SolarSystem = () => {
  return (
    <>
      {/* <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          powerPreference: "high-performance", // Request high-performance mode
          antialias: true, // Enable anti-aliasing for smoother edges
          precision: "mediump", // Lower precision can help on some devices
        }}
      > */}

      {/* <ambientLight intensity={0.5} /> */}

      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }} // Lower fov for better performance
        gl={{
          powerPreference: "default", // Request low-power mode for devices with limited performance
          antialias: true, // Disable anti-aliasing for better performance
          precision: "mediump", // Lower precision for better performance
        }}
      >
        
        <ambientLight intensity={0.5} /> {/* Low-intensity ambient light */}
        
        <pointLight position={[10, 10, 10]} />
        {/* Starfield Background */}
        <Suspense fallback={null}>
          {/* <StarfieldBackground /> */}
          <Sun />
        
          <Stars
            radius={100} // Radius of the sphere around the scene
            depth={50} // Starfield depth (closer or farther away stars)
            count={10000} // Number of stars
            factor={4} // Size factor for stars
            saturation={0} // Star color saturation
            fade // Fades the stars as they get further away
            // speed={0.7} // Starfield speed
          />
        </Suspense>
        
        {/* Zoom Handler for scroll-based zooming */}
        {/* <ZoomHandler /> */}
        {/* Add your celestial bodies here */}
        {/* For example, planets, asteroids, etc. */}
        
        {/* Allow user to rotate and zoom */}
        <OrbitControls
          enablePan={false}
          // autoRotateSpeed={0.5}
          // autoRotate
          enableZoom
          enableRotate
        />
      </Canvas>
    </>
  );
};

export default SolarSystem;
