import {
  Fieldset,
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
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

export default function DisabledInput() {
  const switchId = useId();
  const phoneId = useId();
  const [sameAsProfile, setSameAsProfile] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', maxWidth: 340 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Switch>
          <SwitchInput
            id={switchId}
            checked={sameAsProfile}
            onChange={(event) => setSameAsProfile(event.currentTarget.checked)}
          />
          <SwitchIndicator />
        </Switch>
        <Label htmlFor={switchId}>Use the number from my profile</Label>
      </div>
      <Fieldset
        disabled={sameAsProfile}
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}
      >
        <Label htmlFor={phoneId}>Billing phone</Label>
        <PhoneField defaultValue='+44 7400 123456'>
          <PhoneFieldSelect>
            <SelectHiddenSelect name='country' />
            <SelectCombobox aria-label='Country'>
              <SelectValue />
              <SelectIcon />
            </SelectCombobox>
            <SelectListbox>
              <SelectOption value='GB'>GB</SelectOption>
              <SelectOption value='IE'>IE</SelectOption>
            </SelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput id={phoneId} name='billingPhone' autoComplete='tel' />
        </PhoneField>
      </Fieldset>
    </div>
  );
}
