import { Button, Icon, Text } from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import { useState } from 'react';
import './examples.css';

export default function DisclosureChevron() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', width: '100%' }}>
      <Button
        type='button'
        variant='secondary'
        appearance='ghost'
        aria-expanded={expanded}
        aria-controls='shipping-details'
        onClick={() => setExpanded(!expanded)}
      >
        Shipping details
        <Icon size='sm' className='disclosureChevron' style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}>
          <ChevronDownIcon />
        </Icon>
      </Button>
      <div id='shipping-details' hidden={!expanded}>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>Ships in 2–3 business days from Berlin. Free returns within 30 days.</Text>
      </div>
    </div>
  );
}
