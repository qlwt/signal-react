import * as s from "@qyu/signal-core"
import * as r from "react"

type UseSignalEffect_Sub<Target extends s.ESignal> = {
    (target: Target): void | undefined | VoidFunction
}

type UseSignalEffect_Params<Target extends s.ESignal> = {
    readonly target: Target
    readonly listener: UseSignalEffect_Sub<Target>

    readonly config?: s.Signal_Listen_Config
}

export const useSignalEffect = function <Target extends s.ESignal>(params: UseSignalEffect_Params<Target>): void {
    r.useLayoutEffect(
        () => {
            return s.signal_listen({
                target: params.target,
                config: params.config,
                listener: params.listener,
            })
        },
        [
            params.target,
            params.listener,
            params.config?.emit,
            params.config?.sub_config?.instant
        ]
    )
}
