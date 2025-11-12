import { useEffect, useState } from 'react'

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Callback that receives all intersection entries.
   */
  onChange?: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
}

/**
 * useIntersectionObserver
 *
 * @example
 * const io = useIntersectionObserver({
 *   threshold: [0, 0.5, 1],
 *   onChange: entries => console.log(entries[0].isIntersecting),
 * })
 */
export const useIntersectionObserver = (
  { onChange, root, rootMargin, threshold }: UseIntersectionObserverOptions = {}
): IntersectionObserver | null => {
  const [io, setIo] = useState<IntersectionObserver | null>(null)
  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, obs) => {
        onChange?.(entries, obs)
      },
      { root, rootMargin, threshold }
    )
    setIo(intersectionObserver)
    
    return () => {
      intersectionObserver.disconnect()
      setIo(null)
    }
  }, [root, rootMargin, threshold, onChange])

  return io
}
