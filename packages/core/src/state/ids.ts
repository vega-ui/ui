export interface Identified {
  readonly id: string
}

const escape = (key: unknown) => String(key).replace(/[^A-Za-z0-9-]/g, (char) => `_${char.charCodeAt(0).toString(16)}_`)

const segmentOf = (key: unknown) => (typeof key === 'number' ? `_${escape(key)}` : escape(key))

export const idOf = (state: Identified, part: string, key?: unknown): string => (key === undefined ? `${state.id}-${part}` : `${state.id}-${part}-${segmentOf(key)}`)
