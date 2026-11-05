# Collapsible: анатомия

## Обзор

`Collapsible` владеет одной раскрывающейся областью и координирует её триггер, видимость содержимого и жизненный цикл скрытого состояния. Это [составной компонент](../../glossary.md#составной-компонент-compound-component), потому что триггер и содержимое зависят от одного общего контекста корня.

## Обязательные части

### `Collapsible`

Обязательна. Владеет состоянием открытия, жизненным циклом скрытого состояния и координацией ID содержимого.

### `CollapsibleTrigger`

Обязательна. Переключает область и несёт `aria-expanded` и `aria-controls`.

### `CollapsibleContent`

Обязательна. Рендерит раскрывающуюся область и управляет переходом видимости по высоте.

## Необязательные части

Кроме пары триггера и содержимого, `Collapsible` не предоставляет других публичных дочерних частей.

## Порядок композиции

1. `Collapsible`
2. `CollapsibleTrigger`
3. `CollapsibleContent`

## Допустимые варианты композиции

<!-- example: collapsible/price-breakdown.tsx -->
```tsx
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Text } from '@vega-ui/react';

const lines = [
  { label: 'Team plan · 8 seats × $12', amount: '$96.00' },
  { label: 'Extra storage · 200 GB', amount: '$20.00' },
  { label: 'Annual discount −10%', amount: '−$11.60' },
  { label: 'VAT 19%', amount: '$19.84' },
];

export default function PriceBreakdown() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text size={3} fontWeight={500}>Total due today</Text>
        <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>$124.24</Text>
      </div>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }}>Price breakdown</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--spacing-4) var(--spacing-8)' }}>
            {lines.map((line) => (
              <div key={line.label} style={{ display: 'contents' }}>
                <dt><Text size={2} style={{ color: 'var(--label-secondary)' }}>{line.label}</Text></dt>
                <dd style={{ margin: 0, textAlign: 'end' }}><Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{line.amount}</Text></dd>
              </div>
            ))}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Недопустимые варианты композиции

### Содержимое вне `Collapsible`

Это ломает общий ID, скрытое состояние и жизненный цикл перехода.

### Семантика триггера заменена неинтерактивным дочерним элементом

Если используется `asChild`, дочерний элемент всё равно должен вести себя как настоящий триггер.

### Несколько связанных разделов как несвязанные collapsible

Если разделы должны координироваться, используйте `Accordion` вместо отдельных корней `Collapsible`.
