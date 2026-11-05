# Структура документации компонентов

Этот файл описывает ожидаемую структуру документации компонентов в `docs/components/<component>/`.

## Базовое правило

У каждого компонента своя директория:

```text
docs/components/<component>/
```

Минимально обязательный файл:

- `index.md`: основная страница с кратким описанием, импортами, одним конкретным примером, вариантами, пограничными случаями и частыми ошибками

Каждый `index.md` также должен явно объявлять профиль документации компонента:

```md
## Doc Profile

`primitive`
```

## Роли файлов

- `anatomy.md`: контракт композиции для [составных компонентов](../glossary.md#составной-компонент-compound-component), обязательные и необязательные части, допустимый порядок и недопустимые композиции
- `examples.md`: углублённое покрытие сценариев помимо основного примера
- `api.md`: пропсы, экспортируемые части, типы и модель состояния
- `styling.md`: публичные CSS-переменные, точки настройки темы и рекомендации по безопасному переопределению
- `accessibility.md`: подписи, поведение клавиатуры, порядок фокуса и семантика для скринридеров
- `comparison.md`: когда выбирать компонент вместо похожих элементов
- `patterns.md`: переиспользуемые паттерны интеграции и рабочие сценарии
- `troubleshooting.md`: типичные сбои, диагностика и исправления

Шаблоны этих файлов лежат в `docs/components/_templates/`.

## Редакционный контракт

Используйте стабильный порядок разделов, чтобы документация компонентов оставалась предсказуемой во всей библиотеке.

### `index.md`

Рекомендуемый порядок:

1. `# ComponentName`
2. `## Doc Profile`
3. `## Summary`
4. `## Imports`
5. `## Exported Types`
6. `## Minimal Composition` или `## Basic Usage`
7. `## Required Parts` и `## Optional Parts` для составных компонентов
8. `## Composition Order` для составных компонентов
9. `## Variants`
10. `## Related Docs`
11. `## Edge Cases`
12. `## Common Mistakes`

### `examples.md`

Рекомендуемый порядок:

1. `# ComponentName Examples`
2. `## Basic`
3. `## Controlled/Stateful`
4. `## Form/Integration`
5. `## Layout/Overlay`
6. `## Error`
7. `## Disabled`
8. `## Edge`

Каждый блок сценария должен использовать заголовок `###` с одним из общих префиксов таксономии.

### `api.md`

Рекомендуемый порядок:

1. `# ComponentName API`
2. `## Root API`
3. `## Child Parts API`, если применимо
4. `## Hooks`, если есть публичные хуки
5. `## Types`
6. `## State Model`
7. `## Integration Notes`

### `anatomy.md`

Рекомендуемый порядок:

1. `# ComponentName Anatomy`
2. `## Overview`
3. `## Required Parts`
4. `## Optional Parts`
5. `## Composition Order`
6. `## Valid Composition Patterns`
7. `## Invalid Composition Patterns`

### `styling.md`

Рекомендуемый порядок:

1. `# ComponentName Styling`
2. `## Overview`
3. `## Public CSS Variables`
4. `## Part-Level Variables`
5. `## State And Variant Interaction`
6. `## Examples`
7. `## Do Not Override`

### `accessibility.md`

Рекомендуемый порядок:

1. `# ComponentName Accessibility`
2. `## Labeling`
3. `## Keyboard Behavior`
4. `## Focus Behavior`
5. `## Screen Reader Semantics`
6. `## Form Semantics`, если уместно
7. `## Accessibility Risks`

### `comparison.md`

Рекомендуемый порядок:

1. `# ComponentName Comparison`
2. `## Quick Decision Rule`
3. Разделы `## Component vs Component`
4. `## Choose This Component When`
5. `## Do Not Choose This Component When`

### `patterns.md`

Рекомендуемый порядок:

1. `# ComponentName Patterns`
2. Разделы паттернов, сгруппированные по продуктовым сценариям

Каждый паттерн должен описывать:

- когда его использовать
- заметки о композиции
- компромиссы
- пример кода

### `troubleshooting.md`

Рекомендуемый порядок:

1. `# ComponentName Troubleshooting`
2. разделы, построенные вокруг проблем

Каждый пункт решения проблем должен включать:

- симптом
- вероятную причину
- как проверить
- исправление

## Профили документации

Каждому публичному компоненту назначается один из этих профилей. Профиль определяет минимально необходимый набор файлов для компонента.

### `primitive`

Используйте для простых строительных блоков с небольшим API и без значимого [контракта композиции](../glossary.md#контракт-композиции-composition-contract).

Обязательные файлы:

- `index.md`

Типичные кандидаты:

- `Text`
- `Heading`
- `Separator`
- `VisuallyHidden`

### `form-control`

Используйте для самостоятельных элементов-полей, где потребителям нужны примеры, публичные пропсы и рекомендации по доступности, но не нужен файл анатомии [составного компонента](../glossary.md#составной-компонент-compound-component).

Обязательные файлы:

- `index.md`
- `examples.md`
- `api.md`
- `accessibility.md`

Типичные кандидаты:

- `TextField`
- `TextArea`
- `NumberField`
- `PasswordField`
- `Checkbox`
- `Radio`
- `Switch`

### `compound`

Используйте для компонентов, построенных из корня и экспортируемых дочерних частей с реальным [контрактом композиции](../glossary.md#контракт-композиции-composition-contract).

Обязательные файлы:

- `index.md`
- `anatomy.md`
- `examples.md`
- `api.md`

Типичные кандидаты:

- `Select`
- `Dialog`
- `Drawer`
- `Sheet`
- `Popover`
- `Calendar`

### `advanced interactive`

Используйте для сложных интерактивных систем, где композиция, доступность, стилизация, решение проблем и рекомендации по выбору компонента существенно влияют на успех интеграции.

Обязательные файлы:

- `index.md`
- `anatomy.md`
- `examples.md`
- `api.md`
- `styling.md`
- `accessibility.md`
- `comparison.md`
- `patterns.md`
- `troubleshooting.md`

Типичные кандидаты:

- `Select`
- `Dialog`
- `Calendar`
- `PhoneField`
- `DataGrid`

Профиль объявляется в `index.md`, а валидация должна проверять, что в директории компонента есть обязательный для этого профиля набор файлов.

## Таксономия примеров

Используйте эти префиксы сценариев внутри `More Examples`, где это применимо:

- `Basic`
- `Controlled/Stateful`
- `Form/Integration`
- `Layout/Overlay`
- `Error`
- `Disabled`
- `Edge`

## Текущий эталон

`Select` — текущая эталонная реализация полной структуры составного компонента.
