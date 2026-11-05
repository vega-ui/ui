import { Icon, IconButton, type IconButtonSize } from '@vega-ui/react';
import { SettingsIcon } from '@vega-ui/icons';

const sizes: IconButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function Sizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {sizes.map((size) => (
        <IconButton key={size} type='button' size={size} aria-label={`Settings, size ${size}`}>
          <Icon><SettingsIcon /></Icon>
        </IconButton>
      ))}
    </div>
  );
}
