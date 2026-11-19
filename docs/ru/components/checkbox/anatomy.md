# Checkbox: анатомия

## Обзор

`Checkbox` — [составной компонент](../../glossary.md#составной-компонент-compound-component), который согласует отмеченное, неопределённое и отключённое состояния, а также участие в форме между корневой подписью и экспортируемыми визуальными частями.

## Обязательные части

### `Checkbox`

Обязательна. Отвечает за размер, вариант, а также отмеченное, неопределённое и отключённое состояния.

### `CheckboxIndicator`

Обязательна для видимой поверхности элемента.

### `CheckboxInput`

Обязательна. Визуально скрытый нативный чекбокс: от него берутся фокус, клавиатура, отмеченное состояние и значение в форме. Без него индикатор — пустой квадрат, на который нельзя перевести фокус.

## Необязательные части

### `CheckboxCheckedIcon`

Показывает свои дочерние элементы внутри индикатора, пока чекбокс отмечен. Своей иконки у неё нет: передайте галочку из любого набора иконок, например `<CheckIcon strokeWidth={4} />`.

### `CheckboxIndeterminateIcon`

Показывает свои дочерние элементы внутри индикатора, пока чекбокс в неопределённом состоянии. Своей иконки у неё нет: передайте минус из любого набора иконок, например `<MinusIcon strokeWidth={4} />`.

## Порядок композиции

1. `Checkbox`
2. `CheckboxInput`
3. `CheckboxIndicator`
4. `CheckboxCheckedIcon`
5. `CheckboxIndeterminateIcon`
6. текст подписи

## Корректные варианты композиции

Два корректных варианта: текст внутри корня `Checkbox`, который является `<label>` и даёт полю имя, и чекбокс без подписи (например, в ячейке таблицы), у которого `CheckboxInput` получает `aria-label`. `CheckboxIndeterminateIcon` можно не добавлять, если чекбокс никогда не становится неопределённым.

<!-- example: checkbox/valid-composition-patterns.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <Checkbox>
        <CheckboxInput name='archived' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
          <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
        </CheckboxIndicator>
        Show archived projects
      </Checkbox>
      <Checkbox>
        <CheckboxInput aria-label='Select Q3 marketing report' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
      </Checkbox>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Визуальный индикатор без `CheckboxInput`

Не остаётся фокусируемого элемента, и участие в нативной форме ломается.

### Неопределённое состояние случайно используется как итоговое сохраняемое

Неопределённое состояние обычно визуально обозначает частичный выбор, а не отдельное бизнес-значение.

### Подпись и индикатор как раздельные области клика

Корневая подпись должна держать элемент и текст вместе как одну строку взаимодействия.
