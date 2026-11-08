import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarStack,
  AvatarStackItem,
  Badge,
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  Meter,
  MeterTrack,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
  TextArea,
  VisuallyHidden,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

type Role = 'owner' | 'admin' | 'editor' | 'viewer';

interface Member {
  id: string
  name: string
  email: string
  role: Role
  lastActive: string
}

interface Invite {
  email: string
  role: Role
  sent: string
  resent: boolean
}

const SEATS = 10;
const STACK_SIZE = 4;

const roles: Record<Role, string> = {
  owner: 'Owner',
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
};

const assignable: Role[] = ['admin', 'editor', 'viewer'];

const initialMembers: Member[] = [
  { id: 'm1', name: 'Elena Moreau', email: 'elena.moreau@northwind.io', role: 'owner', lastActive: 'Now' },
  { id: 'm2', name: 'Omar Haddad', email: 'omar.haddad@northwind.io', role: 'admin', lastActive: '12 min ago' },
  { id: 'm3', name: 'Lena Fischer', email: 'lena.fischer@northwind.io', role: 'editor', lastActive: '2 hours ago' },
  { id: 'm4', name: 'Kenji Watanabe', email: 'kenji.watanabe@northwind.io', role: 'editor', lastActive: 'Yesterday' },
  { id: 'm5', name: 'Ana Souza', email: 'ana.souza@northwind.io', role: 'viewer', lastActive: '3 days ago' },
  { id: 'm6', name: 'Tom Becker', email: 'tom.becker@northwind.io', role: 'viewer', lastActive: 'Oct 21' },
];

const initialInvites: Invite[] = [
  { email: 'priya.nair@northwind.io', role: 'editor', sent: 'Invited 2 days ago', resent: false },
  { email: 'jonas.berg@northwind.io', role: 'viewer', sent: 'Invited 5 days ago', resent: false },
];

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const nowrap = { whiteSpace: 'nowrap' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;
const dialogHeader = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' } as const;
const actions = { display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 'var(--spacing-4)' } as const;

const destructive = {
  '--button-background-color': 'var(--color-red-accent-500)',
  '--button-background-color-hover': 'var(--color-red-accent-600)',
  '--button-background-color-active': 'var(--color-red-accent-700)',
} as CSSProperties;

const getInitials = (name: string) => name.split(' ').map((part) => part[0]).join('').slice(0, 2);

const parseEmails = (value: string) => {
  const entries = value.split(/[\s,;]+/).map((entry) => entry.trim().toLowerCase()).filter((entry) => entry !== '');

  return [...new Set(entries)];
};

export default function TeamMembers() {
  const id = useId();
  const [members, setMembers] = useState(initialMembers);
  const [invites, setInvites] = useState(initialInvites);
  const [inviteRole, setInviteRole] = useState<Role>('editor');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [target, setTarget] = useState<Member | null>(null);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const used = members.length + invites.length;
  const available = SEATS - used;
  const stack = members.slice(0, STACK_SIZE);
  const hidden = members.length - stack.length;

  const changeRole = (member: Member, role: Role | null) => {
    if (role === null) return;

    setMembers((current) => current.map((item) => (item.id === member.id ? { ...item, role } : item)));
    setNotice(`${member.name}’s role changed to ${roles[role]}.`);
  };

  const validateInvite = (emails: string[]) => {
    const taken = [...members.map((member) => member.email), ...invites.map((invite) => invite.email)];
    const invalid = emails.filter((email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    const existing = emails.find((email) => taken.includes(email));

    if (emails.length === 0) return 'Enter at least one email address.';
    if (invalid.length === 1) return `${invalid[0]} doesn’t look like an email address.`;
    if (invalid.length > 1) return `These don’t look like email addresses: ${invalid.join(', ')}.`;
    if (existing) return `${existing} is already on the team or invited.`;
    if (emails.length > available) return `You have ${available} of ${SEATS} seats left. Remove ${emails.length - available} address${emails.length - available === 1 ? '' : 'es'} or add seats in Billing.`;

    return '';
  };

  const sendInvites = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emails = parseEmails(String(new FormData(form).get('emails')));
    const error = validateInvite(emails);

    setInviteError(error);

    if (error !== '') {
      const element = form.elements.namedItem('emails');
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setInvites((current) => [...emails.map((email) => ({ email, role: inviteRole, sent: 'Invited just now', resent: false })), ...current]);
    setNotice(emails.length === 1 ? `Invite sent to ${emails[0]}.` : `${emails.length} invites sent.`);
    setInviteOpen(false);
  };

  const changeInviteOpen = (open: boolean) => {
    setInviteOpen(open);

    if (!open) return;

    setInviteError('');
    setInviteRole('editor');
  };

  const askRemove = (member: Member) => {
    setTarget(member);
    setRemoveOpen(true);
  };

  const removeMember = () => {
    if (target === null) return;

    setMembers((current) => current.filter((member) => member.id !== target.id));
    setNotice(`${target.name} was removed from the workspace.`);
  };

  const resend = (invite: Invite) => {
    setInvites((current) => current.map((item) => (item.email === invite.email ? { ...item, resent: true, sent: 'Resent just now' } : item)));
    setNotice(`Invite resent to ${invite.email}.`);
  };

  const revoke = (invite: Invite) => {
    setInvites((current) => current.filter((item) => item.email !== invite.email));
    setNotice(`Invite for ${invite.email} was revoked.`);
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--spacing-8) var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '1 1 320px' }}>
          <Heading as='h1' size={7} fontWeight={700}>Team members</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Invite people to Northwind and choose what they can change.</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
          <AvatarStack size='sm' role='group' aria-label={`${members.length} members`}>
            {stack.map((member) => (
              <AvatarStackItem key={member.id} role='img' aria-label={member.name} title={member.name}>
                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
              </AvatarStackItem>
            ))}
            {hidden > 0 && (
              <AvatarStackItem variant='secondary' role='img' aria-label={`and ${hidden} more`} title={members.slice(STACK_SIZE).map((member) => member.name).join(', ')}>
                <AvatarFallback>{`+${hidden}`}</AvatarFallback>
              </AvatarStackItem>
            )}
          </AvatarStack>
          <Dialog open={inviteOpen} onChangeOpen={changeInviteOpen}>
            <DialogTrigger asChild>
              <Button size='xs'>Invite members</Button>
            </DialogTrigger>
            <DialogContent aria-labelledby={`${id}-invite-title`} aria-describedby={`${id}-invite-description`}>
              <div style={dialogHeader}>
                <Heading id={`${id}-invite-title`} as='h2' size={4} fontWeight={600}>Invite members</Heading>
                <DialogClose asChild>
                  <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                    <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                  </IconButton>
                </DialogClose>
              </div>
              <Text id={`${id}-invite-description`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
                Each invite takes a seat until it is accepted or revoked.
              </Text>
              <form noValidate onSubmit={sendInvites} style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-10)' }}>
                <div style={field}>
                  <Label htmlFor={`${id}-emails`}>Email addresses</Label>
                  <TextArea
                    id={`${id}-emails`}
                    name='emails'
                    rows={3}
                    fullWidth
                    error={inviteError !== ''}
                    placeholder='priya@northwind.io, sam@northwind.io'
                    spellCheck={false}
                    aria-invalid={inviteError !== ''}
                    aria-describedby={inviteError === '' ? `${id}-emails-hint` : `${id}-emails-error`}
                    onChange={() => setInviteError('')}
                  />
                  {inviteError === ''
                    ? <HelperText id={`${id}-emails-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>{`Separate addresses with commas. ${available} of ${SEATS} seats available.`}</HelperText>
                    : <HelperText id={`${id}-emails-error`} error>{inviteError}</HelperText>}
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-invite-role`}>Role</Label>
                  <Select value={inviteRole} onChangeValue={(role) => setInviteRole(role ?? 'editor')}>
                    <SelectCombobox id={`${id}-invite-role`}>
                      <SelectValue />
                      <SelectIcon />
                    </SelectCombobox>
                    <SelectListbox>
                      {assignable.map((role) => <SelectOption key={role} value={role}>{roles[role]}</SelectOption>)}
                    </SelectListbox>
                  </Select>
                </div>
                <div style={field}>
                  <Label htmlFor={`${id}-message`}>Message (optional)</Label>
                  <TextArea id={`${id}-message`} name='message' rows={3} fullWidth placeholder='Hi! Join us in Northwind to review the Q4 roadmap.' />
                </div>
                <div style={{ ...actions, marginBlockStart: 'var(--spacing-4)' }}>
                  <DialogClose asChild>
                    <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
                  </DialogClose>
                  <Button size='xs' type='submit'>Send invites</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-3)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
          <Text id={`${id}-seats`} size={3} fontWeight={500}>Seats</Text>
          <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{`${used} of ${SEATS} seats used`}</Text>
        </div>
        <Meter value={used} max={SEATS} high={SEATS - 1} valueText={`${used} of ${SEATS} seats used`} aria-labelledby={`${id}-seats`} fullWidth>
          <MeterTrack />
        </Meter>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          {available === 0 ? 'All seats are taken. Add seats in Billing to invite more people.' : 'Pending invites count toward your seats.'}
        </Text>
      </Card>

      <section aria-labelledby={`${id}-members`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
          <Heading id={`${id}-members`} as='h2' size={4} fontWeight={600}>{`Members · ${members.length}`}</Heading>
          <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{notice}</Text>
        </div>
        <div
          role='region'
          aria-labelledby={`${id}-members`}
          tabIndex={0}
          style={{ position: 'relative', minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
        >
          <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' dataAlign='start'>Member</TableHeading>
                <TableHeading scope='col' dataAlign='start'>Role</TableHeading>
                <TableHeading scope='col' dataAlign='start'>Status</TableHeading>
                <TableHeading scope='col' dataAlign='start'>Last active</TableHeading>
                <TableHeading scope='col' dataAlign='end'><VisuallyHidden>Actions</VisuallyHidden></TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableData dataAlign='start'>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                      <Avatar size='md' aria-hidden='true' style={{ flexShrink: 0 }}>
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <span style={{ display: 'grid' }}>
                        <Text size={3} fontWeight={500} style={nowrap}>{member.name}</Text>
                        <Text size={2} style={{ ...nowrap, color: 'var(--label-secondary)' }}>{member.email}</Text>
                      </span>
                    </span>
                  </TableData>
                  <TableData dataAlign='start'>
                    {member.role === 'owner'
                      ? <Text size={3} style={{ ...nowrap, paddingInline: 'var(--spacing-6)' }}>Owner</Text>
                      : (
                          <Select size='xs' value={member.role} onChangeValue={(role) => changeRole(member, role)} style={{ minWidth: 120 }}>
                            <SelectCombobox aria-label={`Role of ${member.name}`}>
                              <SelectValue />
                              <SelectIcon />
                            </SelectCombobox>
                            <SelectListbox>
                              {assignable.map((role) => <SelectOption key={role} value={role}>{roles[role]}</SelectOption>)}
                            </SelectListbox>
                          </Select>
                        )}
                  </TableData>
                  <TableData dataAlign='start'>
                    <Badge size='sm' variant='success'>Active</Badge>
                  </TableData>
                  <TableData dataAlign='start' style={{ ...nowrap, color: 'var(--label-secondary)' }}>{member.lastActive}</TableData>
                  <TableData dataAlign='end'>
                    {member.role !== 'owner' && (
                      <Button size='xs' variant='secondary' appearance='ghost' aria-label={`Remove ${member.name}`} onClick={() => askRemove(member)}>Remove</Button>
                    )}
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby={`${id}-invites`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Heading id={`${id}-invites`} as='h2' size={4} fontWeight={600}>{`Pending invites · ${invites.length}`}</Heading>
        <Card style={{ alignItems: 'stretch', gap: 0, paddingBlock: 'var(--spacing-2)' }}>
          {invites.length === 0 && (
            <Text size={3} style={{ paddingBlock: 'var(--spacing-8)', color: 'var(--label-secondary)', textAlign: 'center' }}>No pending invites.</Text>
          )}
          {invites.length > 0 && (
            <ul style={{ display: 'grid', margin: 0, padding: 0, listStyle: 'none' }}>
              {invites.map((invite, index) => (
                <li
                  key={invite.email}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 'var(--spacing-4) var(--spacing-6)',
                    paddingBlock: 'var(--spacing-6)',
                    borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
                  }}
                >
                  <Avatar size='md' variant='secondary' aria-hidden='true' style={{ flexShrink: 0 }}>
                    <AvatarFallback>{invite.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span style={{ display: 'grid', gap: 'var(--spacing-1)', flex: '1 1 200px', minWidth: 0 }}>
                    <Text size={3} fontWeight={500} style={{ overflowWrap: 'anywhere' }}>{invite.email}</Text>
                    <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-1) var(--spacing-4)' }}>
                      <Badge size='xs' variant='info'>Invited</Badge>
                      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`${roles[invite.role]} · ${invite.sent}`}</Text>
                    </span>
                  </span>
                  <span style={{ display: 'flex', gap: 'var(--spacing-2)', marginInlineStart: 'auto' }}>
                    <Button size='xs' variant='secondary' appearance='ghost' disabled={invite.resent} aria-label={`Resend invite to ${invite.email}`} onClick={() => resend(invite)}>
                      {invite.resent ? 'Sent' : 'Resend'}
                    </Button>
                    <Button size='xs' variant='secondary' appearance='ghost' aria-label={`Revoke invite for ${invite.email}`} onClick={() => revoke(invite)}>Revoke</Button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <Dialog open={removeOpen} onChangeOpen={setRemoveOpen}>
        <DialogContent aria-labelledby={`${id}-remove-title`} aria-describedby={`${id}-remove-description`}>
          <div style={dialogHeader}>
            <Heading id={`${id}-remove-title`} as='h2' size={4} fontWeight={600}>{`Remove ${target?.name ?? 'member'}?`}</Heading>
            <DialogClose asChild>
              <IconButton size='xs' aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text id={`${id}-remove-description`} size={3} style={{ display: 'block', marginBlockStart: 'var(--spacing-4)', color: 'var(--label-secondary)' }}>
            They lose access to Northwind right away. Their files and comments stay in the workspace, and the seat becomes free.
          </Text>
          <form method='dialog' onSubmit={removeMember} style={{ ...actions, marginBlockStart: 'var(--spacing-12)' }}>
            <DialogClose asChild>
              <Button size='xs' type='button' variant='secondary' appearance='ghost'>Cancel</Button>
            </DialogClose>
            <Button size='xs' type='submit' style={destructive}>Remove member</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
