import type { CSSProperties } from 'react';
import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function AutoGrowingNotes() {
  const id = useId();

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>Rollout notes</Label>
      <TextArea
        id={id}
        rows={2}
        fullWidth
        aria-describedby={`${id}-hint`}
        defaultValue={'Enable the new checkout for 10% of EU traffic on Monday.\nWatch the payment error rate for 24 hours before going to 50%.'}
        style={{ fieldSizing: 'content', maxHeight: 240, resize: 'none' } as CSSProperties}
      />
      <HelperText id={`${id}-hint`}>
        Grows with its content up to 240 px, then scrolls. Browsers without field-sizing keep two rows.
      </HelperText>
    </div>
  );
}
