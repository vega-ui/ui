'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { EXAMPLES } from '@/generated/examples';
import type { Scheme } from '@/lib/theme';
import styles from './HeroShowcase.module.css';

const DESKTOP_WIDTH = 1200;
const MOBILE_WIDTH = 390;
const MAX_MARKS = 24;
const TARGETS = 'h1, h2, h3, form, [role="radiogroup"], [role="listbox"], [role="option"], [role="combobox"], [role="switch"], [role="status"], [popover], dialog, textarea, input:not([type="radio"]), button, time';

interface Mark {
  label: string
  nested: boolean
  repeat: boolean
  top: number
  left: number
  width: number
  height: number
}

interface HeroShowcaseProps {
  name: string
  scheme: Scheme
  style: CSSProperties
  tuned: boolean
  dir: string
  inspect: boolean
  watch: unknown
}

const describe = (element: Element) => {
  const role = element.getAttribute('role');
  const radios = element.querySelectorAll('input[type="radio"]').length;
  if (role === 'radiogroup' && radios > 0) return `role="radiogroup" · ${radios} × <input type="radio">`;
  if (role) return `role="${role}"`;

  const type = element.getAttribute('type');
  const tag = element.tagName.toLowerCase();
  if (tag === 'input' && type) return `<input type="${type}">`;

  return `<${tag}>`;
};

const target = (element: Element) => {
  if (element.matches('input[type="checkbox"]')) return element.closest('label') ?? element;

  return element;
};

export const HeroShowcase = ({ name, scheme, style, tuned, dir, inspect, watch }: HeroShowcaseProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [marks, setMarks] = useState<Mark[]>([]);
  const Template = EXAMPLES[`templates/${name}.tsx`];

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = ref.current;
    const canvas = canvasRef.current;
    if (!inspect || !viewport || !canvas) return;

    const measure = () => {
      const bounds = viewport.getBoundingClientRect();
      const picked: { element: Element, box: Element }[] = [];

      for (const element of canvas.querySelectorAll(TARGETS)) {
        if (picked.length === MAX_MARKS) break;

        const box = target(element);
        const rect = box.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) continue;
        if (rect.top < bounds.top || rect.top > bounds.bottom - 64) continue;
        if (picked.some((other) => other.box === box)) continue;

        picked.push({ element, box });
      }

      const labels = new Set<string>();

      setMarks(picked.map(({ element, box }) => {
        const rect = box.getBoundingClientRect();
        const nested = picked.some((other) => other.box !== box && other.box.contains(box));
        const label = describe(element);
        const repeat = nested && labels.has(label);
        labels.add(label);

        return { label, nested, repeat, top: rect.top - bounds.top, left: rect.left - bounds.left, width: rect.width, height: rect.height };
      }));
    };

    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [inspect, width, dir, watch]);

  const canvas = width < 640 ? MOBILE_WIDTH : DESKTOP_WIDTH;
  const scale = Math.min(1, width / canvas);

  return (
    <div className={`${styles.window} ${scheme}`} style={style} data-tuned={tuned}>
      <div className={styles.bar}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div ref={ref} className={styles.viewport}>
        {Template && width > 0 && (
          <div ref={canvasRef} dir={dir} lang='en' data-size={canvas === MOBILE_WIDTH ? 'mobile' : 'desktop'} className={styles.canvas} style={{ width: canvas, transform: `scale(${scale})` }}>
            <Template />
          </div>
        )}
        {inspect && marks.map((mark) => (
          <div key={`${mark.label}-${mark.top}-${mark.left}`} data-nested={mark.nested} className={styles.mark} style={{ top: mark.top, left: mark.left, width: mark.width, height: mark.height }}>
            {!mark.repeat && <span className={styles.markLabel}>{mark.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
