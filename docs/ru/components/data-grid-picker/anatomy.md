# DataGridPicker: анатомия

## Обзор

`DataGridPicker` — составная подсистема пикера. Она оборачивает `DataGridSelectable` и добавляет визуальный контекст пикера для размера и варианта.

## Обязательные части

- `DataGridPicker`: корневой слой пикера
- `DataGridPickerRowGroup`
- `DataGridPickerRow`
- `DataGridPickerItem`

## Необязательные части

- `DataGridPickerScroller`
- `DataGridPickerScrollerContent`

## Порядок композиции

1. `DataGridPicker`
2. необязательный `DataGridPickerScroller`
3. `DataGridPickerScrollerContent`
4. `DataGridPickerRowGroup`
5. `DataGridPickerRow`
6. `DataGridPickerItem`

## Корректные варианты композиции

- статичные сетки пикера для месяцев, кварталов или наборов эмодзи
- постраничные пикеры со скроллером и группами строк с заданным `scope`
- одиночный, множественный или диапазонный выбор в зависимости от подсистемы-потребителя

## Некорректные варианты композиции

- использование обычных узлов макета вместо элементов пикера для выбираемого содержимого
- отсутствие управления `scope` в постраничных композициях, зависящих от идентичности страницы
- использование `DataGridPicker` как универсальной таблицы данных
