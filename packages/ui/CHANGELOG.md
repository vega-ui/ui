# @adara-cs/ui-kit-web

## 2.12.0

### Minor Changes

- c529c0c: Added Storybook descriptions to all composite components (e.g. `Pagination`, `Avatar`, `Modal`, `Drawer`, `Table`, `PinField`, etc.), improving documentation clarity and discoverability.

  Each part (such as `PaginationItem`, `AvatarFallback`, `ModalTrigger`, `TableRow`, etc.) now includes a concise functional description to help developers understand its role and usage at a glance.

### Patch Changes

- 2941138: Added nowrap for text in PaginationText
  - @adara-cs/hooks@2.12.0
  - @adara-cs/icons@2.12.0
  - @adara-cs/utils@2.12.0

## 2.11.0

### Minor Changes

- 2704e95: A full-featured, accessible `Pagination` component has been added to the library, including support for controlled and link-based navigation.

  **Included components:**

  - `Pagination`: Root container to layout pagination items and navigation buttons.
  - `PaginationItem`: Represents a selectable page number, with `current` prop support.
  - `PaginationText`: For controlled mode — e.g., “Page 5 of 20”.
  - `PaginationEllipsis`: Displays a non-interactive ellipsis ("...") to indicate skipped pages.
  - `PaginationFirstTrigger`: Navigates to the first page, with `href` or `onClick`.
  - `PaginationPrevTrigger`: Navigates to the previous page, supports disabled state.
  - `PaginationNextTrigger`: Navigates to the next page, also supports `aria-label`.
  - `PaginationLastTrigger`: Jumps to the final page in a sequence.

  Each trigger component extends `IconButtonProps` and supports `href` for anchor-based navigation, or `onClick` for controlled behavior.

  ✅ Fully documented with JSDoc
  ✅ Unit tested with Vitest + Testing Library
  ✅ Includes Storybook demos with link-based and controlled usage

### Patch Changes

- Updated dependencies [2704e95]
  - @adara-cs/icons@2.11.0
  - @adara-cs/utils@2.11.0
  - @adara-cs/hooks@2.11.0

## 2.10.3

### Patch Changes

- d066a85: Changed border to outline into Field-like components
- fc76ab0: Fixed bug: changed border to outline in PhoneSelect
  - @adara-cs/hooks@2.10.3
  - @adara-cs/icons@2.10.3
  - @adara-cs/utils@2.10.3

## 2.10.2

### Patch Changes

- 69c2eb7: Fixed color of Icon inside checkbox in checked status
  - @adara-cs/hooks@2.10.2
  - @adara-cs/icons@2.10.2
  - @adara-cs/utils@2.10.2

## 2.10.1

### Patch Changes

- 88f8516: The goal of this update was to provide full, type-safe, and JSDoc-compliant documentation for all major component prop interfaces in the design system. This improves developer experience (DX), Storybook integration, and onboarding for new team members.

  The following components were reviewed and documented with full descriptions of each prop:

  - AccordionProps
  - AlertProps
  - Avatar / AvatarGroup
  - Badge
  - ButtonBase
  - Card
  - Checkbox
  - Drawer
  - Fieldset
  - FlagIcon
  - Heading
  - IconButton
  - Label
  - Link
  - Modal
  - NumberField
  - Option
  - PhoneField
  - PhoneSelectField
  - PinField
  - Popover
  - SegmentedControl
  - Select
  - Separator
  - Sheet
  - Spinner
  - Table
  - Text
  - TextArea
  - TextField
  - Tooltip
  - VisuallyHidden

  Each prop was annotated using JSDoc with:

  - Purpose and usage context
  - Allowed values and default assumptions
  - Behavioral notes (e.g. controlled vs uncontrolled, accessibility)
  - @adara-cs/hooks@2.10.1
  - @adara-cs/icons@2.10.1
  - @adara-cs/utils@2.10.1

## 2.10.0

### Minor Changes

- b35dde7: 🆕 Slot Component

  • Introduced a universal <Slot /> component
  • Enables the `asChild` pattern (zero-wrapper components)
  • Forwards ref, event handlers, className, style, and data-/aria-attributes
  • Chains both parent and child event handlers without dropping any behavior

  🎯 `asChild` Support in Core Components

  The following components now support the `asChild` prop:

  • Button
  • ButtonBase
  • IconButton
  • CollapsibleTrigger

  This allows them to render their behavior into a custom child element instead of their own default DOM element.

  Example:

  ```tsx
  <Button asChild>
    <a href="/about">Read more</a>
  </Button>
  ```

  🧱 Slot-Based Architecture for Overlays

  The following interactive components have been refactored into explicit Trigger/Content pairs:

  • SheetTrigger / SheetContent
  • DrawerTrigger / DrawerContent
  • TooltipTrigger / TooltipContent
  • ModalTrigger / ModalContent
  • PopoverTrigger / PopoverContent

  Trigger components now support asChild as well, allowing full control over the trigger element:

  ```tsx
  <PopoverTrigger asChild>
    <button>Open Popover</button>
  </PopoverTrigger>
  ```

  📦 Benefits

  • No unnecessary wrappers — cleaner, flatter DOM
  • Full ref support, ideal for imperative focus and DOM access
  • Fully type-safe, including event handler inference
  • Semantic-friendly — works perfectly with <a>, <button>, <form>, <input>, etc.

  📌 Notes

  • When using asChild, the children must be a single valid React element
  • An error will be thrown at runtime if an invalid child is passed

  🚀 This release establishes a foundation for fully slot-based, composable components across the entire design system.

### Patch Changes

- Updated dependencies [b35dde7]
  - @adara-cs/utils@2.10.0
  - @adara-cs/hooks@2.10.0
  - @adara-cs/icons@2.10.0

## 2.9.1

### Patch Changes

- 8711609: Changed as type and deleted package types
- Updated dependencies [8711609]
  - @adara-cs/hooks@2.9.1
  - @adara-cs/icons@2.9.1
  - @adara-cs/utils@2.9.1

## 2.9.0

### Minor Changes

- 2474939: 🎨 Color system

  The color palette has been completely updated:

  All existing variables have been replaced with a new color system with a range of shades from 0 to 1000 (step 50).

  Previously used colors blue, red, green, purple, yellow have been removed and replaced.

  The yellow color has been renamed to orange and replaced with the corresponding new palette.

  New color palettes have been added:

  amber
  amethyst
  beryl
  graphite
  nephritis
  pink
  ruby
  sapphirine
  smoke
  topaz

  New variable structure — for each color are used:

  --color-[name]-[0–1000]
  --color-[name]-accent-[0–1000]

  Added visual documentation to Storybook:

  All 21 shades for each color (0-1000) are displayed.

  The ColorPalette and ColorItem from @storybook/blocks are used.

  🧪 Component states

  Updated styles of field component states (checkbox, input, radio, textarea, etc.):

  Adjusted to the new color system.
  The colors of the states (hover, focus, disabled, error, success) have been revised:
  focus now uses the current accent variables.
  error — from the red palette, success — from the green palette, warning — orange.

  The focus and outline tokens have been updated.

### Patch Changes

- 2474939: Changed badge styles
  - @adara-cs/hooks@2.9.0
  - @adara-cs/icons@2.9.0
  - @adara-cs/types@2.9.0
  - @adara-cs/utils@2.9.0

## 2.8.1

### Patch Changes

- 71c644b: Changed badge styles
  - @adara-cs/hooks@2.8.1
  - @adara-cs/icons@2.8.1
  - @adara-cs/types@2.8.1
  - @adara-cs/utils@2.8.1

## 2.8.0

### Minor Changes

- 7252bc7: Added new component - badge

### Patch Changes

- @adara-cs/hooks@2.8.0
- @adara-cs/icons@2.8.0
- @adara-cs/types@2.8.0
- @adara-cs/utils@2.8.0

## 2.7.2

### Patch Changes

- 25315e3: Changed avatar icon sizes
  - @adara-cs/hooks@2.7.2
  - @adara-cs/icons@2.7.2
  - @adara-cs/types@2.7.2
  - @adara-cs/utils@2.7.2

## 2.7.1

### Patch Changes

- d41f384: Fixed avatar group background color
  - @adara-cs/hooks@2.7.1
  - @adara-cs/icons@2.7.1
  - @adara-cs/types@2.7.1
  - @adara-cs/utils@2.7.1

## 2.7.0

### Minor Changes

- bb3c880: Added new components - avatar and avatar group

### Patch Changes

- @adara-cs/hooks@2.7.0
- @adara-cs/icons@2.7.0
- @adara-cs/types@2.7.0
- @adara-cs/utils@2.7.0

## 2.6.4

### Patch Changes

- f22cbec: Fixed icon size in AccordionTrigger
  - @adara-cs/hooks@2.6.4
  - @adara-cs/icons@2.6.4
  - @adara-cs/types@2.6.4
  - @adara-cs/utils@2.6.4

## 2.6.3

### Patch Changes

- 363d50e: Changed Icon sizes

  femto - 4xs
  pico - 3xs
  nano - 2xs
  mini - xs
  small - sm
  medium - md
  large - lg
  huge - xl

  - @adara-cs/hooks@2.6.3
  - @adara-cs/icons@2.6.3
  - @adara-cs/types@2.6.3
  - @adara-cs/utils@2.6.3

## 2.6.2

### Patch Changes

- b2421cb: Changed main error color
  - @adara-cs/hooks@2.6.2
  - @adara-cs/icons@2.6.2
  - @adara-cs/types@2.6.2
  - @adara-cs/utils@2.6.2

## 2.6.1

### Patch Changes

- 7e066da: Fixed password field: control button placement
  - @adara-cs/hooks@2.6.1
  - @adara-cs/icons@2.6.1
  - @adara-cs/types@2.6.1
  - @adara-cs/utils@2.6.1

## 2.6.0

### Minor Changes

- c31254f: Added new field - password

### Patch Changes

- Updated dependencies [c31254f]
  - @adara-cs/icons@2.6.0
  - @adara-cs/hooks@2.6.0
  - @adara-cs/types@2.6.0
  - @adara-cs/utils@2.6.0

## 2.5.2

### Patch Changes

- 0fbc506: In some cases, when the entire Pin field was highlighted, the caret could appear on each of the highlighted fields, while it should be on only one. Also fixed a bug where it was impossible to select the end field.
  - @adara-cs/hooks@2.5.2
  - @adara-cs/icons@2.5.2
  - @adara-cs/types@2.5.2
  - @adara-cs/utils@2.5.2

## 2.5.1

### Patch Changes

- 2cdc436: Fixed the Collapsible logic, in which content added a little later could be ignored in the height property, which led to its clipping in cases of opening.
  - @adara-cs/hooks@2.5.1
  - @adara-cs/icons@2.5.1
  - @adara-cs/types@2.5.1
  - @adara-cs/utils@2.5.1

## 2.5.0

### Minor Changes

- c7808d0: Added PinField for OTP and pin-codes

### Patch Changes

- Updated dependencies [c7808d0]
  - @adara-cs/utils@2.5.0
  - @adara-cs/hooks@2.5.0
  - @adara-cs/icons@2.5.0
  - @adara-cs/types@2.5.0

## 2.4.18

### Patch Changes

- 7312c64: Added new props to NumberField - allowEmpty, which controll availibility of field to be empty or filled by min number (or zero, if min is a default min value)
  - @adara-cs/hooks@2.4.18
  - @adara-cs/icons@2.4.18
  - @adara-cs/types@2.4.18
  - @adara-cs/utils@2.4.18

## 2.4.17

### Patch Changes

- 91d561e: Fixed drawer prop type and phone select field props
  - @adara-cs/hooks@2.4.17
  - @adara-cs/icons@2.4.17
  - @adara-cs/types@2.4.17
  - @adara-cs/utils@2.4.17

## 2.4.16

### Patch Changes

- 5b0f592: Added disabled props to phone select field
- 00d63a2: Fixed paddings of SelectCombobox, size of SelectArrow and control flex styles
  - @adara-cs/hooks@2.4.16
  - @adara-cs/icons@2.4.16
  - @adara-cs/types@2.4.16
  - @adara-cs/utils@2.4.16

## 2.4.15

### Patch Changes

- af688a4: Renamed onChangeOpen to onOpenChange
  - @adara-cs/hooks@2.4.15
  - @adara-cs/icons@2.4.15
  - @adara-cs/types@2.4.15
  - @adara-cs/utils@2.4.15

## 2.4.14

### Patch Changes

- ff77e2e: Changed checkbox card styles: added secondary theme
  - @adara-cs/hooks@2.4.14
  - @adara-cs/icons@2.4.14
  - @adara-cs/types@2.4.14
  - @adara-cs/utils@2.4.14

## 2.4.13

### Patch Changes

- a18337d: Changed start to flex-start into align-items
- 57c720a: Fixed style exports
  - @adara-cs/hooks@2.4.13
  - @adara-cs/icons@2.4.13
  - @adara-cs/types@2.4.13
  - @adara-cs/utils@2.4.13

## 2.4.12

### Patch Changes

- 609de66: Fixec style export
  - @adara-cs/hooks@2.4.12
  - @adara-cs/icons@2.4.12
  - @adara-cs/types@2.4.12
  - @adara-cs/utils@2.4.12

## 2.4.11

### Patch Changes

- c8d3fa2: Fixed modal props type - state is a bool
  - @adara-cs/hooks@2.4.11
  - @adara-cs/icons@2.4.11
  - @adara-cs/types@2.4.11
  - @adara-cs/utils@2.4.11

## 2.4.10

### Patch Changes

- 4cb0ffd: Fixed bug in number field provided by react-hooks eslint rule.

  The ref value 'wrapper Ref. current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'wrapper Ref. current' to a variable inside the effect, and use that variable in the cleanup function.(react-hooks/ exhaustive-deps\_

  - @adara-cs/hooks@2.4.10
  - @adara-cs/icons@2.4.10
  - @adara-cs/types@2.4.10
  - @adara-cs/utils@2.4.10

## 2.4.9

### Patch Changes

- d94faa1: Fixed problem with select: made it uncontrolled
  - @adara-cs/hooks@2.4.9
  - @adara-cs/icons@2.4.9
  - @adara-cs/types@2.4.9
  - @adara-cs/utils@2.4.9

## 2.4.8

### Patch Changes

- 848e062: Added hidden select to custom select to provide more efficient integration with forms
- 430a948: Improved aria in number field
  - @adara-cs/hooks@2.4.8
  - @adara-cs/icons@2.4.8
  - @adara-cs/types@2.4.8
  - @adara-cs/utils@2.4.8

## 2.4.7

### Patch Changes

- cc017f5: Added ref to select
  - @adara-cs/hooks@2.4.7
  - @adara-cs/icons@2.4.7
  - @adara-cs/types@2.4.7
  - @adara-cs/utils@2.4.7

## 2.4.6

### Patch Changes

- 467bfa6: Allow use max and min as string in number field
  - @adara-cs/hooks@2.4.6
  - @adara-cs/icons@2.4.6
  - @adara-cs/types@2.4.6
  - @adara-cs/utils@2.4.6

## 2.4.5

### Patch Changes

- b055830: added opportunity to put props in SegmentedControlItem
  - @adara-cs/hooks@2.4.5
  - @adara-cs/icons@2.4.5
  - @adara-cs/types@2.4.5
  - @adara-cs/utils@2.4.5

## 2.4.4

### Patch Changes

- 09e3e9d: Change onChange api - deleted second arg with value
  - @adara-cs/hooks@2.4.4
  - @adara-cs/icons@2.4.4
  - @adara-cs/types@2.4.4
  - @adara-cs/utils@2.4.4

## 2.4.3

### Patch Changes

- df8c8f8: Added outline for focus visible segmented control
- 74367f7: Added controlledControl and Provider to SegmentedControl
  - @adara-cs/hooks@2.4.3
  - @adara-cs/icons@2.4.3
  - @adara-cs/types@2.4.3
  - @adara-cs/utils@2.4.3

## 2.4.2

### Patch Changes

- 3c06ae9: Change API for onChange in Select, PhoneSelectField, SheetSelect, ResponsiveSelect, and NumberField
  - @adara-cs/hooks@2.4.2
  - @adara-cs/icons@2.4.2
  - @adara-cs/types@2.4.2
  - @adara-cs/utils@2.4.2

## 2.4.1

### Patch Changes

- 8295ddc: Fixed modal max width on fluid
  - @adara-cs/hooks@2.4.1
  - @adara-cs/icons@2.4.1
  - @adara-cs/types@2.4.1
  - @adara-cs/utils@2.4.1

## 2.4.0

### Minor Changes

- fe19c63: Added responsive modal

### Patch Changes

- @adara-cs/hooks@2.4.0
- @adara-cs/icons@2.4.0
- @adara-cs/types@2.4.0
- @adara-cs/utils@2.4.0

## 2.3.14

### Patch Changes

- 74850e3: Added use client to floating ui context
  - @adara-cs/hooks@2.3.14
  - @adara-cs/icons@2.3.14
  - @adara-cs/types@2.3.14
  - @adara-cs/utils@2.3.14

## 2.3.13

### Patch Changes

- c680639: Added use client directive to createContext
  - @adara-cs/hooks@2.3.13
  - @adara-cs/icons@2.3.13
  - @adara-cs/types@2.3.13
  - @adara-cs/utils@2.3.13

## 2.3.12

### Patch Changes

- e2e42df: Added hidden props to input
  - @adara-cs/hooks@2.3.12
  - @adara-cs/icons@2.3.12
  - @adara-cs/types@2.3.12
  - @adara-cs/utils@2.3.12

## 2.3.11

### Patch Changes

- 64e8ccf: Changed modal border radius
  - @adara-cs/hooks@2.3.11
  - @adara-cs/icons@2.3.11
  - @adara-cs/types@2.3.11
  - @adara-cs/utils@2.3.11

## 2.3.10

### Patch Changes

- 4a01830: Changed min width modal
  - @adara-cs/hooks@2.3.10
  - @adara-cs/icons@2.3.10
  - @adara-cs/types@2.3.10
  - @adara-cs/utils@2.3.10

## 2.3.9

### Patch Changes

- 8877bb7: changes prefix source
  - @adara-cs/hooks@2.3.9
  - @adara-cs/icons@2.3.9
  - @adara-cs/types@2.3.9
  - @adara-cs/utils@2.3.9

## 2.3.8

### Patch Changes

- 8da31e1: added new prop - onPhoneInput
  - @adara-cs/hooks@2.3.8
  - @adara-cs/icons@2.3.8
  - @adara-cs/types@2.3.8
  - @adara-cs/utils@2.3.8

## 2.3.7

### Patch Changes

- 08808c0: Updated to React 19
  - @adara-cs/hooks@2.3.7
  - @adara-cs/icons@2.3.7
  - @adara-cs/types@2.3.7
  - @adara-cs/utils@2.3.7

## 2.3.6

### Patch Changes

- 53a141a: Fixed modal overlay shift
  - @adara-cs/hooks@2.3.6
  - @adara-cs/icons@2.3.6
  - @adara-cs/types@2.3.6
  - @adara-cs/utils@2.3.6

## 2.3.5

### Patch Changes

- 9183fa3: Changed min width for modal
  - @adara-cs/hooks@2.3.5
  - @adara-cs/icons@2.3.5
  - @adara-cs/types@2.3.5
  - @adara-cs/utils@2.3.5

## 2.3.4

### Patch Changes

- 0962903: Fixed modal provider and controlled hooks
  - @adara-cs/hooks@2.3.4
  - @adara-cs/icons@2.3.4
  - @adara-cs/types@2.3.4
  - @adara-cs/utils@2.3.4

## 2.3.3

### Patch Changes

- 7cee615: Separated modal to modal header and bare modal. Deleted props withClose and title from modal component, added these props to ModalHeader
- d10f482: added spinner component & loading prop to button
  - @adara-cs/hooks@2.3.3
  - @adara-cs/icons@2.3.3
  - @adara-cs/types@2.3.3
  - @adara-cs/utils@2.3.3

## 2.3.2

### Patch Changes

- af977f7: Changed options filtering to perf & prop responsiveBreakpoint replaced by isBreakpoint
  - @adara-cs/hooks@2.3.2
  - @adara-cs/icons@2.3.2
  - @adara-cs/types@2.3.2
  - @adara-cs/utils@2.3.2

## 2.3.1

### Patch Changes

- 6c30f27: fixed color
- 4f69ee3: changes deps
  - @adara-cs/hooks@2.3.1
  - @adara-cs/icons@2.3.1
  - @adara-cs/types@2.3.1
  - @adara-cs/utils@2.3.1

## 2.3.0

### Minor Changes

- f7bc797: Added responsive ui package/kit

### Patch Changes

- Updated dependencies [f7bc797]
  - @adara-cs/hooks@2.3.0
  - @adara-cs/utils@2.3.0
  - @adara-cs/icons@2.3.0
  - @adara-cs/types@2.3.0

## 2.2.4

### Patch Changes

- d1bfb6e: changed default select listbow width value
  - @adara-cs/hooks@2.2.4
  - @adara-cs/icons@2.2.4
  - @adara-cs/types@2.2.4
  - @adara-cs/utils@2.2.4

## 2.2.3

### Patch Changes

- dec3081: Changed select listbox max width
  - @adara-cs/hooks@2.2.3
  - @adara-cs/icons@2.2.3
  - @adara-cs/types@2.2.3
  - @adara-cs/utils@2.2.3

## 2.2.2

### Patch Changes

- 0525edc: Fixed inputMode to numeric in NumberField
- Updated dependencies [2bc09bf]
  - @adara-cs/icons@2.2.2
  - @adara-cs/hooks@2.2.2
  - @adara-cs/types@2.2.2
  - @adara-cs/utils@2.2.2

## 2.2.1

### Patch Changes

- 7b1dd02: Fixed build of package
  - @adara-cs/hooks@2.2.1
  - @adara-cs/icons@2.2.1
  - @adara-cs/types@2.2.1
  - @adara-cs/utils@2.2.1

## 2.2.0

### Minor Changes

- a1bfe34: Added icons package

### Patch Changes

- Updated dependencies [a1bfe34]
  - @adara-cs/icons@2.2.0
  - @adara-cs/hooks@2.2.0
  - @adara-cs/types@2.2.0
  - @adara-cs/utils@2.2.0

## 2.1.0

### Minor Changes

- ed7a79b: Added phone field component

### Patch Changes

- @adara-cs/hooks@2.1.0
- @adara-cs/types@2.1.0
- @adara-cs/utils@2.1.0

## 2.0.3

### Patch Changes

- 7042b0e: Changed children type of Heading and added icon
  - @adara-cs/hooks@2.0.3
  - @adara-cs/types@2.0.3
  - @adara-cs/utils@2.0.3

## 2.0.2

### Patch Changes

- fde761d: Changes overflow of drawer content component
  - @adara-cs/hooks@2.0.2
  - @adara-cs/types@2.0.2
  - @adara-cs/utils@2.0.2

## 2.0.1

### Patch Changes

- 6a860bb: Added use client to useCollapsibleContext
  - @adara-cs/hooks@2.0.1
  - @adara-cs/types@2.0.1
  - @adara-cs/utils@2.0.1

## 2.0.0

### Major Changes

- 69b05fa: Added copy icon

### Patch Changes

- @adara-cs/hooks@2.0.0
- @adara-cs/types@2.0.0
- @adara-cs/utils@2.0.0

## 1.1.9

### Patch Changes

- 1971e9d: Fixed bug, when Collapsible component calculate incorrect height
  - @adara-cs/hooks@1.1.9
  - @adara-cs/types@1.1.9
  - @adara-cs/utils@1.1.9

## 1.1.8

### Patch Changes

- f98ee98: Added use client for context hooks
  - @adara-cs/hooks@1.1.8
  - @adara-cs/types@1.1.8
  - @adara-cs/utils@1.1.8

## 1.1.7

### Patch Changes

- 15a2bbb: Fixed use client
  - @adara-cs/hooks@1.1.7
  - @adara-cs/types@1.1.7
  - @adara-cs/utils@1.1.7

## 1.1.6

### Patch Changes

- 7d3c6aa: Changed index.js entry and added use client
  - @adara-cs/hooks@1.1.6
  - @adara-cs/types@1.1.6
  - @adara-cs/utils@1.1.6

## 1.1.5

### Patch Changes

- 3ec1a16: Changed build for ui kit web
  - @adara-cs/hooks@1.1.5
  - @adara-cs/types@1.1.5
  - @adara-cs/utils@1.1.5

## 1.1.4

### Patch Changes

- ac67ebc: Fixed entry point for css
  - @adara-cs/hooks@1.1.4
  - @adara-cs/types@1.1.4
  - @adara-cs/utils@1.1.4

## 1.1.3

### Patch Changes

- 7ec3eaa: Change entry points for packages
- Updated dependencies [7ec3eaa]
  - @adara-cs/hooks@1.1.3
  - @adara-cs/utils@1.1.3
  - @adara-cs/types@1.1.3

## 1.1.2

### Patch Changes

- 93b5f9f: Fixed storybook
- Updated dependencies [54fea47]
- Updated dependencies [93b5f9f]
  - @adara-cs/types@1.1.2
  - @adara-cs/hooks@1.1.2
  - @adara-cs/utils@1.1.2
