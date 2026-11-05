import type { CSSProperties, FormEvent } from 'react';
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
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

export default function SelectInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [exported, setExported] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setExported(`Exporting the Q3 report as ${data.get('format')}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogTrigger asChild>
          <Button>Export report</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Export Q3 report</Heading>
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
          <form
            onSubmit={onSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-12)' }}
          >
            <Label htmlFor={id}>File format</Label>
            <Select defaultValue='xlsx'>
              <SelectHiddenSelect name='format' />
              <SelectCombobox id={id}>
                <SelectValue />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                <SelectOption value='xlsx'>Excel workbook (.xlsx)</SelectOption>
                <SelectOption value='csv'>Comma-separated values (.csv)</SelectOption>
                <SelectOption value='pdf'>PDF document (.pdf)</SelectOption>
              </SelectListbox>
            </Select>
            <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Export</Button>
          </form>
        </DialogContent>
      </Dialog>
      {exported && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{exported}</Text>}
    </div>
  );
}
