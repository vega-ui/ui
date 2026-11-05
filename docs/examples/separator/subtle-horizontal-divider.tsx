import { Separator, Text } from '@vega-ui/react';
import { Fragment } from 'react';

const contacts = ['Alicia Gómez', 'Ben Carter', 'Chen Wei', 'Dana Novak'];

export default function SubtleHorizontalDivider() {
  return (
    <div style={{ display: 'grid', width: '100%' }}>
      {contacts.map((name, index) => (
        <Fragment key={name}>
          {index > 0 && (
            <Separator
              aria-hidden
              style={{ width: 'auto', marginInlineStart: 'var(--spacing-24)', background: 'var(--separator-non-opaque)' }}
            />
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', paddingBlock: 'var(--spacing-5)' }}>
            <div
              aria-hidden
              style={{ width: 'var(--spacing-18)', height: 'var(--spacing-18)', flexShrink: 0, borderRadius: '50%', background: 'var(--fills-secondary)' }}
            />
            <Text size={3}>{name}</Text>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
