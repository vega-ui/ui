# DataGridPicker

## Профиль документа

`advanced interactive`

## Кратко

`DataGridPicker` — визуальный слой пикера поверх `DataGridSelectable`. Он сохраняет тот же движок выбора и добавляет общую семантику размера и варианта пикера для плотных сеток: дат, месяцев, лет и собственных матриц.

## Импорт

```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  DataGridPickerScroller,
  DataGridPickerScrollerContent,
  type DataGridPickerItemProps,
  type DataGridPickerProps,
  type DataGridPickerRowGroupProps,
  type DataGridPickerRowProps,
  type DataGridPickerScrollerContentProps,
  type DataGridPickerScrollerProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `DataGridPickerProps<K, S>`
- `DataGridPickerItemProps`
- `DataGridPickerRowProps`
- `DataGridPickerRowGroupProps`
- `DataGridPickerScrollerProps`
- `DataGridPickerScrollerContentProps`

## Минимальная композиция

<!-- example: data-grid-picker/minimal-composition.tsx -->
```tsx
import {
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <DataGridPicker aria-label='Plan length' defaultActive='1m' style={{ width: 240 }}>
      <DataGridPickerRowGroup>
        <DataGridPickerRow row={0}>
          <DataGridPickerItem col={0} value='1m'>1 mo</DataGridPickerItem>
          <DataGridPickerItem col={1} value='6m'>6 mo</DataGridPickerItem>
          <DataGridPickerItem col={2} value='12m'>12 mo</DataGridPickerItem>
        </DataGridPickerRow>
      </DataGridPickerRowGroup>
    </DataGridPicker>
  );
}
```
<!-- /example -->

## Обязательные части

- `DataGridPicker`: корневое поведение пикера плюс контекст размера и варианта
- `DataGridPickerRowGroup`
- `DataGridPickerRow`
- `DataGridPickerItem`

## Необязательные части

- `DataGridPickerScroller`
- `DataGridPickerScrollerContent`

## Порядок композиции

1. `DataGridPicker`
2. необязательный `DataGridPickerScroller`
3. `DataGridPickerScrollerContent`, если используется прокрутка
4. `DataGridPickerRowGroup`
5. `DataGridPickerRow`
6. `DataGridPickerItem`

## Варианты

- Вариант: `primary`, `secondary`
- Размер: `xs`, `sm`, `md`, `lg`, `xl`
- Выбор: `single`, `multiple`, `range`
- Макет: статичная сетка или постраничный вывод со скроллером

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Проверяйте активное, сфокусированное и выбранное состояния по отдельности.
- Прокручиваемые пикеры должны сохранять навигацию с клавиатуры и видимый фокус.
- В постраничных композициях со скроллером важны группы строк с `scope`.

## Частые ошибки

- Использование элементов пикера как обычных узлов макета без семантики выбора.
- Отсутствие совместной проверки прокрутки и взаимодействия с клавиатуры.
- Ручное воссоздание стилей элементов, когда слой пикера уже задаёт нужную визуальную семантику.
