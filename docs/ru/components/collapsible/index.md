# Collapsible

## Профиль документа

`advanced interactive`

## Кратко

`Collapsible` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для одной раскрывающейся области с триггером и поверхностью содержимого. Это примитивный паттерн раскрытия, когда групповое поведение аккордеона не нужно.

## Импорты

```tsx
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  type CollapsibleProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CollapsibleProps`
- `CollapsibleTriggerProps`
- `CollapsibleContentProps`

## Минимальная композиция

<!-- example: collapsible/minimal-composition.tsx -->
```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ width: '100%' }}>
      <Collapsible>
        <CollapsibleTrigger>Advanced billing options</CollapsibleTrigger>
        <CollapsibleContent>
          VAT settings, invoice recipients, and legal entity data.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Collapsible`: владелец состояния корня
- `CollapsibleTrigger`: поверхность триггера раскрытия
- `CollapsibleContent`: раскрывающаяся область содержимого

## Необязательные части

- Кроме модели «корень — триггер — содержимое», дополнительных публичных частей нет

## Порядок композиции

1. `Collapsible`
2. `CollapsibleTrigger`
3. `CollapsibleContent`

## Варианты

- Неконтролируемое или [контролируемое](../../glossary.md#контролируемый-controlled) состояние открытия
- Стандартный триггер-кнопка или композиция триггера через `asChild`
- Встроенная справка, фильтры и второстепенные детали как варианты на уровне продукта

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

- `CollapsibleTrigger` может рендериться через `asChild`, но пользовательская семантика всё равно должна сохранять контракт настоящего триггера.
- `onChangeHidden` отражает жизненный цикл видимости, который во время переходов высоты может отличаться от состояния открытия.
- Динамическую высоту содержимого нужно проверять на реальном содержимом, а не только на коротких заглушках.

## Частые ошибки

- Использовать `Collapsible` там, где на самом деле нужно групповое поведение `Accordion`.
- Прятать важную информацию за расплывчатыми подписями триггера.
- Считать `open` и `hidden` одним и тем же сигналом жизненного цикла.
