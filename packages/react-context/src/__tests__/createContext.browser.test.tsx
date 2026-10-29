import { FC } from 'react';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { createContext } from '../createContext';

interface Value {
  size: string
}

const [Provider, useValue] = createContext<Value>('Size', { size: 'md' });

const Consumer: FC<{ onValue: (value: Value) => void }> = ({ onValue }) => {
  onValue(useValue());
  return null;
};

describe('createContext', () => {
  it('returns the default value without a provider', async () => {
    let value: Value | undefined;

    await render(<Consumer onValue={(v) => { value = v; }} />);

    expect(value).toEqual({ size: 'md' });
  });

  it('provides the provider props as the value', async () => {
    let value: Value | undefined;

    await render(<Provider size='lg'><Consumer onValue={(v) => { value = v; }} /></Provider>);

    expect(value).toEqual({ size: 'lg' });
  });

  it('keeps the value identity while props are equal', async () => {
    const values: Value[] = [];
    const onValue = (v: Value) => { values.push(v); };

    const screen = await render(<Provider size='lg'><Consumer onValue={onValue} /></Provider>);
    await screen.rerender(<Provider size='lg'><Consumer onValue={onValue} /></Provider>);

    expect(values).toHaveLength(2);
    expect(values[1]).toBe(values[0]);
  });

  it('changes the value when a prop changes', async () => {
    const values: Value[] = [];
    const onValue = (v: Value) => { values.push(v); };

    const screen = await render(<Provider size='lg'><Consumer onValue={onValue} /></Provider>);
    await screen.rerender(<Provider size='sm'><Consumer onValue={onValue} /></Provider>);

    expect(values.at(-1)).toEqual({ size: 'sm' });
    expect(values.at(-1)).not.toBe(values[0]);
  });

  it('names the provider after the context', () => {
    expect(Provider.displayName).toBe('SizeProvider');
  });
});
