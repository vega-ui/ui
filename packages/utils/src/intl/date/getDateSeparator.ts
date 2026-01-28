export const getDateSeparator = (locale?: string) => {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(
    new Date(2000, 0, 2)
  )
  
  const literal = parts.find(p => p.type === 'literal')
  return literal?.value ?? '/'
}