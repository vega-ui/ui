# DateField: стилизация

## Обзор

Стилизация `DateField` распределена между унаследованной поверхностью `TextField`, необязательным календарём в поповере и небольшим локальным контрактом `DateFieldTrigger`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | `DateFieldTrigger` | Выравнивает триггер по высоте input. |
| `--button-color` | `DateFieldTrigger` | Цвет иконки триггера. |
| `--button-background-color-hover` | `DateFieldTrigger` | Фон триггера при наведении. |
| `--button-color-hover` | `DateFieldTrigger` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `DateFieldTrigger` | Цвет иконки кнопки при нажатии. |
| `--button-background-color-active` | `DateFieldTrigger` | Фон кнопки при нажатии. |

## Переменные частей

- `DateField`: наследует большую часть визуала поля от `TextField`.
- `DateFieldInput`: использует ту же поверхность поля и оформление текста, что и другие поля ввода.
- `DateFieldTrigger`: задаёт локальные переменные кнопки, ссылающиеся на токены темы, например `--text-color` и `--fills-quaternary-hover`.
- `DateFieldCalendar`: в основном следует контрактам стилизации `Calendar` и `Popover`, а не отдельному набору локальных переменных поля.

## Взаимодействие состояний и вариантов

- `disabled` должен одинаково приглушать и поле ввода, и триггер.
- Стили ошибки должны идти от состояния окружающего поля, а не от разовых переопределений триггера.
- Внешний вид должны определять токены уровня темы, прежде чем дело дойдёт до локальных переопределений компонента.
- Вид ошибки следует за `aria-invalid='true'`, `:user-invalid` или `[data-user-edited]:invalid` на `DateFieldInput`.

`DateField` сам записывает текст `DateFieldInput`, а Chromium и WebKit не считают такой текст правкой пользователя, поэтому после такой правки input не подходит под `:user-invalid`. В своём CSS используйте `:user-invalid` вместе с `[data-user-edited]:invalid`:

```css
.check-in:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Примеры

<!-- example: date-field/examples.css -->
```css
.billingDateFieldTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-field/styling-examples.css -->
```css
.compactDateFieldTrigger {
  --button-height: 32px;
}
```
<!-- /example -->

Иконка `DateFieldTrigger` — это его дочерние элементы, поэтому подойдёт любая; с `square` кнопка сохраняет размер и состояния, а `aria-label` — её имя.

<!-- example: date-field/custom-trigger-icon.tsx -->
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
  DateField,
  DateFieldCalendar,
  DateFieldInput,
  DateFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CustomTriggerIcon() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Invoice date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTrigger square aria-label='Choose date'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar aria-label='Choose date'>
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
          </DateFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateField>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не задавайте триггеру цвета, скрывающие состояние фокуса или невалидности.
- Не меняйте здесь стили календаря; для этого слоя используйте контракты `Calendar` или `Popover`.
- Не заменяйте семантические токены темы сырыми значениями палитры в переопределениях на уровне поля.
