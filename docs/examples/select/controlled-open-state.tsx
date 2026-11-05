import {
  Button,
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { useId, useRef, useState } from 'react';

export default function ControlledOpenState() {
  const id = useId();
  const comboboxRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [reviewer, setReviewer] = useState<string | null>(null);

  const chooseReviewer = () => {
    comboboxRef.current?.focus();
    setOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Reviewer</Label>
      <Select
        open={open}
        onChangeOpen={setOpen}
        value={reviewer}
        onChangeValue={(next) => setReviewer(next ?? null)}
      >
        <SelectCombobox id={id} ref={comboboxRef}>
          <SelectValue placeholder='Nobody assigned' />
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox>
          <SelectOption value='amara'>Amara Okafor</SelectOption>
          <SelectOption value='lucas'>Lucas Moreau</SelectOption>
          <SelectOption value='mei'>Mei Tanaka</SelectOption>
        </SelectListbox>
      </Select>
      {reviewer === null && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-2)' }}>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Needs one review.</Text>
          <Button size='sm' variant='secondary' appearance='ghost' onClick={chooseReviewer} style={{ flexShrink: 0 }}>
            Choose reviewer
          </Button>
        </div>
      )}
      {open && (
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Arrow keys move through the list, Enter picks, Escape closes.
        </Text>
      )}
    </div>
  );
}
