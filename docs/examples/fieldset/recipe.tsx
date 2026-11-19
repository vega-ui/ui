import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Fieldset,
  FieldsetHeader,
  FieldsetLegend,
  Text,
  type FieldsetProps,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';
import { useId, type ReactNode } from 'react';

interface MyFieldsetProps extends FieldsetProps {
  legend: ReactNode
  description?: ReactNode
}

export function MyFieldset({ legend, description, children, ...props }: MyFieldsetProps) {
  const descriptionId = useId();

  return (
    <Fieldset aria-describedby={description ? descriptionId : undefined} {...props}>
      <FieldsetLegend>{legend}</FieldsetLegend>
      {description && (
        <FieldsetHeader>
          <Text id={descriptionId} size={2} style={{ color: 'var(--label-secondary)' }}>{description}</Text>
        </FieldsetHeader>
      )}
      {children}
    </Fieldset>
  );
}

export default function Recipe() {
  return (
    <MyFieldset
      appearance='outlined'
      legend='Payment failure alerts'
      description='Sent when a card is declined or an invoice is overdue.'
      style={{ width: '100%' }}
    >
      <Checkbox>
        <CheckboxInput name='alertChannels' value='email' defaultChecked />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        Email
      </Checkbox>
      <Checkbox>
        <CheckboxInput name='alertChannels' value='sms' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
        </CheckboxIndicator>
        SMS to the account owner
      </Checkbox>
    </MyFieldset>
  );
}
