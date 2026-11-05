# Table: анатомия

## Обзор

`Table` владеет общим контекстом выравнивания и краевых отступов для семантической структуры таблицы. Это [составной компонент](../../glossary.md#составной-компонент-compound-component), потому что корень и секции работают вместе по одному контракту отображения данных.

## Обязательные части

### `Table`

Обязательная. Отвечает за выравнивание, краевые отступы и флаги раскладки на всю ширину или высоту.

### `TableRow`

Обязательная. Задаёт структуру строки внутри секций заголовка, тела или подвала.

### `TableHeading` или `TableData`

Обязательная. Предоставляет сами семантические ячейки строки.

## Необязательные части

### `TableHead`

Рекомендуется для подписей столбцов и доступной структуры столбцов.

### `TableBody`

Рекомендуется для строк данных.

### `TableFoot`

Необязательный подвал для итогов, сводок или агрегированных значений.

## Порядок композиции

1. `Table`
2. `TableHead`
3. `TableBody`
4. `TableFoot`
5. `TableRow`
6. `TableHeading`
7. `TableData`

## Корректные паттерны композиции

<!-- example: table/summary-table-with-footer-totals.tsx -->
```tsx
import {
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';

const lines = [
  { item: 'Team plan · 12 seats', quantity: 12, unitPrice: 29 },
  { item: 'Extra storage · 500 GB', quantity: 1, unitPrice: 40 },
  { item: 'Priority support', quantity: 1, unitPrice: 99 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function SummaryTableWithFooterTotals() {
  const subtotal = lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0);
  const tax = subtotal * 0.2;

  return (
    <div style={{ width: '100%', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
        <TableHead>
          <TableRow>
            <TableHeading scope='col'>Item</TableHeading>
            <TableHeading scope='col'>Qty</TableHeading>
            <TableHeading scope='col'>Amount</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line) => (
            <TableRow key={line.item}>
              <TableData>{line.item}</TableData>
              <TableData>{line.quantity}</TableData>
              <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(line.quantity * line.unitPrice)}</TableData>
            </TableRow>
          ))}
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start' style={{ fontWeight: 400 }}>Subtotal</TableHeading>
            <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(subtotal)}</TableData>
          </TableRow>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start' style={{ fontWeight: 400 }}>VAT 20%</TableHeading>
            <TableData style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(tax)}</TableData>
          </TableRow>
          <TableRow>
            <TableHeading scope='row' colSpan={2} dataAlign='start'>Total due</TableHeading>
            <TableData style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{currency.format(subtotal + tax)}</TableData>
          </TableRow>
        </TableFoot>
      </Table>
    </div>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Визуальная раскладка таблицы без семантических частей

Это ослабляет нативный смысл таблицы и часто вредит доступности.

### Произвольное смешение ролей заголовков и данных

Подписи столбцов должны оставаться в `TableHeading`, а не превращаться в стилизованные ячейки данных.

### `Table` как интерактивный грид данных

Если функции нужны навигация по ячейкам, модели выбора или более богатое поведение грида, выбирайте `DataGrid`.
