# Tabs Accessibility

## Labeling

- Give `TabsList` a name with `aria-label`, or point `aria-labelledby` at a visible heading. The components never set a label themselves.
- Each panel is named by its tab through `aria-labelledby`, so a tab label should say what its panel holds.
- A disabled tab should explain why it is unavailable, for example with `aria-describedby` pointing at a `HelperText`.

## Keyboard Behavior

<!-- AUTO-GENERATED:KEYBOARD:start -->
| Key | Action |
| --- | --- |
| <kbd>→</kbd> / <kbd>←</kbd> | In a horizontal list: moves the focus to the next or previous enabled tab, skipping disabled ones, and shows it unless `activation` is `manual`. From the last tab it moves to the first, and from the first to the last. The keys follow the text direction, so they are mirrored in right-to-left. |
| <kbd>↓</kbd> / <kbd>↑</kbd> | In a vertical list: moves the focus to the next or previous enabled tab and shows it unless `activation` is `manual`, wrapping around the ends. |
| <kbd>Home</kbd> / <kbd>End</kbd> | Moves the focus to the first or last enabled tab and shows it unless `activation` is `manual`. |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | With `activation="manual"`: shows the focused tab. |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | The list is one tab stop on the selected tab: Tab moves the focus from it to the shown panel, and Shift+Tab from the panel back to the selected tab. |
<!-- AUTO-GENERATED:KEYBOARD:end -->

## Focus Behavior

- The list is one Tab stop: the selected tab, or the first enabled tab when the selected one is disabled.
- In manual activation the focused tab is the Tab stop while the focus is in the list; when the focus leaves, it goes back to the selected tab.
- The shown panel has `tabIndex={0}`, so Tab from the list reaches it even when it holds only text. Hidden panels are out of the focus order.
- Focus outlines are drawn inside the tab, so a list in a scrolling or clipped container still shows them.

## Screen Reader Semantics

- `TabsList` is a `tablist` with `aria-orientation`, each `TabsTab` is a `tab` with `aria-selected` and `aria-controls`, and each `TabsPanel` is a `tabpanel` labelled by its tab.
- Hidden panels are `aria-hidden`, so a screen reader does not meet an empty panel for every hidden tab. Their text is still found by find in page.
- Disabled tabs are native disabled buttons and are announced as unavailable.

## Accessibility Risks

- A `TabsList` without a name.
- Tabs used for navigation between URLs: screen readers announce them as tabs, not links.
- Many tabs in a narrow list: tabs that wrap or overflow are hard to scan. Prefer fewer tabs or a vertical list.
- `activation='automatic'` on panels that take long to show: every arrow press starts the work.
