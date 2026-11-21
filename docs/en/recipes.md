# Component recipes

Vega UI ships building blocks without icons or presets: a part such as `SelectIcon` or `CheckboxCheckedIcon` shows the icon you pass as its children. Instead of writing the same parts and icons into every screen, compose them once in a file of your own, with your icon set, and import that component across the app.

## The Idea

A recipe is a short wrapper you copy into your project once, for example into `components/select.tsx`, and then own. Nothing is added to the library: change an icon, a size or the order of the parts in your file, and every use follows. The minimal composition on a component page shows the parts in place; the recipe on the same page wraps them once.

The recipes follow three rules:

- The props of the wrapper pass through to the root part, where the value, the state and the size live. When the root is not the control a `Label` points at, the wrapper takes `id`, and `name` where the input submits, and passes them to the input. When the root only wraps a native input, as in `Checkbox` or `PasswordField`, the props go to that input, like on `<input>`.
- A part that needs a name gets it from a prop: an icon-only button such as the calendar toggle of a date field takes its `aria-label` from a prop of the wrapper, never from text written into it.
- The wrappers keep no state of their own, so a Server Component in Next.js can render them as it renders the parts (see [Next.js and SSR](./nextjs.md#client-boundaries)).

The `My` prefix only keeps the examples apart from the library parts; name your components as you like.

## Recipes

Each component page has the recipe in its "Your Own Component" section.

### Selection controls

- [Select](./components/select/index.md#your-own-component): `MySelect`
- [Combobox](./components/combobox/index.md#your-own-component): `MyCombobox`
- [Checkbox](./components/checkbox/index.md#your-own-component): `MyCheckbox`
- [CheckboxCard](./components/checkbox-card/index.md#your-own-component): `MyCheckboxCard`
- [Switch](./components/switch/index.md#your-own-component): `MySwitch`
- [SegmentedControl](./components/segmented-control/index.md#your-own-component): `MySegmentedControl`, `MySegmentedControlItem`
- [Slider](./components/slider/index.md#your-own-component): `MySlider`

### Text inputs

- [PasswordField](./components/password-field/index.md#your-own-component): `MyPasswordField`
- [NumberField](./components/number-field/index.md#your-own-component): `MyNumberField`
- [PhoneField](./components/phone-field/index.md#your-own-component): `MyPhoneField`
- [PinField](./components/pin-field/index.md#your-own-component): `MyPinField`
- [Fieldset](./components/fieldset/index.md#your-own-component): `MyFieldset`

### Date inputs

- [DateField](./components/date-field/index.md#your-own-component): `MyDateField`
- [DateRangeField](./components/date-range-field/index.md#your-own-component): `MyDateRangeField`
- [DateTimeField](./components/date-time-field/index.md#your-own-component): `MyDateTimeField`
- [Calendar](./components/calendar/index.md#your-own-component): `MyCalendar`

### Overlays

- [Dialog](./components/dialog/index.md#your-own-component): `MyDialog`
- [Drawer](./components/drawer/index.md#your-own-component): `MyDrawer`
- [Sheet](./components/sheet/index.md#your-own-component): `MySheet`
- [Popover](./components/popover/index.md#your-own-component): `MyPopover`
- [Tooltip](./components/tooltip/index.md#your-own-component): `MyTooltip`
- [Menu](./components/menu/index.md#your-own-component): `MyMenuCheckboxItem`, `MyMenuRadioItem`
- [ContextMenu](./components/context-menu/index.md#your-own-component): `MyContextMenu`, `MyMenuSubmenu`

### Data displays

- [Table](./components/table/index.md#your-own-component): `MyTableSortHeading`
- [Tabs](./components/tabs/index.md#your-own-component): `MyTabs`
- [Pagination](./components/pagination/index.md#your-own-component): `MyPagination`

### Status and feedback

- [Alert](./components/alert/index.md#your-own-component): `MyAlert`
- [Avatar](./components/avatar/index.md#your-own-component): `MyAvatar`
- [AvatarStack](./components/avatar-stack/index.md#your-own-component): `MyAvatarStackItem`
- [Meter](./components/meter/index.md#your-own-component): `MyMeter`
- [MeterStack](./components/meter-stack/index.md#your-own-component): `MyMeterStack`
- [Progress](./components/progress/index.md#your-own-component): `MyProgress`
- [Toast](./components/toast/index.md#your-own-component): `MyToastRegion`

### Layout primitives

- [Accordion](./components/accordion/index.md#your-own-component): `MyAccordionItem`
- [Collapsible](./components/collapsible/index.md#your-own-component): `MyCollapsible`
- [Toolbar](./components/toolbar/index.md#your-own-component): `MyToolbarToggle`

## Another Icon Set

The recipes use `@vega-ui/icons`, a set on `lucide-react`; any other set works the same way. An icon part renders through `Slot`, so its child must be one SVG element that takes `className` and `style`: an icon component from Lucide, Tabler, Heroicons or Phosphor, or your own `<svg>`. The part sets the size and `stroke='currentColor'`; props such as `strokeWidth` belong to the icon set, so use the ones your set has.
