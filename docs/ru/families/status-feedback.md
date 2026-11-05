# Статусы и обратная связь

Используйте эту страницу, когда интерфейс должен сообщать о состоянии, загрузке, прогрессе, измерениях или отображать идентичность, а главный выбор — между компактными метаданными, сообщениями обратной связи и количественными индикаторами.

## Быстрые правила выбора

- Используйте [Badge](../components/badge/) для компактных метаданных статуса или категории.
- Используйте [Alert](../components/alert/) для коротких семантических сообщений обратной связи.
- Используйте [Spinner](../components/spinner/) для компактной неопределённой загрузки.
- Используйте [Progress](../components/progress/) для выполнения во времени.
- Используйте [Meter](../components/meter/) для ограниченных описательных измерений.
- Используйте [MeterStack](../components/meter-stack/), когда одно измерение складывается из значимых частей.
- Используйте [Avatar](../components/avatar/) для представления одного человека или сущности.
- Используйте [AvatarStack](../components/avatar-stack/) для компактного обозначения группы.

## По смыслу

- Компактные метаданные: [Badge](../components/badge/)
- Короткое сообщение обратной связи: [Alert](../components/alert/)
- Загрузка неизвестной длительности: [Spinner](../components/spinner/)
- Известное выполнение или выполнение в виде полосы: [Progress](../components/progress/)
- Ограниченная оценка, ёмкость или уровень: [Meter](../components/meter/)
- Разбивка на сегменты: [MeterStack](../components/meter-stack/)
- Одна идентичность: [Avatar](../components/avatar/)
- Превью группы: [AvatarStack](../components/avatar-stack/)

## Частые ошибки классификации

- Не используйте [Badge](../components/badge/) для полноценных сообщений, которым нужны иерархия или объяснение.
- Не используйте [Alert](../components/alert/) как нейтральный контейнер раскладки.
- Не используйте [Spinner](../components/spinner/), когда точный прогресс известен.
- Не используйте [Progress](../components/progress/) для статичных оценок или квот.
- Не используйте [Meter](../components/meter/) для выполнения асинхронных операций.
- Не используйте [AvatarStack](../components/avatar-stack/), когда явные имена или роли важнее компактности.

## С чего начать

- Обратная связь рядом с содержимым или формами: [Alert](../components/alert/), [Badge](../components/badge/)
- Состояния загрузки: [Spinner](../components/spinner/), [Progress](../components/progress/)
- Отображение метрик и использования: [Meter](../components/meter/), [MeterStack](../components/meter-stack/)
- Представление пользователей и сущностей: [Avatar](../components/avatar/), [AvatarStack](../components/avatar-stack/)
