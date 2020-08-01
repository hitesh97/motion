import * as React from "react"
import { ReactThreeFiber } from "react-three-fiber"
import { MotionComponentConfig, MotionProps } from "../../motion"
import { useThreeVisualElement } from "./use-three-visual-element"
import { parseThreeVariant } from "./utils/parse-three-variant"
import { render } from "./render"
import { ThreeMotionComponents } from "./types"
import { createMotionComponent } from "../../motion"
import { Exit } from "../../motion/features/exit"
import { Animation } from "../../motion/features/animation"
import { MotionFeature } from "../../motion/features/types"

/**
 * TODO: TypeScript
 *
 * I'd rather the return type of `custom` to be implicit but this throws
 * incorrect relative paths in the exported types and API Extractor throws
 * a wobbly.
 */
export type CustomThreeComponent<Props> = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<Props & MotionProps> &
        React.RefAttributes<ReactThreeFiber.Object3DNode<any, any>>
>

/**
 * TODO: TypeScript
 *
 * Convert any React component into a `motion` component. The provided component
 * **must** use `React.forwardRef` to the underlying Three component you want to animate.
 *
 * ```jsx
 * const Component = React.forwardRef((props, ref) => {
 *   return <mesh ref={ref} />
 * })
 *
 * const MotionComponent = motion.custom(Component)
 * ```
 *
 * @public
 */

function createMotionProxy(defaultFeatures: MotionFeature[]) {
    type CustomMotionComponent = {
        custom: typeof custom
    }
    type Motion = ThreeMotionComponents & CustomMotionComponent

    const config: MotionComponentConfig<ReactThreeFiber.Object3DNode<
        any,
        any
    >> = {
        defaultFeatures,
        useVisualElement: useThreeVisualElement as any,
        render: render as any,
        animationControlsConfig: {
            makeTargetAnimatable: parseThreeVariant,
        },
    }

    function custom<Props>(
        Component: string | React.ComponentType<Props>
    ): CustomThreeComponent<Props> {
        return createMotionComponent(Component, config)
    }

    const componentCache = new Map<string, any>()
    function get(target: CustomMotionComponent, key: string) {
        if (key === "custom") return target.custom

        if (!componentCache.has(key)) {
            componentCache.set(key, createMotionComponent(key, config))
        }

        return componentCache.get(key)
    }

    return new Proxy({ custom }, { get }) as Motion
}

/**
 * Three components, optimised for use with animation. These can be used as
 * drop-in replacements for any Three component, all properties are supported.
 *
 * @public
 */
export const motion = /*@__PURE__*/ createMotionProxy([Animation, Exit])

/**
 * @public
 */
export const m = /*@__PURE__*/ createMotionProxy([])
