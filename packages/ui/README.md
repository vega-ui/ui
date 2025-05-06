# Vega UI

React component library, written by developers for developers 🩵

## Installation

Install @vega-ui/react with

**npm:**

```bash
  npm i @vega-ui/react
```

**yarn:**

```bash
  yarn add @vega-ui/react
```

## Start

Connect the styles first. You can do this using a js file, however, we recommend that you connect using ``@import`` and defining layers so that there are no conflicts with specificity.

```css
  @import url('@/shared/styles/normalize.css') layer(reset);
  @import url('@vega-ui/react/style.css') layer(library);

  @layer reset, library, components, overrides;
```

Setup fonts

**Next:**

```typescript jsx
    import { Montserrat } from 'next/font/google';

    const montserratSans = Montserrat({
      subsets: ['latin', 'cyrillic'],
      display: 'swap',
      weight: ['400', '500', '700', '900']
    });
```

**Google Fonts:**

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
```

Start using

```typescript
  import { Button } from '@vega-ui/react';

  ...

  <Button>Hello, world!</Button>
```

## Types

### 📌 Note: Correct typing with `as={Component<'tag'>}`

When passing a component to the `as` prop, and that component is itself a **generic polymorphic component**, such as:

```tsx
function Link<T extends React.ElementType = 'a'>(props: { as?: T } & ...) { ... }
```

TypeScript **cannot infer the concrete type `T`** if you simply write:

```tsx
<Wrapper as={Link} /> // ❌ Event types will be `any`
```

To retain full typing support (e.g. `onClick(e)` as `MouseEvent<HTMLAnchorElement>`), you must **explicitly instantiate the generic**:

```tsx
<Wrapper as={Link<'a'>} /> // ✅ All event types, refs, and attributes are fully typed
```

This approach guarantees:

- Automatic attribute inference (`href`, `type`, `disabled`, etc.)
- Correct DOM event typing (`onClick`, `onChange`, `onSubmit`, etc.)
- Full type safety without `any`
- No wrappers, factories, or custom utilities needed

---

> 💡 It is recommended to use `Component<'tag'>` inside `as` when the component you are passing is itself generic and supports polymorphism.

## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

