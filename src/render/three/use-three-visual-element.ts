import { ThreeVisualElement } from "./ThreeVisualElement"
import { useConstant } from "../../utils/use-constant"
import { noop } from "../../utils/noop"
import { MotionProps } from "../../motion/types"
import { UseVisualElement } from "../types"
import { useIsPresent } from "../../components/AnimatePresence/use-presence"

/**
 * TODO: Handle Component and isStatic
 *
 * Three-flavoured variation of the useVisualElement hook. Used to create
 * a ThreeVisualElement for the component.
 */
export const useThreeVisualElement: UseVisualElement<MotionProps, any> = (
    Component,
    props,
    parent,
    isStatic,
    ref
) => {
    const visualElement = useConstant(() => {
        return new ThreeVisualElement(parent, ref as any)
    })

    visualElement.updateConfig(props)

    const isPresent = useIsPresent()
    visualElement.isPresent =
        props.isPresent !== undefined ? props.isPresent : isPresent

    noop(Component)
    noop(isStatic)

    return visualElement
}
