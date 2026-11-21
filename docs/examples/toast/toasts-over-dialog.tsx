import { useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  Label,
  Text,
  TextField,
  TextFieldInput,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

interface Person {
  name: string
  email: string
}

const team: Person[] = [
  { name: 'Mira Chen', email: 'mira@northwind.studio' },
  { name: 'Jonas Berg', email: 'jonas@northwind.studio' },
  { name: 'Ana Souza', email: 'ana@northwind.studio' },
];

interface Removed {
  name: string
  undo: () => void
}

const accessToasts = createToastQueue<Removed>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;

const initialsOf = (name: string) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

function RemovedToast() {
  const { content } = useToastContext<Removed>();
  const titleId = useId();

  return (
    <Toast aria-labelledby={titleId} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.name} removed</Text>
        <Text size={2} style={muted}>No longer has access</Text>
      </div>
      <ToastClose asChild onClick={content.undo}>
        <Button size='xs' variant='primary' appearance='ghost' style={{ flexShrink: 0 }}>Undo</Button>
      </ToastClose>
      <ToastClose asChild>
        <Button square size='xs' aria-label='Dismiss' variant='secondary' appearance='ghost' style={closeStyle}>
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

export default function ToastsOverDialog() {
  const id = useId();
  const [people, setPeople] = useState(team);
  const removeButtons = useRef(new Map<string, HTMLButtonElement>());
  const inviteRef = useRef<HTMLInputElement>(null);

  const add = (person: Person) => setPeople((current) => (current.some((item) => item.email === person.email) ? current : [...current, person]));

  const remove = (person: Person, index: number) => {
    const next = people[index + 1] ?? people[index - 1];
    setPeople((current) => current.filter((item) => item.email !== person.email));
    accessToasts.add({ name: person.name, undo: () => add(person) }, { timeout: 8000 });

    if (next) removeButtons.current.get(next.email)?.focus();
    else inviteRef.current?.focus();
  };

  const invite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email')).trim().toLowerCase();
    if (email === '') return;

    const known = team.find((person) => person.email === email);
    add(known ?? { name: email.split('@')[0], email });
    event.currentTarget.reset();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='xs' variant='secondary' appearance='ghost'>Share</Button>
        </DialogTrigger>
        <DialogContent aria-labelledby={`${id}-title`} style={{ width: 'min(420px, 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${id}-title`} as='h2' size={4} fontWeight={600}>Share Launch plan</Heading>
            <DialogClose asChild>
              <Button square aria-label='Close' variant='secondary' appearance='ghost' style={closeStyle}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </Button>
            </DialogClose>
          </div>
          <form onSubmit={invite} style={{ display: 'grid', gap: 'var(--spacing-3)', marginBlockStart: 'var(--spacing-8)' }}>
            <Label htmlFor={`${id}-email`}>Add people</Label>
            <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
              <TextField size='sm' style={{ flex: 1, minWidth: 0 }}>
                <TextFieldInput ref={inviteRef} id={`${id}-email`} name='email' type='email' placeholder='name@northwind.studio' autoComplete='off' />
              </TextField>
              <Button type='submit' size='sm'>Invite</Button>
            </div>
          </form>
          <Text id={`${id}-access`} size={2} fontWeight={500} style={{ ...muted, display: 'block', marginBlock: 'var(--spacing-12) var(--spacing-4)' }}>
            People with access
          </Text>
          <ul aria-labelledby={`${id}-access`} style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
            {people.map((person, index) => (
              <li key={person.email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                <Avatar size='sm' aria-hidden>
                  <AvatarFallback>{initialsOf(person.name)}</AvatarFallback>
                </Avatar>
                <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
                  <Text size={2} fontWeight={500}>{person.name}</Text>
                  <Text size={2} style={{ ...muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{person.email}</Text>
                </div>
                <Button
                  ref={(node) => {
                    if (node) removeButtons.current.set(person.email, node);
                    else removeButtons.current.delete(person.email);
                  }}
                  size='xs'
                  variant='secondary'
                  appearance='ghost'
                  aria-label={`Remove ${person.name}`}
                  style={{ flexShrink: 0 }}
                  onClick={() => remove(person, index)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
      <ToastRegion queue={accessToasts} aria-label='Notifications'>
        <RemovedToast />
      </ToastRegion>
    </>
  );
}
