---
"@adara-cs/utils": minor
"@adara-cs/ui-kit-web": minor
---

🆕 Slot Component

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
