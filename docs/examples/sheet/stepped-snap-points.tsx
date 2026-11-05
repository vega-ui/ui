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

const snapPoints: Array<`${number}px` | number> = [0.25, 0.5, 0.75, 1];
const snapLabels = ['a quarter', 'half', 'three quarters', 'all'];

const steps = [
  'Head north on Quay Street',
  'Turn right onto Harbour Bridge',
  'Continue for 400 m',
  'Turn left at Market Square',
  'Keep right at the fork',
  'Arrive at Central Station',
];

export default function SteppedSnapPoints() {
  const titleId = useId();
  const [snapPoint, setSnapPoint] = useState(0);

  return (
    <Sheet snapPoints={snapPoints} steppedSnapPoints onChangeActiveSnapPoint={setSnapPoint} onChangeOpen={() => setSnapPoint(0)}>
      <SheetTrigger asChild>
        <Button>Walking directions</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} style={{ height: '100%' }}>
        <SheetHandle aria-label='Resize sheet' />
        <Heading id={titleId} as='h2' size={4} fontWeight={600}>12 min · 950 m</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Showing {snapLabels[snapPoint]} of the screen</Text>
        <ol style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, paddingInlineStart: 'var(--spacing-10)', overflow: 'auto', overscrollBehavior: 'contain' }}>
          {steps.map((step) => <li key={step}><Text size={3}>{step}</Text></li>)}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
