import { describe, expect, it } from 'vitest'
import { TextState } from '@vega-ui/core'
import { applyMaskEdit, calibrateMaskField } from '../templateMask'
import { getTemplateMask } from '../getTemplateMask'

const mask = getTemplateMask('HH:MM:SS', /[HMS]/)

const field = (shown: string): TextState => {
  const start = shown.indexOf('|')
  const end = shown.lastIndexOf('|')
  const value = shown.split('|').join('')

  return { value, selection: start === end ? [start, start] : [start, end - 1] }
}

const shown = ({ value, selection: [start, end] }: TextState) =>
  start === end ? `${value.slice(0, start)}|${value.slice(start)}` : `${value.slice(0, start)}|${value.slice(start, end)}|${value.slice(end)}`

const typed = (before: string, data: string) => shown(applyMaskEdit(field(before), { type: 'insertText', data }, mask)!)

const deleted = (before: string, type: string) => shown(applyMaskEdit(field(before), { type, data: '' }, mask)!)

describe('Critical User Paths', () => {
  it('puts a fixed character before a typed character that follows it', () => {
    expect(typed('09|', '3')).toBe('09:3|')
    expect(typed('|', '0930')).toBe('09:30|')
  })

  it('replaces the characters after the caret and steps over a fixed one under it', () => {
    expect(typed('|09:30:15', '1')).toBe('1|9:30:15')
    expect(typed('09|:30:15', '4')).toBe('09:4|0:15')
    expect(typed('09:3|0:15', '7')).toBe('09:37:|15')
  })

  it('replaces a selection with the typed characters', () => {
    expect(typed('0|9:3|0:15', '7')).toBe('07:|01:5')
  })

  it('completes a segment with the pad when a separator follows it, typed, pasted or changed by the browser', () => {
    expect(shown(applyMaskEdit(field('1|'), { type: 'insertText', data: ':' }, mask, '0')!)).toBe('01:|')
    expect(shown(applyMaskEdit(field('|'), { type: 'insertFromPaste', data: '9:5:7' }, mask, '0')!)).toBe('09:05:7|')
    expect(shown(calibrateMaskField(field('1:2|'), mask, '0'))).toBe('01:2|')
    expect(typed('1|', ':')).toBe('1|')
  })

  it('pads every free place of a longer segment and ignores a separator that starts one', () => {
    expect(shown(calibrateMaskField(field('7-|'), [/\d/, /\d/, /\d/, '-', /\d/], '0'))).toBe('007-|')
    expect(shown(applyMaskEdit(field('12:|'), { type: 'insertText', data: ':' }, mask, '0')!)).toBe('12:|')
  })

  it('shifts the characters after a deleted one', () => {
    expect(deleted('09:3|0:15', 'deleteContentBackward')).toBe('09:|01:5')
    expect(deleted('09:|30:15', 'deleteContentForward')).toBe('09:|01:5')
  })
})

describe('Edge Cases', () => {
  it('only moves the caret over a fixed character it deletes, unless nothing follows it', () => {
    expect(deleted('09:|30', 'deleteContentBackward')).toBe('09|:30')
    expect(deleted('09|:30', 'deleteContentForward')).toBe('09:|30')
    expect(deleted('09:|', 'deleteContentBackward')).toBe('09|')
  })

  it('leaves the field as it is for characters the mask has no place for', () => {
    expect(typed('|09:30', 'a')).toBe('|09:30')
    expect(typed('0|', ':')).toBe('0|')
    expect(typed('09:30:15|', '1')).toBe('09:30:15|')
  })

  it('deletes a word or a line from the caret', () => {
    expect(deleted('09:30|', 'deleteWordBackward')).toBe('09:|')
    expect(deleted('09:|30', 'deleteSoftLineBackward')).toBe('|30')
  })

  it('applies no edit it does not know, like an undo', () => {
    expect(applyMaskEdit(field('09|'), { type: 'historyUndo', data: '' }, mask)).toBeUndefined()
  })

  it('calibrates a value the browser already changed and keeps the caret after the same characters', () => {
    expect(shown(calibrateMaskField(field('0930|15'), mask))).toBe('09:30|:15')
  })
})
