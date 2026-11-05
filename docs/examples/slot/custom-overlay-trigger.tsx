import type { ButtonHTMLAttributes, Ref } from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger, Text } from '@vega-ui/react';

interface AccountChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  ref?: Ref<HTMLButtonElement>
}

function AccountChip({ name, ref, style, ...props }: AccountChipProps) {
  return (
    <button
      ref={ref}
      type='button'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-4)',
        padding: 'var(--spacing-2) var(--spacing-6) var(--spacing-2) var(--spacing-2)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 999,
        background: 'transparent',
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden='true'
        style={{
          display: 'grid',
          placeItems: 'center',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'var(--fills-primary)',
          fontSize: 'var(--font-size-1)',
        }}
      >
        {name.charAt(0)}
      </span>
      {name}
    </button>
  );
}

export default function CustomOverlayTrigger() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <AccountChip name='Jane Cooper' />
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
          <Text size={2}>Signed in as jane@acme.com</Text>
          <Button size='sm' variant='secondary' appearance='ghost'>Account settings</Button>
          <Button size='sm' variant='secondary' appearance='ghost'>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
