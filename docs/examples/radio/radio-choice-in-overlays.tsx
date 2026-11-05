import { CSSProperties, FormEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Fieldset,
  FieldsetLegend,
  Heading,
  Icon,
  IconButton,
  Radio,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const environments = [
  { value: 'preview', label: 'Preview' },
  { value: 'staging', label: 'Staging' },
  { value: 'production', label: 'Production' },
];

export default function RadioChoiceInOverlays() {
  const [environment, setEnvironment] = useState('staging');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setEnvironment(String(data.get('environment')));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', width: '100%' }}>
      <Text size={3}>Deploy target: <strong>{environment}</strong></Text>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='secondary' appearance='ghost'>Change</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby='deploy-target-title'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id='deploy-target-title' as='h2' size={4} fontWeight={600}>Deploy target</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form method='dialog' onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', marginBlockStart: 'var(--spacing-8)' }}>
            <Fieldset>
              <FieldsetLegend style={{ marginBlockEnd: 'var(--spacing-5)' }}>Environment</FieldsetLegend>
              <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
                {environments.map((item) => (
                  <label key={item.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                    <Radio name='environment' value={item.value} defaultChecked={item.value === environment} />
                    {item.label}
                  </label>
                ))}
              </div>
            </Fieldset>
            <Button type='submit'>Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
