import { FormEvent, useState } from 'react';
import {
  Button,
  DataGridPicker,
  DataGridPickerItem,
  DataGridPickerRow,
  DataGridPickerRowGroup,
  HelperText,
  Text,
} from '@vega-ui/react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const minimum = 3;

export default function AtLeastThreeDays() {
  const [selected, setSelected] = useState<string[]>(['Mon']);
  const [invalid, setInvalid] = useState(false);
  const [saved, setSaved] = useState('');

  const onSelectCell = (value: string[]) => {
    setSelected(value);
    if (value.length >= minimum) setInvalid(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selected.length < minimum) {
      setInvalid(true);
      return;
    }

    setSaved(new FormData(event.currentTarget).getAll('day').join(', '));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Text id='training-days-label' fontWeight={500}>Training days</Text>
        <DataGridPicker
          aria-labelledby='training-days-label'
          aria-describedby='training-days-message'
          aria-multiselectable='true'
          selection='multiple'
          size='sm'
          selected={selected}
          onSelectCell={onSelectCell}
          defaultActive='Mon'
          style={{ width: '100%' }}
        >
          <DataGridPickerRowGroup>
            <DataGridPickerRow row={0}>
              {days.map((day, col) => (
                <DataGridPickerItem key={day} col={col} value={day}>{day}</DataGridPickerItem>
              ))}
            </DataGridPickerRow>
          </DataGridPickerRowGroup>
        </DataGridPicker>
        {selected.map((day) => <input key={day} type='hidden' name='day' value={day} />)}
        <HelperText id='training-days-message' error={invalid}>
          {invalid ? `Pick at least ${minimum} days, ${minimum - selected.length} more to go.` : `Pick at least ${minimum} days a week.`}
        </HelperText>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)' }}>
        <Button type='submit'>Save plan</Button>
      </div>
      {saved && <Text size={2} style={{ color: 'var(--label-secondary)' }}>Saved: {saved}</Text>}
    </form>
  );
}
