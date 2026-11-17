import type { CSSProperties, FormEvent } from 'react';
import {
  Button,
  Combobox,
  ComboboxIcon,
  ComboboxInput,
  ComboboxListbox,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  ListboxOption,
  Text,
  TextField,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { useId, useState } from 'react';

const reviewers = ['Ana Silva', 'Kenji Watanabe', 'Lena Fischer', 'Omar Haddad', 'Priya Natarajan', 'Tomás Herrera'];

export default function ComboboxInsideDialog() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [reviewer, setReviewer] = useState<string | null>(null);
  const [requested, setRequested] = useState('');
  const matches = reviewers.filter((name) => name.toLowerCase().includes(query.trim().toLowerCase()));

  const onChangeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) return;

    setQuery('');
    setReviewer(null);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (reviewer === null) return;

    setRequested(`Review requested from ${reviewer}.`);
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <Dialog open={open} onChangeOpen={onChangeOpen}>
        <DialogTrigger asChild>
          <Button>Request review</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Request a review</Heading>
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
            <Label htmlFor={id}>Reviewer</Label>
            <Combobox value={reviewer} onChangeValue={(next) => setReviewer(next)}>
              <TextField>
                <ComboboxInput id={id} placeholder='Search people' value={query} onChange={(event) => setQuery(event.target.value)} />
                <ComboboxTrigger aria-label='Show people'>
                  <ComboboxIcon />
                </ComboboxTrigger>
              </TextField>
              <ComboboxListbox aria-label='People'>
                {matches.map((name) => <ListboxOption key={name} value={name}>{name}</ListboxOption>)}
              </ComboboxListbox>
            </Combobox>
            <Button type='submit' disabled={reviewer === null} style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>
              Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {requested && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{requested}</Text>}
    </div>
  );
}
