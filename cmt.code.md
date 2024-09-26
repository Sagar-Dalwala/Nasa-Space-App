// import React, { Suspense, useEffect, useRef, useState } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";

// const StarfieldBackground = () => {
//   const { scene } = useGLTF("/models/hyperspeed_starfield.glb");
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     return () => {
//       scene.traverse((object) => {
//         if (object.isMesh) {
//           object.geometry.dispose();
//           object.material.dispose();
//         }
//       });
//     };
//   }, [scene]);

//   const handleMouseMove = (event) => {
//     setMouse({
//       x: (event.clientX / window.innerWidth) * 2 - 1,
//       y: -(event.clientY / window.innerHeight) * 2 + 1,
//     });
//   };

//   useEffect(() => {
//     window.addEventListener("pointermove", handleMouseMove);
//     return () => window.removeEventListener("pointermove", handleMouseMove);
//   }, []);

//   useFrame(() => {
//     scene.rotation.y = mouse.x * 0.05;
//     scene.rotation.x = mouse.y * 0.05;
//   });

//   return <primitive object={scene} scale={[100, 100, 100]} />;
// };

// const ZoomHandler = () => {
//   const { camera } = useThree();
//   const zoomSpeed = 0.05; // Adjusted for smooth zooming
//   const minZoom = 1;
//   const maxZoom = 50; // Adjust to give a greater zoom range

//   const handleScroll = (event) => {
//     // Scroll down to zoom in, scroll up to zoom out
//     camera.position.z = Math.max(
//       minZoom,
//       Math.min(maxZoom, camera.position.z + event.deltaY * zoomSpeed)
//     );
//   };

//   useEffect(() => {
//     window.addEventListener("wheel", handleScroll);
//     return () => window.removeEventListener("wheel", handleScroll);
//   }, []);

//   return null;
// };

// const SolarSystem = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 10], fov: 75 }}
//       gl={{
//         powerPreference: "high-performance",
//         antialias: true,
//         precision: "mediump",
//       }}
//     >
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} />
//       {/* <Suspense fallback={<span>Loading...</span>}> */}
//         <StarfieldBackground />
//       {/* </Suspense> */}
//       <ZoomHandler />
//       <OrbitControls enablePan={false} />
//     </Canvas>
//   );
// };

// export default SolarSystem;




// // Solar System with Sun
// const SolarSystem = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 15], fov: 75 }} // Adjust camera position to view the sun
//       gl={{
//         powerPreference: "high-performance", // Request high-performance mode
//         antialias: true, // Enable anti-aliasing for smoother edges
//         precision: "mediump", // Lower precision can help on some devices
//       }}
//     >
//       <ambientLight intensity={0.2} /> {/* Low-intensity ambient light */}
      
//       {/* Add Sun to the scene */}
//       <Suspense fallback={null}>
//         <Sun />
//         <StarField /> {/* Starfield as background */}
//       </Suspense>

//       {/* Zoom Handler and Parallax Effect */}
//       <OrbitControls enablePan={false} enableZoom={false} /> {/* Pan and zoom handled by custom components */}
//     </Canvas>
//   );
// };

// export default SolarSystem;
