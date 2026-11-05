import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function NestedDrawers() {
  const orderTitleId = useId();
  const addressTitleId = useId();
  const streetId = useId();
  const cityId = useId();
  const [address, setAddress] = useState({ street: '41 Harbour Road', city: 'Bristol' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setAddress({ street: String(data.get('street')), city: String(data.get('city')) });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Order #10482</Button>
      </DrawerTrigger>
      <DrawerContent aria-labelledby={orderTitleId} style={{ width: 420 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={orderTitleId} as='h2' size={4} fontWeight={600}>Order #10482</Heading>
          <DrawerClose asChild>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </DrawerClose>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Ship to</Text>
            <Text size={3}>{address.street}, {address.city}</Text>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size='sm' variant='secondary' appearance='ghost'>Change</Button>
            </DrawerTrigger>
            <DrawerContent aria-labelledby={addressTitleId} style={{ width: 360 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
                <Heading id={addressTitleId} as='h3' size={4} fontWeight={600}>Shipping address</Heading>
                <DrawerClose asChild>
                  <IconButton
                    aria-label='Close'
                    variant='secondary'
                    appearance='ghost'
                    style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
                  >
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DrawerClose>
              </div>
              <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <Label htmlFor={streetId}>Street</Label>
                  <TextField>
                    <TextFieldInput id={streetId} name='street' defaultValue={address.street} required autoComplete='street-address' />
                  </TextField>
                </div>
                <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
                  <Label htmlFor={cityId}>City</Label>
                  <TextField>
                    <TextFieldInput id={cityId} name='city' defaultValue={address.city} required autoComplete='address-level2' />
                  </TextField>
                </div>
                <Button type='submit' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-4)' }}>Save address</Button>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
