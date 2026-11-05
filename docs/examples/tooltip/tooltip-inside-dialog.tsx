import { useId, useState, type CSSProperties } from 'react';
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
  Text,
  TextField,
  TextFieldInput,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CheckIcon, CopyIcon, XIcon } from '@vega-ui/icons';

const apiKey = 'sk_live_51Hx9QaLk2mZ8vR4';

export default function TooltipInsideDialog() {
  const titleId = useId();
  const fieldId = useId();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(apiKey);
    setCopied(true);
  };

  return (
    <Dialog onChangeOpen={() => setCopied(false)}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Show API key</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id={titleId} as='h2' size={4} fontWeight={600}>Production API key</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
          <Label htmlFor={fieldId}>Key</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <TextField style={{ flex: 1 }}>
              <TextFieldInput id={fieldId} value={apiKey} readOnly />
            </TextField>
            <Tooltip delayOpen={0}>
              <TooltipTrigger asChild>
                <IconButton aria-label='Copy key' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }} onClick={copy}>
                  <Icon>{copied ? <CheckIcon /> : <CopyIcon />}</Icon>
                </IconButton>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <Text size={2}>{copied ? 'Copied to clipboard' : 'Copy to clipboard'}</Text>
              </TooltipContent>
            </Tooltip>
          </div>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Keep this key secret. Anyone with it can charge your account.</Text>
        </div>
      </DialogContent>
    </Dialog>
  );
}
