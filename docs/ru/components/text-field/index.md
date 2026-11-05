# TextField

## Профиль документа

`advanced interactive`

## Кратко

`TextField` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для однострочного ввода текста. Корень задаёт общий размер и состояние ошибки, а `TextFieldInput` владеет нативным элементом ввода. Это базовая обёртка однострочного поля, на которой строятся другие специализированные поля ввода текста.

## Импорт

```tsx
import {
  TextField,
  TextFieldInput,
  type TextFieldInputProps,
  type TextFieldProps,
  type TextFieldSize,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TextFieldProps`
- `TextFieldInputProps`
- `TextFieldSize = 'sm' | 'md' | 'lg' | string`

## Минимальная композиция

<!-- example: text-field/work-email-field.tsx -->
```tsx
import { HelperText, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function WorkEmailField() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Work email</Label>
      <TextField>
        <TextFieldInput
          id={id}
          type='email'
          name='email'
          autoComplete='email'
          placeholder='maria.lopez@northwind.io'
          aria-describedby={hintId}
        />
      </TextField>
      <HelperText id={hintId}>Invoices and security alerts are sent here.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `TextField`: обёртка раскладки с контекстом размера и ошибки
- `TextFieldInput`: нативный элемент ввода

## Необязательные части

- дочерние элементы префикса или суффикса: `Button`, `IconButton`, счётчики или текст статуса

## Порядок композиции

1. `TextField`
2. необязательный дочерний элемент в начале
3. `TextFieldInput`
4. необязательный дочерний элемент в конце

## Варианты

- Размер: `sm`, `md`, `lg`
- Состояние: по умолчанию, `error`, отключённый инпут
- Композиция: простой инпут, элементы управления в префиксе и суффиксе, контролируемое или неконтролируемое значение

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

- `TextField` сам по себе не инпут; атрибуты формы задаются на `TextFieldInput`.
- Действия в префиксе и суффиксе меняют область нажатия и плотность раскладки, поэтому добавляйте их осознанно.
- Визуальная ошибка задаётся на обёртке, но семантика ввода по-прежнему принадлежит нативному инпуту.
- Когда маска, показ пароля, числовой шаг или форматирование телефона становятся частью контракта поля, специализированное поле обычно понятнее, чем растягивание `TextField`.

## Частые ошибки

- Передача `value`, `onChange` или `name` в `TextField` вместо `TextFieldInput`.
- Рендер обёртки без `TextFieldInput`.
- Отношение к дочерним элементам префикса и суффикса как к декоративным, хотя они меняют поведение взаимодействия.
