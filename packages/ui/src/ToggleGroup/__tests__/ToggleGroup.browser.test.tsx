import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { server, userEvent } from 'vitest/browser';

import { Button } from '../../Button';
import { Toolbar, ToolbarItem } from '../../Toolbar';
import { ToggleGroup, ToggleGroupToggle } from '..';

afterEach(cleanup);

const pressTab = (shift = false) => {
  const tab = server.browser === 'webkit' ? '{Alt>}{Tab}{/Alt}' : '{Tab}';
  return userEvent.keyboard(shift ? `{Shift>}${tab}{/Shift}` : tab);
};

const Alignment = ({ onChangeValue }: { onChangeValue?: (value: string) => void }) => (
  <>
    <button type='button'>Before</button>
    <ToggleGroup aria-label='Alignment' defaultValue='center' onChangeValue={onChangeValue}>
      <ToggleGroupToggle value='left'>Left</ToggleGroupToggle>
      <ToggleGroupToggle value='center'>Center</ToggleGroupToggle>
      <ToggleGroupToggle value='right'>Right</ToggleGroupToggle>
    </ToggleGroup>
  </>
);

describe('Critical User Paths', () => {
  it('enters on the checked item, moves the focus with the arrows and checks the focused item with Space', async () => {
    const onChangeValue = vi.fn();
    const result = render(<Alignment onChangeValue={onChangeValue} />);
    result.getByRole('button', { name: 'Before' }).focus();

    await pressTab();
    expect(document.activeElement).toBe(result.getByRole('radio', { name: 'Center' }));

    await userEvent.keyboard('{ArrowRight}');
    const right = result.getByRole('radio', { name: 'Right' });
    expect(document.activeElement).toBe(right);
    expect(right.getAttribute('aria-checked')).toBe('false');

    await userEvent.keyboard(' ');
    expect(right.getAttribute('aria-checked')).toBe('true');
    expect(result.getByRole('radio', { name: 'Center' }).getAttribute('aria-checked')).toBe('false');
    expect(onChangeValue).toHaveBeenLastCalledWith('right');
  });

  it('presses and releases each item by itself with multiple', async () => {
    const onChangeValue = vi.fn();
    const result = render(
      <ToggleGroup aria-label='Style' multiple onChangeValue={onChangeValue}>
        <ToggleGroupToggle value='bold'>Bold</ToggleGroupToggle>
        <ToggleGroupToggle value='italic'>Italic</ToggleGroupToggle>
      </ToggleGroup>,
    );

    await userEvent.click(result.getByRole('button', { name: 'Bold' }));
    await userEvent.click(result.getByRole('button', { name: 'Italic' }));
    expect(onChangeValue).toHaveBeenLastCalledWith(['bold', 'italic']);

    await userEvent.click(result.getByRole('button', { name: 'Bold' }));
    expect(onChangeValue).toHaveBeenLastCalledWith(['italic']);
    expect(result.getByRole('button', { name: 'Italic' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('joins the arrows and the one Tab stop of a Toolbar around it, without a Tab stop of its own', async () => {
    const result = render(
      <>
        <button type='button'>Before</button>
        <Toolbar aria-label='Formatting'>
          <ToggleGroup aria-label='Alignment' defaultValue='center'>
            <ToggleGroupToggle value='left'>Left</ToggleGroupToggle>
            <ToggleGroupToggle value='center'>Center</ToggleGroupToggle>
          </ToggleGroup>
          <ToolbarItem asChild><Button>Insert</Button></ToolbarItem>
        </Toolbar>
      </>,
    );
    const toolbar = result.getByRole('toolbar', { name: 'Formatting' });
    expect([...toolbar.querySelectorAll('[tabindex="0"]')]).toEqual([result.getByRole('radio', { name: 'Left' })]);
    result.getByRole('button', { name: 'Before' }).focus();

    await pressTab();
    expect(document.activeElement).toBe(result.getByRole('radio', { name: 'Left' }));
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    expect(document.activeElement).toBe(result.getByRole('button', { name: 'Insert' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(result.getByRole('radio', { name: 'Left' }));
  });
});

describe('Edge Cases', () => {
  it('lets a Toolbar around it move the arrows from an item that took the focus from a script', async () => {
    const result = render(
      <Toolbar aria-label='Formatting'>
        <ToolbarItem asChild><Button>Undo</Button></ToolbarItem>
        <ToggleGroup aria-label='Alignment' defaultValue='left'>
          <ToggleGroupToggle value='left'>Left</ToggleGroupToggle>
          <ToggleGroupToggle value='center'>Center</ToggleGroupToggle>
          <ToggleGroupToggle value='right'>Right</ToggleGroupToggle>
        </ToggleGroup>
      </Toolbar>,
    );

    result.getByRole('radio', { name: 'Center' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(result.getByRole('radio', { name: 'Right' }));
  });
});

describe('Accessibility', () => {
  it('is a radio group named by your label, with one Tab stop', () => {
    const result = render(<Alignment />);

    const group = result.getByRole('radiogroup', { name: 'Alignment' });
    expect([...group.querySelectorAll('[tabindex="0"]')]).toEqual([result.getByRole('radio', { name: 'Center' })]);
  });
});
