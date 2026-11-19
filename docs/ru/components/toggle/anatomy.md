# Toggle: анатомия

## Обзор

`Toggle` — самостоятельная кнопка, которая хранит нажатое состояние и сама им владеет. Элементы [ToggleGroup](../toggle-group/) — отдельная часть группы, `ToggleGroupToggle`, с тем же видом; см. [анатомию ToggleGroup](../toggle-group/anatomy.md).

## Обязательные части

### `Toggle`

Рендерит [Button](../button/) — `<button type="button" aria-pressed>` с `data-pressed`. С `square` он такой же ширины, как высоты, — для одной иконки. С `asChild` рендерит свой единственный дочерний элемент, который должен быть кнопкой, с теми же атрибутами и видом переключателя. Принимает все пропсы `Button`, кроме `variant`, `appearance` и `fullWidth`: вид следует за нажатым состоянием.

## Необязательные части

### `Icon`

[Icon](../icon/) рядом с текстом или один в переключателе с `square` и `aria-label`.

### `Toolbar`

[Toolbar](../toolbar/) вокруг переключателей. Каждый переключатель кладут в `ToolbarItem` с `asChild`, и он становится элементом навигации стрелками по панели.

## Порядок композиции

1. `Toggle`
2. Его содержимое: `Icon` и текст или один `Icon` с `square`

## Корректные варианты композиции

Переключатель только с иконкой на карточке: `square` делает его такой же ширины, как высоты, а `aria-label` называет состояние, которое переключатель включает. Родитель хранит `pressed`, чтобы закрашивать сердечко, пока объявление сохранено.

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

Переключатели в панели инструментов: каждый обёрнут в `ToolbarItem` с `asChild`, поэтому стрелки ходят между ними, а у панели одна остановка табуляции. У каждого переключателя своё состояние.

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

## Некорректные варианты композиции

### Подпись, которая меняется вместе с состоянием

«Mute» в отжатом и «Unmute» в нажатом состоянии заставляют скринридер объявлять две разные кнопки. Оставьте одну подпись; состояние объявляет `aria-pressed`.

### Отдельные переключатели для одного исключающего выбора

У переключателей, которые отжимают друг друга вручную, у каждого своя остановка табуляции и нет роли группы. Используйте [ToggleGroup](../toggle-group/) с элементами `ToggleGroupToggle`.

### Ссылка или не кнопка в качестве дочернего элемента

С `asChild` дочерний элемент должен быть кнопкой: `aria-pressed` на ссылке или `<div>` не объявляется как переключатель, а `<div>` не реагирует на Enter и Space.
