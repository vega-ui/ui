# PageControl: стилизация

## Обзор

Стили `PageControl` задаются размерами точек, зависящими от размера компонента, и токенами фона элементов. `PageControlProgress` расширяет ту же модель точек анимацией ширины.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--page-control-item-size` | элементы и прогресс | базовый размер точки |
| `--page-item-background-color` | элементы и прогресс | фон по умолчанию |
| `--page-item-background-color-hover` | элементы | состояние наведения |
| `--page-item-background-color-active` | элементы и прогресс | активное состояние |
| `--duration` | элемент прогресса | длительность анимации |
| `--focus-color` | элементы | контур фокуса |

## Переменные частей

### Корень

Корень задаёт раскладку в строку, промежуток и `touch-action: none`.

### Элемент

`PageControlItem` переводит размер в размеры круглой точки и задаёт активный фон.

### Элемент прогресса

`PageControlProgress` расширяется в ширину в активном состоянии и анимирует заливку через псевдоэлемент `::after`.

## Взаимодействие состояний и вариантов

- размер управляет диаметром точки
- активное состояние меняет базовый фон
- элементы прогресса используют `--duration` для управления анимацией заливки

## Примеры

### Крупный индикатор страниц

<!-- example: page-control/large-page-control.tsx -->
```tsx
import { PageControl, PageControlItem } from '@vega-ui/react';

export default function LargePageControl() {
  return (
    <PageControl size='lg' defaultActive={0} aria-label='Onboarding screens'>
      <PageControlItem index={0} aria-label='Welcome' />
      <PageControlItem index={1} aria-label='Connect your calendar' />
      <PageControlItem index={2} aria-label='Invite your team' />
    </PageControl>
  );
}
```
<!-- /example -->

## Чего не переопределять

- не убирайте видимость фокуса у элементов
- не используйте анимацию ширины прогресса, если продукт на самом деле не продвигается со временем
