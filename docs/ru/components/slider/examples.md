# Slider: примеры

## Базовый

### Базовый: слайдер с подписью и значением по умолчанию

Неконтролируемый слайдер: `defaultValue` задаёт начальное значение, а `name` на корне доходит до поля бегунка. `SliderThumbInput` — нативный `<input type='range'>`, поэтому видимый `Label` ссылается на его `id`.

<!-- example: slider/slider-with-default-value.tsx -->
```tsx
import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function SliderWithDefaultValue() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <Label htmlFor='notification-volume'>Notification volume</Label>
      <Slider defaultValue={30} name='notification-volume'>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput id='notification-volume' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>
  );
}
```
<!-- /example -->

### Базовый: два бегунка для диапазона

Массив в `defaultValue` задаёт по значению на каждый `SliderThumb` по его `index`. Каждое поле бегунка получает свой `name` и `aria-label`, а `minStepsBetweenThumbs` не даёт смене стать короче часа.

<!-- example: slider/range-slider.tsx -->
```tsx
import {
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function RangeSlider() {
  return (
    <Fieldset style={{ width: '100%', maxWidth: 400 }}>
      <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Working hours</FieldsetLegend>
      <Slider min={0} max={24} defaultValue={[9, 18]} minStepsBetweenThumbs={1}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0}>
          <SliderThumbInput name='start-hour' aria-label='Start time' />
          <SliderThumbIndicator />
        </SliderThumb>
        <SliderThumb index={1}>
          <SliderThumbInput name='end-hour' aria-label='End time' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </Fieldset>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: значение, управляющее превью

`value` с `onChangeValue` держит число в родителе: подпись и образец цвета следуют за ним во время перетаскивания. `aria-valuetext` объявляет значение вместе с единицей измерения.

<!-- example: slider/controlled-brightness.tsx -->
```tsx
import { useState } from 'react';
import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function ControlledBrightness() {
  const [brightness, setBrightness] = useState(60);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
          <Label htmlFor='screen-brightness'>Screen brightness</Label>
          <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{brightness}%</Text>
        </div>
        <Slider value={brightness} onChangeValue={setBrightness}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput id='screen-brightness' aria-valuetext={`${brightness}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      </div>
      <div
        aria-hidden
        style={{
          height: 64,
          borderRadius: 'var(--radius-2)',
          background: 'var(--color-primary-500)',
          filter: `brightness(${0.2 + brightness / 100})`,
        }}
      />
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: фильтр цены по списку товаров

Контролируемый диапазон с двумя бегунками фильтрует список прямо во время движения. Цены форматируются одним `Intl.NumberFormat`, который используется и для подписи, и для `aria-valuetext` каждого бегунка.

<!-- example: slider/controlled-range.tsx -->
```tsx
import { useState } from 'react';
import {
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const products = [
  { name: 'Trail runner', price: 89 },
  { name: 'Rain shell', price: 149 },
  { name: 'Down jacket', price: 279 },
  { name: 'Wool beanie', price: 25 },
  { name: 'Hiking boots', price: 189 },
  { name: 'Day pack', price: 65 },
  { name: 'Fleece vest', price: 79 },
  { name: 'Expedition parka', price: 540 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function ControlledRange() {
  const [price, setPrice] = useState([50, 200]);

  const matching = products.filter((product) => product.price >= price[0] && product.price <= price[1]);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 400 }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Price</FieldsetLegend>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(price[0])} – {currency.format(price[1])}</Text>
        <Slider min={0} max={600} step={10} minStepsBetweenThumbs={5} value={price} onChangeValue={setPrice}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderThumbInput aria-label='Minimum price' aria-valuetext={currency.format(price[0])} />
            <SliderThumbIndicator />
          </SliderThumb>
          <SliderThumb index={1}>
            <SliderThumbInput aria-label='Maximum price' aria-valuetext={currency.format(price[1])} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
      </Fieldset>
      <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>
        {matching.length} of {products.length} products{matching.length > 0 ? `: ${matching.map((product) => product.name).join(', ')}` : ''}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: добавление и удаление бегунков

Число бегунков следует за длиной массива `value`: рендерите по одному `SliderThumb` на элемент. Бегунки остаются упорядоченными и на расстоянии `minStepsBetweenThumbs`, а каждый получает подпись по своей позиции.

<!-- example: slider/any-number-of-thumbs.tsx -->
```tsx
import { useState } from 'react';
import {
  Button,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const tierNames = ['Free', 'Starter', 'Growth', 'Scale', 'Enterprise'];

export default function AnyNumberOfThumbs() {
  const [limits, setLimits] = useState([1000, 10000, 50000]);

  const addLimit = () => {
    const last = limits[limits.length - 1];
    if (last >= 95000) return;
    setLimits([...limits, Math.min(last + 20000, 100000)]);
  };

  const removeLimit = () => {
    setLimits(limits.slice(0, -1));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 400 }}>
      <Slider min={0} max={100000} step={1000} minStepsBetweenThumbs={5} value={limits} onChangeValue={setLimits}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        {limits.map((limit, index) => (
          <SliderThumb key={index} index={index}>
            <SliderThumbInput aria-label={`${tierNames[index]} tier limit`} aria-valuetext={`${limit.toLocaleString('en-US')} requests`} />
            <SliderThumbIndicator />
          </SliderThumb>
        ))}
      </Slider>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {limits.map((limit, index) => `${tierNames[index]}: up to ${limit.toLocaleString('en-US')}`).join(' · ')}
      </Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={addLimit} disabled={limits.length === tierNames.length}>Add tier</Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={removeLimit} disabled={limits.length === 2}>Remove last tier</Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: чтение значений через FormData

Диапазон с `name` на корне отправляет по записи на каждый бегунок, поэтому `FormData.getAll('age')` возвращает обе границы; одиночный бегунок читается через `FormData.get`. Сброс формы возвращает `defaultValue`.

<!-- example: slider/native-form-value.tsx -->
```tsx
import { FormEvent, useState } from 'react';
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function NativeFormValue() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`age=${data.getAll('age').join('–')}, radius=${data.get('radius')} km`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Audience age</FieldsetLegend>
          <Slider min={18} max={65} defaultValue={[25, 40]} name='age'>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0}>
              <SliderThumbInput aria-label='Minimum age' />
              <SliderThumbIndicator />
            </SliderThumb>
            <SliderThumb index={1}>
              <SliderThumbInput aria-label='Maximum age' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Delivery radius</FieldsetLegend>
          <Slider min={1} max={50} defaultValue={10}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput name='radius' aria-label='Radius in kilometers' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Save campaign</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: вертикальный слайдер

`orientation='vertical'` растёт снизу вверх, и ему нужна явная высота. Значение показано под дорожкой, а клавиатура работает по обеим осям стрелок.

<!-- example: slider/vertical-slider.tsx -->
```tsx
import { useState } from 'react';
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function VerticalSlider() {
  const [level, setLevel] = useState(70);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 'var(--spacing-12)' }}>
      <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
        <Slider orientation='vertical' value={level} onChangeValue={setLevel} style={{ height: 200 }}>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput aria-label='Master volume' aria-valuetext={`${level}%`} />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <Text size={1} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{level}%</Text>
      </div>
      <Text size={2} style={{ maxWidth: 220, color: 'var(--label-secondary)' }}>
        A vertical slider needs an explicit height. Arrow Up and Arrow Right raise the value, Page Up and Page Down jump by a tenth.
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Раскладка/оверлей: слайдер громкости в поповере

Триггер-иконка открывает `Popover` с вертикальным слайдером. `aria-label` триггера включает текущее значение, поэтому оно объявляется без открытия поповера, а иконка следует за значением.

<!-- example: slider/slider-in-a-popover.tsx -->
```tsx
import { useState } from 'react';
import {
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';
import { Volume1Icon, Volume2Icon, VolumeXIcon } from '@vega-ui/icons';

export default function SliderInAPopover() {
  const [volume, setVolume] = useState(40);

  let VolumeIcon = Volume2Icon;
  if (volume === 0) {
    VolumeIcon = VolumeXIcon;
  } else if (volume < 50) {
    VolumeIcon = Volume1Icon;
  }

  return (
    <Popover role='dialog' placement='top'>
      <PopoverTrigger asChild>
        <IconButton aria-label={`Volume, ${volume}%`} variant='secondary' appearance='ghost'>
          <Icon size='sm'><VolumeIcon /></Icon>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent aria-label='Volume'>
        <div style={{ padding: 'var(--spacing-6)' }}>
          <Slider orientation='vertical' value={volume} onChangeValue={setVolume} style={{ height: 140 }}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label='Volume' aria-valuetext={`${volume}%`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: значение выше лимита политики

Слайдер допускает весь диапазон, но значения выше лимита политики невалидны: поле бегунка получает `aria-invalid` и `aria-describedby` со ссылкой на ошибку, которая исчезает, когда значение возвращается в пределы лимита.

<!-- example: slider/value-outside-policy-hint.tsx -->
```tsx
import { useState } from 'react';
import {
  HelperText,
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

const policyLimit = 80;

export default function ValueOutsidePolicyHint() {
  const [cpu, setCpu] = useState(90);

  const invalid = cpu > policyLimit;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Label htmlFor='cpu-limit'>CPU limit</Label>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{cpu}%</Text>
      </div>
      <Slider name='cpu-limit' value={cpu} onChangeValue={setCpu}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput
            id='cpu-limit'
            aria-valuetext={`${cpu}%`}
            aria-invalid={invalid}
            aria-describedby={invalid ? 'cpu-limit-error' : undefined}
          />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
      {invalid && (
        <HelperText id='cpu-limit-error' error>
          Shared clusters allow up to {policyLimit}%. Lower the limit to save.
        </HelperText>
      )}
    </div>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: заблокированное значение и отключение через fieldset

`disabled` на корне блокирует все бегунки; причина связана через `aria-describedby`. Слайдер внутри `Fieldset disabled` отключается нативно и тоже выглядит отключённым — здесь, пока включена автоматическая яркость.

<!-- example: slider/locked-slider.tsx -->
```tsx
import { useState } from 'react';
import {
  Fieldset,
  FieldsetLegend,
  HelperText,
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';

export default function LockedSlider() {
  const [automatic, setAutomatic] = useState(true);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='retention-days'>Log retention</Label>
        <Slider min={7} max={365} defaultValue={90} disabled>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb>
            <SliderThumbInput id='retention-days' aria-valuetext='90 days' aria-describedby='retention-note' />
            <SliderThumbIndicator />
          </SliderThumb>
        </Slider>
        <HelperText id='retention-note'>Set by your compliance policy: 90 days.</HelperText>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Label htmlFor='auto-brightness'>Adjust brightness automatically</Label>
          <Switch>
            <SwitchInput id='auto-brightness' checked={automatic} onChange={(event) => setAutomatic(event.currentTarget.checked)} />
            <SwitchIndicator />
          </Switch>
        </div>
        <Fieldset disabled={automatic}>
          <FieldsetLegend size={3} style={{ marginBlockEnd: 'var(--spacing-3)' }}>Manual brightness</FieldsetLegend>
          <Slider defaultValue={60}>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label='Brightness' />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
        </Fieldset>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: произвольная точность со step any

`step='any'` убирает сетку шагов, и значение может быть любой дробью между `min` и `max`. Стрелки тогда сдвигают на сотую часть диапазона; подпись округляет значение для показа.

<!-- example: slider/free-precision-step.tsx -->
```tsx
import { useState } from 'react';
import {
  Label,
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';

export default function FreePrecisionStep() {
  const [opacity, setOpacity] = useState(0.35);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Label htmlFor='overlay-opacity'>Overlay opacity</Label>
        <Text size={3} aria-hidden style={{ fontVariantNumeric: 'tabular-nums' }}>{opacity.toFixed(3)}</Text>
      </div>
      <Slider min={0} max={1} step='any' name='overlay-opacity' value={opacity} onChangeValue={setOpacity}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput id='overlay-opacity' aria-valuetext={`${Math.round(opacity * 100)}%`} />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: текст значения с единицами и отрицательным минимумом

Диапазон от −10 до 30 с `aria-valuetext`, чтобы скринридер говорил «20 °C», а не голое число.

<!-- example: slider/value-text-for-screen-readers.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';
import { useState } from 'react';

export default function ValueTextForScreenReaders() {
  const [temperature, setTemperature] = useState(20);

  return (
    <Slider min={-10} max={30} value={temperature} onChangeValue={setTemperature} style={{ width: '100%', maxWidth: 400 }}>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb>
        <SliderThumbInput aria-label='Temperature' aria-valuetext={`${temperature} °C`} />
        <SliderThumbIndicator />
      </SliderThumb>
    </Slider>
  );
}
```
<!-- /example -->

### Пограничный случай: прилипание к меткам datalist

`<datalist>`, подключённый через `list`, заставляет нативное поле прилипать к своим значениям при перетаскивании. Браузер не рисует метки, поэтому, если они должны быть видны, нарисуйте их сами.

<!-- example: slider/markers-from-a-datalist.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
} from '@vega-ui/react';

export default function MarkersFromADatalist() {
  return (
    <>
      <datalist id='zoom-markers'>
        <option value='0' />
        <option value='50' />
        <option value='100' />
      </datalist>
      <Slider defaultValue={40} style={{ width: '100%', maxWidth: 400 }}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderThumbInput list='zoom-markers' aria-label='Zoom' />
          <SliderThumbIndicator />
        </SliderThumb>
      </Slider>
    </>
  );
}
```
<!-- /example -->

### Пограничный случай: группа вертикальных слайдеров с отрицательным диапазоном

Пять вертикальных слайдеров от −12 до +12 дБ образуют эквалайзер внутри подписанной `role='group'`. Каждый бегунок назван по своей полосе и объявляет усиление в дБ.

<!-- example: slider/vertical-group-negative-range.tsx -->
```tsx
import {
  Slider,
  SliderRange,
  SliderThumb,
  SliderThumbIndicator,
  SliderThumbInput,
  SliderTrack,
  Text,
} from '@vega-ui/react';
import { useState } from 'react';

const bands = ['60 Hz', '230 Hz', '910 Hz', '3.6 kHz', '14 kHz'];

export default function VerticalGroupNegativeRange() {
  const [gains, setGains] = useState([4, 2, 0, -2, 3]);

  const changeGain = (band: number, gain: number) => {
    setGains((current) => current.map((value, index) => (index === band ? gain : value)));
  };

  return (
    <div role='group' aria-label='Equalizer' style={{ display: 'flex', gap: 'var(--spacing-16)' }}>
      {bands.map((band, index) => (
        <div key={band} style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-4)' }}>
          <Slider
            orientation='vertical'
            min={-12}
            max={12}
            value={gains[index]}
            onChangeValue={(gain) => changeGain(index, gain)}
            style={{ height: 200 }}
          >
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb>
              <SliderThumbInput aria-label={band} aria-valuetext={`${gains[index]} dB`} />
              <SliderThumbIndicator />
            </SliderThumb>
          </Slider>
          <Text size={1} fontWeight={600}>{band}</Text>
        </div>
      ))}
    </div>
  );
}
```
<!-- /example -->
