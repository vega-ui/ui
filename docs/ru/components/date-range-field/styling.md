# DateRangeField: стилизация

## Обзор

Стили `DateRangeField` распределены между унаследованной поверхностью `TextField`, календарём, смонтированным в поповере, и небольшим локальным контрактом на `DateRangeFieldTrigger`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | `DateRangeFieldTrigger` | Выравнивает триггер по высоте поля ввода. |
| `--button-color` | `DateRangeFieldTrigger` | Цвет иконки триггера. |
| `--button-background-color-hover` | `DateRangeFieldTrigger` | Фон триггера при наведении. |
| `--button-color-hover` | `DateRangeFieldTrigger` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `DateRangeFieldTrigger` | Цвет иконки кнопки при нажатии. |
| `--button-background-color-active` | `DateRangeFieldTrigger` | Фон кнопки при нажатии. |

## Переменные уровня частей

- `DateRangeField`: наследует большую часть внешнего вида от `TextField`.
- `DateRangeFieldInput`: следует той же модели поверхности поля, что и другие контролы текстового ввода.
- `DateRangeFieldTrigger`: использует локальные переменные кнопки, основанные на токенах темы.
- `DateRangeFieldCalendar`: следует контрактам стилизации `Calendar` и `Popover`.

## Взаимодействие состояний и вариантов

- `size` на корне задаёт и размер `DateRangeFieldCalendar` по той же шкале; `size` на самом календаре его переопределяет.
- Отключённое состояние должно приглушать поле ввода и триггер вместе.
- Стили ошибки должны идти от состояния окружающего поля, а не от разовых переопределений триггера.
- Стили диапазона должны оставаться читаемыми, когда даты начала и окончания заполнены частично.
- Вид ошибки следует за `aria-invalid='true'`, `:user-invalid` или `[data-user-edited]:invalid` на `DateRangeFieldInput`.

`DateRangeField` сам записывает текст `DateRangeFieldInput`, а Chromium и WebKit не считают такой текст правкой пользователя, поэтому после такой правки input не подходит под `:user-invalid`. В своём CSS используйте `:user-invalid` вместе с `[data-user-edited]:invalid`:

```css
.stay-dates:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

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
  --button-height: 32px;
}
```
<!-- /example -->

Иконка `DateRangeFieldTrigger` — это его дочерние элементы, поэтому подойдёт любая; с `square` кнопка сохраняет размер и состояния, а `aria-label` — её имя.

<!-- example: date-range-field/custom-trigger-icon.tsx -->
```tsx
import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import {
  CalendarContent,
  CalendarDay,
  CalendarDays,
  CalendarDaysScroller,
  CalendarDaysScrollerContent,
  CalendarHeader,
  CalendarHeading,
  CalendarMonth,
  CalendarMonthLabel,
  CalendarMonths,
  CalendarMonthsGrid,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarViewButton,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  CalendarYear,
  CalendarYearLabel,
  CalendarYears,
  CalendarYearsGrid,
  CalendarYearsScroller,
  CalendarYearsScrollerContent,
  DateRangeField,
  DateRangeFieldCalendar,
  DateRangeFieldInput,
  DateRangeFieldTrigger,
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
          <DateRangeFieldTrigger square aria-label='Choose dates'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateRangeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateRangeFieldCalendar aria-label='Choose dates'>
            <CalendarHeader>
              <CalendarPrevButton square aria-label='Previous month'><Icon><ChevronLeftIcon /></Icon></CalendarPrevButton>
              <CalendarHeading>
                <CalendarViewButton view='month'><CalendarMonthLabel /></CalendarViewButton>
                <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
              </CalendarHeading>
              <CalendarNextButton square aria-label='Next month'><Icon><ChevronRightIcon /></Icon></CalendarNextButton>
            </CalendarHeader>
            <CalendarContent>
              <CalendarDays>
                <CalendarWeekdays>
                  <CalendarWeekday />
                </CalendarWeekdays>
                <CalendarDaysScroller>
                  <CalendarDaysScrollerContent>
                    <CalendarWeeks>
                      <CalendarDay />
                    </CalendarWeeks>
                  </CalendarDaysScrollerContent>
                </CalendarDaysScroller>
              </CalendarDays>
              <CalendarMonths>
                <CalendarMonthsGrid>
                  <CalendarMonth />
                </CalendarMonthsGrid>
              </CalendarMonths>
              <CalendarYears>
                <CalendarYearsScroller>
                  <CalendarYearsScrollerContent>
                    <CalendarYearsGrid>
                      <CalendarYear />
                    </CalendarYearsGrid>
                  </CalendarYearsScrollerContent>
                </CalendarYearsScroller>
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
