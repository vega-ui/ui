export const inDatesRange = (range: [Date | null, Date | null], value: Date | undefined | null) => {
  if (!value || !range[0] || !range[1]) return false
  
  return value >= range[0] && value <= range[1]
}