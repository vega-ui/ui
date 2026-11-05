# DateRangeField: стилизация

## Обзор

Стили `DateRangeField` распределены между унаследованной поверхностью `TextField`, календарём, смонтированным в поповере, и небольшим локальным контрактом на `DateRangeFieldTriggerIconButton`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--icon-button-size` | `DateRangeFieldTriggerIconButton` | Выравнивает триггер по высоте поля ввода. |
| `--button-color` | `DateRangeFieldTriggerIconButton` | Цвет иконки триггера. |
| `--button-background-color-hover` | `DateRangeFieldTriggerIconButton` | Фон триггера при наведении. |
| `--button-color-hover` | `DateRangeFieldTriggerIconButton` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `DateRangeFieldTriggerIconButton` | Цвет иконки кнопки при нажатии. |
| `--button-background-color-active` | `DateRangeFieldTriggerIconButton` | Фон кнопки при нажатии. |

## Переменные уровня частей

- `DateRangeField`: наследует большую часть внешнего вида от `TextField`.
- `DateRangeFieldInput`: следует той же модели поверхности поля, что и другие контролы текстового ввода.
- `DateRangeFieldTriggerIconButton`: использует локальные переменные кнопки, основанные на токенах темы.
- `DateRangeFieldCalendar`: следует контрактам стилизации `Calendar` и `Popover`.

## Взаимодействие состояний и вариантов

- Отключённое состояние должно приглушать поле ввода и триггер вместе.
- Стили ошибки должны идти от состояния окружающего поля, а не от разовых переопределений триггера.
- Стили диапазона должны оставаться читаемыми, когда даты начала и окончания заполнены частично.

## Примеры

<!-- example: date-range-field/examples.css -->
```css
.analyticsRangeTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-range-field/styling-examples.css -->
```css
.compactRangeTrigger {
  --icon-button-size: 32px;
}
```
<!-- /example -->

Дочерние элементы `DateRangeFieldTriggerIconButton` заменяют его иконку календаря по умолчанию; размер, состояния и доступное имя кнопки сохраняются.

<!-- example: date-range-field/custom-trigger-icon.tsx -->
```tsx
import { CalendarDaysIcon } from '@vega-ui/icons';
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarHeader,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarViewButtonGroup,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTriggerIconButton,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CustomTriggerIcon() {
  return (
    <DateRangeField format='dd.MM.yyyy' separator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateRangeFieldInput aria-label='Trip dates' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateRangeFieldTriggerIconButton aria-label='Choose dates'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateRangeFieldTriggerIconButton>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar>
            <CalendarHeader>
              <CalendarPrevButton aria-label='Previous month' />
              <CalendarViewButtonGroup>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarViewButtonGroup>
              <CalendarNextButton aria-label='Next month' />
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarWeeks>
                  <CalendarDay />
                </CalendarWeeks>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonth />
              </CalendarMonths>
              <CalendarYears>
                <CalendarYear />
              </CalendarYears>
            </CalendarContent>
          </DateRangeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateRangeField>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не скрывайте состояния фокуса и невалидности собственными цветами триггера.
- Не перестилизуйте календарь на этом уровне — это задача `Calendar` и `Popover`.
- Не заменяйте семантические токены темы сырыми значениями палитры в переопределениях на уровне поля.
