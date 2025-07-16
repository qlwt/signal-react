import { useSignalEffect } from "#src/hook/signal/effect.js"
import * as sc from "@qyu/signal-core"
import * as r from "react"

type Comparator<T> = (a: T, b: T) => boolean

export type UseSignalConnect_Connection<T> = (
    | {
        readonly active: false
        readonly value: null
    }
    | {
        readonly active: true
        readonly value: T
    }
)

export const useSignalConnect = function <T>(
    src: sc.OSignal<T>, comparator: Comparator<T> = Object.is
): UseSignalConnect_Connection<T> {
    const [state, state_set] = r.useState<UseSignalConnect_Connection<T>>({ active: false, value: null })

    useSignalEffect({
        target: src,

        listener: r.useCallback(
            (target: sc.OSignal<T>) => {
                const target_o = target.output()

                state_set(old_state => {
                    if (!old_state.active || !comparator(old_state.value, target_o)) {
                        return {
                            active: true,
                            value: target_o
                        }
                    }

                    return old_state
                })
            },
            [state_set, comparator]
        ),

        config: r.useMemo(
            () => ({
                emit: true
            }),
            []
        )
    })

    return state
}
