import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Heading,
  Icon,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function InlineRenameFlow() {
  const titleId = useId();
  const fieldId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Q4 launch plan');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(String(new FormData(event.currentTarget).get('name')).trim());
    setOpen(false);
  };

  return (
    <Popover role='dialog' placement='bottom-start' open={open} onChangeOpen={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>{name}</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <form onSubmit={onSubmit} style={{ display: 'grid', width: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h3' size={5} fontWeight={600}>Rename document</Heading>
            <IconButton
              aria-label='Close'
              variant='secondary'
              appearance='ghost'
              style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
            </IconButton>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-6)' }}>
            <Label htmlFor={fieldId}>Name</Label>
            <TextField size='sm'>
              <TextFieldInput id={fieldId} name='name' defaultValue={name} required pattern='.*\S.*' maxLength={80} autoFocus />
            </TextField>
          </div>
          <Button type='submit' size='sm' style={{ justifySelf: 'end', marginBlockStart: 'var(--spacing-8)' }}>Rename</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
