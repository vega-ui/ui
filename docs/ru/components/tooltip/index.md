# Tooltip

## Профиль документа

`advanced interactive`

## Кратко

`Tooltip` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для лёгких всплывающих описаний, привязанных к триггеру. Он должен нести только дополнительную, несущественную информацию.

## Импорт

```tsx
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  type TooltipProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`

## Минимальная композиция

<!-- example: tooltip/minimal-composition.tsx -->
```tsx
import {
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Publish</Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text size={2}>Anyone with the link can view the page</Text>
      </TooltipContent>
    </Tooltip>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле и импортируйте этот компонент везде. `MyTooltip` передаёт свои пропсы в `Tooltip`, делает дочерний элемент триггером и показывает `content` в подсказке. См. [Рецепты компонентов](../../recipes.md).

<!-- example: tooltip/recipe.tsx -->
```tsx
import type { ReactNode } from 'react';
import {
  Button,
  Icon,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipProps,
} from '@vega-ui/react';
import { ArchiveIcon, ReplyIcon, Trash2Icon } from '@vega-ui/icons';

interface MyTooltipProps extends TooltipProps {
  content: ReactNode
}

export function MyTooltip({ content, children, ...props }: MyTooltipProps) {
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <Text size={2}>{content}</Text>
      </TooltipContent>
    </Tooltip>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
      <MyTooltip content='Reply to Maria Chen'>
        <Button square aria-label='Reply' variant='secondary' appearance='ghost'><Icon><ReplyIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Archive · E'>
        <Button square aria-label='Archive' variant='secondary' appearance='ghost'><Icon><ArchiveIcon /></Icon></Button>
      </MyTooltip>
      <MyTooltip content='Move to Trash · #'>
        <Button square aria-label='Delete' variant='secondary' appearance='ghost'><Icon><Trash2Icon /></Icon></Button>
      </MyTooltip>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Tooltip`: корневое состояние и провайдер контекста
- `TooltipTrigger`: поверхность триггера
- `TooltipContent`: видимое содержимое тултипа

## Необязательные части

Необязательных частей нет.

## Порядок композиции

1. `Tooltip`
2. `TooltipTrigger`
3. `TooltipContent`

## Варианты

- Простой тултип-метка или более развёрнутый описательный тултип
- [Контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия, когда это нужно логике потребителя

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Тултипы не должны содержать критичных действий или обязательных инструкций.
- Тултип показывается при наведении мышью или пером и при фокусе с клавиатуры, но никогда по касанию, поэтому пользователям сенсорных экранов та же информация нужна в другом месте.
- Содержимое триггера должно оставаться понятным и без тултипа.

## Частые ошибки

- Обязательные инструкции, спрятанные в тултипе.
- Содержимое тултипа как единственное доступное имя контрола.
- Интерактивные сценарии внутри содержимого тултипа.
