import { controlled, defineWidget, internal, matching, ROOT, state } from '@vega-ui/core'
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { formatTemplateDate, getDateTemplate, normalizeTemplateDate, parseTemplateDate } from '@vega-ui/utils'
import { getTemplateMask, maskedField, PendingText, templateEditing } from '../mask'
import { CalendarDatesDisabled, getDateFieldInvalidity } from '../dates'

export const dateFieldShape = state({
  options: {
    format: 'dd.MM.yyyy',
    separator: '.',
    calendar: gregorianCalendar as CalendarSystem,
    today: undefined as string | undefined,
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    disabledDates: undefined as CalendarDatesDisabled | undefined,
  },
  owns: { value: controlled('') },
  follows: ['format', 'separator', 'calendar', 'today'],
  internal: { text: internal(''), pending: internal(undefined as PendingText | undefined), committed: internal(''), touched: internal(false) },
  observes: { readOnly: matching(ROOT, '[readonly]') },
  parts: [ROOT],
})

type DateFieldSnapshot = typeof dateFieldShape.__snapshot

const templateOf = (state: DateFieldSnapshot) => getDateTemplate(state.options.format, state.options.separator)

const dateField = maskedField<DateFieldSnapshot, string, string>({
  text: dateFieldShape.text,
  value: dateFieldShape.value,
  pending: dateFieldShape.pending,
  committed: dateFieldShape.committed,
  touched: dateFieldShape.touched,
  ...templateEditing<DateFieldSnapshot>((state) => getTemplateMask(templateOf(state), /[dmy]/), (state, shown) => {
    const { calendar, today } = state.options

    return normalizeTemplateDate(calendar, shown, templateOf(state), { referenceDate: today })
  }),
  parse: (state, shown) => parseTemplateDate(state.options.calendar, shown, templateOf(state), state.options.today) ?? '',
  format: (state, date) => (date ? formatTemplateDate(state.options.calendar, date, templateOf(state)) : ''),
  picked: (state, date) => formatTemplateDate(state.options.calendar, date, templateOf(state)),
})

export const { defaultTextOf, pick: PICK_VALUE } = dateField

export const dateFieldWidget = defineWidget({
  state: dateFieldShape,

  step: dateField.steps,

  output: {
    root: {
      ...dateFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
      props: dateFieldShape.part(
        (state) => [state.text, state.value, state.options] as const,
        ([text, value, options]) => ({ invalidAs: getDateFieldInvalidity(text, [value], options) }),
      ),
    },
  },
})
