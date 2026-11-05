import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Text,
} from '@vega-ui/react';
import { CopyIcon, MailIcon, MessageCircleIcon, XIcon } from '@vega-ui/icons';

const link = 'https://maps.example.com/p/blue-harbor-cafe';

export default function SheetWithHeadingAndCloseButton() {
  const titleId = useId();
  const descriptionId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Sheet onChangeOpen={() => setCopied(false)}>
      <SheetTrigger asChild>
        <Button>Share place</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby={titleId} aria-describedby={descriptionId}>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Share Blue Harbor Cafe</Heading>
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
        <Text id={descriptionId} size={3} style={{ color: 'var(--label-secondary)' }}>12 Quay Street · Open until 22:00</Text>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} onClick={copy}>
            <Icon size='sm'><CopyIcon /></Icon>
            Copy link
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`mailto:?subject=Blue%20Harbor%20Cafe&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MailIcon /></Icon>
              Send by email
            </a>
          </Button>
          <Button variant='secondary' appearance='ghost' style={{ justifyContent: 'flex-start' }} asChild>
            <a href={`sms:?&body=${encodeURIComponent(link)}`}>
              <Icon size='sm'><MessageCircleIcon /></Icon>
              Send as message
            </a>
          </Button>
        </div>
        <Text size={2} role='status' style={{ minHeight: '1lh', color: 'var(--label-secondary)' }}>{copied ? 'The link is on your clipboard.' : ''}</Text>
      </SheetContent>
    </Sheet>
  );
}
