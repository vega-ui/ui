import { describe, expect, it, onTestFinished } from 'vitest';
import { createRegistry } from '../createRegistry';

const createElements = (count: number) => {
  const parent = document.createElement('div');
  document.body.append(parent);
  onTestFinished(() => parent.remove());

  return Array.from({ length: count }, () => parent.appendChild(document.createElement('div')));
};

describe('createRegistry', () => {
  it('returns the items in the DOM order, not in the registration order', () => {
    const [first, second, third] = createElements(3);
    const registry = createRegistry();

    registry.register({ id: 'c', element: third });
    registry.register({ id: 'a', element: first });
    registry.register({ id: 'b', element: second });

    expect(registry.getItems().map((item) => item.id)).toEqual(['a', 'b', 'c']);
  });

  it('finds an item by id until it is unregistered', () => {
    const [element] = createElements(1);
    const registry = createRegistry();
    const item = { id: 'a', element };

    const unregister = registry.register(item);
    expect(registry.getItem('a')).toBe(item);

    unregister();
    expect(registry.getItem('a')).toBeUndefined();
    expect(registry.getItems()).toEqual([]);
  });
});
