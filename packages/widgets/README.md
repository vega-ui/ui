# @vega-ui/widgets

The widgets that `@vega-ui/react` components run on, built with [`@vega-ui/core`](../core). Each widget is plain state, steps and output with no dependency on React or the DOM, so a framework adapter can render it and a test can run it in node.

Every widget has its own entry point and there is no root import:

```ts
import { selectWidget } from '@vega-ui/widgets/select'
import { simulate } from '@vega-ui/core/test'

const select = simulate(selectWidget, { items: [] })
```

The package is `0.x`: the shape of a widget can change in a minor release.
