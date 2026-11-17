import { Combobox, ComboboxIcon, ComboboxInput, ComboboxListbox, ComboboxTrigger, HelperText, Label, ListboxOption, TextField } from '@vega-ui/react';
import { useId } from 'react';

const regions = [
  { value: 'eu-central', label: 'Frankfurt (eu-central)' },
  { value: 'eu-west', label: 'Dublin (eu-west)' },
  { value: 'us-east', label: 'Virginia (us-east)' },
];

const owners = [
  { value: 'finance', label: 'Finance team' },
  { value: 'platform', label: 'Platform team' },
];

export default function DisabledAndReadOnly() {
  const id = useId();
  const regionId = `${id}-region`;
  const ownerId = `${id}-owner`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={regionId}>Data region</Label>
        <Combobox autocomplete='none' readOnly defaultValue='eu-central'>
          <TextField>
            <ComboboxInput id={regionId} name='region' defaultValue='Frankfurt (eu-central)' aria-describedby={`${regionId}-hint`} />
            <ComboboxTrigger aria-label='Show regions'>
              <ComboboxIcon />
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Regions'>
            {regions.map((region) => <ListboxOption key={region.value} value={region.value}>{region.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${regionId}-hint`}>Fixed when the workspace was created. It still submits with the form.</HelperText>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={ownerId}>Cost owner</Label>
        <Combobox autocomplete='none' disabled defaultValue='finance'>
          <TextField>
            <ComboboxInput id={ownerId} name='owner' defaultValue='Finance team' aria-describedby={`${ownerId}-hint`} />
            <ComboboxTrigger aria-label='Show teams'>
              <ComboboxIcon />
            </ComboboxTrigger>
          </TextField>
          <ComboboxListbox aria-label='Teams'>
            {owners.map((owner) => <ListboxOption key={owner.value} value={owner.value}>{owner.label}</ListboxOption>)}
          </ComboboxListbox>
        </Combobox>
        <HelperText id={`${ownerId}-hint`}>Only workspace admins can change the cost owner.</HelperText>
      </div>
    </div>
  );
}
