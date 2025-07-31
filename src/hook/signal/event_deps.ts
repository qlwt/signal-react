import type { ESignal } from "@qyu/signal-core";
import * as sc from "@qyu/signal-core";
import * as react from "react";

export const useSignalEventDeps = function(deps: unknown[]): ESignal {
    const [esignal, emit] = react.useMemo(() => sc.esignal_new_manual(), [])

    react.useLayoutEffect(
        () => {
            emit()
        },
        deps
    )

    return esignal
}
