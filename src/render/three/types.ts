import {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
} from "react"
import { MotionProps } from "../../motion/types"
import { VisualElementConfig } from "../types"
import { ThreeElements } from "./utils/supported-elements"

/**
 * Configuration for the ThreeVisualElement renderer.
 */
export interface ThreeVisualElementConfig extends VisualElementConfig {
    transition?: MotionProps["transition"]
}

/**
 * TODO: TypeScript
 *
 * @public
 */
export type ThreeMotionProps<TagName extends any = any> = TagName & MotionProps

/**
 * TODO: TypeScript
 *
 * Motion-optimised versions of Three's components.
 *
 * @public
 */
export type ThreeMotionComponents = {
    [K in ThreeElements]: ForwardRefComponent<any, ThreeMotionProps<K>>
}

/**
 * @public
 */
export type ForwardRefComponent<T, P> = ForwardRefExoticComponent<
    PropsWithoutRef<P> & RefAttributes<T>
>
