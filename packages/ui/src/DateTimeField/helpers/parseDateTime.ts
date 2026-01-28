import { MaskitoDateMode, maskitoParseDate } from '@maskito/kit';

interface ParseDateTimeOptions {
  format?: MaskitoDateMode,
  separator?: string
  min?: Date
  max?: Date
}

export const parseDateTime = (value: string, { format = 'dd/mm/yyyy', separator, min, max }: ParseDateTimeOptions) => {
  const trimmed = value.trim()
  const timeMatch = trimmed.match(/(\d{2}):(\d{2})(?::(\d{2}))?$/)
  
  const time = timeMatch
    ? `${timeMatch[1]}:${timeMatch[2]}:${timeMatch[3] ?? '00'}`
    : '00:00:00'
  
  const datePart = timeMatch
    ? trimmed.slice(0, timeMatch.index).trim()
    : trimmed
  
  const date = maskitoParseDate(datePart, {
    mode: format,
    separator,
    min,
    max,
  })
  
  if (!date) return {}
  
  return { date, time }
}