# Collapsible

## Профиль документа

`advanced interactive`

## Кратко

`Collapsible` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для одной раскрывающейся области с триггером и поверхностью содержимого. Это примитивный паттерн раскрытия, когда групповое поведение аккордеона не нужно.

## Импорты

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CollapsibleProps`
- `CollapsibleTriggerProps`
- `CollapsibleContentProps`

## Минимальная композиция

<!-- example: collapsible/minimal-composition.tsx -->
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ width: '100%' }}>
      <Collapsible>
        <CollapsibleTrigger>Advanced billing options</CollapsibleTrigger>
        <CollapsibleContent>
          VAT settings, invoice recipients, and legal entity data.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyCollapsible` передаёт свои пропсы в `Collapsible`, рендерит `summary` в триггере-кнопке ghost, а дочерние элементы — в содержимом. См. [Рецепты компонентов](../../recipes.md).

<!-- example: collapsible/recipe.tsx -->
```tsx
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Text,
  type CollapsibleProps,
} from '@vega-ui/react';
import type { ReactNode } from 'react';

interface MyCollapsibleProps extends CollapsibleProps {
  summary: ReactNode
}

export function MyCollapsible({ summary, children, ...props }: MyCollapsibleProps) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>{summary}</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function Recipe() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <MyCollapsible summary='Price breakdown'>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
          {lines.map((line) => (
            <div key={line.label} style={{ display: 'contents' }}>
              <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
              <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
            </div>
          ))}
        </dl>
      </MyCollapsible>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Collapsible`: владелец состояния корня
- `CollapsibleTrigger`: поверхность триггера раскрытия
- `CollapsibleContent`: раскрывающаяся область содержимого

## Необязательные части

- Кроме модели «корень — триггер — содержимое», дополнительных публичных частей нет

## Порядок композиции

1. `Collapsible`
2. `CollapsibleTrigger`
3. `CollapsibleContent`

## Варианты

- Неконтролируемое или [контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия
- Стандартный триггер-кнопка или композиция триггера через `asChild`
- Встроенная справка, фильтры и второстепенные детали как варианты на уровне продукта

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

- `CollapsibleTrigger` может рендериться через `asChild`, но пользовательская семантика всё равно должна сохранять контракт настоящего триггера.
- `onChangeHidden` отражает жизненный цикл видимости, который во время переходов высоты может отличаться от состояния открытия.
- Динамическую высоту содержимого нужно проверять на реальном содержимом, а не только на коротких заглушках.

## Частые ошибки

- Использовать `Collapsible` там, где на самом деле нужно групповое поведение `Accordion`.
- Прятать важную информацию за расплывчатыми подписями триггера.
- Считать `open` и `hidden` одним и тем же сигналом жизненного цикла.
