import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle, Button, Heading, Icon } from '@vega-ui/react';
import { InfoIcon, XIcon } from '@vega-ui/icons';

export default function Dismissible() {
  const [visible, setVisible] = useState(true);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const dismiss = () => {
    setVisible(false);
    headingRef.current?.focus();
  };

  return (
    <section aria-labelledby='billing-heading' style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Heading ref={headingRef} id='billing-heading' as='h2' size={4} fontWeight={600} tabIndex={-1}>Billing</Heading>
      {visible && (
        <Alert variant='info'>
          <AlertIcon><InfoIcon /></AlertIcon>
          <AlertMain>
            <AlertTitle>New invoice layout</AlertTitle>
            <AlertContent>Invoices now group usage by project. Old invoices keep their original layout.</AlertContent>
          </AlertMain>
          <Button
            square
            aria-label='Dismiss'
            variant='secondary'
            appearance='ghost'
            onClick={dismiss}
            style={{ '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties}
          >
            <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
          </Button>
        </Alert>
      )}
      {!visible && (
        <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setVisible(true)} style={{ justifySelf: 'start' }}>
          Show the announcement again
        </Button>
      )}
    </section>
  );
}
