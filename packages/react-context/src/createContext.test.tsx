import React, { useEffect } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createContext } from './createContext';

describe('createContext', () => {
  it('sets displayName for Context and Provider', () => {
    const [Provider] = createContext('Test', { a: 1 });
    
    expect(Provider.displayName).toBe('TestProvider');
  });
  
  it('useContext returns provided context value', () => {
    const [Provider, useCtx] = createContext('Foo', { a: 0 });
    
    const Consumer = () => {
      const ctx = useCtx();
      return <div data-testid='v'>{String(ctx.a)}</div>;
    };
    
    render(
      <Provider a={123}>
        <Consumer />
        </Provider>,
    );
    
    expect(screen.getByTestId('v').textContent).toBe('123');
  });
  
  it('useContext returns defaultContext when Provider is not used and defaultContext is defined', () => {
    const [, useCtx] = createContext('Foo', { a: 777 });
    
    const Consumer = () => {
      const ctx = useCtx();
      return <div data-testid='v'>{String(ctx.a)}</div>;
    };
    
    render(<Consumer />);
    expect(screen.getByTestId('v').textContent).toBe('777');
  });
  
  it('memoizes value: same prop references -> stable context reference', () => {
    const [Provider, useCtx] = createContext<{ x: number }>('Foo', { x: 0 });
    
    const obj = { x: 1 };
    const collect = vi.fn<(v: { x: number }) => void>();
    
    const Consumer = () => {
      const ctx = useCtx();
      useEffect(() => {
        collect(ctx);
      }, [ctx]);
      return null;
    };
    
    const { rerender } = render(
      <Provider {...obj}>
        <Consumer />
        </Provider>,
    );
    
    rerender(
      <Provider {...obj}>
        <Consumer />
        </Provider>,
    );
    
    expect(collect).toHaveBeenCalledTimes(1);
    expect(collect.mock.calls[0][0]).toStrictEqual(obj);
  });
  
  it('re-memoizes value when a prop reference changes', () => {
    const [Provider, useCtx] = createContext<{ x: number }>('Foo', { x: 0 });
    
    const collect = vi.fn<(v: { x: number }) => void>();
    
    const Consumer = () => {
      const ctx = useCtx();
      useEffect(() => collect(ctx), [ctx]);
      return null;
    };
    
    const { rerender } = render(
      <Provider x={0}>
        <Consumer />
      </Provider>,
    );
    
    rerender(
      <Provider x={1}>
        <Consumer />
      </Provider>
    );
    
    expect(collect).toHaveBeenCalledTimes(2);
    expect(collect.mock.calls[0][0]).toStrictEqual({ x: 0 });
    expect(collect.mock.calls[1][0]).toStrictEqual({ x: 1 });
  });
  
  it('does not include children into context value', () => {
    const [Provider, useCtx] = createContext<{ x: number }>('Foo', { x: 0 });
    
    const Consumer = () => {
      const ctx = useCtx();
      return (
        <div data-testid='hasChildren'>
          {String(Object.prototype.hasOwnProperty.call(ctx, 'children'))}
        </div>
      );
    };
    
    render(
      <Provider x={0}>
        <Consumer />
      </Provider>
    );
    
    expect(screen.getByTestId('hasChildren').textContent).toBe('false');
  });
});
