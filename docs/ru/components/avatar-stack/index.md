# AvatarStack

## Профиль документа

`compound`

## Кратко

`AvatarStack` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для групп перекрывающихся аватаров: участников, ревьюеров, превью команды. Корень передаёт размер и вариант каждому аватару в стопке и превращает несколько людей в одно компактное групповое отображение.

## Импорт

```tsx
import {
  AvatarStack,
  AvatarStackItem,
  type AvatarGroupProps,
  type AvatarGroupSize,
  type AvatarGroupStackItemProps,
  type AvatarGroupVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `AvatarGroupProps`
- `AvatarGroupStackItemProps`
- `AvatarGroupSize`
- `AvatarGroupVariant`

## Минимальная композиция

<!-- example: avatar-stack/minimal-composition.tsx -->
```tsx
import { AvatarFallback, AvatarImage, AvatarStack, AvatarStackItem } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

export default function MinimalComposition() {
  return (
    <AvatarStack role='group' aria-label='Project members'>
      <AvatarStackItem role='img' aria-label='Maria Chen'>
        <AvatarImage src={portrait(210)} alt='' />
        <AvatarFallback>MC</AvatarFallback>
      </AvatarStackItem>
      <AvatarStackItem role='img' aria-label='Omar Haddad'>
        <AvatarFallback>OH</AvatarFallback>
      </AvatarStackItem>
    </AvatarStack>
  );
}
```
<!-- /example -->

## Обязательные части

- `AvatarStack`: раскладка корня и общий контекст размера и варианта
- `AvatarStackItem`: один аватар в стопке

## Необязательные части

- собственное содержимое `AvatarImage` и `AvatarFallback` внутри каждого элемента

## Порядок композиции

1. `AvatarStack`
2. повторяющиеся `AvatarStackItem`
3. содержимое аватара внутри каждого элемента

## Варианты

- Размер: общий размер аватаров от `2xs` до `2xl`
- Вариант: `primary` или `secondary`
- Содержимое: аватары с изображениями, с запасным вариантом или смешанные группы

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Паттерны](./patterns.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Очень большим группам обычно нужно усечение или сводка вида `+N` на уровне продукта.
- Разные размеры аватаров в одной стопке ломают эффект перекрытия.
- Раскрытие при наведении слегка меняет отступы — проверяйте это в плотных раскладках.
- Если явные имена, роли или порядок важнее компактности, текстовый список или ростер обычно понятнее стопки.

## Частые ошибки

- Рендер обычных аватаров без `AvatarStackItem`.
- Произвольные дочерние элементы, не являющиеся аватарами, внутри стопки.
- Слишком много элементов без сводного паттерна.
