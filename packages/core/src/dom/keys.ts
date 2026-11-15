import { createInput, Input, ModName } from '../input'

const isLatinLetter = (key: string) => key.length === 1 && key >= 'a' && key <= 'z'

const nameOf = ({ key, code, ctrlKey, metaKey }: KeyboardEvent) => {
  const lower = key.length === 1 ? key.toLowerCase() : key
  if (key === 'Spacebar') return ' '
  if (!ctrlKey && !metaKey) return lower
  if (key.length !== 1 || isLatinLetter(lower)) return lower
  if (!code?.startsWith('Key')) return lower

  return code.slice(3).toLowerCase()
}

export const modsOf = (event: KeyboardEvent): ReadonlySet<ModName> => {
  const mods = new Set<ModName>()
  if (event.shiftKey) mods.add('shift')
  if (event.altKey) mods.add('alt')
  if (event.ctrlKey || event.metaKey) mods.add('mod')

  return mods
}

export const isComposing = (event: KeyboardEvent) => event.isComposing === true || event.keyCode === 229

export const keyInput = (event: KeyboardEvent): Input => {
  const char = [...event.key].length === 1 ? event.key : undefined

  return createInput({ type: 'key', name: nameOf(event), mods: modsOf(event) }, { char })
}
