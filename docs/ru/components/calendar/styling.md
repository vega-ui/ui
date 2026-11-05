# Calendar: стилизация

## Обзор

Стилизация `Calendar` распределена между элементами управления в заголовке, размерами содержимого и видами дней, месяцев и лет. Большую часть настройки стоит начинать с уровня темы.

## Публичные CSS-переменные

Текущая реализация раскрывает больше поведения размеров и раскладки, чем стабильных хуков `--calendar-*`. Считайте токены темы и задокументированные пропсы размера основной поверхностью стилизации.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| токены отступов | `CalendarContent` | ширина раскладки в зависимости от размера |
| токены переходов | виды и кнопки навигации | анимированная смена видов |
| токены кнопок | кнопки видов | унаследованные размеры как у кнопок |

## Переменные уровня частей

### Содержимое

`CalendarContent` вычисляет min-width из токенов отступов для каждого размера.

### Кнопки навигации

Кнопки навигации опираются на токены переходов и общие паттерны стилизации кнопок.

### Виды

`CalendarDays`, `CalendarMonths` и `CalendarYears` анимируют смену видов через общие токены переходов.

## Взаимодействие состояний и вариантов

- `compact` меняет ожидания по плотности
- размер меняет ширину содержимого и отступы видов
- пользовательские шаблоны дней влияют на воспринимаемую плотность сильнее, чем стили корня

## Примеры

### Настройка календаря через тему

<!-- example: calendar/theme-first-calendar-tuning.css -->
```css
.brand-theme {
  --surface-primary: var(--color-orange-0);
  --focus-color: var(--color-orange-accent-400);
}
```
<!-- /example -->

### Плотный встроенный календарь

`compact` сжимает корень до содержимого, а `size` и `variant` на корне доходят до всех частей через контекст. Короткие форматы (`format='short'` у подписи и вида месяцев, `format='narrow'` у дней недели) удерживают заголовок и вид месяцев в узкой ширине.

<!-- example: calendar/dense-embedded-calendar.tsx -->
```tsx
import {
  Calendar,
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
} from '@vega-ui/react';

export default function DenseEmbeddedCalendar() {
  return (
    <Calendar compact size='xs' variant='primary' locale='en-US' defaultValue='2026-11-18'>
      <CalendarHeader>
        <CalendarPrevButton aria-label='Previous' />
        <CalendarViewButtonGroup>
          <CalendarViewButton view='month'><CalendarMonthLabel format='short' /></CalendarViewButton>
          <CalendarViewButton view='year'><CalendarYearLabel /></CalendarViewButton>
        </CalendarViewButtonGroup>
        <CalendarNextButton aria-label='Next' />
      </CalendarHeader>
      <CalendarContent>
        <CalendarDays aria-label='Days'>
          <CalendarWeekdays format='narrow'>
            <CalendarWeekday />
          </CalendarWeekdays>
          <CalendarWeeks>
            <CalendarDay />
          </CalendarWeeks>
        </CalendarDays>
        <CalendarMonths cols={4} format='short'>
          <CalendarMonth />
        </CalendarMonths>
        <CalendarYears>
          <CalendarYear />
        </CalendarYears>
      </CalendarContent>
    </Calendar>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не придумывайте незадокументированные переменные `--calendar-*`, как будто они публичный API
- не стилизуйте пользовательские ячейки дат так, чтобы скрыть фокус или отключённое состояние
