import { useState } from 'react';
import { Radio, Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '@vega-ui/react';

const members = [
  { id: 'u-201', name: 'Maya Chen' },
  { id: 'u-202', name: 'Lucas Ferreira' },
  { id: 'u-203', name: 'Aisha Okafor' },
];
const roles = ['viewer', 'editor', 'admin'];

export default function RepeatedGroupsUniqueNames() {
  const [assigned, setAssigned] = useState<Record<string, string>>({ 'u-201': 'admin', 'u-202': 'editor', 'u-203': 'viewer' });

  const assign = (memberId: string, role: string) => {
    setAssigned({ ...assigned, [memberId]: role });
  };

  return (
    <Table fullWidth>
      <TableHead>
        <TableRow>
          <TableHeading>Member</TableHeading>
          {roles.map((role) => (
            <TableHeading key={role} dataAlign='center' style={{ textTransform: 'capitalize' }}>{role}</TableHeading>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableData>{member.name}</TableData>
            {roles.map((role) => (
              <TableData key={role} dataAlign='center'>
                <Radio
                  name={`role-${member.id}`}
                  value={role}
                  aria-label={`${member.name}: ${role}`}
                  checked={assigned[member.id] === role}
                  onChange={() => assign(member.id, role)}
                />
              </TableData>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
