import { ResolvedValues } from "../../types"

/**
 * TODO: TypeScript
 *
 * TODO: Redo from scratch
 *
 * Build Three properties
 *
 * This function converts Motion props:
 *
 * { x: 100, rotateZ: 100 }
 *
 * Into Three properties:
 *
 * {
 *   position: { x: 100, y: 0, z: 0 },
 *   rotation: { x: 0, y: 0, z: 100 },
 * }
 *
 * This function works with mutative data structures.
 */
export function buildThreeProperties(
    latest: ResolvedValues,
    properties: ResolvedValues
): void {
    properties.position = properties.position ?? [0, 0, 0]
    properties.scale = properties.scale ?? [1, 1, 1]
    properties.rotation = properties.rotation ?? [0, 0, 0]

    /**
     * Loop over all our latest animated values and apply them accordingly.
     */
    for (const key in latest) {
        const value = latest[key]

        if (buildThreeProperty[key]) {
            buildThreeProperty[key](properties, value)
        }
    }
}

/**
 * TODO: TypeScript
 *
 * TODO: Automate property matching
 */
const buildThreeProperty: Record<
    string,
    (properties: Record<string, any>, value: any) => void
> = {
    x: (properties, value) => {
        properties.position[0] = value
    },
    y: (properties, value) => {
        properties.position[1] = value
    },
    z: (properties, value) => {
        properties.position[2] = value
    },
    scaleX: (properties, value) => {
        properties.scale[0] = value
    },
    scaleY: (properties, value) => {
        properties.scale[1] = value
    },
    scaleZ: (properties, value) => {
        properties.scale[2] = value
    },
    rotateX: (properties, value) => {
        properties.rotation[0] = value
    },
    rotateY: (properties, value) => {
        properties.rotation[1] = value
    },
    rotateZ: (properties, value) => {
        properties.rotation[2] = value
    },
    rotate: (properties, value) => {
        properties.rotation[2] = value
    },
}
