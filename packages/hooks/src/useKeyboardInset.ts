import { useEffect, useState } from 'react'

/**
 * Returns how many pixels at the bottom of the window the visual viewport
 * leaves uncovered, such as by an on-screen keyboard that overlays the page.
 */
export const useKeyboardInset = () => {
  const [inset, setInset] = useState(0)

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) return

    const update = () => {
      setInset(Math.max(0, Math.round(window.innerHeight - viewport.height - viewport.offsetTop)))
    }

    const controller = new AbortController()

    update()
    viewport.addEventListener('resize', update, { signal: controller.signal })
    viewport.addEventListener('scroll', update, { signal: controller.signal })

    return () => controller.abort()
  }, [])

  return inset
}
