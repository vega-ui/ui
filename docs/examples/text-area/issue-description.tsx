import { HelperText, Label, TextArea } from '@vega-ui/react';
import { useId } from 'react';

export default function IssueDescription() {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-3)', width: '100%' }}>
      <Label htmlFor={id}>What went wrong?</Label>
      <TextArea
        id={id}
        name='description'
        rows={4}
        fullWidth
        placeholder='Steps to reproduce, what you expected and what happened instead'
        aria-describedby={hintId}
      />
      <HelperText id={hintId}>Include the page URL and the time it happened, if you know it.</HelperText>
    </div>
  );
}
