import { Button, Icon } from '@vega-ui/react';
import { ArrowRightIcon } from '@vega-ui/icons';

export default function RtlDirectionalIcon() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
      <div dir='ltr'>
        <Button type='button'>
          Continue
          <Icon size='sm'><ArrowRightIcon /></Icon>
        </Button>
      </div>
      <div dir='rtl' lang='ar'>
        <Button type='button'>
          متابعة
          <Icon size='sm' style={{ transform: 'scaleX(-1)' }}><ArrowRightIcon /></Icon>
        </Button>
      </div>
    </div>
  );
}
