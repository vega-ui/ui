import { ButtonBase, type ButtonBaseProps, Icon } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@vega-ui/icons';
import { useState } from 'react';

function ToolbarAction({ style, ...props }: ButtonBaseProps) {
  return (
    <ButtonBase
      type='button'
      variant='secondary'
      appearance='transparent'
      style={{ display: 'flex', padding: 'var(--spacing-3)', borderRadius: 'var(--radius-2)', ...style }}
      {...props}
    />
  );
}

export default function SharedActionPrimitive() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <div
        role='toolbar'
        aria-label='Text formatting'
        style={{
          display: 'flex',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-3)',
          borderBlockEnd: '1px solid var(--separator-opaque)',
        }}
      >
        <ToolbarAction aria-label='Bold' aria-pressed={bold} appearance={bold ? 'ghost' : 'transparent'} onClick={() => setBold(!bold)}>
          <Icon size='sm'><BoldIcon /></Icon>
        </ToolbarAction>
        <ToolbarAction aria-label='Italic' aria-pressed={italic} appearance={italic ? 'ghost' : 'transparent'} onClick={() => setItalic(!italic)}>
          <Icon size='sm'><ItalicIcon /></Icon>
        </ToolbarAction>
        <ToolbarAction aria-label='Underline' aria-pressed={underline} appearance={underline ? 'ghost' : 'transparent'} onClick={() => setUnderline(!underline)}>
          <Icon size='sm'><UnderlineIcon /></Icon>
        </ToolbarAction>
      </div>
      <p
        style={{
          margin: 0,
          padding: 'var(--spacing-8)',
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
        }}
      >
        Release notes for version 2.4
      </p>
    </div>
  );
}
