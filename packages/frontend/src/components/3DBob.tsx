'use client';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader, MTLLoader } from 'three-stdlib';
import { AsciiRenderer, OrbitControls, useGLTF } from '@react-three/drei';
import { HemisphereLight } from 'three';
import * as THREE from 'three';
// function Model3D({ objPath, mtlPath }) {
//   const objRef = useRef();
//   const materials = useLoader(MTLLoader, mtlPath);
//   const obj = useLoader(OBJLoader, objPath, (loader) => {
//     materials.preload();
//     loader.setMaterials(materials);
//   });

//   // Rotar el modelo para que no mire hacia atrás al inicio
//   useEffect(() => {
//     if (objRef.current) {
//       objRef.current.rotation.y = (7 * Math.PI) / 6;

//       objRef.current.scale.set(3, 3, 3);
//     }
//   }, [obj]);

//   return <primitive object={obj} ref={objRef} />;
// }

// function Scene() {
//   return (
//     <Suspense fallback={null}>
//       <ambientLight intensity={0.7} />
//       <directionalLight color='orange' position={[0, 0, 5]} />
//       <Model3D objPath='/models/bob.obj' mtlPath='/models/bob.mtl' />
//       <AsciiRenderer invert fgColor='#ff24e2' bgColor='black' />
//       <OrbitControls />
//     </Suspense>
//   );
// }

function Box({
  url,
  position,
  scale = [1, 1, 1],
}: {
  url: string;
  position: number[];
  scale?: number[];
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(url);

  // Actualizar la rotación en cada frame
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.y = Math.PI;
      ref.current.scale.set(4, 4, 4);
    }
  }, []);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Ajusta la velocidad de rotación según necesites
    }
  });

  return (
    <primitive ref={ref} object={scene} position={position} scale={scale} />
  );
}

function Bob3D() {
  return (
    <Canvas
      camera={{
        position: [0, -1, 5],
        fov: 60,
        near: 0.1,
        far: 1000,
      }}
      style={{
        width: '60vw',
        height: '100vh',
        position: 'absolute',
        right:' 0%',
        top: '-100%',
      }}
    >
      <color attach='background' args={['black']} />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight intensity={1} />
      <Box url='/models/bob.glb' position={[-1, -1, -2]} scale={[2, 2, 2]} />
      <AsciiRenderer fgColor='#e66000' bgColor='transparent' />
    </Canvas>
  );
}
export { Bob3D };
