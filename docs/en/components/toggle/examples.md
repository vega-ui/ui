# Toggle Examples

## Basic

### Basic: save a listing to favorites

An icon-only toggle on a card: `square` makes it as wide as it is high, and it keeps the label "Save to favorites" in both states. The parent keeps `pressed` to fill the heart while the listing is saved and to update the status line.

<!-- example: toggle/save-listing.tsx -->
```tsx
import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { HeartIcon } from '@vega-ui/icons';

export default function SaveListing() {
  const [saved, setSaved] = useState(false);

  return (
    <article
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-6)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 360,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-1)', flex: 1, minWidth: 0 }}>
        <Text size={3} fontWeight={600}>Cabin by the lake</Text>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>2 guests · 1 bedroom · €120 a night</Text>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {saved ? 'Saved to your favorites' : 'Not saved'}
        </Text>
      </div>
      <Toggle pressed={saved} onChangePressed={setSaved} square size='sm' aria-label='Save to favorites' style={{ flexShrink: 0 }}>
        <Icon><HeartIcon fill={saved ? 'currentColor' : 'none'} /></Icon>
      </Toggle>
    </article>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: call controls with one label per toggle

Three controlled toggles of a call: "Mute", "Captions" and "Raise hand". The microphone icon changes while muted, but the label stays "Mute", and `aria-pressed` tells the state. The status line under the bar sums up the three values.

<!-- example: toggle/call-controls.tsx -->
```tsx
import { useState } from 'react';
import { Icon, Text, Toggle } from '@vega-ui/react';
import { CaptionsIcon, HandIcon, MicIcon, MicOffIcon } from '@vega-ui/icons';

export default function CallControls() {
  const [muted, setMuted] = useState(true);
  const [captions, setCaptions] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  const states: string[] = [muted ? 'You are muted' : 'Your microphone is on'];
  if (captions) states.push('captions on');
  if (handRaised) states.push('hand raised');

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--spacing-6)', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          padding: 'var(--spacing-3)',
          borderRadius: 'var(--radius-8)',
          border: '1px solid var(--separator-opaque)',
          background: 'var(--surface-primary)',
        }}
      >
        <Toggle pressed={muted} onChangePressed={setMuted} square aria-label='Mute'><Icon>{muted ? <MicOffIcon /> : <MicIcon />}</Icon></Toggle>
        <Toggle pressed={captions} onChangePressed={setCaptions} square aria-label='Captions'><Icon><CaptionsIcon /></Icon></Toggle>
        <Toggle pressed={handRaised} onChangePressed={setHandRaised} square aria-label='Raise hand'><Icon><HandIcon /></Icon></Toggle>
      </div>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{states.join(' · ')}</Text>
    </div>
  );
}
```
<!-- /example -->

## Form/Integration

### Form/Integration: preview inside a comment form

The "Preview" toggle shows the rendered comment under the field. It is a `<button type="button">`, so pressing it never submits the form; only "Comment" does. The toggle is not a value of the form: the parent keeps it and resets it after posting.

<!-- example: toggle/comment-preview.tsx -->
```tsx
import { useId, useState, type FormEvent } from 'react';
import { Button, Icon, Label, Text, TextArea, Toggle } from '@vega-ui/react';
import { EyeIcon } from '@vega-ui/icons';

export default function CommentPreview() {
  const fieldId = useId();
  const [comment, setComment] = useState('Looks good to me. **Ship it** after the docs land.');
  const [previewing, setPreviewing] = useState(false);
  const [posted, setPosted] = useState<string[]>([]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.trim() === '') return;

    setPosted((current) => [...current, comment.trim()]);
    setComment('');
    setPreviewing(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: 'grid',
        gap: 'var(--spacing-4)',
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 440,
        padding: 'var(--spacing-8)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Label htmlFor={fieldId} size='sm'>Comment</Label>
        <Toggle size='xs' pressed={previewing} onChangePressed={setPreviewing}>
          <Icon size='xs'><EyeIcon /></Icon>
          Preview
        </Toggle>
      </div>
      <TextArea
        id={fieldId}
        name='comment'
        size='sm'
        rows={3}
        fullWidth
        placeholder='Write a comment'
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
      {previewing && (
        <Text
          size={3}
          style={{
            display: 'block',
            padding: 'var(--spacing-5) var(--spacing-6)',
            borderRadius: 'var(--radius-4)',
            background: 'var(--fills-quaternary)',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere',
          }}
        >
          {comment.trim() === '' ? 'Nothing to preview' : comment.split('**').map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))}
        </Text>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
          {posted.length === 0 ? 'No comments yet' : `${posted.length} posted`}
        </Text>
        <Button type='submit' size='sm'>Comment</Button>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: view options in a toolbar

Two icon-only toggles above a code view, "Wrap lines" and "Line numbers", each wrapped in `ToolbarItem` with `asChild`. The toolbar keeps one Tab stop and the Left and Right arrows move between them, while each toggle keeps its own state and the parent applies it to the code.

<!-- example: toggle/code-view-options.tsx -->
```tsx
import { useState } from 'react';
import { Icon, Toggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { ListOrderedIcon, WrapTextIcon } from '@vega-ui/icons';

const lines = [
  'import { defineConfig } from "vite";',
  'export default defineConfig({ build: { lib: { entry: "src/index.ts", formats: ["es"] } } });',
];

export default function CodeViewOptions() {
  const [wrap, setWrap] = useState(false);
  const [numbers, setNumbers] = useState(true);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 440,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Code view' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <ToolbarItem asChild>
          <Toggle square size='xs' aria-label='Wrap lines' pressed={wrap} onChangePressed={setWrap}><Icon><WrapTextIcon /></Icon></Toggle>
        </ToolbarItem>
        <ToolbarItem asChild>
          <Toggle square size='xs' aria-label='Line numbers' pressed={numbers} onChangePressed={setNumbers}><Icon><ListOrderedIcon /></Icon></Toggle>
        </ToolbarItem>
      </Toolbar>
      <pre
        tabIndex={0}
        role='region'
        aria-label='vite.config.ts'
        style={{
          margin: 0,
          padding: 'var(--spacing-6)',
          overflowX: 'auto',
          whiteSpace: wrap ? 'pre-wrap' : 'pre',
          overflowWrap: wrap ? 'anywhere' : 'normal',
          fontFamily: 'var(--code-font-family), monospace',
          fontSize: 'var(--font-size-2)',
          lineHeight: 1.6,
          color: 'var(--label-primary)',
        }}
      >
        {lines.map((line, index) => (
          <div key={line} style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
            {numbers && <span aria-hidden style={{ flexShrink: 0, color: 'var(--label-tertiary)' }}>{index + 1}</span>}
            <span style={{ minWidth: 0 }}>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
```
<!-- /example -->
