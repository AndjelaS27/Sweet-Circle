import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function CaramelStrawberry(props) {
  const { nodes, materials } = useGLTF('/models/caramelStrawberry.glb');
  
  const groupRef = useRef();

  useEffect(() => {
    console.log('Nodes:', nodes); 
    console.log('Materials:', materials);  
  }, [nodes, materials]);

  if (!nodes || !materials) {
    return null; 
  }

  return (
    <group {...props} dispose={null} ref={groupRef} position={[0, -4, 0]} scale={[30, 30, 30]}>
      
      <primitive object={nodes.Donut_2} />
      <primitive object={nodes.Icing_3} />
      <primitive object={nodes.Sprinkles_4}/>
      
    </group>
  );
}

useGLTF.preload('/models/caramelStrawberry.glb');

