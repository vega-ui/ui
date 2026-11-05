import {
  Button,
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
  CheckboxInput,
  HelperText,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
} from '@vega-ui/react';
import { FormEvent, useState } from 'react';

const members = [
  { id: 'u-17', name: 'Maya Chen', email: 'maya@acme.io' },
  { id: 'u-23', name: 'Omar Haddad', email: 'omar@acme.io' },
  { id: 'u-31', name: 'Lena Fischer', email: 'lena@acme.io' },
  { id: 'u-42', name: 'Tomás Ruiz', email: 'tomas@acme.io' },
];

export default function RowSelectionForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const allSelected = selected.length === members.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const toggleAll = () => {
    setSelected(allSelected ? [] : members.map((member) => member.id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ids = new FormData(event.currentTarget).getAll('member');
    setMessage(`Sent a reminder to ${ids.length} ${ids.length === 1 ? 'member' : 'members'}: ${ids.join(', ')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <div role='region' aria-label='Members' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
        <Table fullWidth edgePadded dataAlign='start' style={{ borderStyle: 'hidden' }}>
          <TableHead>
            <TableRow>
              <TableHeading scope='col' style={{ width: 40 }}>
                <Checkbox>
                  <CheckboxInput aria-label='Select all members' checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
                  <CheckboxIndicator>
                    <CheckboxCheckedIcon />
                    <CheckboxIndeterminateIcon />
                  </CheckboxIndicator>
                </Checkbox>
              </TableHeading>
              <TableHeading scope='col'>Name</TableHeading>
              <TableHeading scope='col'>Email</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableData>
                  <Checkbox>
                    <CheckboxInput
                      name='member'
                      value={member.id}
                      aria-label={`Select ${member.name}`}
                      checked={selected.includes(member.id)}
                      onChange={() => toggle(member.id)}
                    />
                    <CheckboxIndicator>
                      <CheckboxCheckedIcon />
                    </CheckboxIndicator>
                  </Checkbox>
                </TableData>
                <TableData style={{ whiteSpace: 'nowrap' }}>{member.name}</TableData>
                <TableData style={{ whiteSpace: 'nowrap' }}>{member.email}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <Button type='submit' size='sm' disabled={selected.length === 0} style={{ flexShrink: 0 }}>Send reminder</Button>
        <HelperText role='status'>{message || `${selected.length} selected`}</HelperText>
      </div>
    </form>
  );
}
