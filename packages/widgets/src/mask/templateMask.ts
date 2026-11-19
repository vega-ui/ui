import { TextEdit, TextState } from '@vega-ui/core'

export type MaskEntry = RegExp | string

const INSERTS = new Set(['insertText', 'insertReplacementText', 'insertFromPaste', 'insertFromDrop', 'insertFromYank'])

const BACKWARD = new Set(['deleteContentBackward', 'deleteWordBackward', 'deleteSoftLineBackward', 'deleteHardLineBackward'])

const WORD = /[\p{L}\p{N}_]/u

const isFixed = (entry: MaskEntry | undefined): entry is string => typeof entry === 'string'

export const fits = (char: string, mask: readonly MaskEntry[]) => mask.some((entry) => (isFixed(entry) ? entry === char : entry.test(char)))

const collapsed = (caret: number): TextState['selection'] => [caret, caret]

const segmentEndAt = (mask: readonly MaskEntry[], from: number, separator: string) => {
  let end = from
  while (end < mask.length && !isFixed(mask[end])) end++

  return mask[end] === separator ? end : undefined
}

export const calibrateMask = (value: string, mask: readonly MaskEntry[], pad?: string) => {
  let result = ''
  let index = 0
  let filled = 0

  for (const char of value) {
    let probe = index
    let fixed = ''
    while (isFixed(mask[probe]) && mask[probe] !== char) {
      fixed += mask[probe]
      probe++
    }

    const entry = mask[probe]
    if (entry === undefined) break

    if (!isFixed(entry) && !entry.test(char)) {
      if (pad === undefined || fixed !== '' || filled === 0) continue

      const end = segmentEndAt(mask, probe, char)
      if (end === undefined) continue

      const start = result.length - filled
      result = result.slice(0, start) + pad.repeat(end - probe) + result.slice(start) + char
      index = end + 1
      filled = 0
      continue
    }

    result += fixed + char
    index = probe + 1

    if (isFixed(entry)) filled = 0
    else filled = fixed === '' ? filled + 1 : 1
  }

  return result
}

const wordStart = (value: string, from: number) => {
  let start = from
  while (start > 0 && !WORD.test(value[start - 1])) start--
  while (start > 0 && WORD.test(value[start - 1])) start--

  return start
}

const wordEnd = (value: string, from: number) => {
  let end = from
  while (end < value.length && !WORD.test(value[end])) end++
  while (end < value.length && WORD.test(value[end])) end++

  return end
}

const deletedRange = (field: TextState, type: string): readonly [number, number] => {
  const [from, to] = field.selection
  if (from !== to) return [from, to]

  if (type === 'deleteContentBackward') return [Math.max(from - 1, 0), from]
  if (type === 'deleteContentForward') return [from, Math.min(from + 1, field.value.length)]
  if (type === 'deleteWordBackward') return [wordStart(field.value, from), from]
  if (type === 'deleteWordForward') return [from, wordEnd(field.value, from)]
  if (BACKWARD.has(type)) return [0, from]

  return [from, field.value.length]
}

const insert = (field: TextState, typed: string, mask: readonly MaskEntry[], pad?: string): TextState => {
  const data = [...typed].filter((char) => fits(char, mask)).join('')
  if (!data) return field

  const { value } = field
  let [from, to] = field.selection
  if (from === to) {
    while (from < value.length && value[from] === mask[from] && !data.startsWith(value[from])) from++
    to = Math.min(from + data.length, value.length)
  }

  const raw = value.slice(0, from) + data + value.slice(to)
  const next = calibrateMask(raw, mask, pad)
  let caret = calibrateMask(raw.slice(0, from + data.length), mask, pad).length
  while (caret < next.length && isFixed(mask[caret])) caret++

  return { value: next, selection: collapsed(caret) }
}

const remove = (field: TextState, type: string, mask: readonly MaskEntry[], pad?: string): TextState => {
  const [from, to] = deletedRange(field, type)
  if (from === to) return field

  const raw = field.value.slice(0, from) + field.value.slice(to)
  const next = calibrateMask(raw, mask, pad)
  if (next === field.value) return { value: next, selection: collapsed(BACKWARD.has(type) ? from : to) }

  return { value: next, selection: collapsed(calibrateMask(raw.slice(0, from), mask, pad).length) }
}

/**
 * Applies an edit of the browser to a field the way the browser would,
 * without a mask. Returns `undefined` for an edit it does not apply, like an
 * undo.
 */
export const applyEdit = (field: TextState, edit: TextEdit): TextState | undefined => {
  if (INSERTS.has(edit.type)) {
    const [from, to] = field.selection

    return { value: field.value.slice(0, from) + edit.data + field.value.slice(to), selection: collapsed(from + edit.data.length) }
  }

  if (!edit.type.startsWith('delete')) return undefined

  const [from, to] = deletedRange(field, edit.type)

  return { value: field.value.slice(0, from) + field.value.slice(to), selection: collapsed(from) }
}

/**
 * Applies an edit of the browser to a field masked by `mask`, like the
 * `beforeinput` of the user would: typed characters replace the ones after
 * the caret, a fixed character is inserted before a character that follows
 * it, and deleting a fixed character only moves the caret. Returns
 * `undefined` for an edit it does not apply, like an undo.
 */
export const applyMaskEdit = (field: TextState, edit: TextEdit, mask: readonly MaskEntry[], pad?: string): TextState | undefined => {
  if (INSERTS.has(edit.type)) return insert(field, edit.data, mask, pad)
  if (edit.type.startsWith('delete')) return remove(field, edit.type, mask, pad)

  return undefined
}

/**
 * Calibrates a value the browser already changed, like after a composition
 * or an undo, keeping the caret after the same characters.
 */
export const calibrateMaskField = (field: TextState, mask: readonly MaskEntry[], pad?: string): TextState => {
  const caret = calibrateMask(field.value.slice(0, field.selection[1]), mask, pad).length

  return { value: calibrateMask(field.value, mask, pad), selection: collapsed(caret) }
}
