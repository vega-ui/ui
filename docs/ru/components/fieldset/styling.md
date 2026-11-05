# Fieldset: стилизация

## Обзор

Стилизация `Fieldset` в основном определяется глобальными токенами темы, а не обширным локальным контрактом CSS-переменных компонента.

## Публичные CSS-переменные

В текущей реализации нет отдельных публичных переменных `--fieldset-*`.

Компонент в основном использует общие системные токены:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--border-color` | `Fieldset` | рамка группы в варианте outlined |
| `--label-secondary` | потомок `.sublegend` внутри `Fieldset` | приглушённый вспомогательный текст legend |
| `--radius-4` | `Fieldset` | базовый радиус скругления |
| `--radius-5` | `Fieldset[data-appearance='outlined']` | радиус для внешнего вида outlined |
| `--spacing-6` | корень и заголовок | вертикальный отступ между элементами группы |
| `--spacing-12`, `--spacing-14` | внешний вид outlined | адаптивные внутренние отступы |

## Переменные частей

### Корень

`Fieldset` использует токены рамки, радиуса и отступов, чтобы задать контейнер группы.

### Заголовок

`FieldsetHeader` — flex-колонка с нижним отступом перед сгруппированными элементами.

### Legend

`FieldsetLegend` сохраняет нативное поведение legend и лишь убирает внутренние отступы по умолчанию.

## Взаимодействие состояний и вариантов

- `outlined` добавляет рамку, радиус и адаптивные внутренние отступы.
- `transparent` убирает рамку и отступы, но сохраняет семантическую группировку.
- Стили отключённого состояния в основном идут от вложенных элементов управления, а не от токенов корня fieldset.

## Примеры

### Используйте токены темы, чтобы уплотнить отступы

Плотная панель фильтров переопределяет `gap` и `padding` токенами отступов и сочетает их с меньшей легендой и чекбоксами `size='sm'`.

<!-- example: fieldset/use-theme-tokens-to-tighten-spacing.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
} from '@vega-ui/react';

const COLUMNS = ['Status', 'Owner', 'Due date', 'Priority', 'Last updated'];

export default function UseThemeTokensToTightenSpacing() {
  return (
    <Fieldset appearance='outlined' style={{ gap: 'var(--spacing-3)', padding: 'var(--spacing-8)', width: '100%', maxWidth: 260 }}>
      <FieldsetLegend size={3}>Visible columns</FieldsetLegend>
      {COLUMNS.map((column) => (
        <Checkbox key={column} size='sm' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
          <CheckboxInput name='columns' value={column} defaultChecked />
          <CheckboxIndicator>
            <CheckboxCheckedIcon />
          </CheckboxIndicator>
          {column}
        </Checkbox>
      ))}
    </Fieldset>
  );
}
```
<!-- /example -->

### Согласуйте радиус с окружающей панелью

Внутри скруглённой панели дайте fieldset радиус меньше, чем у панели, чтобы углы оставались концентричными.

<!-- example: fieldset/match-surrounding-panel-radius.tsx -->
```tsx
import { Fieldset, FieldsetLegend, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { useId } from 'react';

export default function MatchSurroundingPanelRadius() {
  const id = useId();

  return (
    <div style={{ padding: 'var(--spacing-8)', borderRadius: 'var(--radius-6)', background: 'var(--fills-quaternary)', width: '100%' }}>
      <Fieldset appearance='outlined' style={{ borderRadius: 'var(--radius-4)' }}>
        <FieldsetLegend>Billing contact</FieldsetLegend>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={id}>Invoice email</Label>
          <TextField>
            <TextFieldInput id={id} type='email' name='invoiceEmail' defaultValue='ap@northwind.io' />
          </TextField>
        </div>
      </Fieldset>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не убирайте семантику legend с помощью `display: contents`
- не полагайтесь на `transparent`, когда для понимания нужна видимая граница
- не стилизуйте корень как обычную карточку вместо семантической группы формы
