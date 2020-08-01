import * as React from "react"
import * as THREE from "three"
import { Canvas } from "react-three-fiber"
import { AnimatePresence, useCycle } from "@framer"
import { motion } from "../../src/render/three"

/**
 * An example of animating a mesh from R3F via the
 * animate prop, Variants and AnimatePresence.
 */

export const App = () => {
    const [variant, cycle] = useCycle("one", "two", "three", "hidden")

    return (
        <Canvas
            colorManagement
            camera={{ position: [0, 0, 4] }}
            onClick={cycle}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
            }}
        >
            <ambientLight color="#e9f" />
            <pointLight position={[10, 10, 10]} />
            <AnimatePresence>
                {variant !== "hidden" && (
                    <motion.mesh
                        key="mesh"
                        variants={{
                            hidden: {
                                x: -1,
                                y: -1,
                                scaleX: 0,
                                scaleY: 0,
                                scaleZ: 0,
                            },
                            one: {
                                x: 1,
                                y: 1,
                                scaleX: 2,
                                scaleY: 1,
                                scaleZ: 0.5,
                                rotateY: Math.PI,
                                rotateZ: -Math.PI,
                            },
                            two: {
                                y: -1,
                                scaleX: 1,
                                scaleY: 0.5,
                                scaleZ: 2,
                                rotateY: 2,
                                rotateZ: 0,
                            },
                            three: {
                                x: -1,
                                scaleX: 0.5,
                                scaleY: 0.5,
                                scaleZ: 0.5,
                                rotateZ: -2 * Math.PI,
                            },
                        }}
                        initial="hidden"
                        animate={variant}
                        exit="hidden"
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 120,
                        }}
                    >
                        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
                        <meshStandardMaterial attach="material" color="#fff" />
                    </motion.mesh>
                )}
            </AnimatePresence>
        </Canvas>
    )
}
