# DateTimeField: стилизация

## Обзор

Стили `DateTimeField` распределены между унаследованной поверхностью `TextField`, календарём в поповере и небольшим локальным контрактом на `DateTimeFieldTrigger`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--button-height` | `DateTimeFieldTrigger` | Выравнивает триггер по высоте поля ввода. |
| `--button-color` | `DateTimeFieldTrigger` | Цвет иконки триггера. |
| `--button-background-color-hover` | `DateTimeFieldTrigger` | Фон триггера при наведении. |
| `--button-color-hover` | `DateTimeFieldTrigger` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `DateTimeFieldTrigger` | Цвет иконки кнопки при нажатии. |
| `--button-background-color-active` | `DateTimeFieldTrigger` | Фон кнопки при нажатии. |

## Переменные частей

- `DateTimeField`: наследует бо́льшую часть оформления от `TextField`.
- `DateTimeFieldInput`: следует той же модели поверхности поля, что и другие контролы текстового ввода.
- `DateTimeFieldTrigger`: использует локальные переменные кнопки на основе токенов темы.
- `DateTimeFieldCalendar`: следует контрактам стилизации `Calendar` и `Popover`.

## Взаимодействие состояний и вариантов

- Отключённое состояние должно приглушать поле ввода и триггер вместе.
- Стили ошибки должны приходить из состояния окружающего поля.
- Семантика времени должна оставаться читаемой даже в плотных формах.
- Вид ошибки следует за `aria-invalid='true'`, `:user-invalid` или `[data-user-edited]:invalid` на `DateTimeFieldInput`.

`DateTimeField` сам записывает текст `DateTimeFieldInput`, а Chromium и WebKit не считают такой текст правкой пользователя, поэтому после такой правки input не подходит под `:user-invalid`. В своём CSS используйте `:user-invalid` вместе с `[data-user-edited]:invalid`:

```css
.meeting-start:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Примеры

<!-- example: date-time-field/examples.css -->
```css
.scheduleTrigger {
  --button-color: var(--label-secondary);
  --button-background-color-hover: var(--fills-secondary-hover);
}
```
<!-- /example -->

<!-- example: date-time-field/styling-examples.css -->
```css
.compactScheduleTrigger {
  --button-height: 32px;
}
```
<!-- /example -->

Иконка `DateTimeFieldTrigger` — это его дочерние элементы, поэтому подойдёт любая; с `square` кнопка сохраняет размер и состояния, а `aria-label` — её имя.

<!-- example: date-time-field/custom-trigger-icon.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTrigger,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@vega-ui/react';

export default function CustomTriggerIcon() {
  return (
    <DateTimeField dateFormat='dd.MM.yyyy' dateSeparator='.' style={{ width: '100%', maxWidth: 320 }}>
      <DateTimeFieldInput aria-label='Pickup' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateTimeFieldTrigger square aria-label='Choose date'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateTimeFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar aria-label='Choose date'>
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
          </DateTimeFieldCalendar>
        </PopoverContent>
      </Popover>
    </DateTimeField>
  );
}
```
<!-- /example -->

## Не переопределяйте

- Не скрывайте состояния фокуса и невалидности собственными цветами триггера.
- Не используйте этот файл для перестилизации слоя календаря; используйте контракты `Calendar` и `Popover`.
- Не заменяйте семантические токены темы сырыми значениями палитры в переопределениях на уровне поля.
