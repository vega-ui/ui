# Next.js и SSR

Vega UI рендерится на сервере и гидратируется на клиенте, как любая React-библиотека; приложению на Next.js App Router нужны правильный порядок CSS, клиентские границы для композиции и стабильные даты.

## Стили

Импортируйте тему и таблицу стилей компонентов один раз, в корневом layout, до собственного глобального CSS:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
import './globals.css';
```

Порядок важен. `@vega-ui/theme-core` определяет классы `.light` и `.dark` с семантическими переменными, `@vega-ui/react/style.css` содержит стили всех компонентов, а стили приложения идут последними, чтобы побеждать при равной специфичности. Без темы компоненты рендерятся с неопределёнными переменными. С CSS-слоями держите библиотеку ниже приложения, как показано в [Начале работы](./getting-started.md#подключение-стилей).

Ставьте класс темы на `<html>`: `Dialog`, `Drawer` и `Sheet` рендерятся в `document.body` и не видят класс на внутренней обёртке. Тема, сохранённая в `localStorage`, известна только в браузере, поэтому выставляйте класс небольшим встроенным скриптом в `<head>` до отрисовки страницы и добавьте `suppressHydrationWarning` на `<html>`: скрипт меняет его до гидратации React.

```tsx
const themeScript = 'document.documentElement.classList.add(localStorage.getItem("theme") ?? "light")';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Клиентские границы

Компоненты с состоянием, контекстом или эффектами (`Dialog`, `Popover`, `Select`, поля и пикеры) поставляются с `'use client'`, поэтому серверный компонент может рендерить их напрямую и передавать сериализуемые пропсы. Статичные части вроде `Button`, `Text`, `Heading`, `Icon`, `Card` и `Slot` не имеют директивы и рендерятся на сервере как обычная разметка.

Две вещи всё равно требуют вашего клиентского компонента:

- обработчики событий вроде `onClick` или `onChangeValue` и любое ваше состояние, потому что функции не могут перейти из серверного компонента в клиентский
- `asChild`, когда дочерний элемент — клиентский компонент, например `next/link`: `Slot` клонирует дочерний элемент и сливает в него пропсы и ref, а это работает, только когда обе стороны рендерятся на клиенте

```tsx
'use client';

import NextLink from 'next/link';
import { Button } from '@vega-ui/react';

export function PricingLink() {
  return (
    <Button asChild>
      <NextLink href='/pricing'>See pricing</NextLink>
    </Button>
  );
}
```

Держите границу маленькой: файл с `'use client'` для интерактивной части, импортированный из серверной страницы.

## Гидратация и даты

Сервер и клиент рендерят одно и то же дерево, и React сообщает о расхождении гидратации, когда их результат отличается. В Vega UI следить нужно за значениями по умолчанию в компонентах дат:

- **Локаль.** Без `locale` `Calendar`, пикеры и поля дат используют `getDefaultLocale()` — локаль среды выполнения. Сервер на Node.js и браузер часто расходятся, поэтому названия месяцев и первый день недели меняются после гидратации. Передавайте `locale` явно — из маршрута или настроек пользователя.
- **Сегодня.** Без `value`, `defaultValue` или `defaultMonth` `Calendar` и пикеры открываются на текущем месяце и берут сегодняшний день как начальную точку табуляции. Сервер рендерит месяц по своим часам, а статически экспортированная страница — месяц сборки. Передавайте `defaultMonth` (или значение), когда страница пререндерится, или рендерите календарь только после монтирования.

```tsx
'use client';

import { Calendar, CalendarDay, CalendarDays, CalendarMonthLabel, CalendarWeekday, CalendarWeekdays, CalendarWeeks } from '@vega-ui/react';

export function BookingCalendar({ locale, month }: { locale: string, month: string }) {
  return (
    <Calendar locale={locale} defaultMonth={month}>
      <CalendarMonthLabel />
      <CalendarDays>
        <CalendarWeekdays>
          <CalendarWeekday />
        </CalendarWeekdays>
        <CalendarWeeks>
          <CalendarDay />
        </CalendarWeeks>
      </CalendarDays>
    </Calendar>
  );
}
```

То же правило относится к вашему форматированию: `Intl.DateTimeFormat` без локали, `toLocaleDateString()` и `new Date()` в рендере зависят от машины. Передавайте локаль, а для даты, которая должна читаться везде одинаково, — ещё и `timeZone`. Значения — ISO-строки, поэтому они передаются с сервера в клиентские компоненты как есть.

## Статический экспорт

С `output: 'export'` каждая страница рендерится в HTML во время сборки и гидратируется в браузере. Vega UI для этого ничего дополнительного не нужно: нет глобального провайдера, который надо настраивать, а стили — статическая таблица, а не CSS-in-JS. Меняются часы и локаль — они берутся с машины сборки: применяйте правила из раздела [Гидратация и даты](#гидратация-и-даты) к каждой пререндеренной странице.

## Чек-лист

- Импортируйте `@vega-ui/theme-core`, затем `@vega-ui/react/style.css`, затем CSS приложения — один раз в корневом layout.
- Выставляйте класс темы до отрисовки и добавьте `suppressHydrationWarning` на `<html>`.
- Держите обработчики, состояние и композиции с `asChild` в клиентских компонентах.
- Передавайте `locale` каждому компоненту дат, а календарям на пререндеренных страницах — `defaultMonth` или значение.
