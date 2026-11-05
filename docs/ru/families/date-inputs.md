# Ввод дат

Используйте эту страницу, когда продукт хранит даты, диапазоны или временные метки и главный выбор — между вводом в поле и выбором в календаре.

## Быстрые правила выбора

- Используйте [DateField](../components/date-field/) для одной даты в поле формы.
- Используйте [DateRangeField](../components/date-range-field/), когда один элемент управления отвечает за начальную и конечную даты.
- Используйте [DateTimeField](../components/date-time-field/), когда хранимое значение — одна временная метка.
- Используйте [TimeField](../components/time-field/) для значений только со временем.
- Используйте [Calendar](../components/calendar/), когда интерфейс должен быть явно построен вокруг календаря.

## По форме данных

- Одна дата: [DateField](../components/date-field/)
- Пара из начальной и конечной даты: [DateRangeField](../components/date-range-field/)
- Одна временная метка: [DateTimeField](../components/date-time-field/)
- Только время: [TimeField](../components/time-field/)
- Визуальный просмотр и выбор дат: [Calendar](../components/calendar/)

## Частые ошибки классификации

- Не разделяйте одну временную метку на отдельные поля даты и времени, если сценарий действительно не работает с ними независимо.
- Не используйте [Calendar](../components/calendar/), когда интерфейсу на самом деле нужно компактное поле в строке формы.
- Не используйте [DateField](../components/date-field/) для связанного понятия диапазона.
- Не используйте [TimeField](../components/time-field/), когда хранимое значение на самом деле — дата и время.

## С чего начать

- Фильтры и формы настроек: [DateField](../components/date-field/), [DateRangeField](../components/date-range-field/)
- Сценарии планирования или бронирования: [DateTimeField](../components/date-time-field/), [DateRangeField](../components/date-range-field/)
- Постоянно видимый визуальный выбор: [Calendar](../components/calendar/)
- Негригорианские календари, локаль и контракт значения даты в ISO: [Даты и календарные системы](../i18n.md)
