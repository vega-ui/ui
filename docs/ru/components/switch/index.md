# Switch

## Профиль документа

`advanced interactive`

## Кратко

`Switch` — [составной компонент](../../glossary.md#составной-компонент-compound-component) для бинарных настроек, применяемых сразу: нативный input отвечает за семантику и состояние, а индикатор — за видимую дорожку и бегунок. Это слой бинарного переключателя, когда интерфейс должен читаться как «включено» или «выключено» прямо сейчас, а не как один из отложенных выборов в форме.

## Импорт

```tsx
import {
  Switch,
  SwitchIndicator,
  SwitchInput,
  type SwitchProps,
  type SwitchSize,
  type SwitchVariant,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `SwitchProps`
- `SwitchInputProps`
- `SwitchIndicatorProps`
- `SwitchSize`
- `SwitchVariant`

## Минимальная композиция

<!-- example: switch/minimal-composition.tsx -->
```tsx
import { Label, Switch, SwitchIndicator, SwitchInput } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      <Switch>
        <SwitchInput id='wifi' name='wifi' defaultChecked />
        <SwitchIndicator />
      </Switch>
      <Label htmlFor='wifi'>Wi-Fi</Label>
    </div>
  );
}
```
<!-- /example -->

## Обязательные части

- `Switch`: корневая дорожка и поверхность контекста
- `SwitchInput`: нативный чекбокс с `role='switch'` — фокус, клавиатура, состояние и значение в форме
- `SwitchIndicator`: видимый бегунок и состояние дорожки

## Необязательные части

- Нет. Видимый текст размещается вне корня `Switch`.

## Порядок композиции

1. `Switch`
2. `SwitchInput`
3. `SwitchIndicator`
4. отдельный `Label` с `htmlFor`, указывающим на `id` у `SwitchInput`, или `aria-label` на `SwitchInput`

## Варианты

- Размеры: `sm`, `md`, `lg`
- Варианты: `primary`, `secondary`
- Состояния: выключен, включён, отключён

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

- Переключатель подразумевает бинарное состояние, применяемое сразу, а не отложенный взаимоисключающий выбор.
- Задайте `SwitchInput` атрибут `name`, когда контрол принадлежит нативной форме.
- Метки должны описывать управляемую функцию, а не само действие переключения.
- Если бинарный выбор — лишь одна строка в большом чек-листе или сценарии отправки формы, `Checkbox` может лучше передать намерение.

## Частые ошибки

- Переключатель для отложенных выборов в форме.
- Метки вроде «Включить» вместо названия настройки.
- Отсутствие `SwitchInput`, который и является настоящим контролом.
