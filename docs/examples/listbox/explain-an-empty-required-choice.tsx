import { Button, HelperText, Listbox, ListboxOption, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function ExplainAnEmptyRequiredChoice() {
  const id = useId();
  const errorId = `${id}-error`;
  const [plan, setPlan] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  const onChangeValue = (next: string | undefined) => {
    setPlan(next ?? null);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plan === null) {
      setInvalid(true);
      return;
    }

    setDone(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Text id={`${id}-label`} size={3} fontWeight={500}>Workspace plan</Text>
      <Listbox
        aria-labelledby={`${id}-label`}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        value={plan}
        onChangeValue={onChangeValue}
        style={{ border: '1px solid var(--separator-opaque)' }}
      >
        <ListboxOption value='free'>Free, up to 3 members</ListboxOption>
        <ListboxOption value='team'>Team, $12 per member</ListboxOption>
        <ListboxOption value='business'>Business, $24 per member</ListboxOption>
      </Listbox>
      {invalid && <HelperText id={errorId} error>Choose a plan to create the workspace.</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Create workspace</Button>
      {done && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Workspace created on the {plan} plan.
        </Text>
      )}
    </form>
  );
}
