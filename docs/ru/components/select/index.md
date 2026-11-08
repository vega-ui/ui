# Select

## Профиль документа

`advanced interactive`

## Кратко

`Select` — [составной компонент](../../glossary.md#составной-компонент-compound-component) из корневого контейнера состояния и экспортируемых дочерних частей для триггера, значения, вариантов и нативного [участия в форме](../../glossary.md#участие-в-форме-form-participation). `SelectListbox` рендерится в top layer браузера через `popover="auto"`, поэтому его никогда не обрезает `overflow` и не перекрывает модальный диалог. Это слой одиночного выбора, ориентированный на поля, а не универсальный примитив для плавающего содержимого.

## Импорт

```tsx
import {
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  type SelectProps,
  type SelectSize,
  type SelectVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SelectProps<V extends string | number = string>`
- `SelectSize = 'sm' | 'md' | 'lg' | string`
- `SelectVariant = 'inline' | 'field' | string`

## Минимальная композиция

<!-- example: select/minimal-composition.tsx -->
```tsx
import {
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '@vega-ui/react';
import { useId } from 'react';

export default function MinimalComposition() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Interface language</Label>
      <Select defaultValue='en'>
        <SelectHiddenSelect name='language' />
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a language' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='en'>English</SelectOption>
          <SelectOption value='de'>Deutsch</SelectOption>
          <SelectOption value='es'>Español</SelectOption>
          <SelectOption value='ja'>日本語</SelectOption>
        </SelectListbox>
      </Select>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Select`: корневое состояние и провайдер контекста
- `SelectCombobox`: поверхность триггера
- `SelectValue`: выбранное значение или плейсхолдер
- `SelectListbox`: контейнер вариантов
- `SelectOption`: выбираемый вариант

## Необязательные части

- `SelectHiddenSelect`: нативное [участие в форме](../../glossary.md#участие-в-форме-form-participation)
- `SelectIcon`: визуальная подсказка триггера

## Порядок композиции

Типичная композиция:

1. `Select`
2. `SelectHiddenSelect`
3. `SelectCombobox`
4. `SelectListbox`
5. `SelectOption`

## Варианты

- Размер: `sm`, `md`, `lg`
- Вариант: `field`, `inline`
- Варианты состояния: [контролируемое](../../glossary.md#контролируемый-controlled) значение, [контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия, [отключённый](../../glossary.md#отключённый-disabled), [только для чтения](../../glossary.md#только-для-чтения-read-only), композиция с поиском

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- `disabled` полностью блокирует взаимодействие; `readOnly` сохраняет фокусируемость, но запрещает изменения. См. [Отключённый](../../glossary.md#отключённый-disabled) и [Только для чтения](../../glossary.md#только-для-чтения-read-only).
- При фильтрации внутри списка встроенный [поиск при наборе](../../glossary.md#поиск-по-вводу-typeahead) обычно стоит отключить через `typeahead={false}`, чтобы избежать конфликтов клавиатуры.
- Значения типизированы как `string | number`; значения-объекты публичный API не поддерживает.
- `SelectHiddenSelect` рекомендуется, когда значение должно участвовать в нативном [участии в форме](../../glossary.md#участие-в-форме-form-participation).
- Если продукту нужно более богатое произвольное содержимое оверлея, а не одно скалярное значение, правильная абстракция — обычно `Popover` или `Dialog`, а не `Select`.

## Частые ошибки

- Передача значений-объектов вместо `string` или `number`.
- Отсутствие `SelectHiddenSelect` в сценариях с нативной формой.
- Включённый встроенный [поиск при наборе](../../glossary.md#поиск-по-вводу-typeahead) при встраивании поля поиска в список.
- Использование `readOnly`, когда задумано полностью [отключённое](../../glossary.md#отключённый-disabled) состояние элемента.
