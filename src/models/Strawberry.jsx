import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Strawberry(props) {
  const { nodes, materials } = useGLTF('models/jagoda.glb');
  
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
      <mesh 
        geometry={nodes.Object_4.geometry} 
        material={materials.donut} 
        castShadow
        receiveShadow
      />
      <mesh 
        geometry={nodes.Object_6.geometry} 
        material={materials.icing} 
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('models/jagoda.glb');


