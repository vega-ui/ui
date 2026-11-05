import { Icon, TextField, TextFieldInput, VisuallyHidden } from '@vega-ui/react';
import { SearchIcon } from '@vega-ui/icons';

export default function HiddenAccessibilityOnlyLabel() {
  return (
    <header style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', width: '100%' }}>
      <strong>Acme Docs</strong>
      <form role='search' action='/search' style={{ flex: 1, minWidth: 0 }}>
        <VisuallyHidden asChild>
          <label htmlFor='docs-search'>Search documentation</label>
        </VisuallyHidden>
        <TextField size='sm' style={{ paddingInlineStart: 'var(--spacing-5)' }}>
          <Icon size='xs' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><SearchIcon /></Icon>
          <TextFieldInput id='docs-search' name='q' type='search' placeholder='Search' />
        </TextField>
      </form>
    </header>
  );
}
