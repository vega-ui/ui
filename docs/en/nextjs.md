# Next.js and SSR

Vega UI renders on the server and hydrates on the client like any React library; a Next.js App Router app needs the right CSS order, client boundaries for composition, and stable dates.

## Styles

Import the theme and the component stylesheet once, in the root layout, before your own global CSS:

```tsx
import '@vega-ui/theme-core';
import '@vega-ui/react/style.css';
import './globals.css';
```

The order matters. `@vega-ui/theme-core` defines the `.light` and `.dark` classes with the semantic variables, `@vega-ui/react/style.css` holds the styles of every component, and app styles come last so they win on equal specificity. Without the theme the components render with undefined variables. With CSS layers, keep the library below the app as shown in [Getting started](./getting-started.md#connect-styles).

Put the theme class on `<html>`: `Dialog`, `Drawer` and `Sheet` render into `document.body` and do not see a class on an inner wrapper. A theme stored in `localStorage` is only known in the browser, so set the class from a small inline script in `<head>` before the page paints, and add `suppressHydrationWarning` to `<html>` because the script changes it before React hydrates:

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

## Client Boundaries

Components with state, context or effects (`Dialog`, `Popover`, `Select`, the fields and the pickers) ship with `'use client'`, so a Server Component can render them directly and pass serializable props. Static parts such as `Button`, `Text`, `Heading`, `Icon`, `Card` and `Slot` have no directive and render on the server as plain markup.

Two things still need a Client Component of your own:

- event handlers such as `onClick` or `onChangeValue`, and any state you keep, because functions cannot cross from a Server Component into a client one
- `asChild`, when the child is a client component such as `next/link`: `Slot` clones the child and merges props and refs into it, which only works when both sides render on the client

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

Keep the boundary small: a file with `'use client'` for the interactive piece, imported from a Server Component page.

## Hydration And Dates

Server and client render the same tree, and React reports a hydration mismatch when their output differs. In Vega UI the defaults to watch are in the date components:

- **Locale.** Without `locale`, `Calendar`, the pickers and the date fields use `getDefaultLocale()`, the locale of the runtime. The Node.js server and the browser often disagree, so month names and the first day of the week change after hydration. Pass `locale` explicitly, from the route or the user settings.
- **Today.** Without `value`, `defaultValue` or `defaultMonth`, `Calendar` and the pickers open on the current month and use today as the initial tab stop. The server renders the month of its own clock, and a statically exported page renders the month it was built in. Pass `defaultMonth` (or a value) when the page is prerendered, or render the calendar only after mount.

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

The same rule applies to your own formatting: `Intl.DateTimeFormat` without a locale, `toLocaleDateString()` and `new Date()` in render all depend on the machine. Pass a locale, and for a date that should read the same everywhere pass `timeZone` as well. Values are ISO strings, so they serialize from the server to client components as they are.

## Static Export

With `output: 'export'` every page is rendered to HTML at build time and hydrated in the browser. Vega UI needs nothing extra for that: there is no global provider to set up, and the styles are a static stylesheet rather than CSS-in-JS. What changes is the clock and the locale, which are the build machine's: apply the rules from [Hydration and dates](#hydration-and-dates) to every prerendered page.

## Checklist

- Import `@vega-ui/theme-core`, then `@vega-ui/react/style.css`, then app CSS, once in the root layout.
- Set the theme class before paint and add `suppressHydrationWarning` to `<html>`.
- Keep handlers, state and `asChild` compositions in Client Components.
- Pass `locale` to every date component, and `defaultMonth` or a value to calendars on prerendered pages.
