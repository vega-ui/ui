import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Button } from '../../Button';
import { Toolbar, ToolbarItem } from '../../Toolbar';
import { Toggle } from '..';

afterEach(cleanup);

describe('Critical User Paths', () => {
  it('turns on and off with a click, Enter and Space and reports it', async () => {
    const onChangePressed = vi.fn();
    const result = render(<Toggle onChangePressed={onChangePressed}>Preview</Toggle>);
    const toggle = result.getByRole('button', { name: 'Preview' });

    await userEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(onChangePressed).toHaveBeenLastCalledWith(true);

    toggle.focus();
    await userEvent.keyboard('{Enter}');
    expect(toggle.getAttribute('aria-pressed')).toBe('false');

    await userEvent.keyboard(' ');
    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(onChangePressed).toHaveBeenCalledTimes(3);
  });

  it('presses your own element with asChild', async () => {
    const result = render(<Toggle asChild defaultPressed><Button square aria-label='Bold'>B</Button></Toggle>);
    const toggle = result.getByRole('button', { name: 'Bold' });
    expect(toggle.getAttribute('aria-pressed')).toBe('true');

    await userEvent.click(toggle);
    expect(toggle.getAttribute('aria-pressed')).toBe('false');
  });

  it('presses with Space as an item of a Toolbar', async () => {
    const result = render(
      <Toolbar aria-label='Formatting'>
        <ToolbarItem asChild><Toggle>Bold</Toggle></ToolbarItem>
      </Toolbar>,
    );
    const bold = result.getByRole('button', { name: 'Bold' });
    bold.focus();

    await userEvent.keyboard(' ');
    expect(bold.getAttribute('aria-pressed')).toBe('true');
  });
});

describe('Edge Cases', () => {
  it('does not submit the form around it', async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    const result = render(<form onSubmit={(event) => onSubmit(event.nativeEvent as SubmitEvent)}><Toggle>Preview</Toggle></form>);

    await userEvent.click(result.getByRole('button', { name: 'Preview' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not submit the form around it with asChild either', async () => {
    const onSubmit = vi.fn((event: SubmitEvent) => event.preventDefault());
    const result = render(<form onSubmit={(event) => onSubmit(event.nativeEvent as SubmitEvent)}><Toggle asChild><Button>Preview</Button></Toggle></form>);

    await userEvent.click(result.getByRole('button', { name: 'Preview' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
