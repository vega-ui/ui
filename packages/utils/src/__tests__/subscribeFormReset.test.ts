// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { subscribeFormReset } from '../subscribeFormReset';

const setup = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.defaultValue = '20';
  form.append(input);
  document.body.append(form);

  return { form, input };
};

describe('subscribeFormReset', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('calls onReset when the form is reset', () => {
    const { form, input } = setup();
    const onReset = vi.fn();
    subscribeFormReset(input, onReset);

    form.reset();

    expect(onReset).toHaveBeenCalledOnce();
  });

  it('calls onReset for a form that owns a control inside the element', () => {
    const { form, input } = setup();
    const container = document.createElement('div');
    form.append(container);
    container.append(input);
    const onReset = vi.fn();
    subscribeFormReset(container, onReset);

    form.reset();

    expect(onReset).toHaveBeenCalledOnce();
  });

  it('calls onReset for a form linked by the form attribute', () => {
    const { form } = setup();
    form.id = 'linked';
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.setAttribute('form', 'linked');
    container.append(input);
    document.body.append(container);
    const onReset = vi.fn();
    subscribeFormReset(container, onReset);

    form.reset();

    expect(onReset).toHaveBeenCalledOnce();
  });

  it('ignores a canceled reset', () => {
    const { form, input } = setup();
    form.addEventListener('reset', (event) => event.preventDefault());
    const onReset = vi.fn();
    subscribeFormReset(input, onReset);

    form.reset();

    expect(onReset).not.toHaveBeenCalled();
  });

  it('ignores the reset of another form', () => {
    const { input } = setup();
    const other = document.createElement('form');
    document.body.append(other);
    const onReset = vi.fn();
    subscribeFormReset(input, onReset);

    other.reset();

    expect(onReset).not.toHaveBeenCalled();
  });

  it('stops calling onReset after unsubscribe', () => {
    const { form, input } = setup();
    const onReset = vi.fn();
    const unsubscribe = subscribeFormReset(input, onReset);

    unsubscribe();
    form.reset();

    expect(onReset).not.toHaveBeenCalled();
  });
});
