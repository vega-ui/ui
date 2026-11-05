# Switch: анатомия

## Обзор

`Switch` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для одной бинарной настройки, применяемой сразу: нативный input отвечает за семантику и состояние, а индикатор — за видимые бегунок и дорожку.

## Обязательные части

### `Switch`

Обязательная. Владеет контекстом размера и варианта переключателя.

### `SwitchIndicator`

Обязательная. Рендерит видимые бегунок и дорожку переключателя.

### `SwitchInput`

Обязательная. Визуально скрытый нативный чекбокс с `role='switch'`: от него берутся фокус, клавиатура, отмеченное состояние и значение в форме.

## Необязательные части

Необязательных частей у `Switch` нет. Корень `Switch` — это сама дорожка, поэтому видимый текст размещается вне его и связывается через `htmlFor`.

## Порядок композиции

1. `Switch`
2. `SwitchInput`
3. `SwitchIndicator`
4. отдельный `Label` с `htmlFor`, указывающим на `id` у `SwitchInput`, или `aria-label` на `SwitchInput`

## Корректные паттерны композиции

Давайте переключателю имя через отдельный `Label`, у которого `htmlFor` совпадает с `id` у `SwitchInput`, или, если видимого текста нет, через `aria-label` на `SwitchInput`. Не оборачивайте `Switch` в ещё один `<label>`: он сам им является.

<!-- example: switch/valid-composition-patterns.tsx -->
```tsx
import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function ValidCompositionPatterns() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput id='bluetooth' name='bluetooth' />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor='bluetooth'>Bluetooth</Label>
      </div>
      <Switch>
        <SwitchInput name='airplane-mode' aria-label='Airplane mode' />
        <SwitchIndicator />
      </Switch>
    </div>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Переключатель как отложенный выбор при отправке

Переключатель подразумевает бинарное состояние, применяемое сразу, а не модель отложенного выбора в форме.

### Нет `SwitchInput`

Контрол может выглядеть правильно, но у него нет фокусируемого input, и он не участвует в нативной отправке.

### Метка описывает действие, а не состояние

Метки должны описывать управляемую функцию, а не «Включить» или «Выключить».
