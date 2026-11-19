# NumberField: примеры

## Базовый

### Базовый: число мест с границами

`min`, `max` и `defaultValue` задаются на корне; `id`, `name` и `aria-describedby` — на `NumberFieldInput`. У кнопок шага нет встроенного имени, поэтому каждой нужен `aria-label`; на границах они отключаются сами.

<!-- example: number-field/seat-count.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function SeatCount() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 240 }}>
      <Label htmlFor={id}>Seats</Label>
      <NumberField min={1} max={50} defaultValue={5}>
        <NumberFieldDecrementButton square aria-label='Remove a seat'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} name='seats' aria-describedby={hintId} />
        <NumberFieldIncrementButton square aria-label='Add a seat'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={hintId}>From 1 to 50 seats on the Team plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: количество определяет сумму заказа

`value` и `onChangeValue` работают с числами, а не строками. Очищенное поле сообщает `NaN`, поэтому сумма проверяет `Number.isNaN` перед форматированием, а кнопки ниже задают значение снаружи, в том числе очищают его.

<!-- example: number-field/order-total.tsx -->
```tsx
import {
  Button,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const UNIT_PRICE = 24.5;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function OrderTotal({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [quantity, setQuantity] = useState(2);
  const empty = Number.isNaN(quantity);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 240 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Notebooks, {currency.format(UNIT_PRICE)} each</Label>
        <NumberField min={0} max={99} value={quantity} onChangeValue={setQuantity}>
          <NumberFieldDecrementButton square aria-label='Decrease quantity'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id={id} />
          <NumberFieldIncrementButton square aria-label='Increase quantity'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
      </div>
      <Text size={3} fontWeight={500} role='status' style={{ fontVariantNumeric: 'tabular-nums' }}>
        Total: {empty ? '—' : currency.format(quantity * UNIT_PRICE)}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setQuantity(10)}>Bulk: 10</Button>
        <Button size='sm' variant='secondary' appearance='transparent' onClick={() => setQuantity(NaN)}>Clear</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: отправка и сброс в форме

Поле показывает число с разделителями тысяч, поэтому форма отправляет число из скрытого поля, которое повторяет `value`. Сброс возвращает в состояние значение по умолчанию.

<!-- example: number-field/form-submit-and-reset.tsx -->
```tsx
import {
  Button,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { FormEvent, useId, useState } from 'react';

const DEFAULT_BUDGET = 2500;

export default function FormSubmitAndReset() {
  const id = useId();
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(`monthlyBudget=${new FormData(event.currentTarget).get('monthlyBudget')}`);
  };

  const onReset = () => {
    setBudget(DEFAULT_BUDGET);
    setSubmitted('');
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 280 }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Monthly budget, USD</Label>
        <NumberField min={0} max={1000000} step={500} value={budget} onChangeValue={setBudget} maximumFractionDigits={0}>
          <NumberFieldDecrementButton square aria-label='Decrease budget by 500'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id={id} required />
          <NumberFieldIncrementButton square aria-label='Increase budget by 500'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
        <input type='hidden' name='monthlyBudget' value={Number.isNaN(budget) ? '' : budget} />
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save</Button>
        <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{submitted}</Text>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: количество в корзине

Компактные счётчики `size='sm'` в повторяющихся строках. У каждого инпута и кнопки есть `aria-label` с названием товара: просто «Количество» неоднозначно, когда строк несколько. Очищенные строки не входят в сумму.

<!-- example: number-field/cart-line-items.tsx -->
```tsx
import {
  Icon,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useState } from 'react';

interface LineItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function CartLineItems() {
  const [items, setItems] = useState<LineItem[]>([
    { sku: 'KB-01', name: 'Mechanical keyboard', price: 129, quantity: 1 },
    { sku: 'MS-02', name: 'Wireless mouse', price: 49, quantity: 2 },
    { sku: 'HB-07', name: 'USB-C hub, 7 ports', price: 64.9, quantity: 1 },
  ]);

  const changeQuantity = (sku: string, quantity: number) => {
    setItems((current) => current.map((item) => (item.sku === sku ? { ...item, quantity } : item)));
  };

  const total = items.reduce((sum, item) => {
    if (Number.isNaN(item.quantity)) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <div
      style={{
        display: 'grid',
        gap: 'var(--spacing-8)',
        width: '100%',
        padding: 'var(--spacing-8)',
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-5)',
        border: '1px solid var(--separator-opaque)',
        background: 'var(--surface-primary)',
      }}
    >
      {items.map((item) => (
        <div key={item.sku} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 132px', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={3} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{currency.format(item.price)}</Text>
          </div>
          <NumberField size='sm' min={0} max={20} value={item.quantity} onChangeValue={(quantity) => changeQuantity(item.sku, quantity)}>
            <NumberFieldDecrementButton square aria-label={`Remove one ${item.name}`}><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
            <NumberFieldInput aria-label={`Quantity of ${item.name}`} />
            <NumberFieldIncrementButton square aria-label={`Add one ${item.name}`}><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
          </NumberField>
        </div>
      ))}
      <div
        role='status'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBlockStart: 'var(--spacing-8)',
          borderBlockStart: '1px solid var(--separator-opaque)',
        }}
      >
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Subtotal</Text>
        <Text size={3} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(total)}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: меньше бизнес-минимума

Маска удерживает значение в пределах `min`/`max`, но правила вроде «мест не меньше, чем активных участников» — ваша забота. Ошибка вычисляется из значения, ставится через `aria-invalid` на инпуте и исчезает, как только значение снова корректно.

<!-- example: number-field/seats-below-active-members.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const ACTIVE_MEMBERS = 12;

const getSeatsError = (seats: number) => {
  if (Number.isNaN(seats)) return 'Enter the number of seats.';
  if (seats < ACTIVE_MEMBERS) return `You have ${ACTIVE_MEMBERS} active members. Remove members first or keep at least ${ACTIVE_MEMBERS} seats.`;
  return '';
};

export default function SeatsBelowActiveMembers() {
  const id = useId();
  const messageId = `${id}-message`;
  const [seats, setSeats] = useState(10);
  const error = getSeatsError(seats);
  const invalid = error !== '';

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Seats after renewal</Label>
      <NumberField min={1} max={200} value={seats} onChangeValue={setSeats}>
        <NumberFieldDecrementButton square aria-label='Remove a seat'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} aria-invalid={invalid} aria-describedby={messageId} />
        <NumberFieldIncrementButton square aria-label='Add a seat'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={messageId} invalid={invalid}>
        {invalid ? error : `Covers all ${ACTIVE_MEMBERS} active members.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: заблокировано до явного переопределения

`disabled` на корне отключает инпут и обе кнопки. Чекбокс разблокирует поле, а подсказка объясняет, почему оно заблокировано.

<!-- example: number-field/locked-until-override.tsx -->
```tsx
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function LockedUntilOverride() {
  const id = useId();
  const [override, setOverride] = useState(false);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 280 }}>
      <Checkbox>
        <CheckboxInput checked={override} onChange={(event) => setOverride(event.currentTarget.checked)} />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        Override the default rate limit
      </Checkbox>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={id}>Requests per minute</Label>
        <NumberField min={60} max={6000} step={60} defaultValue={600} disabled={!override}>
          <NumberFieldDecrementButton square aria-label='Decrease by 60'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
          <NumberFieldInput id={id} name='rateLimit' aria-describedby={`${id}-hint`} />
          <NumberFieldIncrementButton square aria-label='Increase by 60'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
        </NumberField>
        <HelperText id={`${id}-hint`}>
          {override ? 'From 60 to 6,000, in steps of 60.' : 'Uses the plan default of 600.'}
        </HelperText>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: дробный шаг и единица измерения

`step={0.5}` вместе с `maximumFractionDigits={1}` даёт шаг без погрешностей плавающей точки. Суффикс `%` стоит между инпутом и кнопкой увеличения и скрыт от скринридера; вычисленная цена ниже связана через `aria-describedby`.

<!-- example: number-field/discount-percentage.tsx -->
```tsx
import {
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  Text,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const LIST_PRICE = 1290;
export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function DiscountPercentage({ locale = 'en-US' }: { locale?: string }) {
  const currency = new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' });

  const id = useId();
  const [discount, setDiscount] = useState(12.5);
  const price = Number.isNaN(discount) ? LIST_PRICE : LIST_PRICE * (1 - discount / 100);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 260 }}>
      <Label htmlFor={id}>Discount</Label>
      <NumberField min={0} max={100} step={0.5} maximumFractionDigits={1} value={discount} onChangeValue={setDiscount}>
        <NumberFieldDecrementButton square aria-label='Decrease discount by 0.5%'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} aria-describedby={`${id}-price`} />
        <Text size={3} aria-hidden style={{ color: 'var(--label-secondary)' }}>%</Text>
        <NumberFieldIncrementButton square aria-label='Increase discount by 0.5%'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <Text id={`${id}-price`} size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        Annual plan: {currency.format(price)} instead of {currency.format(LIST_PRICE)}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: большие суммы без колеса мыши

Большие значения получают разделители тысяч прямо при вводе. `changeOnWheel={false}` не даёт колесу мыши менять сумму в фокусе, когда пользователь прокручивает длинную форму.

<!-- example: number-field/large-amount-no-wheel.tsx -->
```tsx
import {
  HelperText,
  Icon,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
} from '@vega-ui/react';
import { MinusIcon, PlusIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });

export default function LargeAmountNoWheel() {
  const id = useId();
  const [limit, setLimit] = useState(2500000);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Annual spend limit, USD</Label>
      <NumberField
        min={0}
        max={50000000}
        step={10000}
        maximumFractionDigits={0}
        changeOnWheel={false}
        value={limit}
        onChangeValue={setLimit}
      >
        <NumberFieldDecrementButton square aria-label='Decrease by 10,000'><Icon><MinusIcon /></Icon></NumberFieldDecrementButton>
        <NumberFieldInput id={id} aria-describedby={`${id}-hint`} />
        <NumberFieldIncrementButton square aria-label='Increase by 10,000'><Icon><PlusIcon /></Icon></NumberFieldIncrementButton>
      </NumberField>
      <HelperText id={`${id}-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {Number.isNaN(limit) ? 'No limit set.' : `About ${compact.format(limit)}. Max 50M.`}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->
