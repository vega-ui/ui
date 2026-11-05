# Icon

## Профиль документа

`primitive`

## Кратко

`Icon` — общая SVG-обёртка для иконок VegaUI и собственного SVG-содержимого. Она нормализует размер через токены и рендерит через `Slot`, поэтому дочерний SVG напрямую получает объединённые пропсы.

## Импорт

```tsx
import { Icon, type IconProps, type IconSize } from '@vega-ui/react';
```

## Экспортируемые типы

- `IconProps`
- `IconSize`

## Базовое использование

<!-- example: icon/basic-usage.tsx -->
```tsx
import { Icon } from '@vega-ui/react';
import { CalendarIcon, MessageSquareIcon, PaperclipIcon } from '@vega-ui/icons';

export default function BasicUsage() {
  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4) var(--spacing-10)', margin: 0, padding: 0, listStyle: 'none', color: 'var(--label-secondary)' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><CalendarIcon /></Icon>
        Due May 14
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><MessageSquareIcon /></Icon>
        12 comments
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
        <Icon size='sm'><PaperclipIcon /></Icon>
        3 files
      </li>
    </ul>
  );
}
```
<!-- /example -->

## Варианты

- Размер: `4xs`, `3xs`, `2xs`, `xs`, `sm`, `md`, `lg`, `xl`
- Способ задать размер: токен или явные `width` / `height`
- Содержимое: иконка VegaUI, собственный SVG или SVG-компонент сторонней библиотеки

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

- Явные `width` или `height` обходят data-атрибут размера из токена.
- `Icon` по умолчанию ставит `aria-hidden='true'` — это верно для декоративных иконок, но не для самостоятельной смысловой графики.
- `stroke='currentColor'` означает, что цвет иконки берётся из окружающего текста или элемента управления.

## Частые ошибки

- Передача состояния только цветом иконки.
- Размер иконки расходится с плотностью окружающего элемента управления.
- Предположение, что каждую иконку должны объявлять вспомогательные технологии.
