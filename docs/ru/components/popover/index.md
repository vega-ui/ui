# Popover

## Профиль документа

`advanced interactive`

## Кратко

`Popover` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для немодального плавающего содержимого, привязанного к триггеру. `PopoverContent` — нативный элемент `popover="auto"`, который открывается с триггера через `popovertarget`, поэтому браузер показывает его в верхнем слое (top layer) и закрывает по клику снаружи или `Escape`, а `overflow` никогда его не обрезает и модальный диалог не перекрывает. Он занимает место между подсказками уровня тултипа и полноценными модальными оверлеями.

## Импорт

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  type PopoverProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `PopoverProps`
- `PopoverTriggerProps`
- `PopoverContentProps`

## Минимальная композиция

<!-- example: popover/minimal-composition.tsx -->
```tsx
import { useId } from 'react';
import {
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@vega-ui/react';

export default function MinimalComposition() {
  const titleId = useId();

  return (
    <Popover role='dialog'>
      <PopoverTrigger asChild>
        <Button variant='secondary' appearance='ghost'>Storage · 82% used</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby={titleId}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', maxWidth: 280 }}>
          <Heading id={titleId} as='h3' size={5} fontWeight={600}>16.4 GB of 20 GB used</Heading>
          <Text size={2} style={{ color: 'var(--label-secondary)' }}>Videos take 11.2 GB. Old exports are removed after 90 days.</Text>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```
<!-- /example -->

## Обязательные части

- `Popover`: корневое состояние и провайдер контекста
- `PopoverTrigger`: поверхность триггера
- `PopoverContent`: плавающее содержимое

## Необязательные части

Нет. Для затемнённой подложки используйте `Dialog` или `Sheet`.

## Порядок композиции

1. `Popover`
2. `PopoverTrigger`
3. `PopoverContent`

## Варианты

- Состояние открытия через триггер или [контролируемое](../../glossary.md#контролируемый-controlled)
- Лёгкий информационный поповер или более насыщенное собственное содержимое

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

- Используйте `Dialog` или `Sheet`, когда взаимодействие должно быть модальным или нужна затемнённая подложка.
- Плавающее содержимое нужно тестировать внутри прокручиваемых контейнеров и оверлеев.
- Содержимое триггера должно ясно показывать, открыт ли поповер.
- Если в содержимом начинают накапливаться разделы формы, подтверждения или большие группы действий, правильной абстракцией обычно уже не будет поповер.

## Частые ошибки

- Помещать критически важный сценарий в поповер.
- Забывать проверить расположение внутри обрезающих или прокручиваемых контейнеров.
- Позволять содержимому поповера разрастись в мини-диалог со слишком большим количеством текста или действий.
