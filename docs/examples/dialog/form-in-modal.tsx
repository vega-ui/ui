import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

export default function FormInModal() {
  const titleId = useId();
  const nameId = useId();
  const slugId = useId();
  const slugHintId = useId();
  const [project, setProject] = useState({ name: 'Mobile banking app', slug: 'mobile-banking' });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    setProject({ name: String(data.get('name')), slug: String(data.get('slug')) });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'var(--spacing-8)',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      <div style={{ display: 'grid', minWidth: 0 }}>
        <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{project.name}</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>vega.app/{project.slug}</Text>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost'>Rename</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={titleId}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>Rename project</Heading>
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
          <form method='dialog' onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={nameId}>Project name</Label>
              <TextField>
                <TextFieldInput id={nameId} name='name' defaultValue={project.name} required maxLength={60} autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={slugId}>URL</Label>
              <TextField>
                <TextFieldInput
                  id={slugId}
                  name='slug'
                  defaultValue={project.slug}
                  required
                  pattern='[a-z0-9-]+'
                  aria-describedby={slugHintId}
                />
              </TextField>
              <HelperText id={slugHintId}>Lowercase letters, digits and hyphens.</HelperText>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-4)' }}>
              <DialogClose asChild>
                <Button type='button' variant='secondary' appearance='ghost'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
