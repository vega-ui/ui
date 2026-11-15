import { useSyncExternalStore } from 'react'
import { formatISODate, getCurrentDate } from '@vega-ui/utils'

const CHECK_INTERVAL_MS = 60_000

const listeners = new Set<() => void>()
let intervalId: number | undefined

const notify = () => listeners.forEach((listener) => listener())

const onVisibilityChange = () => {
  if (document.visibilityState === 'visible') notify()
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  if (listeners.size === 1) {
    intervalId = window.setInterval(notify, CHECK_INTERVAL_MS)
    document.addEventListener('visibilitychange', onVisibilityChange)
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size > 0) return

    window.clearInterval(intervalId)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }
}

const subscribeNone = () => () => {}

const getToday = () => formatISODate(getCurrentDate())
const getServerToday = () => undefined

export const useToday = (today?: string) => {
  const current = useSyncExternalStore(today === undefined ? subscribe : subscribeNone, getToday, getServerToday)

  return today ?? current
}
