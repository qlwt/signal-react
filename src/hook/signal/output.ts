import { useSignalEffect } from "#src/hook/signal/effect.js"
import * as s from "@qyu/signal-core"
import { useCallback, useState } from "react"

type Comparator<T> = (a: T, b: T) => boolean

export const useSignalOutput = function <O>(src: s.OSignal<O>, eq: Comparator<O> = Object.is): O {
    const [state, state_set] = useState<O>(src.output())

    useSignalEffect({
        target: src,

        listener: useCallback((target: s.OSignal<O>) => {
            const target_o = target.output()

            state_set(state_old => {
                if (eq(state_old, target_o)) {
                    // no update
                    return state_old
                }

                // update
                return target_o
            })
        }, [eq]),

        config: {
            emit: true
        }
    })

    return state
}
