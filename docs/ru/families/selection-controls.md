# Элементы выбора

Используйте эту страницу, когда пользователь должен выбрать, переключить или скомбинировать значения и первое решение касается формы взаимодействия, а не деталей API.

## Быстрые правила выбора

- Используйте [Switch](../components/switch/) для одной бинарной настройки, применяемой сразу.
- Используйте [Checkbox](../components/checkbox/) для независимых или комбинируемых вариантов.
- Используйте [Radio](../components/radio/) для выбора одного варианта из небольшого видимого набора.
- Используйте [SegmentedControl](../components/segmented-control/) для короткого, всегда видимого взаимоисключающего набора.
- Используйте [Select](../components/select/) для компактного поля с одним выбором и скрытыми вариантами.
- Используйте [Listbox](../components/listbox/) для всегда видимого списка с выбором одного или нескольких вариантов.
- Используйте [CheckboxCard](../components/checkbox-card/) для насыщенных плиток вариантов с множественным выбором.

## По модели взаимодействия

- Бинарное состояние, применяемое сразу: [Switch](../components/switch/)
- Отложенный бинарный выбор в форме: [Checkbox](../components/checkbox/)
- Взаимоисключающий видимый выбор: [Radio](../components/radio/), [SegmentedControl](../components/segmented-control/)
- Компактное поле со взаимоисключающим выбором: [Select](../components/select/)
- Насыщенный описательный множественный выбор: [CheckboxCard](../components/checkbox-card/)

## Частые ошибки классификации

- Не используйте [Switch](../components/switch/) для отложенного выбора в форме, который должен восприниматься как выбор.
- Не используйте [Checkbox](../components/checkbox/) для взаимоисключающих вариантов.
- Не используйте [SegmentedControl](../components/segmented-control/), когда подписи длинные или вариантов много.
- Не используйте [Select](../components/select/), когда пользователям полезно видеть все варианты сразу.
- Не используйте [CheckboxCard](../components/checkbox-card/), когда интерфейсу нужна лишь компактная строка.

## С чего начать

- Плотные формы: [Select](../components/select/), [Radio](../components/radio/), [Checkbox](../components/checkbox/)
- Страницы настроек: [Switch](../components/switch/), [Checkbox](../components/checkbox/)
- Короткие переключатели вида или режима: [SegmentedControl](../components/segmented-control/)
- Плитки тарифов или функций: [CheckboxCard](../components/checkbox-card/)
