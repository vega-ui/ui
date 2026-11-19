import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Text,
  Toggle,
  Toolbar,
  ToolbarItem,
  type ToggleProps,
} from '@vega-ui/react';
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from '@vega-ui/icons';

interface MyToolbarToggleProps extends ToggleProps {
  label: string
}

export function MyToolbarToggle({ label, children, ...props }: MyToolbarToggleProps) {
  return (
    <ToolbarItem asChild>
      <Toggle square size='xs' aria-label={label} {...props}>
        <Icon>{children}</Icon>
      </Toggle>
    </ToolbarItem>
  );
}

export default function Recipe() {
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);

  const decorations: string[] = [];
  if (underline) decorations.push('underline');
  if (strikethrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    fontWeight: bold ? 700 : 400,
    fontStyle: italic ? 'italic' : 'normal',
    textDecoration: decorations.length === 0 ? 'none' : decorations.join(' '),
    overflowWrap: 'anywhere',
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Formatting' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <MyToolbarToggle label='Bold' pressed={bold} onChangePressed={setBold}><BoldIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Italic' pressed={italic} onChangePressed={setItalic}><ItalicIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Underline' pressed={underline} onChangePressed={setUnderline}><UnderlineIcon /></MyToolbarToggle>
        <MyToolbarToggle label='Strikethrough' pressed={strikethrough} onChangePressed={setStrikethrough}><StrikethroughIcon /></MyToolbarToggle>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
