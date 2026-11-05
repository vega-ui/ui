import { Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { AtSignIcon } from '@vega-ui/icons';
import { FormEvent, useState } from 'react';

export default function InputAdornment() {
  const [handle, setHandle] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHandle(String(new FormData(event.currentTarget).get('handle')));
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor='profile-handle'>Username</Label>
      <TextField style={{ paddingInlineStart: 'var(--spacing-8)', gap: 'var(--spacing-3)' }}>
        <Icon size='sm' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><AtSignIcon /></Icon>
        <TextFieldInput id='profile-handle' name='handle' placeholder='jane.doe' pattern='[a-z0-9._]+' required style={{ paddingInlineStart: 0 }} />
      </TextField>
      <output style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>
        {handle === '' ? 'Press Enter to save' : `Profile URL: example.com/@${handle}`}
      </output>
    </form>
  );
}
