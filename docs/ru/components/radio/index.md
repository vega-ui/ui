# Radio

## Профиль документа

`advanced interactive`

## Кратко

`Radio` — контрол выбора одного варианта из взаимоисключающих, у которых общий `name`. Это наиболее близкий к формам примитив взаимоисключающего выбора в семействе контролов выбора.

## Импорты

```tsx
import {
  Radio,
  type RadioProps,
  type RadioSize,
  type RadioVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `RadioProps`
- `RadioSize`
- `RadioVariant`

## Минимальная композиция

<!-- example: radio/minimal-composition.tsx -->
```tsx
import { Radio } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div role='radiogroup' aria-label='Theme' style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='theme' value='light' defaultChecked />
        Light
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Radio name='theme' value='dark' />
        Dark
      </label>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Radio`: нативный input радиокнопки

## Необязательные части

- Кроме самого input, публичных частей нет

## Порядок композиции

1. видимая обёртка-подпись
2. `Radio`
3. текст подписи

## Варианты

- Размеры: `sm`, `md`, `lg`
- Варианты: `primary`, `secondary`
- Состояния: не отмечено, отмечено, отключено, отмечено и отключено

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

- Радиокнопки ведут себя как одна группа, только если потребитель задаёт связанным input одинаковый `name`.
- Подписи должны описывать вариант, а не действие нажатия на него.
- Радиокнопки не подходят для независимых булевых настроек.
- Если вариантам нужны более подробные описания или области клика размером с плитку, понятнее может быть `SegmentedControl` или `CheckboxCard` — в зависимости от взаимоисключаемости.

## Частые ошибки

- Радиокнопки используются без общего `name`.
- Радиокнопки используются для множественного выбора.
- Строка с радиокнопкой, где кликабелен только крошечный контрол.
