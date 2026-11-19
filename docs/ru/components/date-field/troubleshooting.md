# DateField: решение проблем

## Кнопка календаря ничего не открывает

### Симптом

Иконка-кнопка триггера рендерится, но по клику календарь не появляется.

### Вероятная причина

`DateFieldTrigger` отрендерен без окружающего `Popover` или без `DateFieldCalendar` внутри оверлея.

### Как проверить

- Проверьте, обёрнут ли триггер в `PopoverTrigger`.
- Проверьте, содержит ли `PopoverContent` компонент `DateFieldCalendar`.

### Исправление

Скомпонуйте триггер и календарь через `Popover` внутри `DateField`.

<!-- example: date-field/minimal-composition.tsx -->
```tsx
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
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <DateField format='dd.MM.yyyy' separator='.'>
      <DateFieldInput aria-label='Due date' />
      <Popover placement='bottom-end'>
        <PopoverTrigger asChild>
          <DateFieldTrigger square aria-label='Choose due date'><Icon><CalendarIcon /></Icon></DateFieldTrigger>
        </PopoverTrigger>
        <PopoverContent>
          <DateFieldCalendar aria-label='Choose due date'>
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

## Введённое значение выглядит неправильно

### Симптом

Формат, который видят пользователи, не совпадает с поведением разбора.

### Вероятная причина

`format` или `separator` не совпадает с форматом даты в подписях, подсказках и сообщениях валидации.

### Как проверить

- Сравните заданный `format` с видимой подсказкой формы.
- Введите типичное значение и проверьте, как оно интерпретируется.

### Исправление

Согласуйте видимые подсказки, правила разбора и тексты валидации вокруг одного и того же формата.

## Отправляемое значение — не ISO-дата

### Симптом

Форма отправляет `15.01.2026` вместо `2026-01-15`.

### Вероятная причина

`DateFieldInput` отправляет показанный текст под своим `name`, как любой нативный input.

### Как проверить

- Прочитайте поле из `FormData` в обработчике отправки.

### Исправление

Сохраните день `YYYY-MM-DD` из `onChangeValue` в состоянии и отправьте его через свой скрытый input. См. [Форма/интеграция](./examples.md#формаинтеграция).

## Отключённые даты всё ещё можно ввести

### Симптом

Календарь блокирует некоторые дни, но ввод одного из них принимается и отправляется.

### Вероятная причина

Как и дата вне `min` и `max`, введённый день из `disabledDates` остаётся в поле и только делает его невалидным.

### Как проверить

- Введите отключённый день и проверьте `input.validity.customError` или `:invalid`.

### Исправление

Дайте браузеру заблокировать отправку (не используйте `noValidate`) или сами проверьте `form.checkValidity()`, а своё сообщение показывайте из `onInvalid`. Проверяйте то же правило на сервере.

## Календарь закрывается после выбора

### Симптом

Всплывающий календарь закрывается сразу после выбора дня, а продукту нужно, чтобы он оставался открытым.

### Вероятная причина

Выбор закрывает календарь и возвращает фокус на триггер, как описано в паттерне WAI-ARIA date picker dialog.

### Как проверить

- Выберите день кликом или <kbd>Enter</kbd> и проверьте, скрывается ли календарь.

### Исправление

Сделайте `open` у `Popover` контролируемым и возвращайте `true` в `onChangeValue` у `DateFieldCalendar`. Он вызывается после того, как поле закрыло календарь, в том же обновлении, поэтому календарь не скрывается.

## Двузначный год попадает не в то столетие

### Симптом

С форматом вроде `MM/dd/yy` введённый год оказывается в неожиданном столетии.

### Вероятная причина

Двузначный год читается в пределах 80 лет до и 19 лет после года `today`, как в CLDR и ICU. Неверная дата устройства или `today` сдвигает это окно.

### Как проверить

- Проверьте `today` на корне или дату устройства, если он не задан.

### Исправление

Передайте `today` явно или используйте четырёхзначный год (`yyyy`), если ожидаются даты далеко в прошлом или будущем.
