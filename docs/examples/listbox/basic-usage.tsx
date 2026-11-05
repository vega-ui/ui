import { Listbox, ListboxOption } from '@vega-ui/react';

export default function BasicUsage() {
  return (
    <Listbox aria-label='Delivery method' defaultValue='courier' style={{ width: '100%', maxWidth: 280, border: '1px solid var(--separator-opaque)' }}>
      <ListboxOption value='pickup'>Pickup point</ListboxOption>
      <ListboxOption value='courier'>Courier to the door</ListboxOption>
      <ListboxOption value='locker'>Parcel locker</ListboxOption>
    </Listbox>
  );
}
