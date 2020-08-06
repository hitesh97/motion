import { MotionProps } from "../../types"
import { FeatureProps, MotionFeature } from "../types"
import React, { useContext } from "react"
import {
    SyncLayoutBatcher,
    SharedLayoutSyncMethods,
    isSharedLayout,
    SharedLayoutContext,
} from "../../../components/AnimateSharedLayout/SharedLayoutContext"
import {
    SharedLayoutTreeContext,
    SharedLayoutTreeConfig,
} from "../../../components/SharedLayoutTree"

interface SyncProps extends FeatureProps {
    syncLayout: SharedLayoutSyncMethods | SyncLayoutBatcher
    treeConfig?: React.MutableRefObject<SharedLayoutTreeConfig>
    _forcedTreeUpdate?: number
}

/**
 * This component is responsible for scheduling the measuring of the motion component
 */
class Measure extends React.Component<SyncProps> {
    private previousLayoutOrder: number | null = null
    /**
     * If this is a child of a SyncContext, register the VisualElement with it on mount.
     */
    componentDidMount() {
        const { syncLayout, visualElement, treeConfig } = this.props
        isSharedLayout(syncLayout) &&
            syncLayout.register(visualElement, treeConfig?.current)
    }

    /**
     * If this is a child of a SyncContext, notify it that it needs to re-render. It will then
     * handle the snapshotting.
     *
     * If it is stand-alone component, add it to the batcher.
     */
    getSnapshotBeforeUpdate() {
        const { syncLayout, visualElement } = this.props

        if (isSharedLayout(syncLayout)) {
            syncLayout.syncUpdate()
        } else {
            visualElement.snapshotBoundingBox()
            syncLayout.add(visualElement)
        }

        return null
    }

    componentDidUpdate(prevProps: SyncProps) {
        const { syncLayout, visualElement, layoutId, treeConfig } = this.props
        if (isSharedLayout(syncLayout)) {
            /**
             * If we've changed the layoutId or the _layoutOrder we need to re-register
             * this visualElement with AnimateSharedLayout. This will ensure it gets removed
             * from the previous stack and placed in the new one in the correct place.
             */
            if (
                layoutId !== prevProps.layoutId ||
                treeConfig?.current.layoutOrder !== this.previousLayoutOrder
            ) {
                // console.log(
                //     "removing and registering",
                //     treeConfig?.current.layoutOrder
                // )
                syncLayout.remove(visualElement)
                syncLayout.register(visualElement, treeConfig?.current)
            }
        } else {
            /**
             * If this component isn't the child of a SyncContext, make it responsible for flushing
             * the layout batcher
             */
            syncLayout.flush()
        }
    }
    render() {
        return null
    }
}

function MeasureContextProvider(props: FeatureProps) {
    const syncLayout = useContext(SharedLayoutContext)
    const treeContext = useContext(SharedLayoutTreeContext)
    return (
        <Measure
            {...props}
            syncLayout={syncLayout}
            _forcedTreeUpdate={treeContext?.forcedUpdate}
            treeConfig={treeContext?.treeConfig}
        />
    )
}

export const MeasureLayout: MotionFeature = {
    key: "measure-layout",
    shouldRender: (props: MotionProps) =>
        !!props.drag || !!props.layout || !!props.layoutId,
    getComponent: () => MeasureContextProvider,
}
