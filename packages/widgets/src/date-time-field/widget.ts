import { controlled, defineWidget, internal, matching, ROOT, state } from '@vega-ui/core'
import { CalendarSystem, gregorianCalendar } from '@vega-ui/i18n'
import { formatTemplateDate, getDateTimeTemplate, getISOTimePart, normalizeTemplateDate, parseTemplateDate, stepTimeSegment } from '@vega-ui/utils'
import { getTemplateMask, maskedField, PendingText, templateEditing } from '../mask'
import { CalendarDatesDisabled, getDateFieldInvalidity } from '../dates'

export const dateTimeFieldShape = state({
  options: {
    dateFormat: 'dd.MM.yyyy',
    dateSeparator: '.',
    separator: ', ',
    timeFormat: 'HH:mm' as 'HH:mm' | 'HH:mm:ss',
    timeStep: 1,
    calendar: gregorianCalendar as CalendarSystem,
    today: undefined as string | undefined,
    min: undefined as string | undefined,
    max: undefined as string | undefined,
    disabledDates: undefined as CalendarDatesDisabled | undefined,
  },
  owns: { value: controlled('') },
  follows: ['dateFormat', 'dateSeparator', 'separator', 'timeFormat', 'calendar', 'today'],
  internal: { text: internal(''), pending: internal(undefined as PendingText | undefined), committed: internal(''), touched: internal(false) },
  observes: { readOnly: matching(ROOT, '[readonly]') },
  parts: [ROOT],
})

type DateTimeFieldSnapshot = typeof dateTimeFieldShape.__snapshot

const templateOf = (state: DateTimeFieldSnapshot) => getDateTimeTemplate(state.options)

const dateTimeField = maskedField<DateTimeFieldSnapshot, string, string>({
  text: dateTimeFieldShape.text,
  value: dateTimeFieldShape.value,
  pending: dateTimeFieldShape.pending,
  committed: dateTimeFieldShape.committed,
  touched: dateTimeFieldShape.touched,
  ...templateEditing<DateTimeFieldSnapshot>((state) => getTemplateMask(templateOf(state), /[dmyHMS]/), (state, shown) => {
    const { calendar, today } = state.options

    return normalizeTemplateDate(calendar, shown, templateOf(state), { referenceDate: today })
  }),
  parse: (state, shown) => parseTemplateDate(state.options.calendar, shown, templateOf(state), state.options.today) ?? '',
  format: (state, dateTime) => (dateTime ? formatTemplateDate(state.options.calendar, dateTime, templateOf(state)) : ''),
  stepped: (state, field, direction) => {
    if (!state.options.timeStep) return undefined

    const [position] = field.selection
    const value = stepTimeSegment(field.value, templateOf(state), position, direction, state.options.timeStep)
    if (value === undefined) return undefined

    const { calendar, today, min, max } = state.options
    const dateTime = parseTemplateDate(calendar, value, templateOf(state), today)
    if (dateTime && min && dateTime < min) return { value: formatTemplateDate(calendar, min, templateOf(state)), selection: [position, position] }
    if (dateTime && max && dateTime > max) return { value: formatTemplateDate(calendar, max, templateOf(state)), selection: [position, position] }

    return { value, selection: [position, position] }
  },
  picked: (state, picked) => {
    if (getISOTimePart(picked)) return formatTemplateDate(state.options.calendar, picked, templateOf(state))

    const time = getISOTimePart(state.value) ?? '00:00:00'

    return formatTemplateDate(state.options.calendar, `${picked}T${time}`, templateOf(state))
  },
})

export const { defaultTextOf, pick: PICK_VALUE } = dateTimeField

export const timeOf = (state: DateTimeFieldSnapshot) => getISOTimePart(state.value) ?? ''

export const dateTimeFieldWidget = defineWidget({
  state: dateTimeFieldShape,

  step: dateTimeField.steps,

  output: {
    root: {
      ...dateTimeFieldShape.part((state) => [state.touched] as const, ([touched]) => ({ 'data-user-edited': touched || undefined })),
      props: dateTimeFieldShape.part(
        (state) => [state.text, state.value, state.options] as const,
        ([text, value, options]) => ({ invalidAs: getDateFieldInvalidity(text, [value], { ...options, type: 'datetime-local' }) }),
      ),
    },
  },
})
