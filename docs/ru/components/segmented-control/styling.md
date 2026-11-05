# SegmentedControl: стилизация

## Обзор

Стили `SegmentedControl` разделены между дорожкой корня, содержимым элементов и анимированным индикатором. Индикатор следует за отмеченным сегментом через CSS anchor positioning — без измерений в JS.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--segmented-control-height` | `SegmentedControl` | Общая высота контрола. |
| `--segmented-control-background-color` | `SegmentedControl` | Фон дорожки. |
| `--segmented-control-br-ratio` | `SegmentedControl` | Коэффициент радиуса контрола. |
| `--segmented-control-background-color-hover` | `SegmentedControl` | Фон элемента по умолчанию при наведении. |
| `--segmented-control-background-color-active` | `SegmentedControl` | Фон элемента по умолчанию при нажатии. |
| `--item-color` | `SegmentedControlItem` | Цвет текста элемента. |
| `--item-background-color` | `SegmentedControlItem` | Фон элемента. |
| `--item-background-color-hover` | `SegmentedControlItem` | Фон элемента при наведении. |
| `--item-background-color-active` | `SegmentedControlItem` | Фон элемента при нажатии. |
| `--item-indicator-color` | `SegmentedControlItem` | Фон выбранного элемента. |

## Переменные частей

- `SegmentedControl`: дорожка корня, модель размеров и контур фокуса.
- `SegmentedControlItem`: размеры подписи, внутренние отступы и оформление текста в активном или отключённом состоянии. Активный сегмент — тот, чья радиокнопка отмечена; выбирайте его через `:has(input:checked)`.
- `SegmentedControlIndicator`: анимированная поверхность выбранного состояния.
- `SegmentedControlItemInput`: семантический носитель нативного поведения группы радиокнопок.

## Взаимодействие состояний и вариантов

- `size` меняет высоту, размер шрифта и модель внутренних отступов.
- `variant` меняет цветовое семейство индикатора.
- Отключённое состояние влияет и на стили элементов, и на вид индикатора.

## Примеры

<!-- example: segmented-control/examples.css -->
```css
.compactSegments {
  --segmented-control-height: 32px;
}
```
<!-- /example -->

<!-- example: segmented-control/styling-examples.css -->
```css
.brandSegments {
  --segmented-control-background-color: var(--fills-secondary);
}
```
<!-- /example -->

## Не переопределяйте

- Не задавайте геометрию индикатора жёстко: `left` и `width` берутся из якоря отмеченного сегмента.
- Браузеры без поддержки CSS anchor positioning скрывают индикатор и вместо этого закрашивают фон самого отмеченного сегмента.
- Не ослабляйте видимость фокуса корня.
- Не навязывайте сильно неравные внутренние отступы элементов, если подписи и так различаются по длине.
