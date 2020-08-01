import { ThreeVisualElement } from "../ThreeVisualElement"

/**
 * Build React props for Three elements
 */
export function buildThreeProps(visualElement: ThreeVisualElement) {
    return {
        ...visualElement.properties,
    }
}
