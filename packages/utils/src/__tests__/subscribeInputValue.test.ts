// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { subscribeInputValue } from '../subscribeInputValue';

const setup = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.defaultValue = '01.02.2026';
  form.append(input);
  document.body.append(form);

  return { form, input };
};

describe('subscribeInputValue', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('reports the initial text', () => {
    const { input } = setup();
    const onValue = vi.fn();

    subscribeInputValue(input, onValue);

    expect(onValue).toHaveBeenCalledWith('01.02.2026');
  });

  it('reports the text on every input event', () => {
    const { input } = setup();
    const onValue = vi.fn();
    subscribeInputValue(input, onValue);

    input.value = '03.04.2026';
    input.dispatchEvent(new Event('input'));

    expect(onValue).toHaveBeenLastCalledWith('03.04.2026');
  });

  it('reports the default text when the form is reset', () => {
    const { form, input } = setup();
    const onValue = vi.fn();
    subscribeInputValue(input, onValue);
    input.value = '03.04.2026';

    form.reset();

    expect(onValue).toHaveBeenLastCalledWith('01.02.2026');
  });

  it('stops reporting after unsubscribe', () => {
    const { input } = setup();
    const onValue = vi.fn();
    const unsubscribe = subscribeInputValue(input, onValue);
    onValue.mockClear();

    unsubscribe();
    input.dispatchEvent(new Event('input'));

    expect(onValue).not.toHaveBeenCalled();
  });
});
