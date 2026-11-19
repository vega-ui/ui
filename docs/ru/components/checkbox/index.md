# Checkbox

## Профиль документа

`advanced interactive`

## Кратко

`Checkbox` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для независимых выбираемых вариантов с необязательным участием в нативной форме, рендером индикатора и поддержкой неопределённого состояния. Это примитив семейства выбора для независимых или комбинируемых вариантов, а не для мгновенного переключения настроек.

## Импорт

```tsx
import {
  Checkbox,
  CheckboxInput,
  CheckboxIndicator,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  type CheckboxProps,
  type CheckboxSize,
  type CheckboxVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CheckboxProps`
- `CheckboxInputProps`
- `CheckboxIndicatorProps`
- `CheckboxCheckedIconProps`
- `CheckboxIndeterminateIconProps`
- `CheckboxSize`
- `CheckboxVariant`

## Минимальная композиция

<!-- example: checkbox/minimal-composition.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Checkbox>
      <CheckboxInput name='remember' />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      Remember me on this device
    </Checkbox>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyCheckbox` передаёт свои пропсы нативному `CheckboxInput`, как `<input type="checkbox">`, а дочерние элементы становятся подписью. См. [Рецепты компонентов](../../recipes.md).

<!-- example: checkbox/recipe.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  type CheckboxInputProps,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export function MyCheckbox({ children, ...props }: CheckboxInputProps) {
  return (
    <Checkbox>
      <CheckboxInput {...props} />
      <CheckboxIndicator>
        <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
      </CheckboxIndicator>
      {children}
    </Checkbox>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <MyCheckbox name='remember' defaultChecked>Remember me on this device</MyCheckbox>
      <MyCheckbox name='files' indeterminate>Some files are selected</MyCheckbox>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Checkbox`: корневое состояние и поверхность подписи
- `CheckboxInput`: нативный чекбокс — фокус, клавиатура, состояние и значение в форме
- `CheckboxIndicator`: видимая поверхность чекбокса

## Необязательные части

- `CheckboxCheckedIcon`: показывает переданную галочку, пока чекбокс отмечен
- `CheckboxIndeterminateIcon`: показывает переданный минус в неопределённом состоянии

## Порядок композиции

1. `Checkbox`
2. `CheckboxInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. текст подписи

## Варианты

- Размеры: `sm`, `md`, `lg`
- Варианты: `primary`, `secondary`
- Состояния: не отмечен, отмечен, неопределённое, отключённый

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

- Передайте `CheckboxInput` проп `name` для нативной отправки формы.
- Неопределённое состояние обычно обозначает частичный выбор, а не третье итоговое значение.
- Держите индикатор и текст внутри одной общей кликабельной строки.
- Если элемент представляет одну немедленно применяемую системную настройку, `Switch` обычно понятнее строки с чекбоксом.

## Частые ошибки

- Отсутствие `CheckboxInput`, который и является настоящим элементом управления.
- Использование неопределённого состояния как итогового сохраняемого по умолчанию.
- Использование чекбоксов для взаимоисключающих вариантов.
