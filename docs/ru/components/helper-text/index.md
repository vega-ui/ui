# HelperText

## Профиль документа

`primitive`

## Кратко

`HelperText` рендерит поясняющий текст к полю: подсказки, указания по использованию и сообщения рядом с валидацией. Он переиспользует типографический слой `Text` и добавляет семантический вспомогательный цвет или цвет ошибки для поясняющего содержимого на уровне поля.

## Импорт

```tsx
import { HelperText, type HelperTextProps } from '@vega-ui/react';
```

## Экспортируемые типы

- `HelperTextProps`

## Базовое использование

<!-- example: helper-text/field-hint.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function FieldHint() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Recovery email</Label>
      <TextField>
        <TextFieldInput id={id} type='email' autoComplete='email' aria-describedby={hintId} />
      </TextField>
      <HelperText id={hintId}>Used only if you lose access to your main inbox.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Варианты

- Размер: `sm`, `md`, `lg`
- Состояние: обычный вспомогательный текст или `error`
- Размещение: под полями, селекторами или группами элементов

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `error` меняет тон, но самому полю всё равно нужно собственное невалидное состояние.
- Вспомогательный текст должен быть достаточно коротким, чтобы его можно было охватить взглядом вместе с элементом управления.
- Длинному поясняющему тексту обычно место в основном тексте, а не во вспомогательном.
- Компонент обслуживает один элемент или одно сгруппированное поле; он не должен превращаться в свалку для несвязанных инструкций к форме.

## Частые ошибки

- Повтор содержимого, которое уже есть в подписи.
- Использование вспомогательного текста как единственного индикатора ошибки.
- Абзацы политики или юридического текста в стиле вспомогательного текста.
