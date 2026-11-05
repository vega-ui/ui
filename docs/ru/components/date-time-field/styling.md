# DateTimeField: стилизация

## Обзор

Стили `DateTimeField` распределены между унаследованной поверхностью `TextField`, календарём в поповере и небольшим локальным контрактом на `DateTimeFieldTriggerIconButton`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--icon-button-size` | `DateTimeFieldTriggerIconButton` | Выравнивает триггер по высоте поля ввода. |
| `--button-color` | `DateTimeFieldTriggerIconButton` | Цвет иконки триггера. |
| `--button-background-color-hover` | `DateTimeFieldTriggerIconButton` | Фон триггера при наведении. |
| `--button-color-hover` | `DateTimeFieldTriggerIconButton` | Цвет иконки кнопки при наведении. |
| `--button-color-active` | `DateTimeFieldTriggerIconButton` | Цвет иконки кнопки при нажатии. |
| `--button-background-color-active` | `DateTimeFieldTriggerIconButton` | Фон кнопки при нажатии. |

## Переменные частей

- `DateTimeField`: наследует бо́льшую часть оформления от `TextField`.
- `DateTimeFieldInput`: следует той же модели поверхности поля, что и другие контролы текстового ввода.
- `DateTimeFieldTriggerIconButton`: использует локальные переменные кнопки на основе токенов темы.
- `DateTimeFieldCalendar`: следует контрактам стилизации `Calendar` и `Popover`.

## Взаимодействие состояний и вариантов

- Отключённое состояние должно приглушать поле ввода и триггер вместе.
- Стили ошибки должны приходить из состояния окружающего поля.
- Семантика времени должна оставаться читаемой даже в плотных формах.

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
  --icon-button-size: 32px;
}
```
<!-- /example -->

Дочерние элементы `DateTimeFieldTriggerIconButton` заменяют его иконку календаря по умолчанию; размер, состояния и доступное имя кнопки сохраняются.

<!-- example: date-time-field/custom-trigger-icon.tsx -->
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
  DateTimeField,
  DateTimeFieldCalendar,
  DateTimeFieldInput,
  DateTimeFieldTriggerIconButton,
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
          <DateTimeFieldTriggerIconButton aria-label='Choose date'>
            <Icon><CalendarDaysIcon /></Icon>
          </DateTimeFieldTriggerIconButton>
        </PopoverTrigger>
        <PopoverContent>
          <DateTimeFieldCalendar>
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
