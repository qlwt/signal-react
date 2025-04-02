# @qyu/signal-core

Utility react hooks for @qyu/signal-core

## List of hooks

### useSignalValue

Creates OSignal, updates it's value after render

```tsx
const App = () => {
    const param = 10
    const root = useSignalValue(
        0,
        // dependencies, optional
        [10]
    )
}
```

### useSignalOutput

Extracts Signal output value to state, rerender when it updates

```tsx
const App = () => {
    const root_output = useSignalOutput(root)
}
```

### useSignalEventDeps

Will fire event on deps change

```tsx
const App = () => {
    const esignal_deps = useSignalEventDeps([1, ""])
}
```

### useSignalEffect

Will attach listener to target

```tsx
const App = () => {
    const root = useSignalValue(0)

    useSignalEffect({
        target: root,
        listener: target => console.log(target.output()),

        config: {
            // emit on initial effect
            emit: true
        }
    })
}
```

### useDOMStyle

```tsx
const App = (props) => {
    const root = useSignalValue(0)
    const ref = useRef<HTMLElement | null>()

    // will update left when root updates
    useDOMStyle(() => ref.current, "left", osignal_new_pipe(root, v => `${v}px`))

    // will update left and background
    useDOMStyles(
        () => ref.current,
        osignal_new_mergemap({
            backgroundColor: props.background,
            left: osignal_new_pipe(root, v => `${v}px`)
        })
    )
}
```

### useDOMAttribute

```tsx
const App = (props) => {
    const root = useSignalValue(0)
    const ref = useRef<HTMLElement | null>()

    // will update data-left when root updates
    useDOMAttribute(() => ref.current, "data-left", osignal_new_pipe(root, v => `${v}px`))

    // will update data-left and data-background
    useDOMAttributes(
        () => ref.current,
        osignal_new_mergemap({
            "data-background": props.background,
            "data-left": osignal_new_pipe(root, v => `${v}px`)
        })
    )
}
```
