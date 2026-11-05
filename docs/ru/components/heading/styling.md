# Heading: стилизация

## Обзор

`Heading` управляется типографическими токенами темы и шкалой межстрочных интервалов заголовков, зависящей от размера.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--heading-font-family` | корень | семейство шрифтов заголовка |
| `--heading-font-weight` | корень | насыщенность заголовка по умолчанию |
| `--text-color` | корень | цвет заголовка по умолчанию |
| `--text-font-size-1` ... `--text-font-size-11` | шкала размеров | соответствие визуальных размеров |
| `--heading-line-height-1` ... `--heading-line-height-11` | шкала размеров | соответствие межстрочных интервалов заголовков |

## Переменные частей

### Корень

Корень использует:

- `--heading-font-family`
- `--heading-font-weight`
- `--text-color`
- токены размера шрифта и межстрочного интервала заголовков для конкретного размера

## Взаимодействие состояний и вариантов

- `data-size` меняет визуальную шкалу
- `data-font-weight` переопределяет насыщенность заголовка по умолчанию
- семантический уровень задаётся через `as`, а не через CSS

## Примеры

### Насыщенность шрифта

`fontWeight` переопределяет значение темы `--heading-font-weight` для одного заголовка, а размер и межстрочный интервал остаются на шкале.

<!-- example: heading/emphasized-section-title.tsx -->
```tsx
import { Heading } from '@vega-ui/react';

export default function EmphasizedSectionTitle() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <Heading as='h3' size={6} fontWeight={400}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={500}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={700}>Access control</Heading>
      <Heading as='h3' size={6} fontWeight={900}>Access control</Heading>
    </div>
  );
}
```
<!-- /example -->

## Чего не переопределять

- не используйте произвольные размеры шрифта вне шкалы заголовков
- не передавайте иерархию заголовков одним только цветом
