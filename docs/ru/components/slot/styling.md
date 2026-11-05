# Slot: стилизация

## Обзор

У `Slot` нет визуального контракта. Он сливает пропсы с одним валидным дочерним элементом и оставляет весь рендер, токены и поведение CSS этому элементу и родительскому компоненту, который использует `Slot`.

## Публичные CSS-переменные

В текущей реализации нет публичных CSS-переменных `--slot-*`.

## Переменные частей

### Корень

У `Slot` нет собственного DOM, если его не рендерит выбранный дочерний элемент.

### Дочерний элемент

Стили полностью определяются дочерним элементом в слоте и родительским компонентом, который передаёт пропсы через `asChild`.

## Взаимодействие состояний и вариантов

- У `Slot` нет собственных визуальных вариантов.
- Классы состояний, data-атрибуты и инлайн-стили передаются дочернему элементу.
- Визуальные расхождения обычно возникают из-за смены семантики дочернего элемента, а не из-за какого-либо CSS-слоя `Slot`.

## Примеры

### Сохранение стилей кнопки на элементе-ссылке

`Button asChild` передаёт классы и data-атрибуты ссылке, поэтому она выглядит как второстепенная кнопка, но сохраняет семантику ссылки.

<!-- example: slot/styled-link-action.tsx -->
```tsx
import { Button, Icon } from '@vega-ui/react';
import { BookOpenIcon } from '@vega-ui/icons';

export default function StyledLinkAction() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <Button type='button'>Create API key</Button>
      <Button asChild variant='secondary' appearance='ghost'>
        <a href='/docs/api/authentication'>
          <Icon size='sm'><BookOpenIcon /></Icon>
          Read the API guide
        </a>
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Передача стилей навигации в ссылку роутера

Локальный `NavItem` владеет внешним видом и передаёт `style` и `aria-current` через `Slot` любой ссылке, которую рендерит роутер. Собственный `onClick` дочернего элемента всё равно срабатывает, потому что обработчики объединяются в цепочку.

<!-- example: slot/forward-menu-item-styling-into-a-router-link.tsx -->
```tsx
import type { AnchorHTMLAttributes, CSSProperties } from 'react';
import { Slot } from '@vega-ui/react';
import { useState } from 'react';

interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  active?: boolean
}

function NavItem({ asChild, active, children, ...props }: NavItemProps) {
  const style: CSSProperties = {
    display: 'block',
    padding: 'var(--spacing-3) var(--spacing-6)',
    borderRadius: 'var(--radius-2)',
    color: active ? 'var(--color-primary-500)' : 'var(--label-primary)',
    background: active ? 'var(--fills-secondary)' : 'transparent',
    textDecoration: 'none',
  };

  if (asChild) {
    return <Slot style={style} aria-current={active ? 'page' : undefined} {...props}>{children}</Slot>;
  }

  return <a style={style} aria-current={active ? 'page' : undefined} {...props}>{children}</a>;
}

const sections = ['Overview', 'Deployments', 'Logs', 'Settings'];

export default function ForwardMenuItemStylingIntoARouterLink() {
  const [current, setCurrent] = useState('Overview');

  return (
    <nav aria-label='Project' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: 220 }}>
      {sections.map((section) => (
        <NavItem key={section} asChild active={current === section}>
          <a
            href={`/project/${section.toLowerCase()}`}
            onClick={(event) => {
              event.preventDefault();
              setCurrent(section);
            }}
          >
            {section}
          </a>
        </NavItem>
      ))}
    </nav>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не придумывайте отдельный API токенов для `Slot`
- не относитесь к `Slot` как к стилизованной обёртке
- не рассчитывайте, что `Slot` исправит проблемы семантики или доступности, вызванные выбранным дочерним элементом
