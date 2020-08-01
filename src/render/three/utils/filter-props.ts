import { MotionProps } from "../../../motion/types"
import { isValidMotionProp } from "../../../motion/utils/valid-prop"

const isPropValid = (key: string) => !isValidMotionProp(key)

export function filterProps(props: MotionProps) {
    const threeProps = {}

    for (const key in props) {
        if (isPropValid(key)) threeProps[key] = props[key]
    }

    return threeProps
}
