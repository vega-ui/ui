import { useEffect, useState } from 'react';

export const useResize = () => {
  const [height, setHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 0);
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0)

  useEffect(() => {
    const controller = new AbortController()

    const onChange = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    if (height === 0 || width === 0) onChange()

    window.addEventListener('resize', onChange, { signal: controller.signal })

    return () => {
      controller.abort()
    }
  }, [])

  return { height, width }
}