# Отображение данных

Используйте эту страницу, когда интерфейс показывает структурированную информацию и первое решение — является ли содержимое статичным, навигируемым с клавиатуры, выбираемым, похожим на пикер или разбитым на страницы.

## Быстрые правила выбора

- Используйте [Table](../components/table/) для семантического табличного содержимого, которое в основном читают, а не обходят ячейка за ячейкой.
- Используйте [DataGrid](../components/data-grid/) для навигации по ячейкам с клавиатуры.
- Используйте [DataGridSelectable](../components/data-grid-selectable/), когда навигации по сетке нужен ещё и выбор.
- Используйте [DataGridPicker](../components/data-grid-picker/), когда сетка должна восприниматься как поверхность пикера, а не как универсальная матрица взаимодействия.
- Используйте [Pagination](../components/pagination/), когда содержимое разбито на отдельные страницы.
- Используйте [PageControl](../components/page-control/), когда интерфейсу нужны компактные индикаторы страниц или слайдов, а не полноценная пагинация.

## По модели взаимодействия

- Статичная таблица или таблица для чтения: [Table](../components/table/)
- Навигируемая интерактивная сетка: [DataGrid](../components/data-grid/)
- Навигируемая сетка с выбором: [DataGridSelectable](../components/data-grid-selectable/)
- Сетка в форме пикера: [DataGridPicker](../components/data-grid-picker/)
- Полноценная постраничная навигация: [Pagination](../components/pagination/)
- Компактный индикатор страниц или слайдов: [PageControl](../components/page-control/)

## Частые ошибки классификации

- Не используйте [Table](../components/table/), когда навигация по активной ячейке — часть UX.
- Не используйте [DataGrid](../components/data-grid/), когда интерфейс только отображает статичные строки и столбцы.
- Не используйте [DataGridSelectable](../components/data-grid-selectable/), когда на самом деле нужен стандартный слой пикера.
- Не используйте [DataGridPicker](../components/data-grid-picker/) для общей навигации по данным, если интерфейс не должен восприниматься как выбор.
- Не используйте [PageControl](../components/page-control/), когда пользователям нужны явные номера страниц или более широкие возможности навигации.

## С чего начать

- Таблицы и сводки только для чтения: [Table](../components/table/)
- Расписания, планировщики или матрицы с управлением с клавиатуры: [DataGrid](../components/data-grid/), [DataGridSelectable](../components/data-grid-selectable/)
- Плотные сетки выбора: [DataGridPicker](../components/data-grid-picker/)
- Списки, разбитые на страницы: [Pagination](../components/pagination/)
- Карусели, шаги онбординга или индикаторы слайдов: [PageControl](../components/page-control/)
