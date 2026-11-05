# Link: стилизация

## Обзор

Стилизация `Link` сосредоточена в одной текстовой поверхности: цвет, подчёркивание, отступ подчёркивания и поведение фокуса.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--focus-color` | `Link` | Цвет обводки фокуса. |
| `--transition-state-delay` | `Link` | Тайминг перехода при наведении и фокусе. |

## Переменные уровня частей

- `Link`: отвечает за цвет, подчёркивание, отступ подчёркивания, стили наведения и фокуса.

## Взаимодействие состояний и вариантов

- Наведение меняет цвет и отступ подчёркивания.
- `focus-visible` добавляет обводку.
- `asChild` сохраняет ту же стилизацию, передавая рендер дочернему компоненту.

## Примеры

`Link` задаёт цвет напрямую, а не через переменную, поэтому инлайновый `color` заменяет его во всех состояниях, включая наведение. Здесь ссылки в подвале приглушены, а смещение подчёркивания при наведении по-прежнему анимируется.

<!-- example: link/css-overrides.tsx -->
```tsx
import type { CSSProperties } from 'react';
import { Link } from '@vega-ui/react';

const muted: CSSProperties = {
  color: 'var(--label-secondary)',
  textDecorationColor: 'var(--separator-opaque)',
};

export default function CssOverrides() {
  return (
    <footer style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', fontSize: 'var(--font-size-2)' }}>
      <span style={{ color: 'var(--label-secondary)' }}>© 2025 Acme Inc.</span>
      <Link href='/legal/terms' style={muted}>Terms</Link>
      <Link href='/legal/privacy' style={muted}>Privacy</Link>
      <Link href='/status' style={muted}>Status</Link>
    </footer>
  );
}
```
<!-- /example -->

## Что не переопределять

- Не убирайте видимость фокуса без замены.
- Не подавляйте подчёркивание или отклик на наведение настолько, что элемент перестаёт восприниматься как ссылка.
- Не используйте стилизацию ссылки как замену семантике кнопки.
