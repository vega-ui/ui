import { controlled, defineWidget, internal, matching, ROOT, state } from '@vega-ui/core'
import { formatTemplateTime, getTimeTemplate, isISOTime, normalizeTemplateTime, parseTemplateTime, stepTimeSegment } from '@vega-ui/utils'
import { getTemplateMask, maskedField, PendingText, templateEditing } from '../mask'
import { getDateFieldInvalidity } from '../dates'

export const timeFieldShape = state({
  options: {
    format: 'HH:mm' as 'HH:mm' | 'HH:mm:ss',
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    step: 1,
  },
  owns: { value: controlled('') },
  follows: ['format'],
  internal: { text: internal(''), pending: internal(undefined as PendingText | undefined), committed: internal(''), touched: internal(false) },
  observes: { readOnly: matching(ROOT, '[readonly]') },
  parts: [ROOT],
})

type TimeFieldSnapshot = typeof timeFieldShape.__snapshot

const templateOf = (state: TimeFieldSnapshot) => getTimeTemplate(state.options.format)

const boundsOf = ({ min, max }: TimeFieldSnapshot['options']) => ({ min: isISOTime(min) ? min : undefined, max: isISOTime(max) ? max : undefined })

const timeField = maskedField<TimeFieldSnapshot, string, string>({
  text: timeFieldShape.text,
  value: timeFieldShape.value,
  pending: timeFieldShape.pending,
  committed: timeFieldShape.committed,
  touched: timeFieldShape.touched,
  ...templateEditing<TimeFieldSnapshot>((state) => getTemplateMask(templateOf(state), /[HMS]/), (state, shown) => normalizeTemplateTime(shown, templateOf(state))),
  parse: (state, shown) => parseTemplateTime(shown, templateOf(state)) ?? '',
  format: (state, time) => (time ? formatTemplateTime(time, templateOf(state)) : ''),
  stepped: (state, field, direction) => {
    if (!state.options.step) return undefined

    const [position] = field.selection
    const value = stepTimeSegment(field.value, templateOf(state), position, direction, state.options.step)
    if (value === undefined) return undefined

    const time = parseTemplateTime(value, templateOf(state))
    const { min, max } = boundsOf(state.options)
    if (time && min && time < min) return { value: formatTemplateTime(min, templateOf(state)), selection: [position, position] }
    if (time && max && time > max) return { value: formatTemplateTime(max, templateOf(state)), selection: [position, position] }

    return { value, selection: [position, position] }
  },
  picked: (state, time) => formatTemplateTime(time, templateOf(state)),
})

export const { defaultTextOf, pick: PICK_VALUE } = timeField

export const timeFieldWidget = defineWidget({
  state: timeFieldShape,

  step: timeField.steps,

  output: {
    root: {
      ...timeFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
      props: timeFieldShape.part(
        (state) => [state.text, state.value, state.options] as const,
        ([text, value, options]) => ({ invalidAs: getDateFieldInvalidity(text, [value], { ...boundsOf(options), type: 'time' }) }),
      ),
    },
  },
})
