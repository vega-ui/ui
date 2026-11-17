import type { KeyboardSpec } from './types';

const example = 'combobox/minimal-composition.tsx';
const combobox = { role: 'combobox', name: 'City' };
const option = (name: string) => ({ role: 'option', name });
const closed = { attr: 'aria-expanded', of: combobox, is: 'false' };
const opened = { attr: 'aria-expanded', of: combobox, is: 'true' };
const inText = { attr: 'aria-activedescendant', of: combobox, is: null };
const typed = [{ focus: combobox }, { press: 'a' }];
const moved = [...typed, { press: 'ArrowDown' }];
const trigger = { role: 'button', name: 'Show cities' };
const completion = 'combobox/inline-completion.tsx';
const state = { role: 'combobox', name: 'State' };
const completed = [{ focus: state }, { press: 'c' }];
const languages = 'combobox/no-results-message.tsx';
const subtitles = { role: 'combobox', name: 'Subtitles' };
const polish = option('Polish');
const pickedPolish = [{ focus: subtitles }, { press: 'p' }, { press: 'o' }, { press: 'ArrowDown' }, { press: 'Enter' }];

export default [
  {
    keys: ['a'],
    en: 'Typing a character opens the list with the options the app renders for the new text. No option is active, and the focus stays in the input.',
    ru: 'Ввод символа открывает список с вариантами, которые приложение рендерит для нового текста. Активного варианта нет, фокус остаётся в поле.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 'a', before: [closed], expect: [opened, inText, { value: 'a', of: combobox }, { focused: combobox }] },
    ],
  },
  {
    keys: ['a'],
    en: 'With `autocomplete` set to `both`: typing a character with the caret at the end also writes the label of the first option that starts with the text, selects the part after the typed text and makes that option active. The next character replaces the rest. With `inline` the text is completed the same way, but the list stays closed.',
    ru: 'С `autocomplete`, равным `both`: ввод символа при курсоре в конце ещё и записывает подпись первого варианта, который начинается с текста, выделяет часть после набранного текста и делает этот вариант активным. Следующий символ заменяет остаток. С `inline` текст дополняется так же, но список остаётся закрытым.',
    checks: [
      { example: completion, steps: [{ focus: state }], press: 'a', before: [{ attr: 'aria-expanded', of: state, is: 'false' }], expect: [{ value: 'Alabama', of: state }, { active: option('Alabama') }, { attr: 'aria-expanded', of: state, is: 'true' }] },
    ],
  },
  {
    keys: ['Backspace', 'Delete'],
    en: 'With completion: removes the selected completed rest without completing again, so the start of the label stays and no option is active.',
    ru: 'С дополнением: удаляет выделенный дополненный остаток без повторного дополнения, поэтому начало подписи остаётся, а активного варианта нет.',
    checks: [
      { example: completion, steps: completed, press: 'Backspace', before: [{ value: 'California', of: state }], expect: [{ value: 'C', of: state }, { attr: 'aria-activedescendant', of: state, is: null }, { attr: 'aria-expanded', of: state, is: 'true' }] },
      { example: completion, steps: completed, press: 'Delete', before: [{ value: 'California', of: state }], expect: [{ value: 'C', of: state }, { attr: 'aria-activedescendant', of: state, is: null }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'On a closed list: opens it and makes the first or last option active.',
    ru: 'На закрытом списке: открывает его и делает активным первый или последний вариант.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 'ArrowDown', before: [closed], expect: [opened, { active: option('Amsterdam') }, { focused: combobox }] },
      { example, steps: [{ focus: combobox }], press: 'ArrowUp', before: [closed], expect: [opened, { active: option('Vienna') }] },
      { example: languages, steps: pickedPolish, press: 'ArrowDown', before: [{ value: 'Polish', of: subtitles }, { attr: 'aria-expanded', of: subtitles, is: 'false' }], expect: [{ active: polish }, { attr: 'aria-expanded', of: subtitles, is: 'true' }] },
      { example: languages, steps: pickedPolish, press: 'ArrowUp', before: [{ value: 'Polish', of: subtitles }], expect: [{ active: polish }] },
    ],
  },
  {
    keys: ['Alt+ArrowDown'],
    en: 'On a closed list: opens it without an active option. A picked option in the list is scrolled into view and keeps `aria-selected`.',
    ru: 'На закрытом списке: открывает его без активного варианта. Выбранный вариант в списке прокручивается в видимую область и сохраняет `aria-selected`.',
    checks: [
      { example, steps: [{ focus: combobox }], press: 'Alt+ArrowDown', before: [closed], expect: [opened, inText] },
      { example: languages, steps: pickedPolish, press: 'Alt+ArrowDown', before: [{ value: 'Polish', of: subtitles }], expect: [{ attr: 'aria-activedescendant', of: subtitles, is: null }, { attr: 'aria-selected', of: polish, is: 'true' }, { visible: polish }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'In the open list: moves the active option to the next or previous enabled one and stops at the ends. Without an active option, `ArrowDown` goes to the first one and `ArrowUp` to the last.',
    ru: 'В открытом списке: переносит активный вариант на следующий или предыдущий доступный и останавливается на краях. Без активного варианта `ArrowDown` переходит к первому, а `ArrowUp` — к последнему.',
    checks: [
      { example, steps: moved, press: 'ArrowDown', before: [{ active: option('Amsterdam') }], expect: [{ active: option('Athens') }, { focused: combobox }] },
      { example, steps: moved, press: 'ArrowUp', before: [{ active: option('Amsterdam') }], expect: [{ active: option('Amsterdam') }, opened] },
      { example, steps: typed, press: 'ArrowDown', before: [opened, inText], expect: [{ active: option('Amsterdam') }] },
      { example, steps: [{ click: trigger }], press: 'ArrowDown', before: [opened, inText, { focused: combobox }], expect: [{ active: option('Amsterdam') }] },
    ],
  },
  {
    keys: ['ArrowDown', 'ArrowUp'],
    en: 'With `autocomplete` set to `both` or `inline`: also writes the label of the reached option into the input when it starts with the typed text, ignoring case, and selects the part after the typed text. Otherwise the text stays.',
    ru: 'С `autocomplete`, равным `both` или `inline`: ещё и записывает в поле подпись достигнутого варианта, если она начинается с набранного текста без учёта регистра, и выделяет часть после набранного текста. Иначе текст не меняется.',
    checks: [
      { example: completion, steps: [{ focus: state }, { press: 'a' }], press: 'ArrowDown', before: [{ value: 'Alabama', of: state }, { active: option('Alabama') }], expect: [{ value: 'Alaska', of: state }, { active: option('Alaska') }, { attr: 'aria-expanded', of: state, is: 'true' }] },
      { example: completion, steps: [{ focus: state }, { press: 'a' }, { press: 'ArrowDown' }], press: 'ArrowUp', before: [{ value: 'Alaska', of: state }], expect: [{ value: 'Alabama', of: state }, { active: option('Alabama') }] },
    ],
  },
  {
    keys: ['Enter'],
    en: 'Picks the active option: writes its label into the input, calls `onChangeValue` and closes the list. Without an active option, `Enter` is left to the page, so a form submits. With completion, `Enter` picks the completed option, also on a closed list with `inline`.',
    ru: 'Выбирает активный вариант: записывает его подпись в поле, вызывает `onChangeValue` и закрывает список. Без активного варианта `Enter` остаётся странице, и форма отправляется. С дополнением `Enter` выбирает дополненный вариант, в том числе на закрытом списке с `inline`.',
    checks: [
      { example, steps: [...moved, { press: 'ArrowDown' }], press: 'Enter', before: [{ active: option('Athens') }], expect: [closed, { value: 'Athens', of: combobox }, { focused: combobox }] },
      { example: completion, steps: completed, press: 'Enter', before: [{ active: option('California') }], expect: [{ value: 'California', of: state }, { attr: 'aria-expanded', of: state, is: 'false' }] },
    ],
  },
  {
    keys: ['Alt+ArrowUp'],
    en: 'Picks the active option and closes the list. Without an active option it only closes the list.',
    ru: 'Выбирает активный вариант и закрывает список. Без активного варианта только закрывает список.',
    checks: [
      { example, steps: [{ focus: combobox }, { press: 'ArrowDown' }], press: 'Alt+ArrowUp', before: [opened], expect: [closed, { value: 'Amsterdam', of: combobox }] },
      { example, steps: [{ focus: combobox }, { press: 'Alt+ArrowDown' }], press: 'Alt+ArrowUp', before: [opened], expect: [closed, { value: '', of: combobox }] },
    ],
  },
  {
    keys: ['Escape'],
    en: 'Closes the open list and keeps the text; with completion, it puts back the typed text without the completed rest, also on a closed list with `inline`. On a closed list it clears the text and the picked value. With nothing to clear, `Escape` is left to the page, so a dialog around the field closes.',
    ru: 'Закрывает открытый список, сохраняя текст; с дополнением возвращает набранный текст без дополненного остатка, в том числе на закрытом списке с `inline`. На закрытом списке очищает текст и выбранное значение. Если очищать нечего, `Escape` остаётся странице, и диалог вокруг поля закрывается.',
    checks: [
      { example, steps: typed, press: 'Escape', before: [opened], expect: [closed, { value: 'a', of: combobox }, { focused: combobox }] },
      { example: completion, steps: completed, press: 'Escape', before: [{ value: 'California', of: state }], expect: [{ value: 'c', of: state }, { attr: 'aria-expanded', of: state, is: 'false' }] },
      { example, steps: [...typed, { press: 'Escape' }], press: 'Escape', before: [closed, { value: 'a', of: combobox }], expect: [closed, { value: '', of: combobox }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace', 'Delete'],
    en: 'Keys the input handles itself return to the text: no option stays active, the list stays open, and the caret moves or the text changes as in any text field.',
    ru: 'Клавиши, которые поле обрабатывает само, возвращают к тексту: активного варианта не остаётся, список остаётся открытым, а курсор движется или текст меняется как в любом текстовом поле.',
    checks: [
      { example, steps: moved, press: 'ArrowLeft', before: [{ active: option('Amsterdam') }], expect: [opened, inText] },
      { example, steps: moved, press: 'ArrowRight', before: [{ active: option('Amsterdam') }], expect: [opened, inText] },
      { example, steps: moved, press: 'Home', before: [{ active: option('Amsterdam') }], expect: [opened, inText] },
      { example, steps: moved, press: 'End', before: [{ active: option('Amsterdam') }], expect: [opened, inText] },
      { example, steps: moved, press: 'Backspace', before: [{ active: option('Amsterdam') }], expect: [opened, inText, { value: '', of: combobox }] },
      { example, steps: moved, press: 'Delete', before: [{ active: option('Amsterdam') }], expect: [opened, inText, { value: 'a', of: combobox }] },
    ],
  },
  {
    keys: ['Space'],
    en: 'Types a space like any other character; it never picks an option.',
    ru: 'Вводит пробел, как любой другой символ; вариант пробел не выбирает.',
    checks: [
      { example, steps: moved, press: 'Space', before: [{ active: option('Amsterdam') }], expect: [opened, inText, { value: 'a ', of: combobox }] },
    ],
  },
  {
    keys: ['Tab'],
    en: 'Closes the list without picking and moves the focus on. The text stays as typed. With completion, the completed option is picked.',
    ru: 'Закрывает список без выбора и переносит фокус дальше. Текст остаётся таким, как был введён. С дополнением выбирается дополненный вариант.',
    checks: [
      { example, steps: moved, press: 'Tab', before: [opened], expect: [closed, { value: 'a', of: combobox }] },
      { example: completion, steps: completed, press: 'Tab', before: [{ value: 'California', of: state }], expect: [{ value: 'California', of: state }, { attr: 'aria-expanded', of: state, is: 'false' }] },
    ],
  },
] satisfies KeyboardSpec;
