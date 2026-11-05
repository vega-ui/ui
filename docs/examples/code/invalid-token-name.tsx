import { Button, Code, HelperText, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useState, type FormEvent } from 'react';

const namePattern = /^[A-Z_][A-Z0-9_]*$/;

export default function InvalidTokenName() {
  const [invalid, setInvalid] = useState(false);
  const [added, setAdded] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = String(new FormData(event.currentTarget).get('variable'));

    if (!namePattern.test(name)) {
      setInvalid(true);
      setAdded('');
      return;
    }

    setInvalid(false);
    setAdded(name);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='env-variable-name'>Variable name</Label>
      <TextField error={invalid}>
        <TextFieldInput
          id='env-variable-name'
          name='variable'
          defaultValue='api-key'
          autoComplete='off'
          spellCheck={false}
          aria-invalid={invalid}
          aria-describedby='env-variable-hint'
          onChange={() => setInvalid(false)}
        />
      </TextField>
      <HelperText id='env-variable-hint' error={invalid}>
        Use uppercase letters, digits and underscores, for example <Code size={2}>STRIPE_API_KEY</Code>.
      </HelperText>
      <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-9)' }}>Add variable</Button>
      {added && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          <Code size={2}>{added}</Code> added to Production.
        </Text>
      )}
    </form>
  );
}
