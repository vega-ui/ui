# Code: стилизация

## Обзор

`Code` добавляет компактную встроенную подложку поверх общей модели `Text`.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--code-font-family` | корень | семейство шрифтов встроенного кода |
| `--fills-secondary` | корень | заливка фона |
| `--label-secondary` | сопоставление `--t-color` | цвет текста кода |

## Переменные частей

### Корень

Корень задаёт:

- запасной моноширинный шрифт через `--code-font-family`
- `background-color: var(--fills-secondary)`
- `--t-color: var(--label-secondary)` для наследуемого цвета текста

## Взаимодействие состояний и вариантов

- `Code` не определяет собственных вариантов состояния.
- Внешний вид меняется в основном за счёт наследуемых размеров `Text` и глобальных токенов темы.

## Примеры

### Размер внутри окружающего текста

У `Code` свой `size`, по умолчанию 3, и размер окружающего текста он не наследует. Передавайте тот же `size`, что у окружающего `Text` или `Heading`, чтобы плашка совпадала со строкой.

<!-- example: code/inline-code-token.tsx -->
```tsx
import { Code, Heading, Text } from '@vega-ui/react';

export default function InlineCodeToken() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      <Text size={2}>
        Default size inside small text: <Code>workspace_slug</Code>
      </Text>
      <Text size={2}>
        Matched to the text: <Code size={2}>workspace_slug</Code>
      </Text>
      <Heading as='h3' size={6}>
        The <Code size={6}>useListbox</Code> hook
      </Heading>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не убирайте семантику кода, оставляя только оформление плашки
- не используйте низкоконтрастные сочетания фона и текста
- не навязывайте блочную раскладку для длинных фрагментов — переходите на полноценный компонент блока кода
