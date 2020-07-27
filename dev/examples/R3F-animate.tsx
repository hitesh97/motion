import * as React from "react"
import * as THREE from "three"
import { Canvas } from "react-three-fiber"

/**
 * An example of animating a mesh from R3F via the animate prop
 */

export const App = () => (
    <Canvas colorManagement camera={{ position: [0, 0, 2] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color="#fff" />
        </mesh>
    </Canvas>
)
