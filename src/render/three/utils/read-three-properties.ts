/**
 * TODO: TypeScript
 *
 * TODO: Automate property matching
 */
export const readThreeProperty: Record<
    string,
    (element: Record<string, any>) => any
> = {
    x: element => element.position.x,
    y: element => element.position.y,
    z: element => element.position.z,
    scaleX: element => element.scale.x,
    scaleY: element => element.scale.y,
    scaleZ: element => element.scale.z,
    rotateX: element => element.rotation.x,
    rotateY: element => element.rotation.y,
    rotateZ: element => element.rotation.z,
    rotate: element => element.rotation.z,
}
