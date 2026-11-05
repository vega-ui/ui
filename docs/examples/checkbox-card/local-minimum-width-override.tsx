import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';
import './local-minimum-width-override.css';

const regions = [
  { value: 'eu', title: 'Europe', description: 'Frankfurt' },
  { value: 'us', title: 'US', description: 'Virginia' },
  { value: 'apac', title: 'Asia', description: 'Singapore' },
];

export default function LocalMinimumWidthOverride() {
  return (
    <div role='group' aria-label='Backup regions' style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', width: '100%' }}>
      {regions.map((region) => (
        <CheckboxCard key={region.value} size='sm' className='compactPlanCard'>
          <CheckboxCardContent>
            <CheckboxCardTitle>{region.title}</CheckboxCardTitle>
            <CheckboxCardDescription>{region.description}</CheckboxCardDescription>
          </CheckboxCardContent>
          <CheckboxCardControl>
            <CheckboxCardControlInput name='regions' value={region.value} defaultChecked={region.value === 'eu'} />
            <CheckboxIndicator>
              <CheckboxCardControlCheckedIcon />
              <CheckboxCardControlIndeterminateIcon />
            </CheckboxIndicator>
          </CheckboxCardControl>
        </CheckboxCard>
      ))}
    </div>
  );
}
