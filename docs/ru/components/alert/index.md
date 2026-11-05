# Alert

## Профиль документа

`advanced interactive`

## Кратко

`Alert` показывает короткие сообщения обратной связи или статуса с необязательными иконкой, заголовком и текстом. Это поверхность обратной связи уровня сообщения: когда `Badge` слишком мал, а `Card` слишком нейтральна.

## Импорт

```tsx
import {
  Alert,
  AlertIcon,
  AlertMain,
  AlertTitle,
  AlertContent,
  type AlertProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `AlertProps`
- `AlertIconProps`
- `AlertMainProps`
- `AlertTitleProps`
- `AlertContentProps`

## Минимальная композиция

<!-- example: alert/minimal-composition.tsx -->
```tsx
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Alert variant='success' style={{ width: '100%' }}>
      <AlertIcon />
      <AlertMain>
        <AlertTitle>Saved</AlertTitle>
        <AlertContent>Profile updated successfully.</AlertContent>
      </AlertMain>
    </Alert>
  );
}
```
<!-- /example -->

## Обязательные части

- `Alert`: корневая поверхность обратной связи
- `AlertMain`: обёртка основного текста

## Необязательные части

- `AlertIcon`: поверхность семантической иконки
- `AlertTitle`: более выраженная визуальная иерархия
- `AlertContent`: поясняющий текст сообщения

## Порядок композиции

1. `Alert`
2. `AlertIcon`
3. `AlertMain`
4. `AlertTitle`
5. `AlertContent`

## Варианты

- Семантические варианты: `success`, `error`, `warning`, `info`
- Внешний вид: `fill`, `surface`
- Композиционные варианты: с иконкой или без, с заголовком или без

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

- Используйте заголовок, только когда алерту нужна более сильная иерархия.
- Держите текст коротким; длинному содержимому место в другом компоненте.
- Подбирайте вариант алерта по смыслу, а не только по цвету.
- Если содержимое становится пошаговой инструкцией, многоэтапным или сильно интерактивным, алерт обычно уже не подходит.

## Частые ошибки

- Использование алертов как постоянного макета страницы вместо обратной связи.
- Передача серьёзности только цветом или иконкой.
- Размещение сложных сценариев в теле алерта.
