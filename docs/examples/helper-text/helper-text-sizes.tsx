import { HelperText } from '@vega-ui/react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function HelperTextSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
          <HelperText size={size}>Hint, {size}: shown to all members of the workspace.</HelperText>
          <HelperText size={size} error>Error, {size}: this name is already in use.</HelperText>
        </div>
      ))}
    </div>
  );
}
