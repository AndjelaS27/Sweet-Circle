import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Donut(props) {
  const { nodes, materials } = useGLTF('/models/krofna.glb');
  
  const groupRef = useRef();

  useEffect(() => {
    console.log('Nodes:', nodes); 
    console.log('Materials:', materials);  
  }, [nodes, materials]);

  if (!nodes || !materials) {
    return null; 
  }

  return (
    <group {...props} dispose={null} ref={groupRef} position={[0, 0, 0]} scale={[20.5, 20.5, 20.5]}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.donut} />
      <mesh geometry={nodes.Object_6.geometry} material={materials.icing} />
    </group>
  );
}

useGLTF.preload('/models/krofna.glb');

