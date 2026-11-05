import { HelperText, Icon, Label, TextField, TextFieldInput } from '@vega-ui/react';
import { SearchIcon } from '@vega-ui/icons';
import { useId } from 'react';

export default function RtlField() {
  const id = useId();

  return (
    <div dir='rtl' lang='he' style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      <TextField>
        <Icon size='sm' aria-hidden style={{ flexShrink: 0, marginInlineStart: 'var(--spacing-6)', color: 'var(--label-secondary)' }}>
          <SearchIcon />
        </Icon>
        <TextFieldInput type='search' aria-label='חיפוש לקוחות' placeholder='שם לקוח או מספר הזמנה' />
      </TextField>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor={`${id}-email`}>דוא״ל לחשבוניות</Label>
        <TextField>
          <TextFieldInput
            id={`${id}-email`}
            type='email'
            dir='ltr'
            defaultValue='finance@northwind.co.il'
            aria-describedby={`${id}-hint`}
          />
        </TextField>
        <HelperText id={`${id}-hint`}>כתובות דוא״ל נכתבות תמיד משמאל לימין.</HelperText>
      </div>
    </div>
  );
}
