import {
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

const metrics = [
  { label: 'MRR', value: '$48,210', hint: 'Monthly recurring revenue from active subscriptions, excluding one-off charges' },
  { label: 'Churn', value: '2.4%', hint: 'Share of customers who cancelled in the last 30 days' },
  { label: 'Conversion', value: '6.8%', hint: 'Trials that became paid plans. Updated every 15 minutes' },
];

export default function DenseDataHint() {
  return (
    <dl
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 'var(--spacing-8)',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {metrics.map((metric) => (
        <div key={metric.label} style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
          <dt style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>{metric.label}</Text>
            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton aria-label={`About ${metric.label}`} size='xs' variant='secondary' appearance='ghost'>
                  <Icon size='xs'><InfoIcon /></Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2} style={{ display: 'block', maxWidth: 240 }}>{metric.hint}</Text>
              </TooltipContent>
            </Tooltip>
          </dt>
          <dd style={{ margin: 0 }}><Text size={6} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{metric.value}</Text></dd>
        </div>
      ))}
    </dl>
  );
}
