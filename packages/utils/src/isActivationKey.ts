export const isActivationKey = (event: { key: string, altKey: boolean, ctrlKey: boolean, metaKey: boolean }) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return false

  return event.key === 'Enter' || event.key === ' '
}
