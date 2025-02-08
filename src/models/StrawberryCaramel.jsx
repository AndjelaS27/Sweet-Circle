import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Color } from 'three';

export default function StrawberryCaramel(props) {
  const { nodes, materials } = useGLTF('/models/strawberryCaramel.glb');
  
  const groupRef = useRef();
  console.log(nodes)
  console.log(materials)
  if (!nodes || !materials) {
    return null; 
  }
  const brownColor = new Color(0x6f4f28); 

  return (
    <group {...props} dispose={null} ref={groupRef} position={[0, -4, 0]} scale={[30, 30, 30]}>
      
      <primitive object={nodes.Donut_2} />
      <primitive object={nodes.Icing_3} />
      <primitive object={nodes.Sprinkles_4}/>
      
    </group>
  );
}

useGLTF.preload('/models/strawberryCaramel.glb');

