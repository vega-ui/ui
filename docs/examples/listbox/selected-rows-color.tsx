import { Listbox, ListboxOption } from '@vega-ui/react';
import './examples.css';

export default function SelectedRowsColor() {
  return (
    <Listbox
      aria-label='Reminder before the meeting'
      defaultValue='10'
      className='listbox-accent'
      style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}
    >
      <ListboxOption value='0'>At the start time</ListboxOption>
      <ListboxOption value='5'>5 minutes before</ListboxOption>
      <ListboxOption value='10'>10 minutes before</ListboxOption>
      <ListboxOption value='30'>30 minutes before</ListboxOption>
    </Listbox>
  );
}
