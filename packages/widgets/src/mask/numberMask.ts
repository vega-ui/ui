import { TextEdit, TextState } from '@vega-ui/core'
import { toLatinDigits } from '@vega-ui/i18n'
import { wordEndAfter, wordStartBefore } from './wordRange'

export interface NumberMask {
  readonly min: number
  readonly max: number
  readonly fractionDigits: number
}

const THOUSAND = ' '
const DECIMAL = '.'
const MINUS = '-'
const MINUSES = '\\-\\u2013\\u2014\\u30FC\\u2212'
const PSEUDO_MINUSES = /[–—ー−]/gi
const PSEUDO_DECIMALS = /[,бю]/gi
const LEADING_MINUS = new RegExp(`^([${MINUSES}])?(.*)`)
const NEGATIVE = new RegExp(`^\\D*[${MINUSES}]`)
const SPACE = /\s/

const INSERTS = new Set(['insertText', 'insertReplacementText', 'insertFromPaste', 'insertFromDrop', 'insertFromYank'])

type Selection = TextState['selection']

interface NumberParts {
  readonly minus: string
  readonly integer: string
  readonly separator: string
  readonly fraction: string
}

const expressionOf = ({ min, fractionDigits }: NumberMask) => {
  const minus = min < 0 ? `[${MINUSES}]?` : ''
  const fraction = fractionDigits > 0 ? `([\\.,бю]\\d{0,${Number.isFinite(fractionDigits) ? fractionDigits : ''}})?` : ''

  return new RegExp(`^(${minus}|${minus})[\\d\\s]*${fraction}$`)
}

const partsOf = (value: string, { fractionDigits }: NumberMask): NumberParts => {
  const [withMinus = '', fraction = ''] = value.split(DECIMAL)
  const [, minus = '', integer = ''] = LEADING_MINUS.exec(withMinus) ?? []
  const separator = fractionDigits > 0 ? (/[.,бю]/i.exec(value)?.[0] ?? '') : ''

  return { minus, integer, separator, fraction }
}

const joined = ({ minus, integer, separator, fraction }: NumberParts) => `${minus}${integer}${fraction ? DECIMAL : separator}${fraction}`

/**
 * Reads the number a masked text shows, `NaN` when it shows none.
 */
export const parseMaskedNumber = (value: string) => {
  const unmasked = value.replace(/\.(?!\d)/g, '').replace(/[^\d.]/g, '')
  if (!unmasked) return NaN

  return Number(`${NEGATIVE.test(value) ? MINUS : ''}${unmasked}`)
}

const calibrated = ({ value, selection: [from, to] }: TextState, expression: RegExp): TextState => {
  if (expression.test(value)) return { value, selection: [from, to] }

  let start = from
  let end = to
  let valid = ''
  Array.from(value).forEach((char, index) => {
    if (index === from) start = valid.length
    if (index === to) end = valid.length
    if (expression.test(valid + char)) valid += char
  })

  return { value: valid, selection: [Math.min(start, valid.length), Math.min(end, valid.length)] }
}

const clamped = (state: TextState, { min, max }: NumberMask): TextState => {
  const parsed = parseMaskedNumber(state.value)
  const limited = parsed > 0 ? Math.min(parsed, max) : Math.max(parsed, min)
  if (!parsed || limited === parsed) return state

  const value = String(limited)

  return { value, selection: [value.length, value.length] }
}

const grouped = (state: TextState, mask: NumberMask): TextState => {
  const [initialFrom, initialTo] = state.selection
  let [from, to] = state.selection
  const { minus, integer, separator, fraction } = partsOf(state.value, mask)

  const deleted = joined({ minus, integer, separator, fraction }).length - (minus + integer + (separator ? separator + fraction : '')).length
  if (deleted > 0 && initialFrom && initialFrom <= deleted) from -= deleted
  if (deleted > 0 && initialTo && initialTo <= deleted) to -= deleted

  const chars = Array.from(integer)
  let result = ''
  for (let index = chars.length - 1; index >= 0; index--) {
    const char = chars[index]
    const leading = index === 0 && char === THOUSAND
    const atSeparator = !leading && result.length > 0 && (result.length + 1) % 4 === 0
    const isSeparator = char === THOUSAND || SPACE.test(char)

    if (atSeparator && isSeparator) {
      result = THOUSAND + result
      continue
    }

    if (isSeparator) {
      if (from && index <= initialFrom) from--
      if (to && index <= initialTo) to--
      continue
    }

    if (!atSeparator) {
      result = char + result
      continue
    }

    if (index < initialFrom) from++
    if (index < initialTo) to++
    result = char + THOUSAND + result
  }

  return { value: joined({ minus, integer: result, separator, fraction }), selection: [from, to] }
}

const emptied = (state: TextState, mask: NumberMask): TextState => {
  const { minus, integer, separator, fraction } = partsOf(state.value, mask)
  const alone = !integer && !fraction && separator
  if ((!integer && !Number(fraction) && state.selection[0] === minus.length) || alone) return { value: minus, selection: state.selection }

  return state
}

const postprocessed = (state: TextState, mask: NumberMask) => emptied(grouped(clamped(state, mask), mask), mask)

const normalizedValue = (value: string, mask: NumberMask) => {
  const latin = toLatinDigits(value).replace(PSEUDO_MINUSES, MINUS).replace(PSEUDO_DECIMALS, DECIMAL)
  if (mask.fractionDigits > 0) return latin

  return latin.replace(/\..*$/, '')
}

const normalizedField = (field: TextState, mask: NumberMask): TextState => {
  const value = normalizedValue(field.value, mask)
  const [from, to] = field.selection

  return { value, selection: [Math.min(from, value.length), Math.min(to, value.length)] }
}

const insertedData = (field: TextState, data: string, mask: NumberMask) => {
  const { value, selection: [from, to] } = field
  let typed = normalizedValue(data, mask)

  const decimalElsewhere = value.slice(0, from).includes(DECIMAL) || value.slice(to).includes(DECIMAL)
  if (mask.fractionDigits > 0 && !decimalElsewhere && /^\D*\./.test(typed) && !/\d+/.test(value.slice(0, from))) typed = `0${typed}`

  const hasDecimal = partsOf(value, mask).separator !== ''
  if (hasDecimal && !value.slice(from, to + 1).includes(DECIMAL)) typed = typed.split(DECIMAL).join('')

  return typed
}

const sameState = (first: TextState, second: TextState) =>
  first.value === second.value && first.selection[0] === second.selection[0] && first.selection[1] === second.selection[1]

const insert = (initial: TextState, data: string, mask: NumberMask): TextState => {
  const expression = expressionOf(mask)
  const field = normalizedField(initial, mask)
  const typed = insertedData(field, data, mask)
  const model = calibrated(field, expression)
  const [from, to] = model.selection

  const leading = model.value.slice(0, from) + typed
  const caret = leading.length
  const next = calibrated({ value: leading + model.value.slice(to), selection: [caret, caret] }, expression)
  const leadingNext = calibrated({ value: leading, selection: [caret, caret] }, expression)
  if (leadingNext.value === model.value.slice(0, from) || sameState(model, next)) return initial

  return postprocessed(next, mask)
}

const deletedRange = ({ value, selection: [from, to] }: TextState, type: string): Selection => {
  if (from !== to) return [from, to]

  const forward = type.includes('Forward')
  if (type.startsWith('deleteContent') || type === 'deleteByCut') {
    return forward ? [from, Math.min(to + 1, value.length)] : [Math.max(from - 1, 0), to]
  }

  if (type.startsWith('deleteWord')) return forward ? [from, wordEndAfter(value, from)] : [wordStartBefore(value, to), to]

  const lineBreak = forward ? value.slice(from).indexOf('\n') + 1 || value.length : value.slice(0, to).lastIndexOf('\n') + 1

  return forward ? [from, lineBreak] : [lineBreak, to]
}

const remove = (initial: TextState, type: string, mask: NumberMask): TextState => {
  const forward = type.includes('Forward')
  const ranged = normalizedField({ value: initial.value, selection: deletedRange(initial, type) }, mask)
  const [rangeFrom, rangeTo] = ranged.selection
  const field = ranged.value.slice(rangeFrom, rangeTo) === THOUSAND
    ? { value: ranged.value, selection: (forward ? [rangeTo, rangeTo] : [rangeFrom, rangeFrom]) as Selection }
    : ranged

  const expression = expressionOf(mask)
  const model = calibrated(field, expression)
  const [from, to] = model.selection
  const removed = from === to || !to ? model : calibrated({ value: model.value.slice(0, from) + model.value.slice(to), selection: [from, from] }, expression)
  const next = postprocessed(removed, mask)

  if (initial.value === field.value && field.value === removed.value && removed.value === next.value) {
    const [start, end] = field.selection
    const caret = forward ? end : start

    return { value: initial.value, selection: [caret, caret] }
  }

  return next
}

/**
 * Applies an edit of the browser to a number field: digits are grouped by
 * thousands with a no-break space, a comma or another decimal separator
 * becomes a dot, a dash becomes a minus, a second dot is ignored, a number
 * beyond `max`, or below `min` when negative, is replaced by the bound, and
 * deleting a thousands separator only moves the caret. Returns `undefined`
 * for an edit it does not apply, like an undo.
 */
export const applyNumberEdit = (field: TextState, edit: TextEdit, mask: NumberMask): TextState | undefined => {
  if (INSERTS.has(edit.type)) return insert(field, edit.data, mask)
  if (edit.type.startsWith('delete')) return remove(field, edit.type, mask)

  return undefined
}

/**
 * Calibrates a number text the browser already changed, like after a
 * composition or autofill, or a text written from a number.
 */
export const calibrateNumberField = (field: TextState, mask: NumberMask): TextState =>
  postprocessed(calibrated(normalizedField(field, mask), expressionOf(mask)), mask)

/**
 * Formats a number the way typing it would show it, `''` for `NaN`.
 */
export const formatMaskedNumber = (value: number, mask: NumberMask) => {
  if (Number.isNaN(value)) return ''

  const text = String(value)

  return calibrateNumberField({ value: text, selection: [0, 0] }, mask).value
}

const withoutLeadingZeros = (value: string, mask: NumberMask) => {
  const parts = partsOf(value, mask)
  const integer = parts.integer.replace(/^[0\u00A0]+(?=0)/, '').replace(/^[0\u00A0]+(?=[1-9])/, '')
  if (integer === parts.integer) return value

  return joined({ ...parts, integer })
}

const rewritten = (before: string, after: string, mask: NumberMask) => {
  if (after === before) return before

  return calibrateNumberField({ value: after, selection: [0, 0] }, mask).value
}

/**
 * Applies what a number field does when it loses the focus: drops repeated
 * leading zeros, pads a missing integer part with a zero and clamps the
 * number to `min` and `max`.
 */
export const blurredNumber = (value: string, mask: NumberMask) => {
  const trimmed = rewritten(value, withoutLeadingZeros(value, mask), mask)
  const padded = rewritten(trimmed, trimmed.replace(/^(\D+)?\./, '$10.'), mask)

  const parsed = parseMaskedNumber(padded)
  const bounded = Math.min(Math.max(parsed, mask.min), mask.max)
  if (Number.isNaN(parsed) || parsed === bounded) return padded

  return formatMaskedNumber(bounded, mask)
}
