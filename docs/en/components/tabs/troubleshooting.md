# Tabs Troubleshooting

## Empty Space Or Lines Appear Between The List And The Panel

### Symptom

The gap under the list is larger for some tabs than for others, borders and padding of other panels show up below the shown one, or the shown panel of a vertical list is narrower than the space beside the list.

### Likely Cause

Hidden panels use `hidden="until-found"`, which hides their content but keeps their box. Padding, borders, margins and `flex: 1` on `TabsPanel`, and a flex or grid `gap` on the element around the panels, apply to every hidden panel too.

### How To Verify

- Inspect a hidden panel: it has `hidden="until-found"` and a zero-height box with your padding or border.
- Check whether the element that holds the panels has `gap`.

### Fix

- Move the spacing to an element inside `TabsPanel`, or to a wrapper around the whole tabs.
- Size one wrapper around all the panels, for example with `flex: 1` beside a vertical list, instead of each `TabsPanel`.
- Replace a `gap` around the panels with a margin on `TabsList`; the default styles already do this.

## Tabs Change The Page URL

### Symptom

Each tab should open its own URL, but tabs are buttons that switch content in place.

### Likely Cause

The interface is navigation, not tabs. `TabsTab` is always a button; links as tabs are not supported.

### How To Verify

- The back button or a shared link should restore the choice.
- Each choice loads its own page or route.

### Fix

- Render a `<nav aria-label="…">` with links, and mark the current one with `aria-current="page"`.
- Keep `Tabs` for content switched in place on one page.

## The Arrow Keys Do Not Show The Tab

### Symptom

The arrow keys move the focus, but the panel stays the same until Enter or Space.

### Likely Cause

`activation='manual'` is set on `Tabs`.

### How To Verify

- Check the `activation` prop of `Tabs`.

### Fix

- Remove `activation` to get the default `automatic` mode, or keep `manual` on purpose for panels that load data.

## An Invalid Field In A Hidden Tab Blocks The Submit

### Symptom

Submitting the form does nothing, and the browser shows no message.

### Likely Cause

The invalid field is in a hidden panel, so the browser cannot focus it to show the message.

### How To Verify

- Fill all fields of the shown tab and submit: the form still does not submit.
- In the console, `form.querySelector(':invalid')` returns a field inside a hidden panel.

### Fix

- Handle `invalid` on the form in the capture phase and select the tab of the first invalid field, as in the [account settings example](./examples.md#formintegration-account-settings-split-into-tabs).
