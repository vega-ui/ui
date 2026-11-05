# Темы

VegaUI поставляет отдельный слой темы в `@vega-ui/theme-core`. Точка входа пакета — [packages/theme/src/index.css](../../../packages/theme/src/index.css), она импортирует и [light.css](../../../packages/theme/src/light.css), и [dark.css](../../../packages/theme/src/dark.css).

## Модель темы

Темы основаны на классах:

- `.light`: семантические значения светлой темы
- `.dark`: семантические значения тёмной темы

Каждая тема сначала импортирует `@vega-ui/tokens-core`, а затем сопоставляет исходные шкалы токенов с семантическими переменными приложения, например:

- `--background-color`
- `--text-color`
- `--focus-color`
- `--surface-primary`
- `--surface-secondary`
- `--border-color`
- `--fills-primary`
- `--label-primary`

## Ключевые семантические переменные

Это основные переменные, на которые в первую очередь должны опираться код приложения и стили компонентов.

| Переменная | Роль | Типичные потребители |
| --- | --- | --- |
| `--background-color` | базовый цвет холста приложения | фон оболочки приложения, контраст бегунка на дорожке, собственная раскладка страниц |
| `--text-color` | цвет содержимого по умолчанию | `Text`, `Heading`, значения полей, иконки-триггеры, строки опций |
| `--focus-color` | цвет обводки фокуса | кнопки, ссылки, слайдеры, радиокнопки, чекбоксы, сегментированный контрол |
| `--surface-primary` | основная поверхность контейнера | `DialogContent`, `DrawerContent`, `SheetContent`, `PopoverContent` |
| `--surface-secondary` | плавающая или временная поверхность | `SelectListbox`, `TooltipContent`, `TooltipArrow` |
| `--border-color` | структурная рамка по умолчанию | `Card`, `Fieldset`, `TableRow`, `CheckboxCard` |
| `--border-color-hover` | акцент рамки при взаимодействии | изменение рамки при наведении у поверхностей, оформленных рамкой |
| `--color-error` | обратная связь о валидации и ошибках | `TextField`, `TextArea`, `PinField`, `HelperText` |
| `--fills-primary` | акцентная заливка выбранного | отмеченный `Checkbox`, отмеченный `Radio`, прогресс в page control |
| `--fills-secondary` | нейтральная дорожка или приглушённая заливка | `Progress`, `Meter`, `MeterStack`, `Slider`, `Code`, выключенный `Switch` |
| `--label-primary` | выразительная подпись индикатора | активные индикаторы page control и производные акцентные заливки |
| `--label-secondary` | приглушённый второстепенный текст | текст legend в `Fieldset`, цвет текста `Code`, второстепенные метаданные |
| `--disable-text-color` | основное содержимое в отключённом состоянии | текст отключённых кнопок, значения отключённых полей, отключённые сегменты |
| `--disable-background-color` | поверхность отключённого элемента управления | отключённые `TextField`, `TextArea`, `Select`, `Checkbox`, `Switch`, `ButtonBase` |
| `--surface-shadow` | тень приподнятой поверхности | `Dialog`, `Drawer`, `Sheet`, `Popover`, `Tooltip`, `SelectListbox` |

## Типы семантических токенов

«Ключевые семантические переменные» — это слой быстрой справки. Этот раздел — слой классификации: он группирует переменные темы по семантическим семействам, чтобы систему было проще расширять и понимать.

| Токен | Семантический тип | Значение в интерфейсе |
| --- | --- | --- |
| `--fills-primary` | `accent-soft-fill` | основная акцентная заливка для выбранного или активного интерфейса |
| `--fills-primary-hover` | `accent-soft-fill-hover` | состояние наведения основной акцентной заливки |
| `--fills-primary-active` | `accent-soft-fill-active` | активное состояние основной акцентной заливки |
| `--fills-secondary` | `neutral-track-fill` | нейтральная заливка для дорожек, направляющих и приглушённых контейнеров |
| `--fills-secondary-hover` | `neutral-track-fill-hover` | состояние наведения нейтральных поверхностей-дорожек |
| `--fills-secondary-active` | `neutral-track-fill-active` | активное состояние нейтральных поверхностей-дорожек |
| `--fills-tertiary` | `field-surface` | фон по умолчанию для полей ввода и похожих на поля элементов управления |
| `--fills-tertiary-hover` | `field-surface-hover` | состояние наведения поверхностей полей |
| `--fills-tertiary-active` | `field-surface-active` | активное состояние поверхностей полей |
| `--fills-quaternary-hover` | `micro-surface-hover` | лёгкая заливка при наведении для действий-иконок и микровзаимодействий |
| `--fills-quaternary-active` | `micro-surface-active` | активное состояние микровзаимодействий |
| `--surface-primary` | `container-surface` | основная приподнятая поверхность для контейнеров, таких как диалоги или шторки |
| `--surface-secondary` | `floating-surface` | плавающая поверхность для списков, поповеров и тултипов |
| `--surface-shadow` | `elevation-shadow` | тень для приподнятых поверхностей |
| `--text-color` | `content-primary` | читаемый цвет содержимого по умолчанию |
| `--text-color-inverse` | `content-on-accent` | читаемый цвет содержимого на акцентном фоне |
| `--label-primary` | `label-strong` | цвет выразительной подписи или индикатора |
| `--label-secondary` | `label-muted` | цвет второстепенной подписи или метаданных |
| `--label-tertiary` | `label-subtle` | цвет placeholder, подсказок и приглушённых подписей |
| `--border-color` | `border-default` | цвет структурной рамки по умолчанию |
| `--border-color-hover` | `border-hover` | состояние наведения структурных рамок |
| `--border-color-active` | `border-active` | активное состояние структурных рамок |
| `--disable-background-color` | `disabled-surface` | фон и заливка поверхности в отключённом состоянии |
| `--disable-text-color` | `disabled-content` | цвет основного текста или значения в отключённом состоянии |
| `--disable-label-text-color` | `disabled-subtle-content` | цвет второстепенного текста, подсказки или placeholder в отключённом состоянии |
| `--disable-border-color` | `disabled-border` | цвет рамки или индикатора в отключённом состоянии |
| `--focus-color` | `focus-ring` | цвет кольца фокуса и обводки |
| `--color-error` | `feedback-error` | цвет обратной связи об ошибках и валидации |
| `--overlay` | `backdrop-overlay` | затемнение фона для модальных слоёв и оверлеев |
| `--separator-opaque` | `separator-strong` | видимые разделители, ручки и делители |

## Семантические семейства

В первую очередь думайте о переменных темы через эти семейства:

- `fills-*`: семантика интерактивных заливок для выбранных, наведённых, нажатых или похожих на поля поверхностей
- `surface-*`: семантика контейнеров и плавающих поверхностей для оверлеев и приподнятого интерфейса
- `text-*` и `label-*`: семантика читаемого содержимого и подписей интерфейса
- `border-*`: семантика структурных границ и акцентов рамки
- `disable-*`: семантика поверхности, содержимого и рамки в отключённом состоянии
- `focus-color`, `color-error`, `overlay`, `separator-*`: системная семантика и обратная связь о состоянии

## Семантические типы на практике

Эти семантические типы выведены из того, как переменные на самом деле используются в UI-пакете:

- `accent-soft-fill`: выбранные или отмеченные состояния, например `Checkbox`, `Radio` и прогресс в page control
- `neutral-track-fill`: дорожки и нейтральные полосы, например `Progress`, `Meter`, `MeterStack` и `Slider`
- `field-surface`: элементы управления, похожие на поля ввода, например `TextField`, `TextArea`, `PinField` и `SelectCombobox`
- `micro-surface-*`: малозаметные поверхности наведения и активного состояния для иконок-кнопок, кнопок-триггеров и элементов пикеров
- `container-surface`: основные поверхности оверлеев или панелей, например `DialogContent`, `DrawerContent` и `SheetContent`
- `floating-surface`: плавающие поверхности содержимого, например `SelectListbox`, `TooltipContent` и `PopoverContent`
- `content-*`, `label-*`, `border-*` и `disable-*`: семантика текста, подписей, рамок и отключённого состояния, общая для всего набора

Используйте этот раздел, чтобы ответить на вопрос «какой класс семантического токена мне здесь нужен?», а затем выберите конкретное имя переменной в разделе «Ключевые семантические переменные».

## Как применить тему

Поставьте класс темы на `<html>`:

```html
<html class="light">
```

`Dialog`, `Drawer` и `Sheet` рендерятся в `document.body`, поэтому класс на внутренней обёртке до них не доходит.

## Оболочка приложения с переключателем темы

```tsx
import { useEffect, useState } from 'react';
import { Button } from '@vega-ui/react';

type ThemeName = 'light' | 'dark';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>('light');

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <Button variant='secondary' appearance='ghost' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'}
    </Button>
  );
}
```

Задайте странице фон и цвет текста темы:

```css
body {
  background: var(--background-color);
  color: var(--text-color);
}
```

Обёртка с другим классом темы оформляет своё поддерево, но `Dialog`, `Drawer` и `Sheet`, открытые из неё, всё равно берут тему `<html>`.

## Настройка темы

Самый безопасный путь настройки — определить собственный класс темы и переопределить в нём семантические переменные.

```css
@import '@vega-ui/theme-core';

.brand-sunrise {
  --background-color: #fffaf3;
  --text-color: #251b10;
  --surface-primary: #fffdf9;
  --surface-secondary: #fff7ec;
  --border-color: #e7d7c2;
  --focus-color: var(--color-orange-accent-400);
  --fills-primary: color-mix(in oklab, var(--color-orange-accent-500) 16%, transparent);
  --fills-primary-hover: color-mix(in oklab, var(--color-orange-accent-500) 22%, transparent);
  --label-secondary: #7a6653;
}
```

Затем поставьте этот класс на `<html>` так же, как `.light` или `.dark`.

Сначала настраивайте семантические переменные. Обращайтесь к локальным переменным компонентов, только когда изменение должно затронуть одно семейство компонентов, а не всё приложение.

## Поведение светлой и тёмной темы

Светлая и тёмная темы используют одни и те же имена семантических переменных. Основное различие — в том, как эта семантика сопоставляется с исходной шкалой токенов.

В частности, акцентные цвета в тёмном режиме инвертированы. Например, `--color-blue-accent-100` указывает на более светлый исходный синий в светлом режиме и на более тёмный — в тёмном. Поэтому в стилях компонентов следует предпочитать семантические акцентные переменные шагам исходной палитры.

## Рекомендации

- ставьте класс темы на `<html>`, а не на обёртку или отдельные компоненты
- по возможности используйте семантические переменные в CSS компонентов
- не пишите светлые/тёмные переопределения для конкретного компонента, если подходящая семантическая переменная темы уже есть
- настраивайте семантические переменные, прежде чем трогать локальные переменные компонентов `--component-*`
