# Vega UI Monorepo

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
  @import url('@vega-ui/react/style') layer(library);

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


## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

