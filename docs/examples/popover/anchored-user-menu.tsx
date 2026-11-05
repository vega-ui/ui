import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

export default function AnchoredUserMenu() {
  return (
    <Popover role='dialog' placement='bottom-end'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Maria Chen</Button>
      </PopoverTrigger>
      <PopoverContent aria-label='Account' style={{ padding: 'var(--spacing-2)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 220 }}>
          <div style={{ display: 'grid', paddingInline: 'var(--spacing-6)', paddingBlock: 'var(--spacing-4)' }}>
            <Text size={3} fontWeight={600}>Maria Chen</Text>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>maria@northwind.dev</Text>
          </div>
          <Separator />
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#profile'>Profile</a>
          </Button>
          <Button asChild variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>
            <a href='#billing'>Billing</a>
          </Button>
          <Separator />
          <Button variant='secondary' appearance='transparent' style={{ justifyContent: 'flex-start' }}>Sign out</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
