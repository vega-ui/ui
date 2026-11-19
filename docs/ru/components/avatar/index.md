# Avatar

## Профиль документа

`advanced interactive`

## Кратко

`Avatar` отображает пользователя или сущность и поддерживает изображение, запасной текст и иконку. Это примитив для отображения идентичности одного человека или сущности, а не просто декоративный круг.

## Импорт

```tsx
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarIcon,
  type AvatarProps,
  type AvatarSize,
  type AvatarVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `AvatarProps`
- `AvatarImageProps`
- `AvatarFallbackProps`
- `AvatarIconProps`
- `AvatarSize`
- `AvatarVariant`

## Минимальная композиция

<!-- example: avatar/minimal-composition.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(210);

export default function MinimalComposition() {
  return (
    <Avatar role='img' aria-label='Jane Doe'>
      <AvatarImage src={photo} alt='' />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении соберите их один раз в своём файле, со своим набором иконок, и импортируйте этот компонент везде. `MyAvatar` передаёт свои пропсы в `Avatar`, называет его через `name`, показывает картинку из `src`, а за ней инициалы из `name`, и иконку человека, когда имени нет. См. [Рецепты компонентов](../../recipes.md).

<!-- example: avatar/recipe.tsx -->
```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarIcon,
  AvatarImage,
  Text,
  type AvatarProps,
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

interface MyAvatarProps extends AvatarProps {
  src?: string
  name?: string
}

export function MyAvatar({ src, name, ...props }: MyAvatarProps) {
  const initials = getInitials(name ?? '');

  return (
    <Avatar role='img' aria-label={name} {...props}>
      {src && <AvatarImage src={src} alt='' />}
      {initials === '' && <AvatarIcon><UserIcon /></AvatarIcon>}
      {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
    </Avatar>
  );
}

export default function Recipe() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>Shared with</Text>
      <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
        <MyAvatar size='sm' src={portrait(210)} name='Maria Chen' />
        <MyAvatar size='sm' name='Omar Haddad' />
        <MyAvatar size='sm' variant='secondary' aria-label='Pending invite' />
      </div>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Avatar`: корневая поверхность

## Необязательные части

- `AvatarImage`: изображение
- `AvatarFallback`: текстовый запасной вариант
- `AvatarIcon`: запасная иконка

## Порядок композиции

1. `Avatar`
2. `AvatarImage`
3. `AvatarFallback` или `AvatarIcon`

## Варианты

- Размеры: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- Варианты: `primary`, `secondary`
- Варианты содержимого: изображение, инициалы, иконка

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

- Всегда задавайте осмысленный `alt` для информативных изображений аватара.
- Добавляйте запасное содержимое на случай отсутствующих или медленно загружающихся изображений.
- В очень маленьких размерах запасной текст должен быть коротким, чтобы не выходить за границы.
- В каждом месте использования явно решайте, передаёт ли аватар информацию об идентичности или служит лишь декоративным контекстом.

## Типичные ошибки

- Изображение аватара без запасного варианта.
- Декоративные аватары, для которых не решено, нужно ли их озвучивать.
- Инициалы, выходящие за границы в маленьких размерах.
