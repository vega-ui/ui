# CheckboxCard API

## Root API


<!-- AUTO-GENERATED:ROOT_API:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `orientation` | `CheckboxCardOrientation` | `'vertical'` | No | Defines the layout direction of the card content. |
| `variant` | `CheckboxVariant` | `'primary'` | No | Variant that controls the visual style of the checkbox card. Typically used to switch between brand or neutral themes. |
| `size` | `CardSize` | `'md'` | No | Specifies the size of the card. Affects padding, font size, and possibly layout behavior. |
| `ref` | `Ref<HTMLElement>` | — | No | Ref forwarded to the card’s root element (`<article>`, or the child element with `asChild`). Useful for DOM measurements, scrolling, or imperative logic. |
| `asChild` | `boolean` | — | No | If true, renders the trigger as a child element using `Slot`. This enables custom wrappers (e.g., `<a>`, `<div>`) to inherit behavior. |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:ROOT_API:end -->

## Child Parts API

## `CheckboxCardContent`

Primary content wrapper for title and description.

<!-- AUTO-GENERATED:PART_API:CheckboxCardContent:start -->
Also accepts all `<div>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardContent:end -->

## `CheckboxCardTitle`

Short primary label.

<!-- AUTO-GENERATED:PART_API:CheckboxCardTitle:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `as` | `HeadingAs` | — | No | The HTML heading tag to render (e.g., 'h1', 'h2'). Defines semantic structure and accessibility level. |
| `size` | `HeadingSize` | — | No | Visual size of the heading, independent of the `as` tag. Typically mapped to a design system's type scale. Accepts values from 1 (smallest) to 11 (largest). |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight of the heading text. 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLHeadingElement>` | — | No | Ref to the native HTML heading element. Useful for DOM access or focus management. |

Also accepts all `<h1>–<h6>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardTitle:end -->

## `CheckboxCardDescription`

Supporting text under the title.

<!-- AUTO-GENERATED:PART_API:CheckboxCardDescription:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `TextSize` | — | No | Visual size of the text, typically mapped to the design system’s type scale. |
| `asChild` | `boolean` | — | No | If true, renders the text as a child component using `Slot`. Useful for compatibility with native elements or other components. |
| `fontWeight` | `400 \| 500 \| 600 \| 700 \| 900` | — | No | Font weight applied to the text. Common values: 400: Regular; 500: Medium; 600: Semi-bold; 700: Bold; 900: Extra bold |
| `ref` | `Ref<HTMLSpanElement>` | — | No | Ref to the underlying `<span>` or slotted element. Useful for measuring, focusing, or DOM manipulation. |

Also accepts all `<span>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardDescription:end -->

## `CheckboxCardControl`

Visual control region for the checkbox affordance.

<!-- AUTO-GENERATED:PART_API:CheckboxCardControl:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `variant` | `CheckboxVariant` | — | No | Visual variant of the checkbox, for theme or context switching. |
| `size` | `CheckboxSize` | — | No | Size of the checkbox input and its visual marker. |
| `ref` | `Ref<HTMLLabelElement>` | — | No | Ref to the native label element. |

Also accepts all `<label>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardControl:end -->

## `CheckboxCardControlInput`

The native checkbox input. Checked state is set here: `checked`, `defaultChecked`, `onChange`, `disabled` and `indeterminate`.

<!-- AUTO-GENERATED:PART_API:CheckboxCardControlInput:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `indeterminate` | `boolean` | — | No | Sets the native `indeterminate` property of the input. Often used when only some nested items are selected. It has no HTML attribute, so it is applied imperatively. |
| `ref` | `Ref<HTMLInputElement>` | — | No | The optional `ref` provides direct access to the underlying * `<input type="checkbox">` element for advanced use cases such * as focus management or imperative state inspection. |

Also accepts all `<input>` attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardControlInput:end -->

## `CheckboxCardControlCheckedIcon`

Checked-state icon.

<!-- AUTO-GENERATED:PART_API:CheckboxCardControlCheckedIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardControlCheckedIcon:end -->

## `CheckboxCardControlIndeterminateIcon`

Indeterminate-state icon.

<!-- AUTO-GENERATED:PART_API:CheckboxCardControlIndeterminateIcon:start -->
| Prop | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `size` | `IconSize` | — | No | Predefined size token for the icon. Can be overridden by explicit width and height. |
| `ref` | `Ref<SVGSVGElement>` | — | No | Ref to the SVG element |
| `strokeWidth` | `number` | — | No | Stroke thickness for SVG lines and shapes (in px or pt). |
| `children` | `ReactNode` | — | No | Icon content (required). Accepts: icons from `~/icons`; custom inline SVG; third-party icon components (e.g. Lucide, Tabler) |

Also accepts all HTML attributes.
<!-- AUTO-GENERATED:PART_API:CheckboxCardControlIndeterminateIcon:end -->

## Hooks

## `useCheckboxCardContext`

Advanced hook for custom card-control wrappers that need size or variant.

## Types

| Type | Definition | Notes |
| --- | --- | --- |
| `CheckboxCardProps` | root prop type | Extends `Card` props. |
| `CheckboxCardContentProps` | content props | Layout wrapper props. |
| `CheckboxCardTitleProps` | title props | Text heading props. |
| `CheckboxCardDescriptionProps` | description props | Secondary text props. |
| `CheckboxCardControlProps` | control props | Control wrapper props. |

## State Model

- Checked state lives on `CheckboxCardControlInput`, like on a native checkbox: uncontrolled through `defaultChecked`, controlled through `checked` and `onChange`.
- `indeterminate` on `CheckboxCardControlInput` is a visual and semantic mixed state on top of checkbox behavior.
- Variant and size flow through checkbox-card context.

## Integration Notes

- Give `CheckboxCardControlInput` a `name` when native form submission matters.
- Prefer `Radio` or `SegmentedControl` for single-choice groups.
- Keep the whole card as the labeled click target rather than shrinking interaction to the tiny control.
