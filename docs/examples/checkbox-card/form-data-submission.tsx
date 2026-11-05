import { FormEvent, useState } from 'react';
import {
  Button,
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
  Fieldset,
  FieldsetLegend,
  Text,
} from '@vega-ui/react';

const contents = [
  { value: 'projects', title: 'Projects', description: 'Boards, tasks and their history' },
  { value: 'files', title: 'Files', description: 'Attachments up to 2 GB each' },
  { value: 'members', title: 'Members', description: 'Names, roles and last activity' },
];

export default function FormDataSubmission() {
  const [result, setResult] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const included = new FormData(event.currentTarget).getAll('include');
    setResult(`include=${included.join(',')}`);
  };

  return (
    <form onSubmit={handleSubmit} onReset={() => setResult('')} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <Fieldset>
        <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Export workspace data</FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)' }}>
          {contents.map((content) => (
            <CheckboxCard key={content.value} size='sm'>
              <CheckboxCardContent>
                <CheckboxCardTitle>{content.title}</CheckboxCardTitle>
                <CheckboxCardDescription>{content.description}</CheckboxCardDescription>
              </CheckboxCardContent>
              <CheckboxCardControl>
                <CheckboxCardControlInput name='include' value={content.value} defaultChecked />
                <CheckboxIndicator>
                  <CheckboxCardControlCheckedIcon />
                  <CheckboxCardControlIndeterminateIcon />
                </CheckboxIndicator>
              </CheckboxCardControl>
            </CheckboxCard>
          ))}
        </div>
      </Fieldset>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
          <Button type='submit'>Start export</Button>
          <Button type='reset' variant='secondary' appearance='ghost'>Reset</Button>
        </div>
        <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)' }}>{result}</Text>
      </div>
    </form>
  );
}
