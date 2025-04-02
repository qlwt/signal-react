import { useSignalEffect } from "#src/hook/signal/effect.js"
import * as s from "@qyu/signal-core"
import { useCallback } from "react"

export type UseDOMAttribute_Target = {
    readonly removeAttribute: (property: string) => void
    readonly setAttribute: (property: string, value: string) => void
}

export type UseDOMAttribute_AttributeValue = string | null | undefined

export type UseDOMAttribute_AttributeMap = Readonly<Record<string, UseDOMAttribute_AttributeValue>>

type Ref = () => UseDOMAttribute_Target | null | undefined

export const useDOMAttribute = function(ref: Ref, property: string, value: s.OSignal<UseDOMAttribute_AttributeValue>): void {
    useSignalEffect({
        target: value,

        config: {
            emit: true
        },

        listener: target => {
            const element = ref()

            if (element) {
                const target_output = target.output()

                if (typeof target_output === "string") {
                    element.setAttribute(property, target_output)
                } else {
                    element.removeAttribute(property)
                }
            }
        }
    })
}

export const useDOMAttributeMap = function(ref: Ref, attrmap: s.OSignal<UseDOMAttribute_AttributeMap>): void {
    useSignalEffect({
        target: attrmap,

        config: {
            emit: true
        },

        listener: useCallback((target: typeof attrmap) => {
            const element = ref()

            if (element) {
                const target_output = target.output()

                for (const [property, value] of Object.entries(target_output)) {
                    if (typeof value === "string") {
                        element.setAttribute(property, value)
                    } else {
                        element.removeAttribute(property)
                    }
                }
            }
        }, [])
    })
}

