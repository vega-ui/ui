import { FC } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { createRegistry, Registry, RegistryItem } from '../createRegistry';
import { useRegistryItem } from '../useRegistryItem';

interface Data {
  label: string
}

type Item = RegistryItem & Data

const Entry: FC<{ registry: Registry<Item>, id: string, label: string }> = ({ registry, id, label }) => {
  const ref = useRegistryItem<Data, HTMLDivElement>(registry, id, { label });
  return <div ref={ref}>{label}</div>;
};

describe('useRegistryItem', () => {
  it('registers the element on mount and unregisters it on unmount', async () => {
    const registry = createRegistry<Item>();

    const screen = await render(<Entry registry={registry} id='a' label='Alpha' />);
    expect(registry.getItem('a')?.element).toBe(screen.getByText('Alpha').element());

    await screen.unmount();
    expect(registry.getItem('a')).toBeUndefined();
  });

  it('keeps the same item with fresh data when the data changes', async () => {
    const registry = createRegistry<Item>();

    const screen = await render(<Entry registry={registry} id='a' label='Alpha' />);
    const item = registry.getItem('a');
    await screen.rerender(<Entry registry={registry} id='a' label='Beta' />);

    expect(registry.getItem('a')).toBe(item);
    expect(item?.label).toBe('Beta');
  });
});
