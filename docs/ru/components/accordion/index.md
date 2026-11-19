# Accordion

## Профиль документа

`advanced interactive`

## Кратко

`Accordion` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для группы раскрывающихся секций с общей моделью состояния на корне и частями уровня элемента для заголовков, триггеров, иконок и содержимого.

## Импорт

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  type AccordionProps,
  type AccordionItemProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `AccordionProps`
- `AccordionItemProps`
- `AccordionHeaderProps`
- `AccordionTriggerProps`
- `AccordionContentProps`
- `AccordionIconProps`

## Минимальная композиция

<!-- example: accordion/minimal-composition.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionItem value='account'>
        <AccordionHeader>
          <AccordionTrigger>
            Account settings
            <AccordionIcon><ChevronDownIcon /></AccordionIcon>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>Profile, password, and session settings.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyAccordionItem` передаёт свои пропсы в `AccordionItem`, рендерит `summary` в триггере с шевроном, а дочерние элементы — в содержимом. См. [Рецепты компонентов](../../recipes.md).

<!-- example: accordion/recipe.tsx -->
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  type AccordionItemProps,
} from '@vega-ui/react';
import { ChevronDownIcon } from '@vega-ui/icons';
import type { ReactNode } from 'react';

interface MyAccordionItemProps extends AccordionItemProps {
  summary: ReactNode
}

export function MyAccordionItem({ summary, children, ...props }: MyAccordionItemProps) {
  return (
    <AccordionItem {...props}>
      <AccordionHeader>
        <AccordionTrigger>
          {summary}
          <AccordionIcon><ChevronDownIcon /></AccordionIcon>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
}

export default function Recipe() {
  return (
    <Accordion defaultOpened={['shipping']} style={{ width: '100%' }}>
      <MyAccordionItem value='shipping' summary='Shipping'>Orders ship in 2–5 business days.</MyAccordionItem>
      <MyAccordionItem value='returns' summary='Returns'>Return any item within 30 days of delivery.</MyAccordionItem>
    </Accordion>
  );
}
```
<!-- /example -->

## Обязательные части

- `Accordion`: владеет состоянием и размером на уровне корня
- `AccordionItem`: одна раскрывающаяся секция со своим значением
- `AccordionHeader`: семантическая обёртка-заголовок для триггера
- `AccordionTrigger`: переключатель, доступный для клика и с клавиатуры
- `AccordionContent`: раскрывающаяся область содержимого

## Необязательные части

- `AccordionIcon`: индикатор состояния раскрытия с иконкой, которую вы передаёте дочерним элементом

## Порядок композиции

1. `Accordion`
2. `AccordionItem`
3. `AccordionHeader`
4. `AccordionTrigger`
5. `AccordionIcon`
6. `AccordionContent`

## Варианты

- Группы с одной или несколькими открытыми секциями через `multiple`
- Неконтролируемое или [контролируемое](../../glossary.md#контролируемый-controlled) состояние раскрытия
- Варианты размера через `size`
- С `AccordionIcon` с иконкой из любого набора или без него

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

- `multiple={false}` означает, что новый открытый элемент заменяет текущий открытый.
- Даже при богатом содержимом триггера вся его ширина должна оставаться кликабельной.
- Собственные обёртки вокруг триггеров или содержимого должны сохранять контракт композиции корня.

## Частые ошибки

- Рендер `AccordionContent` вне `AccordionItem`.
- Кликабельной делают только иконку, а не весь триггер.
- `Accordion` используют как набор несвязанных `Collapsible`, хотя нужна одна общая модель состояния.
