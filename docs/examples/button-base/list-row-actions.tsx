import { ButtonBase, Icon } from '@vega-ui/react';
import { BellIcon, ChevronRightIcon, LockIcon, UserIcon } from '@vega-ui/icons';
import { type ReactNode, useState } from 'react';
import './examples.css';

const rows: { id: string, label: string, hint: string, icon: ReactNode }[] = [
  { id: 'profile', label: 'Profile', hint: 'Name, photo, bio', icon: <UserIcon /> },
  { id: 'security', label: 'Security', hint: 'Password and two-factor', icon: <LockIcon /> },
  { id: 'notifications', label: 'Notifications', hint: 'Email and push', icon: <BellIcon /> },
];

export default function ListRowActions() {
  const [opened, setOpened] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%' }}>
      <div
        role='group'
        aria-label='Settings sections'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-1)',
          padding: 'var(--spacing-2)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
          background: 'var(--surface-primary)',
        }}
      >
        {rows.map((row) => (
          <ButtonBase
            key={row.id}
            type='button'
            variant='secondary'
            appearance={opened === row.id ? 'ghost' : 'transparent'}
            aria-current={opened === row.id ? 'true' : undefined}
            onClick={() => setOpened(row.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-6)',
              width: '100%',
              padding: 'var(--spacing-5) var(--spacing-6)',
              borderRadius: 'var(--radius-3)',
              fontSize: 'var(--font-size-3)',
              textAlign: 'start',
            }}
          >
            <Icon size='md' style={{ color: 'var(--label-secondary)' }}>{row.icon}</Icon>
            <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
              {row.label}
              <span style={{ fontSize: 'var(--font-size-2)', fontWeight: 400, color: 'var(--label-secondary)' }}>{row.hint}</span>
            </span>
            <Icon size='sm' className='listRowChevron' style={{ color: 'var(--label-tertiary)' }}><ChevronRightIcon /></Icon>
          </ButtonBase>
        ))}
      </div>
      <p style={{ margin: 0, color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)' }}>
        {opened === '' ? 'Pick a section' : `Opened: ${opened}`}
      </p>
    </div>
  );
}
