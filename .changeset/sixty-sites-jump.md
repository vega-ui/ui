---
"@adara-cs/ui-kit-web": patch
---

The goal of this update was to provide full, type-safe, and JSDoc-compliant documentation for all major component prop interfaces in the design system. This improves developer experience (DX), Storybook integration, and onboarding for new team members.

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
