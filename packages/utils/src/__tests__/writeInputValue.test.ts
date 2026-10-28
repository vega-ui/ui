// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { writeInputValue } from '../writeInputValue';

describe('writeInputValue', () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    input = document.createElement('input');
    document.body.appendChild(input);
  });

  it('sets the value through the native setter', () => {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!;
    const setter = vi.fn((value: string) => descriptor.set!.call(input, value));
    Object.defineProperty(input, 'value', { ...descriptor, set: setter, configurable: true });

    writeInputValue(input, 'hello');

    expect(setter).not.toHaveBeenCalled();
    expect(descriptor.get!.call(input)).toBe('hello');
  });

  it('dispatches bubbling input and change events after the value is set', () => {
    const wrapper = document.createElement('div');
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);

    const events: [string, string, boolean, boolean][] = [];
    const listener = (event: Event) => events.push([event.type, input.value, event.bubbles, event.composed]);
    wrapper.addEventListener('input', listener);
    wrapper.addEventListener('change', listener);

    writeInputValue(input, 'hello');

    expect(events).toEqual([
      ['input', 'hello', true, true],
      ['change', 'hello', true, false],
    ]);
  });
});
