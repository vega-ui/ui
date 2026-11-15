import { controlled, defineWidget, internal, matching, ROOT, state } from '@vega-ui/core'
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { formatTemplateRange, getDateTemplate, normalizeTemplateDate, parseTemplateDate, parseTemplateRange } from '@vega-ui/utils'
import { getTemplateMask, maskedField, PendingText, templateEditing } from '../mask'
import { CalendarDatesDisabled, getDateFieldInvalidity } from '../dates'

export type DateRange = [start: string, end: string]

export const dateRangeFieldShape = state({
  options: {
    format: 'dd.MM.yyyy',
    separator: '.',
    rangeSeparator: ' – ',
    calendar: gregorianCalendar as CalendarSystem,
    today: undefined as string | undefined,
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    disabledDates: undefined as CalendarDatesDisabled | undefined,
  },
  owns: { value: controlled<DateRange>(['', '']) },
  follows: ['format', 'separator', 'rangeSeparator', 'calendar', 'today'],
  internal: { text: internal(''), pending: internal(undefined as PendingText | undefined), committed: internal(''), touched: internal(false) },
  observes: { readOnly: matching(ROOT, '[readonly]') },
  parts: [ROOT],
})

type DateRangeFieldSnapshot = typeof dateRangeFieldShape.__snapshot

const templateOf = (state: DateRangeFieldSnapshot) => getDateTemplate(state.options.format, state.options.separator)

const normalizedRange = (state: DateRangeFieldSnapshot, shown: string) => {
  const { calendar, today, rangeSeparator } = state.options
  const template = templateOf(state)
  const options = { referenceDate: today }

  const start = normalizeTemplateDate(calendar, shown.slice(0, template.length), template, options)
  const middle = shown.slice(template.length, template.length + rangeSeparator.length)
  const end = normalizeTemplateDate(calendar, shown.slice(template.length + rangeSeparator.length), template, options)

  const startDate = parseTemplateDate(calendar, start, template, today)
  const endDate = parseTemplateDate(calendar, end, template, today)
  const reversed = startDate !== undefined && endDate !== undefined && startDate > endDate
  if (reversed) return end + middle + start

  return start + middle + end
}

const maskOf = (state: DateRangeFieldSnapshot) => {
  const dateMask = getTemplateMask(templateOf(state), /[dmy]/)

  return [...dateMask, ...Array.from(state.options.rangeSeparator), ...dateMask]
}

const dateRangeField = maskedField<DateRangeFieldSnapshot, DateRange, DateRange>({
  text: dateRangeFieldShape.text,
  value: dateRangeFieldShape.value,
  pending: dateRangeFieldShape.pending,
  committed: dateRangeFieldShape.committed,
  touched: dateRangeFieldShape.touched,
  ...templateEditing<DateRangeFieldSnapshot>(maskOf, normalizedRange),
  parse: (state, shown) => parseTemplateRange(state.options.calendar, shown, templateOf(state), state.options.rangeSeparator, state.options.today),
  format: (state, range) => formatTemplateRange(state.options.calendar, range, templateOf(state), state.options.rangeSeparator),
  same: (first, second) => first[0] === second[0] && first[1] === second[1],
  picked: (state, range) => formatTemplateRange(state.options.calendar, range, templateOf(state), state.options.rangeSeparator),
})

export const { defaultTextOf, pick: PICK_VALUE } = dateRangeField

export const dateRangeFieldWidget = defineWidget({
  state: dateRangeFieldShape,

  step: dateRangeField.steps,

  output: {
    root: {
      ...dateRangeFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
      props: dateRangeFieldShape.part(
        (state) => [state.text, state.value, state.options] as const,
        ([text, value, options]) => ({ invalidAs: getDateFieldInvalidity(text, value, options) }),
      ),
    },
  },
})
