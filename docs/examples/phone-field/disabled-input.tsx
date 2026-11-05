import {
  Fieldset,
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
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
            <PhoneFieldSelectHiddenSelect name='country' />
            <PhoneFieldSelectCombobox aria-label='Country'>
              <PhoneFieldSelectValue />
              <PhoneFieldSelectIcon />
            </PhoneFieldSelectCombobox>
            <PhoneFieldSelectListbox>
              <PhoneFieldSelectOption value='GB'>GB</PhoneFieldSelectOption>
              <PhoneFieldSelectOption value='IE'>IE</PhoneFieldSelectOption>
            </PhoneFieldSelectListbox>
          </PhoneFieldSelect>
          <PhoneFieldInput id={phoneId} name='billingPhone' autoComplete='tel' />
        </PhoneField>
      </Fieldset>
    </div>
  );
}
