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
import { ChevronDownIcon } from '@vega-ui/icons';
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
          <SelectIcon><ChevronDownIcon /></SelectIcon>
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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MySelect` передаёт свои пропсы в `Select`, `id` — триггеру для `Label`, `name` — скрытому select, а дочерние элементы — в список. См. [Рецепты компонентов](../../recipes.md).

<!-- example: select/recipe.tsx -->
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
  type SelectProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useId } from 'react';

interface MySelectProps<Value extends string | number = string> extends SelectProps<Value> {
  name?: string
  placeholder?: string
}

export function MySelect<Value extends string | number = string>({ id, name, placeholder, children, ...props }: MySelectProps<Value>) {
  return (
    <Select {...props}>
      <SelectHiddenSelect name={name} />
      <SelectCombobox id={id}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon><ChevronDownIcon /></SelectIcon>
      </SelectCombobox>
      <SelectListbox>{children}</SelectListbox>
    </Select>
  );
}

export default function Recipe() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Interface language</Label>
      <MySelect id={id} name='language' defaultValue='en' placeholder='Choose a language'>
        <SelectOption value='en'>English</SelectOption>
        <SelectOption value='de'>Deutsch</SelectOption>
        <SelectOption value='ja'>日本語</SelectOption>
      </MySelect>
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
- `SelectIcon`: иконка триггера, например переданный дочерним элементом шеврон

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
- Варианты состояния: [контролируемое](../../glossary.md#контролируемый-controlled) значение, [контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия, [отключённый](../../glossary.md#отключённый-disabled), [только для чтения](../../glossary.md#только-для-чтения-read-only)

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
- Поле поиска внутри `SelectListbox` не поддерживается: listbox содержит только варианты и группы. Для поля, в котором вариант ищут набором текста, используйте [Combobox](../combobox/).
- Значения типизированы как `string | number`; значения-объекты публичный API не поддерживает.
- `SelectHiddenSelect` рекомендуется, когда значение должно участвовать в нативном [участии в форме](../../glossary.md#участие-в-форме-form-participation).
- Если продукту нужно более богатое произвольное содержимое оверлея, а не одно скалярное значение, правильная абстракция — обычно `Popover` или `Dialog`, а не `Select`.

## Частые ошибки

- Передача значений-объектов вместо `string` или `number`.
- Отсутствие `SelectHiddenSelect` в сценариях с нативной формой.
- Использование `readOnly`, когда задумано полностью [отключённое](../../glossary.md#отключённый-disabled) состояние элемента.
