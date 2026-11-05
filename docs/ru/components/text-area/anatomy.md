# TextArea: анатомия

## Обзор

`TextArea` — примитив из одной части, который сам рендерит нативный `<textarea>`. Каждый проп, который принимает нативный элемент, передаётся прямо в него, поэтому обёртки и дочерних частей нет.

## Обязательные части

### `TextArea`

Обязательная. Нативный `<textarea>`: владеет значением, размером, стилями ошибки и полной ширины и принимает `name`, `rows`, `required`, `maxLength` и другие нативные атрибуты.

## Необязательные части

Экспортируемых дочерних частей нет. Обычно поле собирают из отдельных компонентов вокруг него:

### `Label`

Необязательная, но нужна почти в любом интерфейсе. Называет textarea через `htmlFor` и его `id`.

### `HelperText`

Необязательная. Подсказка или сообщение об ошибке, связанные с textarea через `aria-describedby`.

## Порядок композиции

1. `Label`
2. `TextArea`
3. необязательный `HelperText` или счётчик

## Допустимые паттерны композиции

<!-- example: text-area/issue-description.tsx -->
```tsx
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function IssueDescription() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>What went wrong?</Label>
      <TextArea
        id={id}
        name='description'
        rows={4}
        fullWidth
        placeholder='Steps to reproduce, what you expected and what happened instead'
        aria-describedby={hintId}
      />
      <HelperText id={hintId}>Include the page URL and the time it happened, if you know it.</HelperText>
    </div>
  );
}
```
<!-- /example -->

`Label` указывает на textarea по `id`, а подсказка под ним связана через `aria-describedby`. Textarea сам является элементом формы, поэтому `name`, `rows` и `fullWidth` задаются прямо на нём.

## Недопустимые паттерны композиции

### Дочерние элементы внутри `TextArea`

`<textarea>` берёт текст из `value` или `defaultValue`. Дочерние элементы — неподдерживаемый способ задать содержимое или добавить иконки и кнопки внутрь поля.

### Обёртка в `TextField`

`TextField` ожидает `TextFieldInput` и рассчитан на однострочный `<input>`. Для многострочного текста используйте `TextArea` отдельно.

### Плейсхолдер вместо подписи

Плейсхолдер исчезает, как только пользователь начинает печатать, поэтому он не может заменить `Label`.
