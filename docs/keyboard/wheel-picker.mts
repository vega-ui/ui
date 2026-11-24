import type { KeyboardSpec } from './types';

const example = 'wheel-picker/minimal-composition.tsx';
const hours = { role: 'spinbutton', name: 'Hours' };
const minutes = { role: 'spinbutton', name: 'Minutes' };

const timer = 'wheel-picker/timer.tsx';
const timerHours = { role: 'spinbutton', name: 'Hours' };

export default [
  {
    keys: ['Tab'],
    en: 'Moves the focus to the next column, and out of the picker after the last one.',
    ru: 'Переводит фокус на следующую колонку, а после последней — из пикера.',
    checks: [
      { example, steps: [{ focus: hours }], press: 'Tab', expect: [{ focused: minutes }] },
    ],
  },
  {
    keys: ['ArrowUp', 'ArrowDown'],
    en: 'Selects the next or the previous enabled option and turns the wheel to it. A looped column goes on past the last option to the first one; a bounded column stops.',
    ru: 'Выбирает следующую или предыдущую доступную опцию и поворачивает к ней колесо. Зацикленная колонка переходит с последней опции на первую, ограниченная останавливается.',
    checks: [
      { example, steps: [{ focus: hours }], press: 'ArrowUp', before: [{ attr: 'aria-valuetext', of: hours, is: '07' }], expect: [{ attr: 'aria-valuetext', of: hours, is: '08' }, { focused: hours }] },
      { example, steps: [{ focus: hours }], press: 'ArrowDown', expect: [{ attr: 'aria-valuetext', of: hours, is: '06' }] },
      { example: timer, steps: [{ focus: timerHours }], press: 'ArrowDown', before: [{ attr: 'aria-valuetext', of: timerHours, is: '0' }], expect: [{ attr: 'aria-valuetext', of: timerHours, is: '0' }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown'],
    en: 'Moves as many options as the picker shows rows, forward or back.',
    ru: 'Сдвигает на столько опций, сколько строк показывает пикер, вперёд или назад.',
    checks: [
      { example, steps: [{ focus: hours }], press: 'PageUp', expect: [{ attr: 'aria-valuetext', of: hours, is: '12' }] },
      { example, steps: [{ focus: hours }], press: 'PageDown', expect: [{ attr: 'aria-valuetext', of: hours, is: '02' }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Selects the first or the last enabled option.',
    ru: 'Выбирает первую или последнюю доступную опцию.',
    checks: [
      { example, steps: [{ focus: hours }], press: 'Home', expect: [{ attr: 'aria-valuetext', of: hours, is: '00' }] },
      { example, steps: [{ focus: hours }], press: 'End', expect: [{ attr: 'aria-valuetext', of: hours, is: '23' }] },
    ],
  },
  {
    keys: ['1'],
    en: 'Selects the next option whose text starts with the typed characters; characters typed in quick succession form one search.',
    ru: 'Выбирает следующую опцию, текст которой начинается с набранных символов; символы, набранные подряд, ищутся вместе.',
    checks: [
      { example, steps: [{ focus: hours }], press: '1', expect: [{ attr: 'aria-valuetext', of: hours, is: '10' }] },
      { example, steps: [{ focus: hours }, { press: '1' }], press: '5', expect: [{ attr: 'aria-valuetext', of: hours, is: '15' }] },
    ],
  },
] satisfies KeyboardSpec;
