import type { KeyboardSpec } from './types';

const example = 'slider/minimal-composition.tsx';
const zoom = { role: 'slider', name: 'Zoom' };
const range = 'slider/range-slider.tsx';
const start = { role: 'slider', name: 'Start time' };
const end = { role: 'slider', name: 'End time' };
const vertical = 'slider/vertical-slider.tsx';
const volume = { role: 'slider', name: 'Master volume' };

export default [
  {
    keys: ['ArrowRight', 'ArrowUp'],
    en: 'Increases the value of the focused thumb by one `step`. In a horizontal RTL slider, Chromium and Firefox increase it on ← instead; Safari does not mirror the arrows.',
    ru: 'Увеличивает значение бегунка в фокусе на один `step`. В горизонтальном слайдере в RTL Chromium и Firefox увеличивают значение по ←; Safari стрелки не отражает.',
    checks: [
      { example, steps: [{ focus: zoom }], press: 'ArrowRight', before: [{ value: '50', of: zoom }], expect: [{ value: '51', of: zoom }] },
      { example, steps: [{ focus: zoom }], press: 'ArrowUp', before: [{ value: '50', of: zoom }], expect: [{ value: '51', of: zoom }] },
      { example: vertical, steps: [{ focus: volume }], press: 'ArrowRight', before: [{ value: '70', of: volume }], expect: [{ value: '71', of: volume }] },
      { example, dir: 'rtl', steps: [{ focus: zoom }], press: 'ArrowRight', before: [{ value: '50', of: zoom }], expect: [{ value: '49', of: zoom }] },
    ],
  },
  {
    keys: ['ArrowLeft', 'ArrowDown'],
    en: 'Decreases the value of the focused thumb by one `step`. In a horizontal RTL slider, Chromium and Firefox decrease it on → instead; Safari does not mirror the arrows.',
    ru: 'Уменьшает значение бегунка в фокусе на один `step`. В горизонтальном слайдере в RTL Chromium и Firefox уменьшают значение по →; Safari стрелки не отражает.',
    checks: [
      { example, steps: [{ focus: zoom }], press: 'ArrowLeft', before: [{ value: '50', of: zoom }], expect: [{ value: '49', of: zoom }] },
      { example, steps: [{ focus: zoom }], press: 'ArrowDown', before: [{ value: '50', of: zoom }], expect: [{ value: '49', of: zoom }] },
      { example: vertical, steps: [{ focus: volume }], press: 'ArrowLeft', before: [{ value: '70', of: volume }], expect: [{ value: '69', of: volume }] },
      { example, dir: 'rtl', steps: [{ focus: zoom }], press: 'ArrowLeft', before: [{ value: '50', of: zoom }], expect: [{ value: '51', of: zoom }] },
    ],
  },
  {
    keys: ['PageUp', 'PageDown'],
    en: 'Increases or decreases the value by a tenth of the range, or by one `step` if it is larger.',
    ru: 'Увеличивает или уменьшает значение на десятую часть диапазона или на один `step`, если он больше.',
    checks: [
      { example, steps: [{ focus: zoom }], press: 'PageUp', before: [{ value: '50', of: zoom }], expect: [{ value: '60', of: zoom }] },
      { example, steps: [{ focus: zoom }], press: 'PageDown', before: [{ value: '50', of: zoom }], expect: [{ value: '40', of: zoom }] },
    ],
  },
  {
    keys: ['Home', 'End'],
    en: 'Moves the thumb to its minimum or maximum. In a range, a thumb stops at the neighbouring thumb, keeping `minStepsBetweenThumbs`.',
    ru: 'Переносит бегунок к его минимуму или максимуму. В диапазоне бегунок останавливается у соседнего с учётом `minStepsBetweenThumbs`.',
    checks: [
      { example, steps: [{ focus: zoom }], press: 'Home', before: [{ value: '50', of: zoom }], expect: [{ value: '0', of: zoom }] },
      { example, steps: [{ focus: zoom }], press: 'End', before: [{ value: '50', of: zoom }], expect: [{ value: '100', of: zoom }] },
      { example: range, steps: [{ focus: start }], press: 'End', before: [{ value: '9', of: start }], expect: [{ value: '17', of: start }, { value: '18', of: end }] },
      { example: range, steps: [{ focus: end }], press: 'Home', before: [{ value: '18', of: end }], expect: [{ value: '10', of: end }, { value: '9', of: start }] },
    ],
  },
  {
    keys: ['Tab', 'Shift+Tab'],
    en: 'Moves the focus between thumbs. Each thumb is its own tab stop.',
    ru: 'Переносит фокус между бегунками. Каждый бегунок — отдельная остановка табуляции.',
    checks: [
      { example: range, steps: [{ focus: start }], press: 'Tab', expect: [{ focused: end }] },
      { example: range, steps: [{ focus: end }], press: 'Shift+Tab', expect: [{ focused: start }] },
    ],
  },
] satisfies KeyboardSpec;
