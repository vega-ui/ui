import {
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
} from '@vega-ui/react';
import { useState } from 'react';

const initialMembers = [
  { id: 'u1', name: 'Amara Okafor', email: 'amara@northwind.io', role: 'owner' },
  { id: 'u2', name: 'Lucas Moreau', email: 'lucas@northwind.io', role: 'editor' },
  { id: 'u3', name: 'Mei Tanaka', email: 'mei@northwind.io', role: 'viewer' },
];

export default function SelectInTableRows() {
  const [members, setMembers] = useState(initialMembers);

  const changeRole = (id: string, role: string | undefined) => {
    if (role === undefined) return;
    setMembers((current) => current.map((member) => (member.id === id ? { ...member, role } : member)));
  };

  return (
    <Table fullWidth dataAlign='start'>
      <TableHead>
        <TableRow>
          <TableHeading>Member</TableHeading>
          <TableHeading>Role</TableHeading>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableData>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Text size={3}>{member.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{member.email}</Text>
              </div>
            </TableData>
            <TableData>
              <Select
                size='sm'
                style={{ minWidth: 140 }}
                value={member.role}
                onChangeValue={(role) => changeRole(member.id, role)}
              >
                <SelectCombobox aria-label={`Role of ${member.name}`}>
                  <SelectValue />
                  <SelectIcon />
                </SelectCombobox>
                <SelectListbox>
                  <SelectOption value='owner'>Owner</SelectOption>
                  <SelectOption value='editor'>Editor</SelectOption>
                  <SelectOption value='viewer'>Viewer</SelectOption>
                </SelectListbox>
              </Select>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
