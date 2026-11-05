import {
  Fieldset,
  Label,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { useId, useState } from 'react';

export default function FullyDisabledField() {
  const switchId = useId();
  const selectId = useId();
  const [useDefault, setUseDefault] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 320 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={useDefault}
            onChange={(event) => setUseDefault(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Use workspace calendar settings</Label>
      </div>
      <Fieldset
        disabled={useDefault}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}
      >
        <Label htmlFor={selectId}>Week starts on</Label>
        <Select defaultValue='monday'>
          <SelectHiddenSelect name='weekStart' />
          <SelectCombobox id={selectId}>
            <SelectValue />
            <SelectIcon />
          </SelectCombobox>
          <SelectListbox>
            <SelectOption value='saturday'>Saturday</SelectOption>
            <SelectOption value='sunday'>Sunday</SelectOption>
            <SelectOption value='monday'>Monday</SelectOption>
          </SelectListbox>
        </Select>
      </Fieldset>
    </div>
  );
}
