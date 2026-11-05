# Avatar: анатомия

## Обзор

`Avatar` — [составной компонент](../../glossary.md#составной-компонент-compound-component): корень, изображение, запасной текст и иконка вместе представляют одну сущность по модели содержимого с приоритетами.

## Обязательные части

### `Avatar`

Обязательная. Отвечает за стили размера и варианта.

## Необязательные части

### `AvatarImage`

Необязательное основное содержимое — изображение.

### `AvatarFallback`

Необязательный текстовый запасной вариант, обычно инициалы.

### `AvatarIcon`

Необязательная запасная иконка для обобщённого представления сущности.

## Порядок композиции

1. `Avatar`
2. `AvatarImage`
3. `AvatarFallback` или `AvatarIcon`

## Корректные паттерны композиции

<!-- example: avatar/member-list.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const members = [
  { name: 'Maria Chen', email: 'maria@northwind.io', initials: 'MC', photo: portrait(210), active: true },
  { name: 'Omar Haddad', email: 'omar@northwind.io', initials: 'OH', photo: portrait(28), active: true },
  { name: 'Lena Fischer', email: 'lena@northwind.io', initials: 'LF', photo: '', active: true },
  { name: 'Tom Becker', email: 'tom@northwind.io', initials: 'TB', photo: '', active: false },
];

export default function MemberList() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      {members.map((member) => (
        <li key={member.email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Avatar size='sm' variant={member.active ? 'primary' : 'secondary'} aria-hidden='true'>
            {member.photo && <AvatarImage src={member.photo} alt='' />}
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={2} fontWeight={500}>{member.name}</Text>
            <Text size={1} style={{ color: 'var(--label-secondary)' }}>
              {member.active ? member.email : 'Deactivated'}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

## Некорректные паттерны композиции

### Изображение без запасного варианта

Битые или медленно загружающиеся изображения оставляют сущность без стабильного представления.

### Длинный запасной текст в маленьких размерах

Аватар становится визуально нестабильным, и его труднее быстро просматривать.
