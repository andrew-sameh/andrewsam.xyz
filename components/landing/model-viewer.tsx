'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Environment } from '@react-three/drei';

import { Mesh } from 'three'
import React, { Suspense } from 'react'
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Model: React.FC = () => {
  //   const { scene } = useGLTF('/impossible_triangle.glb')
  const mesh = useRef<Mesh>(null!)
  // const gltf = useLoader(GLTFLoader, '/spheron.glb');

  const { scene, animations } = useGLTF('/spheron.glb')
  const { actions } = useAnimations(animations, mesh)
  const color = '#0ea5e9'
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.z += 0.01;
  });

  useEffect(() => {
    if (actions && actions.MorphBake) {
      actions.MorphBake.timeScale = 0.5; // Set the animation speed to half
      actions.MorphBake.play()
    }
  }, [actions])

  // Change material color
  useEffect(() => {
    scene.traverse((child:Mesh) => {
      if (child.isMesh && child.material && 'color' in child.material) {
        (child.material as any).color.set(color)
      }
    })
  }, [scene, color])

  return (
    <mesh ref={mesh}>
      <primitive object={scene} />
    </mesh>
  )
}

export const ModelViewer: React.FC = () => {
  return (
    <div className="flex h-1/2 items-center justify-center">
      <Canvas 
              camera={{ position: [3, 3, 3], fov: 30 }} // Adjust position for desired zoom level
      >
        {/* <Canvas className='h-[46rem] w-96'> */}
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <Environment preset="warehouse" />
        {/* <OrbitControls enableZoom={true} /> */}
        <OrbitControls enableZoom={false} target={[0, 0, 0]} />

      </Canvas>
    </div>
  )
}
