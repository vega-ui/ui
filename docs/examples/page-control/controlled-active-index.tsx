import { ChevronLeftIcon, ChevronRightIcon } from '@vega-ui/icons';
import { Button, Icon, PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useState } from 'react';

const photos = ['Lisbon tram', 'Sintra palace', 'Cascais beach', 'Porto bridge', 'Douro valley'];

export default function ControlledActiveIndex() {
  const [active, setActive] = useState(0);

  const isFirst = active === 0;
  const isLast = active === photos.length - 1;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Text size={3} fontWeight={500} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {photos[active]} · {active + 1} / {photos.length}
      </Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Button square aria-label='Previous photo' variant='secondary' appearance='ghost' size='sm' disabled={isFirst} onClick={() => setActive(active - 1)}>
          <Icon><ChevronLeftIcon /></Icon>
        </Button>
        <PageControl active={active} onChangeActive={setActive} aria-label='Photos'>
          {photos.map((photo, index) => (
            <PageControlItem key={photo} index={index} aria-label={photo} />
          ))}
        </PageControl>
        <Button square aria-label='Next photo' variant='secondary' appearance='ghost' size='sm' disabled={isLast} onClick={() => setActive(active + 1)}>
          <Icon><ChevronRightIcon /></Icon>
        </Button>
      </div>
    </div>
  );
}
