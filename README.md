# Adara UI

React component library, written by developers for developers 🩵
## Installation

Install @adara-cs/ui-kit-web with

**npm:**

```bash
  npm i @adara-cs/ui-kit-web
```

**yarn:**

```bash
  yarn add @adara-cs/ui-kit-web
```

## Start

Connect the styles first. You can do this using a js file, however, we recommend that you connect using ``@import`` and defining layers so that there are no conflicts with specificity.

```css
  @import url('@/shared/styles/normalize.css') layer(reset);
  @import url('@adara-cs/ui-kit-web/dist/index.css') layer(library);

  @layer reset, library, components, overrides;
```

Start using

```typescript
  import { Button } from '@adara-cs/ui-kit-web';

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

