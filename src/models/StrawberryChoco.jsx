import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function StrawberryChoco(props) {
  const { nodes, materials } = useGLTF('/models/strawberryChocolate.glb');
  
  const groupRef = useRef();

  // Proveravamo da li su nodovi i materijali dostupni
  if (!nodes || !materials) {
    return null; 
  }

  // Renderovanje svih nodova i mesheva iz modela
  return (
    <group {...props} dispose={null} ref={groupRef} position={[0, -4, 0]} scale={[30, 30, 30]}>
      
      <primitive object={nodes.Donut_2} />
      <primitive object={nodes.Icing_3} />
      <primitive object={nodes.Sprinkles_4}/>
      
    </group>
  );
}

useGLTF.preload('/models/strawberryChocolate.glb');


