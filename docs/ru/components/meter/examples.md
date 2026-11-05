# Meter: примеры

## Базовый

### Базовый: занятое хранилище с видимой сводкой

Индикатор на реальной шкале: `max` — лимит тарифа, поэтому `value` передаётся в гигабайтах, а не долей. Видимый заголовок задаёт доступное имя через `aria-labelledby`, а `valueText` повторяет понятную сводку для скринридера вместо голого числа.

<!-- example: meter/storage-usage.tsx -->
```tsx
import { Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

export default function StorageUsage() {
  const labelId = useId();
  const usedGb = 36.2;
  const limitGb = 50;
  const summary = `${usedGb} GB of ${limitGb} GB used`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
        <Text id={labelId} size={2} fontWeight={500}>Cloud storage</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
      </div>
      <Meter value={usedGb} max={limitGb} valueText={summary} aria-labelledby={labelId} fullWidth>
        <MeterTrack />
      </Meter>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: заряд батареи с пороговыми зонами

Уровнем владеет родитель и передаёт его в индикатор вместе с `low`, `high` и `optimum`. Дорожка сама становится красной, жёлтой или зелёной, а те же пороги формируют текстовый статус, связанный через `aria-describedby`. Так смысл не держится на одном цвете.

<!-- example: meter/battery-level.tsx -->
```tsx
import { Button, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function BatteryLevel() {
  const labelId = useId();
  const statusId = useId();
  const [level, setLevel] = useState(64);

  let status = 'Battery is fine';
  if (level < 20) {
    status = 'Battery is low — connect the charger';
  } else if (level > 80) {
    status = 'Battery is almost full';
  }

  const discharge = () => setLevel(Math.max(level - 15, 0));
  const charge = () => setLevel(Math.min(level + 15, 100));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 360 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>Headphones battery</Text>
          <Text size={2} style={{ fontVariantNumeric: 'tabular-nums' }}>{level}%</Text>
        </div>
        <Meter
          value={level}
          max={100}
          low={20}
          high={80}
          optimum={100}
          valueText={`${level}%`}
          aria-labelledby={labelId}
          aria-describedby={statusId}
          fullWidth
        >
          <MeterTrack />
        </Meter>
        <Text id={statusId} size={2} style={{ color: 'var(--label-secondary)' }}>{status}</Text>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={discharge} disabled={level === 0}>
          Listen for an hour
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={charge} disabled={level === 100}>
          Charge for 15 minutes
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: лимит символов под полем

Индикатор следит за длиной текста в `TextArea` внутри настоящей формы. `optimum={0}` делает короткий текст хорошей зоной, поэтому у лимита полоса желтеет, а на нём краснеет; `maxLength` держит жёсткое ограничение, а остаток символов связан с полем. Обработчик отправки читает значение через `FormData`, сброс очищает состояние.

<!-- example: meter/bio-length-meter.tsx -->
```tsx
import { Button, HelperText, Label, Meter, MeterTrack, TextArea } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function BioLengthMeter() {
  const fieldId = useId();
  const counterId = useId();
  const limit = 160;
  const [bio, setBio] = useState('Product designer in Lisbon. I write about design systems and accessible forms.');
  const [saved, setSaved] = useState<string | null>(null);

  const left = limit - bio.length;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = String(data.get('bio'));
    setSaved(`Saved, ${value.length} characters`);
  };

  const handleReset = () => {
    setBio('');
    setSaved(null);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={fieldId}>Profile bio</Label>
        <TextArea
          id={fieldId}
          name='bio'
          rows={3}
          maxLength={limit}
          required
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          aria-describedby={counterId}
          fullWidth
        />
        <Meter
          value={bio.length}
          max={limit}
          low={120}
          high={150}
          optimum={0}
          valueText={`${bio.length} of ${limit} characters`}
          aria-label='Bio length'
          size='sm'
          fullWidth
        >
          <MeterTrack />
        </Meter>
        <HelperText id={counterId} style={{ fontVariantNumeric: 'tabular-nums' }}>{left} characters left</HelperText>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button type='submit' size='sm'>Save</Button>
        <Button type='reset' size='sm' variant='secondary' appearance='ghost'>Clear</Button>
        <HelperText role='status' style={{ marginInlineStart: 'var(--spacing-4)' }}>{saved}</HelperText>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: карточка использования тарифа

Несколько индикаторов в карточке, по одному на элемент списка, у каждого доступное имя из заголовка своей строки. Здесь чем меньше, тем лучше (`optimum={0}`), поэтому ресурс у самого лимита выделяется без дополнительного кода.

<!-- example: meter/meter-inside-a-card.tsx -->
```tsx
import { Card, Heading, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

const usage = [
  { id: 'seats', label: 'Seats', used: 18, limit: 20, unit: 'seats' },
  { id: 'storage', label: 'Storage', used: 412, limit: 500, unit: 'GB' },
  { id: 'minutes', label: 'Build minutes', used: 1240, limit: 3000, unit: 'min' },
];

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function MeterInsideACard({ locale = 'en-US' }: { locale?: string }) {
  const prefix = useId();
  const format = new Intl.NumberFormat(locale);

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading as='h3' size={4} fontWeight={600}>Pro plan usage</Heading>
      <ul style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {usage.map((item) => {
          const labelId = `${prefix}-${item.id}`;
          const summary = `${format.format(item.used)} of ${format.format(item.limit)} ${item.unit}`;

          return (
            <li key={item.id} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
                <Text id={labelId} size={2}>{item.label}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
              </div>
              <Meter
                value={item.used}
                max={item.limit}
                low={item.limit * 0.75}
                high={item.limit * 0.9}
                optimum={0}
                valueText={summary}
                aria-labelledby={labelId}
                size='sm'
                fullWidth
              >
                <MeterTrack />
              </Meter>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: квота превышена

Индикатор ограничивает заполнение значением `max`, так что по полосе перерасход не видно. Когда расход выходит за лимит, пример показывает `HelperText` с ошибкой, связывает его с индикатором через `aria-describedby` и пишет, насколько именно превышен лимит.

<!-- example: meter/quota-exceeded.tsx -->
```tsx
import { Button, HelperText, Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export const locales = ['en-US', 'ru-RU', 'ar-EG', 'he-IL'];

export default function QuotaExceeded({ locale = 'en-US' }: { locale?: string }) {
  const labelId = useId();
  const errorId = useId();
  const limit = 10000;
  const [requests, setRequests] = useState(8700);

  const format = new Intl.NumberFormat(locale);
  const exceeded = requests > limit;
  const summary = `${format.format(requests)} of ${format.format(limit)} requests`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
          <Text id={labelId} size={2} fontWeight={500}>API requests</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{summary}</Text>
        </div>
        <Meter
          value={requests}
          max={limit}
          low={limit * 0.8}
          high={limit}
          optimum={0}
          valueText={summary}
          aria-labelledby={labelId}
          aria-describedby={exceeded ? errorId : undefined}
          fullWidth
        >
          <MeterTrack />
        </Meter>
        {exceeded && (
          <HelperText id={errorId} error style={{ fontVariantNumeric: 'tabular-nums' }}>
            Limit exceeded by {format.format(requests - limit)} requests. New requests are rejected until 1 December.
          </HelperText>
        )}
      </div>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRequests(requests + 900)}>
          Run nightly sync
        </Button>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setRequests(8700)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: ненулевой минимум и оптимум посередине

Шкала температуры от 10 до 35 °C с комфортной зоной посередине: плохи и значения ниже `low`, и значения выше `high`. `min` сдвигает начало дорожки, а вердикт выводится рядом с каждым значением.

<!-- example: meter/room-temperature.tsx -->
```tsx
import { Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

const rooms = [
  { id: 'living', name: 'Living room', celsius: 21.5 },
  { id: 'bedroom', name: 'Bedroom', celsius: 18.2 },
  { id: 'server', name: 'Server closet', celsius: 29.8 },
];

export default function RoomTemperature() {
  const prefix = useId();

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360, margin: 0, padding: 0, listStyle: 'none' }}>
      {rooms.map((room) => {
        const labelId = `${prefix}-${room.id}`;
        let verdict = 'Comfortable';
        if (room.celsius < 19) {
          verdict = 'Too cold';
        } else if (room.celsius > 24) {
          verdict = 'Too warm';
        }

        return (
          <li key={room.id} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
              <Text id={labelId} size={2}>{room.name}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{room.celsius} °C · {verdict}</Text>
            </div>
            <Meter
              value={room.celsius}
              min={10}
              max={35}
              low={19}
              high={24}
              optimum={21.5}
              valueText={`${room.celsius} °C, ${verdict.toLowerCase()}`}
              aria-labelledby={labelId}
              fullWidth
            >
              <MeterTrack />
            </Meter>
          </li>
        );
      })}
    </ul>
  );
}
```
<!-- /example -->
