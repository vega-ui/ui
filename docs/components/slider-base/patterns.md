# SliderBase Patterns

## Custom Visual Slider Shell

When to use:
Build a project-specific slider wrapper that still inherits VegaUI track and thumb styling.

Composition notes:
Keep the root, progress, and thumb in sync on `value` and `orientation`, then add any external interaction layer around them.

Trade-offs:
You gain layout flexibility, but also own the missing keyboard, pointer, and announcement logic.

```tsx
<SliderBase value={level}>
  <SliderBaseProgress />
  <SliderBaseThumb />
</SliderBase>
```

## Native Form Mirror

When to use:
The visual slider is custom, but the chosen value still has to reach `FormData`.

Composition notes:
Place `SliderBaseHiddenInput` inside the thumb or another stable child of the root.

Trade-offs:
Native submission works, but interactive slider semantics still depend on the outer wrapper.

```tsx
<SliderBaseThumb>
  <SliderBaseHiddenInput name='level' value={level} />
</SliderBaseThumb>
```
