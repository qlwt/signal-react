import { useSignalEffect } from "#src/hook/signal/effect.js"
import * as s from "@qyu/signal-core"
import { useCallback } from "react"

export type UseDOMStyle_Target = {
    readonly style: {
        readonly setProperty: (property: string, value: string | null) => void
    }
}

export type UseDOMStyle_StyleValue = string | null | undefined

export type UseDOMStyle_StyleMap = Readonly<Record<string, UseDOMStyle_StyleValue>>

type Ref = () => UseDOMStyle_Target | null | undefined

export const useDOMStyle = function(ref: Ref, property: string, value: s.OSignal<UseDOMStyle_StyleValue>): void {
    useSignalEffect({
        target: value,

        config: {
            emit: true
        },

        listener: target => {
            const element = ref()

            if (element) {
                const target_output = target.output()

                element.style.setProperty(property, target_output || null)
            }
        }
    })
}

export const useDOMStyleMap = function(ref: Ref, stylemap: s.OSignal<UseDOMStyle_StyleMap>): void {
    useSignalEffect({
        target: stylemap,

        config: {
            emit: true
        },

        listener: useCallback((target: typeof stylemap) => {
            const element = ref()

            if (element) {
                const target_output = target.output()

                for (const [property, value] of Object.entries(target_output)) {
                    element.style.setProperty(property, value || null)
                }
            }
        }, [])
    })
}
