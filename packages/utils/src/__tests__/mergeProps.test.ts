import { describe, expect, test } from 'vitest'
import { mergeProps } from '../mergeProps';

describe('mergeProps', () => {
  test('merges className strings', () => {
    const result = mergeProps(
      { className: 'foo' },
      { className: 'bar' },
      { className: 'baz' }
    );
    expect(result.className).toBe('foo bar baz');
  });

  test('merges event handlers and calls them in order', () => {
    const calls: string[] = [];

    const result = mergeProps(
      {
        onClick: () => calls.push('first'),
      },
      {
        onClick: () => calls.push('second'),
      },
      {
        onClick: () => calls.push('third'),
      }
    );

    // @ts-expect-error: ignore unknown
    result.onClick?.({} as unknown);
    expect(calls).toEqual(['first', 'second', 'third']);
  });

  test('does not break if some event handlers are undefined', () => {
    const calls: string[] = [];

    const result = mergeProps(
      {
        onClick: undefined,
      },
      {
        onClick: () => calls.push('called'),
      }
    );

    // @ts-expect-error: ignore unknown
    result.onClick?.({} as unknown);
    expect(calls).toEqual(['called']);
  });

  test('preserves the first non-undefined id', () => {
    const result = mergeProps(
      { id: 'foo' },
      { id: 'bar' },
      { id: undefined },
      { id: 'baz' }
    );
    expect(result.id).toBe('foo');
  });

  test('merges non-special props by last one wins', () => {
    const result = mergeProps(
      { role: 'button' },
      { role: 'link' },
      { role: 'checkbox' }
    );
    expect(result.role).toBe('checkbox');
  });

  test('handles mixed props types correctly', () => {
    const result = mergeProps(
      {
        id: 'a',
        className: 'foo',
        'data-test': 'first',
        onClick: () => {},
      },
      {
        id: 'b',
        className: 'bar',
        'aria-label': 'label',
        onClick: () => {},
      }
    );

    expect(result.id).toBe('a');
    expect(result.className).toBe('foo bar');
    expect(result['data-test']).toBe('first');
    expect(result['aria-label']).toBe('label');
    expect(typeof result.onClick).toBe('function');
  });

  test('returns an empty object if no arguments', () => {
    const result = mergeProps();
    expect(result).toEqual({});
  });

  test('correctly merges multiple event types', () => {
    const clicks: string[] = [];
    const submits: string[] = [];

    const result = mergeProps(
      {
        onClick: () => clicks.push('click1'),
        onSubmit: () => submits.push('submit1'),
      },
      {
        onClick: () => clicks.push('click2'),
        onSubmit: () => submits.push('submit2'),
      }
    );

    // @ts-expect-error: ignore unknown
    result.onClick?.({} as unknown);
    // @ts-expect-error: ignore unknown
    result.onSubmit?.({} as unknown);

    expect(clicks).toEqual(['click1', 'click2']);
    expect(submits).toEqual(['submit1', 'submit2']);
  });
});