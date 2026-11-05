import type { KeyboardSpec } from './types';

const example = 'calendar/single-date-in-a-locale.tsx';
const march = (day: number) => ({ role: 'gridcell', name: String(day), nth: 2 });
const next = { role: 'button', name: 'Weiter' };
const monthButton = { role: 'button', name: 'März' };
const yearButton = { role: 'button', name: '2026' };

export default [
  {
    keys: ['Tab'],
    en: 'Moves the focus into the day grid: onto the selected day when it is in the visible month, otherwise onto today or the first available day. Only one day is in the tab order.',
    ru: 'Переносит фокус в сетку дней: на выбранный день, если он в видимом месяце, иначе на сегодня или первый доступный день. В порядке табуляции только один день.',
    checks: [
      { example, steps: [{ focus: next }], press: 'Tab', expect: [{ focused: march(15) }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowRight'],
    en: 'Moves the focus to the previous or next day, across weeks and months; the visible month follows. In RTL the arrows are mirrored: ← moves to the next day.',
    ru: 'Переносит фокус на предыдущий или следующий день, через границы недель и месяцев; видимый месяц следует за фокусом. В RTL стрелки зеркальны: ← ведёт к следующему дню.',
    checks: [
      { example, steps: [{ focus: march(15) }], press: 'ArrowRight', expect: [{ focused: march(16) }] },
      { example, steps: [{ focus: march(15) }], press: 'ArrowLeft', expect: [{ focused: march(14) }] },
      { example, dir: 'rtl', steps: [{ focus: march(15) }], press: 'ArrowLeft', expect: [{ focused: march(16) }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Moves the focus to the same weekday of the previous or next week.',
    ru: 'Переносит фокус на тот же день недели предыдущей или следующей недели.',
    checks: [
      { example, steps: [{ focus: march(15) }], press: 'ArrowDown', expect: [{ focused: march(22) }] },
      { example, steps: [{ focus: march(15) }], press: 'ArrowUp', expect: [{ focused: march(8) }] },
      { example, steps: [{ focus: march(28) }], press: 'ArrowDown', before: [{ visible: monthButton }], expect: [{ visible: { role: 'button', name: 'April' } }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the focus to the first or last day of the week.',
    ru: 'Переносит фокус на первый или последний день недели.',
    checks: [
      { example, steps: [{ focus: march(15) }], press: 'Home', expect: [{ focused: march(9) }] },
      { example, steps: [{ focus: march(11) }], press: 'End', expect: [{ focused: march(15) }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown'],
    en: 'Shows the previous or next month and moves the focus to the same day in it.',
    ru: 'Показывает предыдущий или следующий месяц и переносит фокус на тот же день в нём.',
    checks: [
      { example, steps: [{ focus: march(15) }], press: 'PageUp', expect: [{ visible: { role: 'button', name: 'Februar' } }, { focused: march(15) }] },
      { example, steps: [{ focus: march(15) }], press: 'PageDown', expect: [{ visible: { role: 'button', name: 'April' } }, { focused: march(15) }] },
    ],
  },
  {
    keys: ['Enter', 'Space'],
    en: 'Selects the focused day. On a header button: Previous and Next change the month, the month and year buttons open their views.',
    ru: 'Выбирает день в фокусе. На кнопке шапки: «Назад» и «Вперёд» меняют месяц, кнопки месяца и года открывают свои виды.',
    checks: [
      { example, steps: [{ focus: march(16) }], press: 'Enter', before: [{ attr: 'aria-selected', of: march(16), is: 'false' }], expect: [{ attr: 'aria-selected', of: march(16), is: 'true' }, { attr: 'aria-selected', of: march(15), is: 'false' }] },
      { example, steps: [{ focus: march(16) }], press: 'Space', expect: [{ attr: 'aria-selected', of: march(16), is: 'true' }] },
      { example, steps: [{ focus: next }], press: 'Enter', expect: [{ visible: { role: 'button', name: 'April' } }] },
      { example, steps: [{ focus: monthButton }], press: 'Enter', before: [{ attr: 'aria-pressed', of: monthButton, is: 'false' }], expect: [{ attr: 'aria-pressed', of: monthButton, is: 'true' }, { focused: { role: 'gridcell', name: 'März' } }] },
      { example, steps: [{ focus: yearButton }], press: 'Space', expect: [{ attr: 'aria-pressed', of: yearButton, is: 'true' }, { focused: { role: 'gridcell', name: '2026' } }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'In the month or year view: picks the focused month or year and returns to the days, keeping the day of the month. The arrows, Home and End move between months or years.',
    ru: 'В виде месяцев или лет: выбирает месяц или год в фокусе и возвращает к дням, сохраняя число месяца. Стрелки, Home и End перемещают между месяцами или годами.',
    checks: [
      { example, steps: [{ focus: monthButton }, { press: 'Enter' }, { focus: { role: 'gridcell', name: 'März' } }, { press: 'ArrowRight' }], press: 'Enter', before: [{ focused: { role: 'gridcell', name: 'April' } }], expect: [{ visible: { role: 'button', name: 'April' } }, { focused: march(15) }] },
      { example, steps: [{ focus: yearButton }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '2026' } }, { press: 'ArrowRight' }], press: 'Enter', before: [{ focused: { role: 'gridcell', name: '2027' } }], expect: [{ visible: { role: 'button', name: '2027' } }, { attr: 'aria-pressed', of: { role: 'button', name: '2027' }, is: 'false' }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'In the month or year view: returns to the days without changing the month and focuses the active day.',
    ru: 'В виде месяцев или лет: возвращает к дням, не меняя месяц, и фокусирует активный день.',
    checks: [
      { example, steps: [{ focus: monthButton }, { press: 'Enter' }, { focus: { role: 'gridcell', name: 'März' } }, { press: 'ArrowRight' }], press: 'Escape', expect: [{ attr: 'aria-pressed', of: monthButton, is: 'false' }, { focused: march(15) }] },
      { example, steps: [{ focus: yearButton }, { press: 'Enter' }, { focus: { role: 'gridcell', name: '2026' } }, { press: 'ArrowRight' }], press: 'Escape', expect: [{ attr: 'aria-pressed', of: yearButton, is: 'false' }, { focused: march(15) }] },
    ],
  },
] satisfies KeyboardSpec;
