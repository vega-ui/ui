import { useId, useState } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

const snapPoints: Array<`${number}px` | number> = ['180px', 0.5, 1];
const snapLabels = ['Peek', 'Half', 'Full'];

const stops = ['Central Station', 'Market Square', 'Harbour Bridge', 'Old Town', 'University', 'Science Park', 'Airport'];

export default function ControlledSnapPoint() {
  const titleId = useId();
  const [snapPoint, setSnapPoint] = useState(0);

  return (
    <Sheet snapPoints={snapPoints} activeSnapPoint={snapPoint} onChangeActiveSnapPoint={setSnapPoint} onChangeOpen={() => setSnapPoint(0)}>
      <SheetTrigger asChild>
        <Button>Bus 42 route</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} style={{ height: '100%' }}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>Bus 42 · next in 4 min</Heading>
        <div role='group' aria-label='Sheet height' style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          {snapLabels.map((label, index) => (
            <Button
              key={label}
              size='sm'
              variant={index === snapPoint ? 'primary' : 'secondary'}
              appearance='ghost'
              aria-pressed={index === snapPoint}
              onClick={() => setSnapPoint(index)}
            >
              {label}
            </Button>
          ))}
        </div>
        <ol style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none', overflow: 'auto', overscrollBehavior: 'contain' }}>
          {stops.map((stop, index) => (
            <li key={stop} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
              <Text size={3}>{stop}</Text>
              <Text size={3} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{4 + index * 3} min</Text>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
