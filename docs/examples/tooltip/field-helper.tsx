import { useId, useState, type FormEvent } from 'react';
import {
  Button,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { InfoIcon } from '@vega-ui/icons';

export default function FieldHelper() {
  const fieldId = useId();
  const [saved, setSaved] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(String(new FormData(event.currentTarget).get('vat')));
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        <Label htmlFor={fieldId}>VAT number (optional)</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton aria-label='About the VAT number' size='xs' variant='secondary' appearance='ghost'>
              <Icon size='xs'><InfoIcon /></Icon>
            </IconButton>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            <Text size={2}>Printed on invoices for EU business customers</Text>
          </TooltipContent>
        </Tooltip>
      </div>
      <TextField>
        <TextFieldInput id={fieldId} name='vat' placeholder='DE123456789' pattern='[A-Z]{2}[A-Z0-9]{8,12}' />
      </TextField>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='submit' style={{ flexShrink: 0 }}>Save billing details</Button>
        <Text size={2} role='status' style={{ minWidth: 0, color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{saved ? `Saved ${saved}` : ''}</Text>
      </div>
    </form>
  );
}
