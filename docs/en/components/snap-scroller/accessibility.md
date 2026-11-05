# SnapScroller Accessibility

## Labeling

- The surrounding UI should explain what the snapped pages represent.

## Keyboard Behavior

- `SnapScroller` itself does not impose a complete keyboard navigation model beyond native scrolling and any external controls you add.

## Focus Behavior

- Focus behavior depends on the content rendered inside each page and any external previous/next controls.

## Screen Reader Semantics

- A snap scroller is often easiest to understand when paired with explicit page labels or external pagination/page control.

## Form Semantics

- `SnapScroller` is a layout/navigation primitive, not form input.

## Accessibility Risks

- pages that scroll but have no visible or semantic navigation context
- highly dynamic snap content with no announced state change
