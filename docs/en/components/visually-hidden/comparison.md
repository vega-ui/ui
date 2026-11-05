# VisuallyHidden Comparison

## Quick Decision Rule

Use `VisuallyHidden` when content should stay available to assistive technology but not appear visually. Use normal text when the information should be visible to everyone.

## `VisuallyHidden` vs visible helper text

- Use `VisuallyHidden` for accessibility-only content.
- Use visible helper text when the guidance benefits all users.

## `VisuallyHidden` vs `aria-label`

- Use `VisuallyHidden` when you want real DOM content that can be referenced or composed.
- Use `aria-label` for short direct labels when no extra content node is needed.

## Choose This Component When

- content should remain accessible but not visible
- a hidden description or label node is useful

## Do Not Choose This Component When

- the information should be visible in the normal UI
- hidden text is being used to avoid fixing visible UX
