import { useId } from 'react';
import {
  Button,
  Heading,
  Sheet,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';

const names = ['Blue Harbor Cafe', 'Little Fern', 'Kiln & Co', 'Northside Roasters', 'The Daily Grind', 'Saltwater Bakery'];

const places = Array.from({ length: 40 }, (_, index) => ({
  id: index,
  name: names[index % names.length],
  distance: `${(index + 1) * 90} m`,
  rating: (4.9 - (index % 7) * 0.1).toFixed(1),
}));

export default function LongScrollableSheet() {
  const titleId = useId();

  return (
    <Sheet snapPoints={['160px', 0.5, 1]}>
      <SheetTrigger asChild>
        <Button>Coffee nearby</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>Coffee nearby · {places.length} places</Heading>
        <ul
          tabIndex={0}
          aria-labelledby={titleId}
          style={{ display: 'grid', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none', overflow: 'auto', overscrollBehavior: 'contain' }}
        >
          {places.map((place) => (
            <li key={place.id} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
              <Text size={3} fontWeight={500}>{place.name}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{place.distance} · ★ {place.rating}</Text>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
