# Рецепты компонентов

Vega UI поставляет строительные блоки без иконок и пресетов: часть вроде `SelectIcon` или `CheckboxCheckedIcon` показывает иконку, которую вы передали дочерним элементом. Чтобы не писать одни и те же части и иконки на каждом экране, соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент по всему приложению.

## Идея

Рецепт — короткая обёртка, которую вы один раз копируете в проект, например в `components/select.tsx`, и дальше владеете ею сами. В библиотеку ничего не добавляется: поменяйте иконку, размер или порядок частей в своём файле, и за ним последуют все места использования. Минимальная композиция на странице компонента показывает части на месте, а рецепт на той же странице оборачивает их один раз.

Рецепты следуют трём правилам:

- Пропсы обёртки уходят в корневую часть, где живут значение, состояние и размер. Когда корень — не тот контрол, на который указывает `Label`, обёртка принимает `id`, а если поле отправляется с формой, и `name`, и передаёт их полю ввода. Когда корень лишь оборачивает нативное поле, как в `Checkbox` или `PasswordField`, пропсы уходят в это поле, как у `<input>`.
- Часть, которой нужно имя, получает его из пропса: кнопка из одной иконки, например кнопка календаря у поля даты, берёт `aria-label` из пропса обёртки, а не из текста, вписанного в неё.
- Обёртки не хранят своего состояния, поэтому в Next.js их может рендерить серверный компонент, так же как сами части (см. [Next.js и SSR](./nextjs.md#клиентские-границы)).

Префикс `My` только отделяет примеры от частей библиотеки; называйте свои компоненты как угодно.

## Рецепты

Рецепт каждого компонента лежит на его странице, в разделе «Свой компонент».

### Элементы выбора

- [Select](./components/select/index.md#свой-компонент): `MySelect`
- [Combobox](./components/combobox/index.md#свой-компонент): `MyCombobox`
- [Checkbox](./components/checkbox/index.md#свой-компонент): `MyCheckbox`
- [CheckboxCard](./components/checkbox-card/index.md#свой-компонент): `MyCheckboxCard`
- [Switch](./components/switch/index.md#свой-компонент): `MySwitch`
- [SegmentedControl](./components/segmented-control/index.md#свой-компонент): `MySegmentedControl`, `MySegmentedControlItem`
- [Slider](./components/slider/index.md#свой-компонент): `MySlider`

### Текстовый ввод

- [PasswordField](./components/password-field/index.md#свой-компонент): `MyPasswordField`
- [NumberField](./components/number-field/index.md#свой-компонент): `MyNumberField`
- [PhoneField](./components/phone-field/index.md#свой-компонент): `MyPhoneField`
- [PinField](./components/pin-field/index.md#свой-компонент): `MyPinField`
- [Fieldset](./components/fieldset/index.md#свой-компонент): `MyFieldset`

### Ввод дат

- [DateField](./components/date-field/index.md#свой-компонент): `MyDateField`
- [DateRangeField](./components/date-range-field/index.md#свой-компонент): `MyDateRangeField`
- [DateTimeField](./components/date-time-field/index.md#свой-компонент): `MyDateTimeField`
- [Calendar](./components/calendar/index.md#свой-компонент): `MyCalendar`

### Оверлеи

- [Dialog](./components/dialog/index.md#свой-компонент): `MyDialog`
- [Drawer](./components/drawer/index.md#свой-компонент): `MyDrawer`
- [Sheet](./components/sheet/index.md#свой-компонент): `MySheet`
- [Popover](./components/popover/index.md#свой-компонент): `MyPopover`
- [Tooltip](./components/tooltip/index.md#свой-компонент): `MyTooltip`
- [Menu](./components/menu/index.md#свой-компонент): `MyMenuCheckboxItem`, `MyMenuRadioItem`
- [ContextMenu](./components/context-menu/index.md#свой-компонент): `MyContextMenu`, `MyMenuSubmenu`

### Отображение данных

- [Table](./components/table/index.md#свой-компонент): `MyTableSortHeading`
- [Tabs](./components/tabs/index.md#свой-компонент): `MyTabs`
- [Pagination](./components/pagination/index.md#свой-компонент): `MyPagination`

### Статусы и обратная связь

- [Alert](./components/alert/index.md#свой-компонент): `MyAlert`
- [Avatar](./components/avatar/index.md#свой-компонент): `MyAvatar`
- [AvatarStack](./components/avatar-stack/index.md#свой-компонент): `MyAvatarStackItem`
- [Meter](./components/meter/index.md#свой-компонент): `MyMeter`
- [MeterStack](./components/meter-stack/index.md#свой-компонент): `MyMeterStack`
- [Progress](./components/progress/index.md#свой-компонент): `MyProgress`

### Примитивы раскладки

- [Accordion](./components/accordion/index.md#свой-компонент): `MyAccordionItem`
- [Collapsible](./components/collapsible/index.md#свой-компонент): `MyCollapsible`
- [Toolbar](./components/toolbar/index.md#свой-компонент): `MyToolbarToggle`

## Другой набор иконок

Рецепты используют `@vega-ui/icons` — набор на основе `lucide-react`; любой другой набор работает так же. Часть-иконка рендерит через `Slot`, поэтому её дочерний элемент должен быть одним SVG-элементом, который принимает `className` и `style`: компонент иконки из Lucide, Tabler, Heroicons или Phosphor либо ваш собственный `<svg>`. Часть задаёт размер и `stroke='currentColor'`; пропсы вроде `strokeWidth` принадлежат набору иконок, поэтому используйте те, что есть в вашем.
