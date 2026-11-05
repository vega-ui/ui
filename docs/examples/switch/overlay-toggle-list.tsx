import { CSSProperties } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SheetTrigger,
  Switch,
  SwitchIndicator,
  SwitchInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const options = [
  { id: 'sheet-autoplay', title: 'Autoplay next episode', checked: true },
  { id: 'sheet-subtitles', title: 'Always show subtitles', checked: false },
  { id: 'sheet-data-saver', title: 'Data saver on mobile networks', checked: true },
];

export default function OverlayToggleList() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Playback settings</Button>
      </SheetTrigger>
      <SheetContent aria-labelledby='playback-settings-title'>
        <SheetHandle aria-label='Resize sheet' />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
          <Heading id='playback-settings-title' size={4} fontWeight={600} as='h2'>Playback settings</Heading>
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
        <div style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          {options.map((option) => (
            <div key={option.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Label htmlFor={option.id}>{option.title}</Label>
              <Switch style={{ flexShrink: 0 }}>
                <SwitchInput id={option.id} name={option.id} defaultChecked={option.checked} />
                <SwitchIndicator />
              </Switch>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
