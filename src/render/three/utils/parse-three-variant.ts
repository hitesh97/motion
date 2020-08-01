import { MakeTargetAnimatable } from "../../../animation/VisualElementAnimationControls"
import { noop } from "../../../utils/noop"
import { ThreeVisualElement } from "../ThreeVisualElement"

/**
 * TODO: Handle visualElement and origin
 *
 * Parse a Three variant to make it animatable.
 */
export const parseThreeVariant: MakeTargetAnimatable = (
    visualElement: ThreeVisualElement,
    target,
    origin,
    transitionEnd
) => {
    noop(visualElement)
    noop(origin)

    return { target, transitionEnd }
}
