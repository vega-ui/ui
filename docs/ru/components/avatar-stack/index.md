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
  type AvatarStackProps,
  type AvatarStackSize,
  type AvatarStackItemProps,
  type AvatarStackVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `AvatarStackProps`
- `AvatarStackItemProps`
- `AvatarStackSize`
- `AvatarStackVariant`

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

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyAvatarStackItem` передаёт свои пропсы в `AvatarStackItem`, называет его через `name`, показывает картинку из `src`, а за ней инициалы из `name`, и иконку человека, когда имени нет. См. [Рецепты компонентов](../../recipes.md).

<!-- example: avatar-stack/recipe.tsx -->
```tsx
import {
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  AvatarStack,
  AvatarStackItem,
  Text,
  type AvatarStackItemProps,
} from '@vega-ui/react';
import { UserIcon } from '@vega-ui/icons';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return '';
  if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toLocaleUpperCase();
  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];
  return `${first}${last}`.toLocaleUpperCase();
}

interface MyAvatarStackItemProps extends AvatarStackItemProps {
  src?: string
  name?: string
}

export function MyAvatarStackItem({ src, name, ...props }: MyAvatarStackItemProps) {
  const initials = getInitials(name ?? '');

  return (
    <AvatarStackItem role='img' aria-label={name} {...props}>
      {src && <AvatarImage src={src} alt='' />}
      {initials === '' && <AvatarIcon><UserIcon /></AvatarIcon>}
      {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
    </AvatarStackItem>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Editors</Text>
      <AvatarStack size='sm' role='group' aria-label='Document editors'>
        <MyAvatarStackItem src={portrait(210)} name='Maria Chen' />
        <MyAvatarStackItem src={portrait(28)} name='Omar Haddad' />
        <MyAvatarStackItem name='Lena Fischer' />
        <MyAvatarStackItem variant='secondary' aria-label='Anonymous viewer' />
      </AvatarStack>
    </div>
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
