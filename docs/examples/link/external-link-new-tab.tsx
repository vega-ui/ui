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
