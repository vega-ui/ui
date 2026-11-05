import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const codes: Record<string, number> = { WELCOME10: 10, FRIDAY20: 20 };

export default function FormError() {
  const titleId = useId();
  const codeId = useId();
  const errorId = useId();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [discount, setDiscount] = useState(0);

  const changeOpen = (next: boolean) => {
    setError('');
    setOpen(next);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const code = String(new FormData(event.currentTarget).get('code')).trim().toUpperCase();
    const percent = codes[code];

    if (percent === undefined) {
      setError(`${code} is not a valid code or has expired.`);
      return;
    }
    setDiscount(percent);
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{discount > 0 ? `Total · −${discount}%` : 'Total'}</Text>
        <Text size={4} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>${(48 * (100 - discount) / 100).toFixed(2)}</Text>
      </div>
      <Sheet open={open} onChangeOpen={changeOpen}>
        <SheetTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Add promo code</Button>
        </SheetTrigger>
        <SheetContent aria-labelledby={titleId}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Promo code</Heading>
            <SheetClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <Label htmlFor={codeId}>Code</Label>
            <TextField error={error !== ''}>
              <TextFieldInput
                id={codeId}
                name='code'
                defaultValue='SUMMER5'
                required
                autoCapitalize='characters'
                aria-invalid={error !== ''}
                aria-describedby={error ? errorId : undefined}
                onChange={() => setError('')}
              />
            </TextField>
            {error && <HelperText id={errorId} error>{error}</HelperText>}
            <Button type='submit' style={{ marginBlockStart: 'var(--spacing-9)' }}>Apply</Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
