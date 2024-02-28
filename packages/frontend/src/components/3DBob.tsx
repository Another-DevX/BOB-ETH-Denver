//@ts-nocheck
'use client';
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader, MTLLoader } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { HemisphereLight } from 'three';
import * as THREE from 'three';
function Model3D({ objPath, mtlPath }) {
  const objRef = useRef();
  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Rotar el modelo para que no mire hacia atrás al inicio
  useEffect(() => {
    if (objRef.current) {
      objRef.current.rotation.y = (7 * Math.PI) / 6;

      objRef.current.scale.set(3, 3, 3);
    }
  }, [obj]);

  return <primitive object={obj} ref={objRef} />;
}

function Scene() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.7} />
      <directionalLight color='orange' position={[0, 0, 5]} />
      <Model3D objPath='/models/bob.obj' mtlPath='/models/bob.mtl' />
      <OrbitControls />
    </Suspense>
  );
}

function Bob3D() {
  return (
    <div style={{ height: '70vh', width: 'auto' }}>
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
export { Bob3D };
