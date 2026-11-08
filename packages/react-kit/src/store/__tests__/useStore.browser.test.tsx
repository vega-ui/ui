import { act, FC } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { createStore, Store } from '../createStore';
import { useStore } from '../useStore';

interface State {
  count: number
  name: string
}

describe('useStore', () => {
  it('re-renders with the new selection when the store changes', async () => {
    const store = createStore<State>({ count: 0, name: 'a' });
    const Count: FC = () => <span>{useStore(store, (state) => state.count)}</span>;

    const screen = await render(<Count />);
    act(() => store.set({ count: 1 }));

    await expect.element(screen.getByText('1')).toBeInTheDocument();
  });

  it('does not re-render when the selection stays the same', async () => {
    const store = createStore<State>({ count: 0, name: 'a' });
    let renders = 0;
    const Count: FC = () => {
      renders++;
      return <span>{useStore(store, (state) => state.count)}</span>;
    };

    await render(<Count />);
    const before = renders;
    act(() => store.set({ name: 'b' }));

    expect(renders).toBe(before);
  });

  it('settles with a selector that returns a new object', async () => {
    const store = createStore<State>({ count: 0, name: 'a' });
    const Count: FC = () => <span>{useStore(store, (state) => ({ count: state.count })).count}</span>;

    const screen = await render(<Count />);
    act(() => store.set({ count: 1 }));

    await expect.element(screen.getByText('1')).toBeInTheDocument();
  });

  it('applies a new selector without a store change', async () => {
    const store = createStore<State>({ count: 2, name: 'a' });
    const Count: FC<{ store: Store<State>, factor: number }> = ({ store, factor }) => (
      <span>{useStore(store, (state) => state.count * factor)}</span>
    );

    const screen = await render(<Count store={store} factor={1} />);
    await screen.rerender(<Count store={store} factor={3} />);

    await expect.element(screen.getByText('6')).toBeInTheDocument();
  });
});
