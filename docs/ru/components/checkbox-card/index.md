# CheckboxCard

## Профиль документа

`advanced interactive`

## Кратко

`CheckboxCard` сочетает поведение чекбокса с более богатой поверхностью карточки для тарифов, шаблонов и выбираемых плиток настроек. Он оборачивает `Card`, предоставляет части содержимого, специфичные для карточки, и синхронизирует состояние контрола через контекст карточки-чекбокса. Это слой вариантов множественного выбора с богатым содержимым — для случаев, когда компактных строк с чекбоксами уже недостаточно.

## Импорты

```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlInput,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardDescription,
  CheckboxCardTitle,
  type CheckboxCardContentProps,
  type CheckboxCardControlCheckedIconProps,
  type CheckboxCardControlInputProps,
  type CheckboxCardControlIndeterminateIconProps,
  type CheckboxCardControlProps,
  type CheckboxCardDescriptionProps,
  type CheckboxCardProps,
  type CheckboxCardTitleProps,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `CheckboxCardProps`
- `CheckboxCardContentProps`
- `CheckboxCardTitleProps`
- `CheckboxCardDescriptionProps`
- `CheckboxCardControlProps`
- `CheckboxCardControlInputProps`
- `CheckboxCardControlCheckedIconProps`
- `CheckboxCardControlIndeterminateIconProps`

## Минимальная композиция

<!-- example: checkbox-card/minimal-composition.tsx -->
```tsx
import {
  CheckboxCard,
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardControlInput,
  CheckboxCardDescription,
  CheckboxCardTitle,
  CheckboxIndicator,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <CheckboxCard>
      <CheckboxCardContent>
        <CheckboxCardTitle>Daily backups</CheckboxCardTitle>
        <CheckboxCardDescription>Snapshots are kept for 30 days.</CheckboxCardDescription>
      </CheckboxCardContent>
      <CheckboxCardControl>
        <CheckboxCardControlInput name='backups' />
        <CheckboxIndicator>
          <CheckboxCardControlCheckedIcon />
          <CheckboxCardControlIndeterminateIcon />
        </CheckboxIndicator>
      </CheckboxCardControl>
    </CheckboxCard>
  );
}
```
<!-- /example -->

## Обязательные части

- `CheckboxCard`: корневая поверхность карточки и контекст карточки-чекбокса
- `CheckboxCardContent`: область текстового содержимого
- `CheckboxCardControl`: область контрола для input и индикатора
- `CheckboxCardControlInput`: нативный чекбокс внутри контрола
- `CheckboxIndicator` (из `Checkbox`): видимый квадрат внутри контрола

## Необязательные части

- `CheckboxCardTitle`
- `CheckboxCardDescription`
- `CheckboxCardControlCheckedIcon`
- `CheckboxCardControlIndeterminateIcon`

## Порядок композиции

1. `CheckboxCard`
2. `CheckboxCardContent`
3. `CheckboxCardTitle` и `CheckboxCardDescription`
4. `CheckboxCardControl`
5. `CheckboxCardControlInput` и `CheckboxIndicator` с иконками состояний внутри контрола

## Варианты

- Вариант: `primary`, `secondary`
- Ориентация: `vertical`, `horizontal`
- Состояние: отмечено, не отмечено, неопределённое, отключено

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

- Убедитесь, что карточка ясно передаёт отмеченное и отключённое состояния по всей поверхности.
- Задайте `CheckboxCardControlInput` атрибут `name`, если карточка входит в форму.
- Длинные описания не должны заслонять основной элемент выбора.
- Если варианты группы на самом деле взаимоисключающие, радиокнопки или сегментированный контрол обычно передают намерение лучше карточек-чекбоксов.

## Частые ошибки

- Кликабелен только крошечный контрол, а не вся карточка.
- Карточки-чекбоксы используются для групп с выбором одного варианта, где нужны радиокнопки или сегментированный контрол.
- Описания доминируют над элементом выбора.
