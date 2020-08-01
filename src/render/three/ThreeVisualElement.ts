import { ReactThreeFiber } from "react-three-fiber"
import { VisualElement } from "../VisualElement"
import { ThreeVisualElementConfig } from "./types"
import { Presence } from "../../components/AnimateSharedLayout/types"
import { ResolvedValues } from "../../render/types"
import { buildThreeProperties } from "./utils/build-three-properties"
import { readThreeProperty } from "./utils/read-three-properties"

/**
 * TODO: TypeScript
 *
 * A VisualElement for Three elements
 */
export class ThreeVisualElement<
    E extends ReactThreeFiber.Object3DNode<
        any,
        any
    > = ReactThreeFiber.Object3DNode<any, any>
> extends VisualElement<E> {
    /**
     *
     */
    protected defaultConfig: ThreeVisualElementConfig = {}

    /**
     * TODO: Actually read native values
     */
    read(key: string) {
        return readThreeProperty[key](this.element) || 0
    }

    /**
     * TODO: Read native values
     */
    readNativeValue(key: string) {
        return this.read(key)
    }

    /**
     * TODO: Get bounding box
     */
    getBoundingBox() {
        const Axis = { min: 0, max: 1 }

        return { x: Axis, y: Axis }
    }

    /**
     * TODO: Update layout delta
     */
    updateLayoutDelta() {}

    /**
     * A mutable record of properties we want to apply directly to the rendered Element
     * every frame. We use a mutable data structure to reduce GC during animations.
     */
    properties: ResolvedValues = {}

    /**
     * Presence data. This is hydrated by useThreeVisualElement.
     */
    presence?: Presence
    isPresent?: boolean

    config = this.defaultConfig

    /**
     * When a value is removed, we want to make sure it's removed from all rendered data structures.
     */
    removeValue(key: string) {
        super.removeValue(key)
        delete this.properties[key]
    }

    /**
     * Empty the mutable data structures by re-creating them. We can do this every React render
     * as the comparative workload to the rest of the render is very low and this is also when
     * we want to reflect values that might have been removed by the render.
     */
    clean() {
        this.properties = {}
    }

    updateConfig(config: ThreeVisualElementConfig = {}) {
        this.config = { ...this.defaultConfig, ...config }
    }

    /**
     * ========================================
     * Build & render
     * ========================================
     */

    /**
     * Build Three using the latest resolved MotionValues
     */
    build() {
        buildThreeProperties(this.latest, this.properties)
    }

    /**
     * TODO: Handle more than position, rotation and scale
     * by actually merging the properties safely into the Element
     *
     * Render the Element by rebuilding and applying the latest properties.
     */
    render() {
        // Rebuild the latest animated values into properties caches.
        this.build()

        // Loop through attributes and apply them to the Element
        for (const key in this.properties) {
            if (this.element[key].set) {
                const values = this.properties[key] || ([] as any)

                this.element[key].set(...values)
            }
        }
    }
}
