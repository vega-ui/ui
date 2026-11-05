import { useEffect, useRef, useState } from 'react';
import { Slot } from '@vega-ui/react';

export default function MergeRules() {
  const slotRef = useRef<HTMLElement>(null);
  const childRef = useRef<HTMLAnchorElement>(null);
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    const node = childRef.current;
    if (node === null) return;

    setResult([
      `id: ${node.id}`,
      `class: ${node.className}`,
      `title: ${node.title}`,
      `style: ${node.getAttribute('style')}`,
      `both refs point to the same node: ${slotRef.current === node}`,
    ]);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)', width: '100%' }}>
      <Slot
        ref={slotRef}
        id='from-slot'
        className='from-slot'
        title='from slot'
        style={{ color: 'var(--color-primary-500)', fontWeight: 600 }}
      >
        <a
          ref={childRef}
          href='/changelog'
          id='from-child'
          className='from-child'
          title='from child'
          style={{ fontWeight: 400 }}
        >
          Changelog
        </a>
      </Slot>
      <ul aria-label='Rendered attributes' style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)', color: 'var(--label-secondary)', fontSize: 'var(--font-size-2)', fontFamily: 'var(--code-font-family)', overflowWrap: 'anywhere' }}>
        {result.map((line) => <li key={line}>{line}</li>)}
      </ul>
    </div>
  );
}
