# @adara-cs/utils

## 3.0.2

## 3.0.1

## 3.0.0

## 2.14.4

## 2.14.3

## 2.14.2

## 2.14.1

## 2.14.0

## 2.13.0

## 2.12.0

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

## 2.10.3

## 2.10.2

## 2.10.1

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

## 2.9.1

### Patch Changes

- 8711609: Changed as type and deleted package types

## 2.9.0

## 2.8.1

## 2.8.0

## 2.7.2

## 2.7.1

## 2.7.0

## 2.6.4

## 2.6.3

## 2.6.2

## 2.6.1

## 2.6.0

## 2.5.2

## 2.5.1

## 2.5.0

### Minor Changes

- c7808d0: Added PinField for OTP and pin-codes

## 2.4.18

## 2.4.17

## 2.4.16

## 2.4.15

## 2.4.14

## 2.4.13

## 2.4.12

## 2.4.11

## 2.4.10

## 2.4.9

## 2.4.8

## 2.4.7

## 2.4.6

## 2.4.5

## 2.4.4

## 2.4.3

## 2.4.2

## 2.4.1

## 2.4.0

## 2.3.14

## 2.3.13

## 2.3.12

## 2.3.11

## 2.3.10

## 2.3.9

## 2.3.8

## 2.3.7

## 2.3.6

## 2.3.5

## 2.3.4

## 2.3.3

## 2.3.2

## 2.3.1

## 2.3.0

### Minor Changes

- f7bc797: Added responsive ui package/kit

## 2.2.4

## 2.2.3

## 2.2.2

## 2.2.1

## 2.2.0

## 2.1.0

## 2.0.3

## 2.0.2

## 2.0.1

## 2.0.0

## 1.1.9

## 1.1.8

## 1.1.7

## 1.1.6

## 1.1.5

## 1.1.4

## 1.1.3

### Patch Changes

- 7ec3eaa: Change entry points for packages

## 1.1.2

### Patch Changes

- 93b5f9f: Fixed storybook
