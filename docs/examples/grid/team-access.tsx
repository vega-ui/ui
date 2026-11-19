import { useState } from 'react';
import { CheckIcon, ChevronDownIcon, MailIcon, Trash2Icon } from '@vega-ui/icons';
import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndicator,
  CheckboxInput,
  Grid,
  GridCell,
  GridColumnHeader,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Icon,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Switch,
  SwitchIndicator,
  SwitchInput,
  Text,
  VisuallyHidden,
} from '@vega-ui/react';
import './examples.css';

type Role = 'owner' | 'editor' | 'viewer';

interface Member {
  name: string;
  role: Role;
  hours: string;
  notify: boolean;
}

const initialMembers: Member[] = [
  { name: 'Ada Park', role: 'owner', hours: '40', notify: true },
  { name: 'Leo Grant', role: 'editor', hours: '32', notify: true },
  { name: 'Mia Chen', role: 'editor', hours: '24', notify: false },
  { name: 'Sam Ortiz', role: 'viewer', hours: '8', notify: false },
];

const roles: { value: Role, label: string }[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
];

const headers = ['Selected', 'Member', 'Role', 'Hours', 'Notify', 'Actions'];

export const layout = 'wide';

export default function TeamAccess() {
  const [members, setMembers] = useState(initialMembers);
  const [checked, setChecked] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  const change = (name: string, patch: Partial<Member>) => {
    setMembers(members.map((member) => member.name === name ? { ...member, ...patch } : member));
  };

  const toggle = (name: string) => {
    if (checked.includes(name)) {
      setChecked(checked.filter((item) => item !== name));
      return;
    }

    setChecked([...checked, name]);
  };

  const remove = (names: string[]) => {
    setMembers(members.filter((member) => !names.includes(member.name)));
    setChecked(checked.filter((name) => !names.includes(name)));
    setStatus(`Removed ${names.join(', ')}`);
  };

  const reset = () => {
    setMembers(initialMembers);
    setChecked([]);
    setStatus('');
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', inlineSize: 'min(100%, 600px)' }}>
      <Grid aria-label='Team access' defaultActive='0:2' className='gridSheet gridEditable teamAccess'>
        <GridRowGroup>
          <GridRow row={-1}>
            {headers.map((header, col) => (
              <GridColumnHeader key={header} col={col} excluded>
                {col === 0 ? <VisuallyHidden>{header}</VisuallyHidden> : header}
              </GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup>
          {members.map((member, row) => (
            <GridRow key={member.name} row={row}>
              <GridCell col={0}>
                <Checkbox size='sm'>
                  <CheckboxInput
                    aria-label={`Select ${member.name}`}
                    checked={checked.includes(member.name)}
                    onChange={() => toggle(member.name)}
                  />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon><CheckIcon strokeWidth={4} /></CheckboxCheckedIcon>
                  </CheckboxIndicator>
                </Checkbox>
              </GridCell>
              <GridRowHeader col={1}>{member.name}</GridRowHeader>
              <GridCell col={2} className='teamAccessRole'>
                <Select size='xs' value={member.role} onChangeValue={(role) => change(member.name, { role: role as Role })}>
                  <SelectCombobox aria-label={`${member.name} role`}>
                    <SelectValue>{roles.find((role) => role.value === member.role)?.label}</SelectValue>
                    <SelectIcon><ChevronDownIcon /></SelectIcon>
                  </SelectCombobox>
                  <SelectListbox>
                    {roles.map((role) => (
                      <SelectOption key={role.value} value={role.value}>{role.label}</SelectOption>
                    ))}
                  </SelectListbox>
                </Select>
              </GridCell>
              <GridCell col={3}>
                <input
                  className='gridCellInput'
                  aria-label={`${member.name} hours per week`}
                  inputMode='numeric'
                  value={member.hours}
                  onChange={(event) => change(member.name, { hours: event.target.value })}
                />
              </GridCell>
              <GridCell col={4}>
                <Switch size='sm'>
                  <SwitchInput
                    aria-label={`Notify ${member.name}`}
                    checked={member.notify}
                    onChange={(event) => change(member.name, { notify: event.currentTarget.checked })}
                  />
                  <SwitchIndicator />
                </Switch>
              </GridCell>
              <GridCell col={5} className='teamAccessActions'>
                <Button
                  square
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Resend invite to ${member.name}`}
                  onClick={() => setStatus(`Invite sent to ${member.name}`)}
                >
                  <Icon size='xs'><MailIcon /></Icon>
                </Button>
                <Button
                  square
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Remove ${member.name}`}
                  onClick={() => remove([member.name])}
                >
                  <Icon size='xs'><Trash2Icon /></Icon>
                </Button>
              </GridCell>
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>{status}</Text>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <Button size='xs' variant='secondary' appearance='ghost' onClick={reset}>Reset</Button>
          <Button size='xs' disabled={checked.length === 0} onClick={() => remove(checked)}>
            Remove selected
          </Button>
        </div>
      </div>
    </div>
  );
}
