# Menu: стилизация

## Обзор

`MenuContent` — поповер на вторичной поверхности с тенью поверхности, в котором пункты выстроены колонкой. Он привязан к триггеру через CSS anchor positioning и `position-area`, переходит на другую сторону, когда не хватает места, и держит небольшой отступ от триггера. При открытии меню увеличивается со стороны триггера, а при закрытии исчезает; при `prefers-reduced-motion: reduce` остаётся только появление и исчезновение. Пункт в фокусе подсвечен: указатель переносит фокус, поэтому при наведении и с клавиатуры подсветка одна и та же.

## Публичные CSS-переменные

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--menu-item-height` | `MenuContent`, пункты | Минимальная высота пункта; её задаёт `size` на содержимом. От неё же зависит скругление пунктов и самого меню. |
| `--menu-max-height` | `MenuContent` | Максимальная высота меню, после которой пункты прокручиваются; если не задана — 320px. |
| `--menu-item-background-color` | пункты | Фон пункта в покое; по умолчанию прозрачный. |
| `--menu-item-background-color-focus` | пункты | Фон пункта в фокусе. |
| `--menu-item-background-color-active` | пункты | Фон пункта, пока его нажимают. |
| `--duration-spring` | `MenuContent` | Длительность увеличения при открытии меню, с `--ease-spring`. |
| `--duration-exit` | `MenuContent` | Длительность исчезновения и уменьшения при закрытии меню. |
| `--transition-state-delay` | пункты | Длительность смены фона и цвета пункта. |

## Переменные на уровне частей

- `MenuContent`: flex-колонка с небольшим промежутком и внутренними отступами, `width: max-content` с минимальной шириной, вторичная поверхность, тень поверхности, прокрутка, если меню выше `--menu-max-height`, и отступы вокруг `Separator` внутри.
- `MenuItem`, `MenuCheckboxItem`, `MenuRadioItem`: flex-строка с промежутком между индикатором, подписью и тем, что идёт после, высота из `--menu-item-height`, внутренние отступы по строке, размер шрифта по `data-size`, без переносов, текст выровнен по началу и без подчёркивания, поэтому пункт-ссылка выглядит как остальные.
- `MenuGroup`, `MenuRadioGroup`: колонка с тем же промежутком, что и у меню.
- `MenuItemIndicator`: не сжимается, берёт основной цвет подписи и остаётся `visibility: hidden`, пока пункт не отмечен, поэтому сохраняет своё место.

## Взаимодействие состояний и вариантов

- `:focus` у пункта даёт фон `--menu-item-background-color-focus`. При `forced-colors: active` пункт в фокусе вместо этого получает обводку цвета `Highlight`.
- `:active` даёт фон `--menu-item-background-color-active`, кроме отключённого пункта.
- `[aria-disabled="true"]` даёт цвет отключённой подписи, курсор `not-allowed` и нейтральный фон в фокусе.
- `[aria-checked="true"]` или `[data-checked="true"]` отмечает отмеченный пункт-флажок или радиопункт и показывает его `MenuItemIndicator`.
- `size` задаёт `data-size` содержимому и пунктам: `xs`, `sm`, `md`, `lg` или `xl` — с меньшей или большей высотой пункта и размером шрифта.
- `placement` задаёт содержимому `data-side` (`top`, `right`, `bottom` или `left`) и `data-align` (`start`, `center` или `end`); по ним выбираются `position-area` и сторона, с которой меню увеличивается.
- `aria-expanded="true"` и `data-open="true"` отмечают триггер, пока меню показано; стилизуйте по ним открытый триггер.
- `:popover-open` у содержимого срабатывает, пока меню показано.

## Примеры

Передайте `className='denseMenu'` в `MenuContent`, чтобы пункты стали ниже, а меню — короче, и `className='dangerItem'` разрушительному `MenuItem`:

<!-- example: menu/styling-examples.css -->
```css
.denseMenu[role='menu'] {
  --menu-item-height: 28px;
  --menu-max-height: 240px;
}

.dangerItem[role='menuitem'] {
  --menu-item-background-color-focus: color-mix(in oklch, var(--color-error) 12%, transparent);
  --menu-item-background-color-active: color-mix(in oklch, var(--color-error) 20%, transparent);

  color: var(--color-error);
}
```
<!-- /example -->

## Что не переопределять

- Не задавайте `display` у `MenuContent`: закрытое меню скрыто через `display: none`, и ваш `display` оставит его на экране после закрытия.
- Не сдвигайте `MenuContent` через `inset`, `margin` или `position-area`; для этого есть `placement` у `Menu`.
- Не убирайте фон фокуса у пунктов: пока по меню ходят с клавиатуры, только он показывает текущий пункт.
- Не стилизуйте отключённые пункты через `:disabled`: у них `aria-disabled`, и `:disabled` к ним никогда не применяется.
