'use client';

import { useEffect, useRef, useState } from 'react';
import { EXAMPLES } from '@/generated/examples';
import styles from './TemplateThumbnail.module.css';

const CANVAS_WIDTH = 1040;

export const TemplateThumbnail = ({ name }: { name: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [near, setNear] = useState(false);
  const Template = EXAMPLES[`templates/${name}.tsx`];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / CANVAS_WIDTH));
    observer.observe(element);

    const visibility = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      setNear(true);
      visibility.disconnect();
    }, { rootMargin: '400px 0px' });
    visibility.observe(element);

    return () => {
      observer.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={styles.thumbnail} aria-hidden='true'>
      {Template && near && scale > 0 && (
        <div inert dir='ltr' lang='en' className={styles.canvas} style={{ width: CANVAS_WIDTH, transform: `scale(${scale})` }}>
          <Template />
        </div>
      )}
    </div>
  );
};
