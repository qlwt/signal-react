import * as s from "@qyu/signal-core"
import { useLayoutEffect, useMemo } from "react"

export const useSignalValue = function <T>(value: T, deps: unknown[] = [value]): s.OSignal<T> {
    const signal = useMemo(() => s.signal_new_value(value), [])

    useLayoutEffect(
        () => {
            s.batcher.batch_microtask(() => {
                signal.input(value)
            })
        },
        [...deps]
    )

    return signal
}
