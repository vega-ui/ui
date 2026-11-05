import { Icon, IconButton, VisuallyHidden } from '@vega-ui/react';
import { PencilIcon } from '@vega-ui/icons';
import { useState } from 'react';

const members = [
  { name: 'Jane Cooper', role: 'Owner' },
  { name: 'Wade Warren', role: 'Editor' },
  { name: 'Esther Howard', role: 'Viewer' },
];

export default function HiddenTableHeader() {
  const [editing, setEditing] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Name</th>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'start' }}>Role</th>
            <th scope='col' style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
              <VisuallyHidden>Actions</VisuallyHidden>
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.name}>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>{member.name}</td>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', color: 'var(--label-secondary)' }}>{member.role}</td>
              <td style={{ paddingBlock: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)', textAlign: 'end' }}>
                <IconButton
                  style={{ display: 'inline-flex' }}
                  type='button'
                  size='xs'
                  variant='secondary'
                  appearance='transparent'
                  aria-label={`Edit ${member.name}`}
                  onClick={() => setEditing(member.name)}
                >
                  <Icon><PencilIcon /></Icon>
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ margin: 0, color: 'var(--label-secondary)' }}>{editing === '' ? '' : `Editing ${editing}`}</p>
    </div>
  );
}
