# Kit Architecture Patterns

## Recommended Layers

1. theme class
2. wrappers
3. product patterns
4. public index

## Good Separation

- theme handles branding
- wrappers handle defaults and protected composition
- patterns handle repeated business UI
- public index exposes only approved surface

## Bad Separation

- product code importing raw VegaUI internals everywhere
- wrappers that add no product meaning
- patterns that hide too much behavior without docs
