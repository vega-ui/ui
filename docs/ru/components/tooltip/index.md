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
  TooltipArrow,
  type TooltipProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `TooltipProps`
- `TooltipTriggerProps`
- `TooltipContentProps`
- `TooltipArrowProps`

## Минимальная композиция

<!-- example: tooltip/minimal-composition.tsx -->
```tsx
import {
  Button,
  Text,
  Tooltip,
  TooltipArrow,
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
        <TooltipArrow />
        <Text size={2}>Anyone with the link can view the page</Text>
      </TooltipContent>
    </Tooltip>
  );
}
```
<!-- /example -->

## Обязательные части

- `Tooltip`: корневое состояние и провайдер контекста
- `TooltipTrigger`: поверхность триггера
- `TooltipContent`: видимое содержимое тултипа

## Необязательные части

- `TooltipArrow`: визуальная стрелка всплывающего содержимого

## Порядок композиции

1. `Tooltip`
2. `TooltipTrigger`
3. `TooltipContent`
4. `TooltipArrow`

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
