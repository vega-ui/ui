# Toggle: паттерны

## Независимые настройки в панели инструментов

Когда использовать:

- Панель предлагает несколько настроек, которые включаются и выключаются сами по себе, например перенос строк и номера строк в просмотре кода.

Заметки о композиции:

- Положите каждый переключатель в `ToolbarItem` с `asChild`, а переключателю только с иконкой дайте `square` и `aria-label`.
- Оставляйте подпись настройки, например «Wrap lines», в обоих состояниях и используйте один `size` во всей панели.
- Если переключатели составляют один выбор, например выравнивание, положите их в [ToggleGroup](../toggle-group/patterns.md).

Компромиссы:

- Панель занимает одну остановку табуляции на все свои элементы, и стрелки ходят между ними; у каждого переключателя остаётся своё состояние.

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

## Управление медиа и звонком

Когда использовать:

- Плеер или звонок предлагают состояния, которые пользователь переключает во время сеанса: выключенный микрофон, субтитры или поднятая рука.

Заметки о композиции:

- Управляйте каждым переключателем из родителя через `pressed` и `onChangePressed` и показывайте общее состояние в строке состояния.
- Меняйте иконку вместе с состоянием, если это помогает, но никогда не меняйте подпись.
- Для касаний используйте `size='md'` или крупнее и держите переключатели в одной строке с одинаковыми размерами.

Компромиссы:

- Переключатели делают управление компактным, но каждое состояние видно только по оттенку и иконке: текст состояния сохраняет его читаемым.

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
