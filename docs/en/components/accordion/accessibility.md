# Accordion Accessibility

## Labeling

Each trigger should clearly describe the section it controls. If sections contain forms or settings, the trigger text should reflect that scope explicitly.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Expands or collapses the section of the focused trigger. Without `multiple`, expanding a section collapses the open one. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves the focus to the next or previous trigger, through any focusable content of an expanded section. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- Focus should remain on the trigger when the section opens or closes.
- Expanding one item should not unexpectedly move focus into the content.
- Accordion content inside overlays should still be tested in the real stack.

## Screen Reader Semantics

- The header and trigger structure should make the section hierarchy understandable.
- Trigger text should remain meaningful without relying on icon rotation or visual animation.
- Rich content inside an expanded section should still read as part of the same section flow.

## Form Semantics

- If a section contains form controls, labels and errors belong to those controls, not to the accordion root.
- Collapsing a section should not hide the only visible error state without another summary or indicator.

## Accessibility Risks

- Clickable icons that replace the full trigger surface.
- Vague trigger labels such as "Details" when the content is task-specific.
- Hiding required form errors inside collapsed sections without an outer signal.
