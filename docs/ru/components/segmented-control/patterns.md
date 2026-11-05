# SegmentedControl: паттерны

## Короткий выбор вида или режима

Когда использовать:

- Пользователи переключаются между несколькими всегда видимыми видами или режимами.

Заметки по композиции:

- Держите набор вариантов коротким.
- Используйте краткие подписи, которые легко сравнивать рядом.

Компромиссы:

- Наглядное визуальное сравнение.
- Плохо подходит для длинных наборов вариантов.

<!-- example: segmented-control/view-range-selector.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

export default function ViewRangeSelector() {
  return (
    <SegmentedControl name='calendar-view' defaultValue='week' role='radiogroup' aria-label='Calendar view'>
      <SegmentedControlItem value='day'>
        <SegmentedControlItemInput />
        Day
      </SegmentedControlItem>
      <SegmentedControlItem value='week'>
        <SegmentedControlItemInput />
        Week
      </SegmentedControlItem>
      <SegmentedControlItem value='month'>
        <SegmentedControlItemInput />
        Month
      </SegmentedControlItem>
      <SegmentedControlItem value='year'>
        <SegmentedControlItemInput />
        Year
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Компактный выбор темы или плотности

Когда использовать:

- Экрану настроек нужен плотный взаимоисключающий выбор с наглядной визуальной подсказкой, как с ним взаимодействовать.

Заметки по композиции:

- Используйте сегменты из одной иконки, только когда смысл уже очевиден.
- Держите число вариантов небольшим и сбалансированным.

Компромиссы:

- Компактно и выразительно.
- Более хрупко, чем группы радиокнопок, когда подписи или иконки неравномерны.

<!-- example: segmented-control/icon-only-mode-selector.tsx -->
```tsx
import {
  Icon,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';
import { MonitorIcon, MoonIcon, SunIcon } from '@vega-ui/icons';

export default function IconOnlyModeSelector() {
  return (
    <SegmentedControl name='appearance' defaultValue='system' size='sm' role='radiogroup' aria-label='Appearance'>
      <SegmentedControlItem value='light' title='Light'>
        <SegmentedControlItemInput aria-label='Light' />
        <Icon size='sm'><SunIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='system' title='System'>
        <SegmentedControlItemInput aria-label='System' />
        <Icon size='sm'><MonitorIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlItem value='dark' title='Dark'>
        <SegmentedControlItemInput aria-label='Dark' />
        <Icon size='sm'><MoonIcon /></Icon>
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->

## Взаимоисключающий выбор внутри оверлеев

Когда использовать:

- Диалогу или выдвижной панели (Drawer) нужна одна короткая, всегда видимая группа выбора.

Заметки по композиции:

- Делайте контрол достаточно компактным для ширины оверлея.
- Не смешивайте слишком много длинных подписей в стеснённой раскладке.

Компромиссы:

- Хорошо работает в коротких формах внутри оверлеев.
- Перестаёт работать, если содержимое становится слишком широким или вариантов слишком много.

<!-- example: segmented-control/exclusive-selector-inside-overlays.tsx -->
```tsx
import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const densities = [
  { value: 'compact', label: 'Compact' },
  { value: 'default', label: 'Default' },
  { value: 'comfortable', label: 'Comfortable' },
];

export default function ExclusiveSelectorInsideOverlays() {
  const [density, setDensity] = useState('default');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setDensity(String(data.get('density')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Row density: <strong>{density}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Display settings</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='display-settings-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='display-settings-title' as='h2' size={4} fontWeight={600}>Display settings</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label id='density-label'>Row density</Label>
              <SegmentedControl name='density' defaultValue={density} role='radiogroup' aria-labelledby='density-label'>
                {densities.map((item) => (
                  <SegmentedControlItem key={item.value} value={item.value}>
                    <SegmentedControlItemInput />
                    {item.label}
                  </SegmentedControlItem>
                ))}
                <SegmentedControlIndicator />
              </SegmentedControl>
            </div>
            <Button type='submit'>Apply</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```
<!-- /example -->

## С разделителями

Когда использовать:

- Между сегментами нужна видимая граница, например на малоконтрастной поверхности.

Заметки по композиции:

- Поставьте вертикальный `Separator` между элементами; он соседний элемент, а не часть сегмента.
- Задайте корню `display: flex`, чтобы разделители выровнялись с элементами.

Компромиссы:

- Границы между вариантами чётче.
- Разделители остаются видны и рядом с выбранным сегментом.

<!-- example: segmented-control/with-separators.tsx -->
```tsx
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Separator,
} from '@vega-ui/react';

export default function WithSeparators() {
  return (
    <SegmentedControl
      name='sort-order'
      defaultValue='newest'
      role='radiogroup'
      aria-label='Sort by'
      style={{ display: 'flex', width: 'min-content' }}
    >
      <SegmentedControlItem value='newest'>
        <SegmentedControlItemInput />
        Newest
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='popular'>
        <SegmentedControlItemInput />
        Most popular
      </SegmentedControlItem>
      <Separator orientation='vertical' style={{ height: '80%' }} />
      <SegmentedControlItem value='price'>
        <SegmentedControlItemInput />
        Price
      </SegmentedControlItem>
      <SegmentedControlIndicator />
    </SegmentedControl>
  );
}
```
<!-- /example -->
