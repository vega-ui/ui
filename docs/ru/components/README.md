# Компоненты

В этом разделе описан публичный API компонентов из `@vega-ui/react`.

## Покрытие

Страницы ниже охватывают все текущие публичные экспорты из `packages/ui/src`, кроме `Stepper`: это пустая директория, она не входит в публичный API.

## Контракт документации

Объявленная структура файлов, роли файлов и обязательные профили документации для `primitive`, `form-control`, `compound` и `advanced interactive` описаны в разделе [Структура документации компонентов](./structure.md).

Для навигации по связанным элементам управления с акцентом на выбор см. [Семейства компонентов](../families/README.md).

## Компоненты

- [Accordion](./accordion/)
- [Alert](./alert/)
- [Avatar](./avatar/)
- [AvatarStack](./avatar-stack/)
- [Badge](./badge/)
- [Button](./button/)
- [ButtonBase](./button-base/)
- [Calendar](./calendar/)
- [CalendarBase](./calendar-base/)
- [Card](./card/)
- [Checkbox](./checkbox/)
- [CheckboxCard](./checkbox-card/)
- [Code](./code/)
- [Collapsible](./collapsible/)
- [DataGrid](./data-grid/)
- [DataGridPicker](./data-grid-picker/)
- [DataGridSelectable](./data-grid-selectable/)
- [DateField](./date-field/)
- [DateRangeField](./date-range-field/)
- [DateTimeField](./date-time-field/)
- [DayPicker](./day-picker/)
- [Dialog](./dialog/)
- [Drawer](./drawer/)
- [Fieldset](./fieldset/)
- [Heading](./heading/)
- [HelperText](./helper-text/)
- [Icon](./icon/)
- [IconButton](./icon-button/)
- [IndexedSnapScroller](./indexed-snap-scroller/)
- [Label](./label/)
- [Link](./link/)
- [Listbox](./listbox/)
- [Meter](./meter/)
- [MeterStack](./meter-stack/)
- [MonthPicker](./month-picker/)
- [NumberField](./number-field/)
- [Option](./option/)
- [PageControl](./page-control/)
- [Pagination](./pagination/)
- [PasswordField](./password-field/)
- [PhoneField](./phone-field/)
- [PinField](./pin-field/)
- [Popover](./popover/)
- [Progress](./progress/)
- [Radio](./radio/)
- [SegmentedControl](./segmented-control/)
- [Select](./select/)
- [Separator](./separator/)
- [Sheet](./sheet/)
- [Slider](./slider/)
- [Slot](./slot/)
- [SnapScroller](./snap-scroller/)
- [Spinner](./spinner/)
- [Switch](./switch/)
- [Table](./table/)
- [Text](./text/)
- [TextArea](./text-area/)
- [TextField](./text-field/)
- [TimeField](./time-field/)
- [Tooltip](./tooltip/)
- [VisuallyHidden](./visually-hidden/)
- [YearPicker](./year-picker/)

## Структура страниц компонента

Каждый компонент теперь находится в своей директории `docs/components/<component>/`.

- `index.md`: основной обзор компонента, примеры, варианты, пограничные случаи и ошибки
- `examples.md`: необязательные углублённые сценарии и рецепты
- `api.md`: необязательный справочник пропсов и типов
- `styling.md`: необязательный контракт CSS-переменных и тем
- `accessibility.md`: необязательные рекомендации по клавиатуре, фокусу, подписям и скринридерам
- `comparison.md`: необязательные рекомендации по выбору компонента среди похожих элементов
- `patterns.md`: необязательные переиспользуемые паттерны интеграции
- `troubleshooting.md`: необязательные типичные сбои и их исправления
- `anatomy.md`: необязательная структура составного компонента и контракт композиции

Пока что у каждого компонента есть `index.md`. Дополнительные файлы используйте для более сложных компонентов, таких как `Select`, `Dialog`, `Calendar`, `PhoneField` и `DataGrid`.

## Профили документации

Каждый публичный компонент должен соответствовать одному обязательному профилю из [structure.md](./structure.md):

- `primitive`: `index.md`
- `form-control`: `index.md`, `examples.md`, `api.md`, `accessibility.md`
- `compound`: `index.md`, `anatomy.md`, `examples.md`, `api.md`
- `advanced interactive`: полный набор файлов, включая `styling.md`, `comparison.md`, `patterns.md` и `troubleshooting.md`

## Объём каждой страницы

Каждая страница намеренно опирается на исходный код:

1. Путь импорта и экспортируемые публичные части.
2. Хотя бы один конкретный пример.
3. Примеры сценариев, размеченные общей таксономией, где это применимо:
   `Basic`, `Controlled/Stateful`, `Form/Integration`, `Layout/Overlay`, `Error`, `Disabled`, `Edge`.
4. Варианты или варианты композиции.
5. Типы из исходного кода, когда они важны потребителям.
6. Пограничные случаи, которые уже следуют из сторис, тестов или композиции.
7. Частые ошибки, которые легко допустить при интеграции.
