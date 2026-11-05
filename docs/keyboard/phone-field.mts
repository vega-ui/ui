import type { KeyboardSpec } from './types';

const example = 'phone-field/minimal-composition.tsx';
const country = { role: 'combobox', name: 'Country' };
const phone = { role: 'textbox', name: 'Phone number' };
const gb = { role: 'option', name: 'GB' };

export default [
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'On the country trigger, opens the country list. Inside the open list, moves the active option. The rest of the list keys work as in [Select](../select/accessibility.md).',
    ru: 'На триггере страны открывает список стран. В открытом списке переносит активный вариант. Остальные клавиши списка работают как в [Select](../select/accessibility.md).',
    checks: [
      { example, steps: [{ focus: country }], press: 'ArrowDown', before: [{ attr: 'aria-expanded', of: country, is: 'false' }], expect: [{ attr: 'aria-expanded', of: country, is: 'true' }, { focused: country }] },
      { example, steps: [{ focus: country }, { press: 'ArrowDown' }, { press: 'ArrowDown' }], press: 'ArrowUp', before: [{ active: gb }], expect: [{ active: { role: 'option', name: 'US' } }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'Selects the active country, writes its calling code into the input and moves the focus to the input.',
    ru: 'Выбирает активную страну, записывает её телефонный код в поле и переносит фокус в поле.',
    checks: [
      { example, steps: [{ focus: country }, { press: 'ArrowDown' }, { press: 'ArrowDown' }], press: 'Enter', before: [{ active: gb }], expect: [{ attr: 'aria-expanded', of: country, is: 'false' }, { focused: phone }, { value: '+44 ', of: phone }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'From the closed country trigger, moves the focus to the phone input.',
    ru: 'С закрытого триггера страны переносит фокус в поле телефона.',
    checks: [
      { example, steps: [{ focus: country }], press: 'Tab', expect: [{ focused: phone }] },
    ],
  },
] satisfies KeyboardSpec;
