# WheelPicker: анатомия

## Обзор

`WheelPicker` — ряд колонок с одной полосой выбора за ними. Каждая `WheelPickerColumn` владеет своим значением и читает опции из своих дочерних `WheelPickerOption`; сам пикер значения не хранит. Колонка — вертикальный скроллер своих опций, скрытых от вспомогательных технологий, и сообщает значение через `aria-valuetext`.

## Обязательные части

### `WheelPicker`

Рендерит `<div role="group">`, полоса выбора — его `::before`. `rows` задаёт, сколько строк показывает каждая колонка, выбранная — посередине. Назовите его через `aria-label` или `aria-labelledby`.

### `WheelPickerColumn`

Рендерит `<div role="spinbutton" tabindex="0">` с `aria-valuetext`, `aria-valuenow`, `aria-valuemin` и `aria-valuemax`, а также `data-disabled` и `data-readonly` для своих состояний. Она сама — вертикальный [SnapScroller](../snap-scroller/), поэтому её `className`, `style` и `ref` попадают на прокручиваемый элемент. С `loop` опции повторяются ещё на 15 строк за каждым концом, и когда колесо останавливается, прокрутка переходит к той же опции ближе всего к середине, что выглядит так же. Назовите её через `aria-label` или `aria-labelledby`.

### `WheelPickerOption`

Рендерит одну строку, `<div aria-hidden="true">` с `data-disabled`. Строка стоит на месте как точка остановки прокрутки и сама ничего не показывает: положите в неё `WheelPickerFace`. Её `value` колонка сообщает родителю, а текст её грани или `label` ищет поиск по набору и объявляет колонка; у опции без них — её `value`.

### `WheelPickerFace`

Рендерит `<span>` с тем, что показывает опция, — грань, которая изгибается по барабану. Без детей она показывает текст своей опции: её `label` или `value`. Её `className`, `style` и `ref` попадают на видимый текст. Это отдельная часть, потому что браузеры останавливают прокрутку по тому месту, где элемент нарисован: строка держит остановки на месте, а грань поворачивается.

## Необязательные части

### Текст между колонками

Любой элемент внутри `WheelPicker` стоит между колонками, по центру полосы с `align-self: center`: единица вроде «мин» или слово вроде «Каждые». Скройте его через `aria-hidden`, когда имена колонок уже это говорят.

### Оверлей

[Popover](../popover/) или [Sheet](../sheet/) вокруг пикера, который открывает кнопка со значением.

## Порядок композиции

1. `WheelPicker`
2. `WheelPickerColumn`
3. `WheelPickerOption`
4. `WheelPickerFace`

## Корректные варианты композиции

Длительность с постоянными единицами между колонками: единицы скрыты от вспомогательных технологий, а имена колонок — «Hours», «Minutes» и «Seconds».

<!-- example: wheel-picker/timer.tsx -->
```tsx
import { useState } from 'react';
import { Button, Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

const hours = Array.from({ length: 24 }, (_, hour) => hour);
const sixty = Array.from({ length: 60 }, (_, value) => value);
const unit = { alignSelf: 'center', color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' } as const;

const summaryOf = (hour: number, minute: number, second: number) => {
  const parts = [hour && `${hour} h`, minute && `${minute} min`, second && `${second} s`].filter(Boolean);
  if (parts.length === 0) return 'Pick a duration';

  return `Rings in ${parts.join(' ')}`;
};

export default function Timer() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);
  const empty = hour === 0 && minute === 0 && second === 0;

  return (
    <section
      aria-labelledby='timer-title'
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <Text id='timer-title' size={3} fontWeight={600} style={{ justifySelf: 'start' }}>Focus timer</Text>
      <WheelPicker aria-labelledby='timer-title'>
        <WheelPickerColumn aria-label='Hours' value={hour} onChangeValue={setHour}>
          {hours.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>h</span>
        <WheelPickerColumn aria-label='Minutes' loop value={minute} onChangeValue={setMinute}>
          {sixty.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>min</span>
        <WheelPickerColumn aria-label='Seconds' loop value={second} onChangeValue={setSecond}>
          {sixty.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <span aria-hidden='true' style={unit}>s</span>
      </WheelPicker>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{summaryOf(hour, minute, second)}</Text>
        <Button size='xs' disabled={empty}>Start</Button>
      </div>
    </section>
  );
}
```
<!-- /example -->

Фраза с колонкой посередине: «Every» остаётся видимым, а колонка единиц меняет текст вместе с количеством, но сохраняет свой `value`.

<!-- example: wheel-picker/repeat-reminder.tsx -->
```tsx
import { useState } from 'react';
import { Text, WheelPicker, WheelPickerColumn, WheelPickerFace, WheelPickerOption } from '@vega-ui/react';

type Unit = 'day' | 'week' | 'month';

const amounts = Array.from({ length: 30 }, (_, index) => index + 1);
const units: Unit[] = ['day', 'week', 'month'];

export default function RepeatReminder() {
  const [amount, setAmount] = useState(2);
  const [unit, setUnit] = useState<Unit>('week');
  const plural = amount === 1 ? '' : 's';

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text id='repeat-label' size={3} fontWeight={600}>Water the plants</Text>
      <WheelPicker aria-labelledby='repeat-label'>
        <span style={{ alignSelf: 'center', paddingInlineEnd: 'var(--spacing-4)' }}>Every</span>
        <WheelPickerColumn aria-label='Amount' value={amount} onChangeValue={setAmount}>
          {amounts.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
        <WheelPickerColumn aria-label='Unit' value={unit} onChangeValue={setUnit} style={{ minInlineSize: '6em' }}>
          {units.map((value) => <WheelPickerOption key={value} value={value}><WheelPickerFace>{value + plural}</WheelPickerFace></WheelPickerOption>)}
        </WheelPickerColumn>
      </WheelPicker>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {amount === 1 ? `Reminds you every ${unit}` : `Reminds you every ${amount} ${unit}s`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Опции вне колонки

`WheelPickerOption` читает колонку вокруг себя. Вне `WheelPickerColumn` у неё нет колеса.

### Колонка, которая оборачивает опции другими компонентами

Колонка читает опции из своих дочерних элементов, в том числе внутри фрагмента. `<div>` или свой компонент вокруг них превращаются в одну опцию без `value`.

### Несколько значений в одной колонке

Одна колонка — одна часть значения. Список «07:00», «07:30» и так далее — корректная колонка времени, но колонку из часов и минут вместе нельзя крутить по частям.
