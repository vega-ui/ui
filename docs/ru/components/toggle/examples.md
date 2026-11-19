# Toggle: примеры

## Базовый

### Базовый: сохранить объявление в избранное

Переключатель только с иконкой на карточке: `square` делает его такой же ширины, как высоты, а подпись в обоих состояниях — «Save to favorites». Родитель хранит `pressed`, чтобы закрашивать сердечко, пока объявление сохранено, и обновлять строку состояния.

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

## Контролируемый/с состоянием

### Контролируемый/с состоянием: управление звонком с одной подписью у каждого переключателя

Три контролируемых переключателя звонка: «Mute», «Captions» и «Raise hand». Иконка микрофона меняется, пока звук выключен, но подпись остаётся «Mute», а состояние сообщает `aria-pressed`. Строка состояния под панелью собирает все три значения.

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

## Форма/интеграция

### Форма/интеграция: предпросмотр в форме комментария

Переключатель «Preview» показывает отрендеренный комментарий под полем. Это `<button type="button">`, поэтому его нажатие никогда не отправляет форму — это делает только «Comment». Переключатель не входит в значение формы: родитель хранит его и сбрасывает после публикации.

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

## Раскладка/оверлей

### Раскладка/оверлей: настройки вида в панели инструментов

Два переключателя только с иконкой над кодом, «Wrap lines» и «Line numbers», каждый обёрнут в `ToolbarItem` с `asChild`. У панели одна остановка табуляции, и стрелки влево и вправо ходят между ними, а каждый переключатель хранит своё состояние, которое родитель применяет к коду.

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
