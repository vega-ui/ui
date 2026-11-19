import { Button, Icon, type ButtonSize } from '@vega-ui/react';
import { SettingsIcon } from '@vega-ui/icons';

const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function SquareSizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {sizes.map((size) => (
        <Button key={size} type='button' size={size} square aria-label={`Settings, size ${size}`}>
          <Icon><SettingsIcon /></Icon>
        </Button>
      ))}
    </div>
  );
}
