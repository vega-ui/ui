import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
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
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function FullFieldInsideADialogForm() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setContact(`${data.get('phone')} (${data.get('country')})`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogTrigger asChild>
          <Button>Add emergency contact</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Emergency contact</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>Phone number</Label>
            <PhoneField defaultCode='FR'>
              <PhoneFieldSelect>
                <PhoneFieldSelectHiddenSelect name='country' />
                <PhoneFieldSelectCombobox aria-label='Country'>
                  <PhoneFieldSelectValue />
                  <PhoneFieldSelectIcon />
                </PhoneFieldSelectCombobox>
                <PhoneFieldSelectListbox>
                  <PhoneFieldSelectOption value='FR'>FR</PhoneFieldSelectOption>
                  <PhoneFieldSelectOption value='BE'>BE</PhoneFieldSelectOption>
                  <PhoneFieldSelectOption value='CH'>CH</PhoneFieldSelectOption>
                </PhoneFieldSelectListbox>
              </PhoneFieldSelect>
              <PhoneFieldInput id={id} name='phone' autoComplete='tel' required />
            </PhoneField>
            <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Save contact</Button>
          </form>
        </DialogContent>
      </Dialog>
      {contact && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Emergency contact: {contact}</Text>}
    </div>
  );
}
