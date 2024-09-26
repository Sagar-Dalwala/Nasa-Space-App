import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

const StarField = () => {
  return (
    <Canvas>
      <Stars 
        radius={100} // Radius of the sphere around the scene
        depth={50}   // Starfield depth (closer or farther away stars)
        count={5000} // Number of stars
        factor={4}   // Size factor for stars
        saturation={0} // Star color saturation
        fade        // Fades the stars as they get further away
      />
    </Canvas>
  )
}

export default StarField
