import { TextEdit, TextState } from '@vega-ui/core'
import { MaskEntry } from './templateMask'
import { wordEndAfter, wordStartBefore } from './wordRange'

export type PatternAction = 'insert' | 'deleteForward' | 'deleteBackward' | 'validation'

export interface Preprocessed {
  readonly field: TextState
  readonly data: string
}

export interface PatternRules {
  mask(field: TextState): readonly MaskEntry[]
  preprocess(field: TextState, data: string, action: PatternAction): Preprocessed
  postprocess(field: TextState, initial: TextState): TextState
}

type Selection = TextState['selection']

interface Model extends TextState {
  readonly unmasked: TextState
}

const CUT_OR_CHARACTER = new Set(['deleteByCut', 'deleteContentBackward', 'deleteContentForward'])

const LINE = new Set(['deleteHardLineBackward', 'deleteHardLineForward', 'deleteSoftLineBackward', 'deleteSoftLineForward'])

const WORD = new Set(['deleteWordBackward', 'deleteWordForward'])

const NATIVE = new Set(['insertReplacementText', 'insertCompositionText', 'insertLineBreak', 'insertParagraph', 'historyUndo', 'historyRedo'])


const isFixed = (entry: MaskEntry | undefined): entry is string => typeof entry === 'string'

const collapsed = (caret: number): Selection => [caret, caret]

const sameField = (first: TextState, second: TextState) =>
  first.value === second.value && first.selection[0] === second.selection[0] && first.selection[1] === second.selection[1]

const fitsMask = (value: string, mask: readonly MaskEntry[]) => {
  if (value.length !== mask.length) return false

  return Array.from(value).every((char, index) => {
    const entry = mask[index]
    if (isFixed(entry)) return char === entry

    return entry.test(char)
  })
}

const leadingFixed = (mask: readonly MaskEntry[], validated: string, char: string, initial: TextState | null) => {
  let leading = ''

  for (let index = validated.length; index < mask.length; index++) {
    const entry = mask[index]
    const existed = initial?.value[index] === entry
    if (!isFixed(entry)) return leading
    if (entry === char && !existed) return leading

    leading += entry
  }

  return leading
}

const guessByPattern = (field: TextState, mask: readonly MaskEntry[], initial: TextState | null): TextState => {
  let masked = ''
  let from: number | undefined
  let to: number | undefined

  Array.from(field.value).forEach((char, index) => {
    const leading = leadingFixed(mask, masked, char, initial)
    const withLeading = masked + leading
    const entry = mask[withLeading.length] ?? ''

    if (from === undefined && index >= field.selection[0]) from = withLeading.length
    if (to === undefined && index >= field.selection[1]) to = withLeading.length

    if (isFixed(entry)) {
      masked = withLeading + entry
      return
    }
    if (entry.test(char)) {
      masked = withLeading + char
      return
    }
    if (leading.startsWith(char)) masked = withLeading
  })

  const trailing = leadingFixed(mask, masked, '', initial)
  const value = fitsMask(masked + trailing, mask) ? masked + trailing : masked

  return { value, selection: [from ?? masked.length, to ?? masked.length] }
}

const calibrateByMask = (field: TextState, mask: readonly MaskEntry[], initial: TextState | null = null): TextState => {
  if (fitsMask(field.value, mask)) return field

  const guessed = guessByPattern(field, mask, initial)

  return { value: guessed.value.slice(0, mask.length), selection: guessed.selection }
}

const withoutFixed = (field: TextState, mask: readonly MaskEntry[]): TextState => {
  const [from, to] = field.selection
  const selection: number[] = []
  let unmasked = ''

  Array.from(field.value).forEach((char, index) => {
    if (index === from) selection.push(unmasked.length)
    if (index === to) selection.push(unmasked.length)
    if (mask[index] !== char) unmasked += char
  })

  while (selection.length < 2) selection.push(unmasked.length)

  return { value: unmasked, selection: [selection[0], selection[1]] }
}

const modelOf = (field: TextState, rules: PatternRules): Model => {
  const mask = rules.mask(field)
  const calibrated = calibrateByMask(field, mask)

  return { ...calibrated, unmasked: withoutFixed(calibrated, mask) }
}

const addCharacters = (model: Model, data: string, rules: PatternRules): TextState | undefined => {
  const { value, unmasked } = model
  const [from, to] = model.selection
  const initial = { value, selection: model.selection }
  const mask = rules.mask({ value: value.slice(0, from) + data + value.slice(to), selection: collapsed(from + data.length) })

  const [unmaskedFrom, unmaskedTo] = unmasked.selection
  const leadingPart = unmasked.value.slice(0, unmaskedFrom) + data
  const caret = collapsed(leadingPart.length)
  const masked = calibrateByMask({ value: leadingPart + unmasked.value.slice(unmaskedTo), selection: caret }, mask, initial)

  const previousLeading = value.slice(0, from)
  const leading = calibrateByMask({ value: leadingPart, selection: caret }, mask, initial)
  const shrunk = leading.value.length < previousLeading.length && withoutFixed(leading, mask).value === unmasked.value.slice(0, unmaskedFrom)
  if (leading.value === previousLeading || shrunk) return undefined
  if (sameField(model, masked)) return undefined

  return masked
}

const deleteCharacters = (model: Model, rules: PatternRules): TextState => {
  const { value, unmasked } = model
  const [from, to] = model.selection
  if (from === to || to === 0) return model

  const mask = rules.mask({ value: value.slice(0, from) + value.slice(to), selection: collapsed(from) })
  const [unmaskedFrom, unmaskedTo] = unmasked.selection
  const rest = unmasked.value.slice(0, unmaskedFrom) + unmasked.value.slice(unmaskedTo)

  return calibrateByMask({ value: rest, selection: collapsed(unmaskedFrom) }, mask, { value, selection: model.selection })
}

const notEmptySelection = ({ value, selection }: TextState, forward: boolean): Selection => {
  const [from, to] = selection
  if (from !== to) return selection

  const widened = forward ? [from, to + 1] : [from - 1, to]
  const [start, end] = widened.map((position) => Math.min(Math.max(position, 0), value.length))

  return [start, end]
}

const lineSelection = ({ value, selection }: TextState, forward: boolean): Selection => {
  const [from, to] = selection
  if (from !== to) return selection
  if (forward) return [from, value.slice(from).indexOf('\n') + 1 || value.length]

  return [value.slice(0, to).lastIndexOf('\n') + 1, to]
}

const wordSelection = ({ value, selection }: TextState, forward: boolean): Selection => {
  const [from, to] = selection
  if (from !== to) return selection

  return forward ? [from, wordEndAfter(value, from)] : [wordStartBefore(value, to), to]
}

const deletedSelection = (field: TextState, type: string, forward: boolean): Selection => {
  if (LINE.has(type)) return lineSelection(field, forward)
  if (WORD.has(type)) return wordSelection(field, forward)

  return notEmptySelection(field, forward)
}

const insert = (field: TextState, data: string, rules: PatternRules): TextState => {
  const preprocessed = rules.preprocess(field, data, 'insert')
  const added = addCharacters(modelOf(preprocessed.field, rules), preprocessed.data, rules)
  if (!added) return field

  return rules.postprocess(added, field)
}

const remove = (field: TextState, type: string, rules: PatternRules): TextState => {
  const forward = type.includes('Forward')
  const initial = { value: field.value, selection: deletedSelection(field, type, forward) }
  const preprocessed = rules.preprocess(initial, '', forward ? 'deleteForward' : 'deleteBackward')
  const deleted = deleteCharacters(modelOf(preprocessed.field, rules), rules)
  const next = rules.postprocess(deleted, initial)

  const unchanged = [preprocessed.field, deleted, next].every((state) => state.value === initial.value)
  if (!unchanged) return next

  const [from, to] = preprocessed.field.selection

  return { value: field.value, selection: collapsed(forward ? to : from) }
}

/**
 * Applies an edit of the browser to a field masked by a pattern that typed
 * characters shift, like the `beforeinput` of the user would. Deleting only
 * fixed characters moves the caret over them. Returns `undefined` for an edit
 * the browser applies itself, like a replacement of a spell checker, to be
 * calibrated after it.
 */
export const applyPatternEdit = (field: TextState, edit: TextEdit, rules: PatternRules): TextState | undefined => {
  if (NATIVE.has(edit.type)) return undefined
  if (CUT_OR_CHARACTER.has(edit.type) || LINE.has(edit.type) || WORD.has(edit.type)) return remove(field, edit.type, rules)

  return insert(field, edit.data, rules)
}

/**
 * Calibrates a value by a pattern, like after autofill or for a text set
 * without an edit.
 */
export const calibratePattern = (field: TextState, rules: PatternRules): TextState => {
  const preprocessed = rules.preprocess(field, '', 'validation')

  return rules.postprocess(modelOf(preprocessed.field, rules), field)
}
