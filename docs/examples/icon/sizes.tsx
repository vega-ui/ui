import { Icon, type IconSize } from '@vega-ui/react';
import { StarIcon } from '@vega-ui/icons';

const sizes: IconSize[] = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-8)' }}>
      {sizes.map((size) => (
        <figure key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-3)', margin: 0 }}>
          <Icon size={size}><StarIcon /></Icon>
          <figcaption style={{ color: 'var(--label-secondary)', fontSize: 'var(--font-size-1)' }}>{size}</figcaption>
        </figure>
      ))}
    </div>
  );
}
