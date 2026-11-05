# Link Examples

## Basic

### Basic: standalone link after a list

A standalone link names its destination ("View all 48 invoices") instead of "Click here". The arrow is decorative: `Icon` hides it from screen readers.

<!-- example: link/standalone-navigation-link.tsx -->
```tsx
import { Heading, Icon, Link } from '@vega-ui/react';
import { ArrowRightIcon } from '@vega-ui/icons';
import './examples.css';

const invoices = [
  { id: 'INV-2041', amount: '$1,240.00' },
  { id: 'INV-2040', amount: '$860.50' },
  { id: 'INV-2039', amount: '$2,115.00' },
];

export default function StandaloneNavigationLink() {
  return (
    <section aria-labelledby='recent-invoices' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <Heading id='recent-invoices' as='h3' size={4} fontWeight={600}>Recent invoices</Heading>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 'var(--spacing-8)',
              paddingBlock: 'var(--spacing-4)',
              borderBlockEnd: '1px solid var(--separator-opaque)',
            }}
          >
            <span>{invoice.id}</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{invoice.amount}</span>
          </li>
        ))}
      </ul>
      <Link href='/billing/invoices' style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)', alignSelf: 'flex-start' }}>
        View all 48 invoices
        <Icon size='xs' className='directionalIcon'><ArrowRightIcon /></Icon>
      </Link>
    </section>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: router link with the current page

`Link asChild` passes its styling to a router link. The parent owns the current route and marks the active item with `aria-current='page'`; here the router is simulated with `preventDefault`.

<!-- example: link/router-composed-link.tsx -->
```tsx
import { type AnchorHTMLAttributes, type MouseEvent, useState } from 'react';
import { Link } from '@vega-ui/react';

interface RouterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  onNavigate(to: string): void
}

function RouterLink({ to, onNavigate, onClick, ...props }: RouterLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    event.preventDefault();
    onNavigate(to);
  };

  return <a href={to} onClick={handleClick} {...props} />;
}

const pages = [
  { to: '/settings/profile', label: 'Profile' },
  { to: '/settings/team', label: 'Team' },
  { to: '/settings/billing', label: 'Billing' },
];

export default function RouterComposedLink() {
  const [pathname, setPathname] = useState('/settings/profile');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <nav aria-label='Settings'>
        <ul style={{ display: 'flex', gap: 'var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none' }}>
          {pages.map((page) => {
            const current = pathname === page.to;

            return (
              <li key={page.to}>
                <Link asChild>
                  <RouterLink
                    to={page.to}
                    onNavigate={setPathname}
                    aria-current={current ? 'page' : undefined}
                    style={current ? { color: 'var(--label-primary)', textDecorationLine: 'none' } : undefined}
                  >
                    {page.label}
                  </RouterLink>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>Current route: {pathname}</p>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: forgot password link in a sign-in form

A link inside a form navigates and never submits. It sits next to the password label, after the email field in tab order, and the form reads its values with `FormData` on submit.

<!-- example: link/forgot-password-link.tsx -->
```tsx
import { Button, Label, Link, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, useState } from 'react';

export default function ForgotPasswordLink() {
  const [signedIn, setSignedIn] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSignedIn(String(new FormData(event.currentTarget).get('email')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <Label htmlFor='sign-in-email'>Email</Label>
          <TextField>
            <TextFieldInput id='sign-in-email' name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
            <Label htmlFor='sign-in-password'>Password</Label>
            <Link href='/account/reset-password' style={{ fontSize: 'var(--font-size-2)' }}>Forgot password?</Link>
          </div>
          <TextField>
            <TextFieldInput id='sign-in-password' name='password' type='password' autoComplete='current-password' required />
          </TextField>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <Button type='submit' fullWidth>Sign in</Button>
        <output style={{ color: 'var(--label-secondary)', textAlign: 'center', overflowWrap: 'anywhere' }}>
          {signedIn === '' ? '' : `Signed in as ${signedIn}`}
        </output>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: help link inside dialog copy

An inline link in the dialog description gives context without becoming one of the dialog actions. The text is linked to the dialog with `aria-describedby`.

<!-- example: link/inline-help-link-inside-dialog-copy.tsx -->
```tsx
import type { CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Link,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function InlineHelpLinkInsideDialogCopy() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Publish site</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby='publish-title' aria-describedby='publish-description'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='publish-title' as='h2' size={4} fontWeight={600}>Publish to acme.design?</Heading>
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
        <Text id='publish-description' size={3}>
          Everyone with the address can see the site. Review the{' '}
          <Link href='/docs/publishing-policy'>publishing policy</Link>{' '}
          if the site contains customer data.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-12)' }}>
          <DialogClose asChild>
            <Button variant='secondary' appearance='ghost'>Not now</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Publish</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Error

### Error: recovery link in an error message

When a payment fails, the error message contains the way out. The message is announced with `role='alert'` and linked to the button with `aria-describedby`.

<!-- example: link/recovery-link-after-a-failed-flow.tsx -->
```tsx
import { Button, HelperText, Link } from '@vega-ui/react';
import { useState } from 'react';

export default function RecoveryLinkAfterAFailedFlow() {
  const [declined, setDeclined] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)', width: '100%' }}>
      <Button type='button' aria-describedby={declined ? 'payment-error' : undefined} onClick={() => setDeclined(true)}>
        Pay $49.00
      </Button>
      {declined && (
        <HelperText id='payment-error' error role='alert'>
          Your card ending in 4242 was declined.{' '}
          <Link href='/billing/payment-methods'>Update your payment method</Link>{' '}
          and try again.
        </HelperText>
      )}
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: plain text until the destination exists

Links have no disabled state, and `Link` has no disabled styles. While the report is not ready, render text that explains why, and switch to a real link once it can be followed.

<!-- example: link/unavailable-link-as-text.tsx -->
```tsx
import { Button, Link } from '@vega-ui/react';
import { useState } from 'react';

export default function UnavailableLinkAsText() {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-6)', width: '100%' }}>
      <p style={{ margin: 0 }}>
        {ready && <Link href='/reports/2024-q4.pdf'>Download the Q4 report</Link>}
        {!ready && (
          <span style={{ color: 'var(--disable-text-color)' }}>
            Q4 report is being generated and will be available in about 5 minutes
          </span>
        )}
      </p>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' disabled={ready} onClick={() => setReady(true)}>
        Finish generating
      </Button>
    </div>
  );
}
```
<!-- /example -->

## Edge

### Edge: external link that opens a new tab

`target='_blank'` changes the context without warning, so the link says so: a decorative icon for sighted users and a `VisuallyHidden` note for screen readers. `rel='noopener noreferrer'` keeps the new page from controlling this one.

<!-- example: link/external-link-new-tab.tsx -->
```tsx
import { Icon, Link, Text, VisuallyHidden } from '@vega-ui/react';
import { ExternalLinkIcon } from '@vega-ui/icons';

export default function ExternalLinkNewTab() {
  return (
    <Text size={3}>
      Payments are processed by{' '}
      <Link href='https://stripe.com/privacy' target='_blank' rel='noopener noreferrer'>
        Stripe’s privacy policy
        <Icon size='2xs' style={{ marginInlineStart: 'var(--spacing-1)', verticalAlign: 'baseline' }}><ExternalLinkIcon /></Icon>
        <VisuallyHidden asChild>
          <span>(opens in a new tab)</span>
        </VisuallyHidden>
      </Link>
      .
    </Text>
  );
}
```
<!-- /example -->

### Edge: long URL in a narrow container

A URL has no spaces to break on and overflows narrow cards. `overflowWrap: 'anywhere'` lets it wrap at any character.

<!-- example: link/long-url-wrapping.tsx -->
```tsx
import { Link, Text } from '@vega-ui/react';

const webhookUrl = 'https://hooks.example.com/services/T024BE7LD/B08S9Q2KJ7H/aD4f9kLq2ZxR7mN3pW8vY1cE';

export default function LongUrlWrapping() {
  return (
    <div style={{ width: 240, padding: 'var(--spacing-8)', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Text size={3}>
        Events are sent to{' '}
        <Link href={webhookUrl} style={{ overflowWrap: 'anywhere' }}>{webhookUrl}</Link>
      </Text>
    </div>
  );
}
```
<!-- /example -->
