# Progress: стилизация

## Обзор

Стили `Progress` разделены между корневой поверхностью полосы и видимым заполнением, а анимация неопределённого состояния задаётся на уровне корня.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--progress-height` | `Progress`, `ProgressTrack` | Толщина полосы. |
| `--progress-value` | `ProgressTrack` | Текущее значение. |
| `--progress-max` | `ProgressTrack` | Максимум диапазона. |
| `--progress-track-color` | `ProgressTrack` | Цвет заполнения. |
| `--progress-br-ratio` | `Progress` | Коэффициент радиуса полосы. |
| `--progress-track-height` | `ProgressTrack` | Толщина заполнения, по умолчанию равна высоте полосы. |
| `--progress-track-br-ratio` | `ProgressTrack` | Коэффициент радиуса заполнения. |
| `--progress-track-width` | `ProgressTrack` | Ширина заполнения у неопределённой полосы. |

## Переменные частей

- `Progress`: размер корня, фоновая поверхность и неопределённый режим.
- `ProgressTrack`: ширина заполнения, цвет и анимация.

## Взаимодействие состояний и вариантов

- `size` меняет высоту полосы.
- `variant` меняет цвет заполнения.
- `indeterminate` переключает поведение ширины и анимации.

## Примеры

<!-- example: progress/examples.css -->
```css
.compactProgress {
  --progress-height: 4px;
}
```
<!-- /example -->

<!-- example: progress/styling-examples.css -->
```css
.brandProgress {
  --progress-track-color: var(--color-primary-500);
}
```
<!-- /example -->

## Не переопределяйте

- Не используйте выдуманные определённые значения, когда задача на самом деле неопределённая.
- Не снижайте контраст настолько, что полосу становится трудно читать.
- Не путайте стили прогресса с семантикой meter.
