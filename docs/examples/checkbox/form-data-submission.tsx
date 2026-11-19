import { FormEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';
import { CheckIcon, MinusIcon } from '@vega-ui/icons';

const topics = [
  { value: 'releases', label: 'Product releases' },
  { value: 'security', label: 'Security advisories' },
  { value: 'events', label: 'Webinars and events' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = data.getAll('topics');
    const summary = data.get('summary') === 'weekly' ? 'weekly summary' : 'no summary';
    const topicList = selected.length > 0 ? selected.join(', ') : 'none';
    setResult(`topics: ${topicList}; ${summary}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Fieldset>
          <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Subscriptions</FieldsetLegend>
          <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
            {topics.map((topic) => (
              <Checkbox key={topic.value}>
                <CheckboxInput name='topics' value={topic.value} defaultChecked={topic.value === 'security'} />
                <CheckboxIndicator>
                  <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
                  <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
                </CheckboxIndicator>
                {topic.label}
              </Checkbox>
            ))}
          </div>
        </Fieldset>
        <Checkbox>
          <CheckboxInput name='summary' value='weekly' />
          <CheckboxIndicator>
            <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
            <CheckboxIndeterminateIcon><MinusIcon strokeWidth={4} /></CheckboxIndeterminateIcon>
          </CheckboxIndicator>
          Weekly summary instead of single emails
        </Checkbox>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Save preferences</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
