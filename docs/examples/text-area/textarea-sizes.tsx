import { TextArea } from '@vega-ui/react';

const SIZES = ['sm', 'md', 'lg'] as const;

export default function TextareaSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      {SIZES.map((size) => (
        <TextArea
          key={size}
          size={size}
          rows={2}
          fullWidth
          aria-label={`Comment, size ${size}`}
          placeholder={`Leave a comment (${size})`}
        />
      ))}
    </div>
  );
}
