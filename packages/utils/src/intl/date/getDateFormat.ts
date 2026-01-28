export const getDateFormat = (locale?: string) => {
  const parts = new Intl.DateTimeFormat(locale).formatToParts(new Date(1970, 0, 2))
  
  return parts.map(p => {
    if (p.type === 'day') return 'DD'
    if (p.type === 'month') return 'MM'
    if (p.type === 'year') return 'YYYY'
    return p.value
  }).join('')
}