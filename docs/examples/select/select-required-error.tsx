import {
  Button,
  HelperText,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { FormEvent, useId, useRef, useState } from 'react';

export default function SelectRequiredError() {
  const id = useId();
  const errorId = `${id}-error`;
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);
  const [sent, setSent] = useState(false);

  const onChangeValue = (next: string | null) => {
    setReason(next);
    setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reason === null) {
      setInvalid(true);
      comboboxRef.current?.focus();
      return;
    }

    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Label htmlFor={id}>Why are you cancelling?</Label>
      <Select value={reason} onChangeValue={onChangeValue}>
        <SelectHiddenSelect name='reason' />
        <SelectCombobox
          id={id}
          ref={comboboxRef}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
        >
          <SelectValue placeholder='Choose a reason' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='price'>It is too expensive</SelectOption>
          <SelectOption value='features'>Missing features I need</SelectOption>
          <SelectOption value='switching'>Switching to another tool</SelectOption>
          <SelectOption value='other'>Something else</SelectOption>
        </SelectListbox>
      </Select>
      {invalid && (
        <HelperText id={errorId} error>
          Choose a reason so we can route your feedback.
        </HelperText>
      )}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>
        Cancel subscription
      </Button>
      {sent && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Your subscription ends on the last day of the billing period.
        </Text>
      )}
    </form>
  );
}
