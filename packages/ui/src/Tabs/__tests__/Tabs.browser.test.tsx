import { ComponentProps, FC } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { userEvent } from 'vitest/browser';

import { Tabs } from '../Tabs';
import { TabsList, TabsPanel, TabsTab } from '../components';

afterEach(cleanup);

const TabsTest: FC<Partial<ComponentProps<typeof Tabs>> & { disabled?: string }> = ({ disabled, ...props }) => (
  <>
    <button type='button'>before</button>
    <Tabs defaultValue='account' {...props}>
      <TabsList aria-label='Settings'>
        <TabsTab value='account'>Account</TabsTab>
        <TabsTab value='password' disabled={disabled === 'password'}>Password</TabsTab>
        <TabsTab value='billing'>Billing</TabsTab>
      </TabsList>
      <TabsPanel value='account'>Account details</TabsPanel>
      <TabsPanel value='password'>Change the password</TabsPanel>
      <TabsPanel value='billing'>Invoices and the card</TabsPanel>
    </Tabs>
  </>
);

const tab = (name: string) => [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')].find((element) => element.textContent === name)!;
const panelOf = (name: string) => document.getElementById(tab(name).getAttribute('aria-controls')!)!;

const reveal = (panel: HTMLElement) => {
  panel.dispatchEvent(new Event('beforematch', { bubbles: true }));
  panel.removeAttribute('hidden');
};

describe('Critical User Paths', () => {
  it('shows the panel of the tab the arrows move to and leaves the list for the panel with Tab', async () => {
    const onChangeValue = vi.fn();
    const result = render(<TabsTest onChangeValue={onChangeValue} />);

    result.getByRole('button', { name: 'before' }).focus();
    await userEvent.tab();
    expect(document.activeElement).toBe(tab('Account'));

    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tab('Password'));
    expect(tab('Password').getAttribute('aria-selected')).toBe('true');
    expect(panelOf('Password').hasAttribute('hidden')).toBe(false);
    expect(panelOf('Account').hasAttribute('hidden')).toBe(true);
    expect(onChangeValue).toHaveBeenLastCalledWith('password');

    await userEvent.tab();
    expect(document.activeElement).toBe(panelOf('Password'));

    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(tab('Password'));
  });

  it('moves only the focus in manual activation and shows the focused tab with Enter or Space', async () => {
    const result = render(<TabsTest activation='manual' />);

    result.getByRole('button', { name: 'before' }).focus();
    await userEvent.tab();
    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tab('Password'));
    expect(panelOf('Account').hasAttribute('hidden')).toBe(false);

    await userEvent.keyboard('{Enter}');
    expect(panelOf('Password').hasAttribute('hidden')).toBe(false);

    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard(' ');
    expect(panelOf('Billing').hasAttribute('hidden')).toBe(false);
  });

  it('shows and focuses a clicked tab without a focus ring and skips a disabled one with the arrows', async () => {
    render(<TabsTest disabled='password' />);

    await userEvent.click(tab('Billing'));
    expect(panelOf('Billing').hasAttribute('hidden')).toBe(false);
    expect(document.activeElement).toBe(tab('Billing'));
    expect(tab('Billing').matches(':focus-visible')).toBe(false);

    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(tab('Account'));
  });
});

describe('Edge Cases', () => {
  it('keeps the hidden panels findable by the page search and shows the tab of the panel it reveals', async () => {
    render(<TabsTest />);

    expect(panelOf('Billing').getAttribute('hidden')).toBe('until-found');

    reveal(panelOf('Billing'));
    await expect.poll(() => tab('Billing').getAttribute('aria-selected')).toBe('true');
    expect(panelOf('Billing').hasAttribute('aria-hidden')).toBe(false);
    expect(panelOf('Account').getAttribute('hidden')).toBe('until-found');
  });

  it('hides a panel the page search revealed again when a controlled parent keeps its tab', async () => {
    const onChangeValue = vi.fn();
    render(<TabsTest value='account' onChangeValue={onChangeValue} />);

    reveal(panelOf('Billing'));
    expect(onChangeValue).toHaveBeenCalledExactlyOnceWith('billing');
    await expect.poll(() => panelOf('Billing').getAttribute('hidden')).toBe('until-found');
    expect(panelOf('Account').hasAttribute('hidden')).toBe(false);
  });
});

describe('Accessibility', () => {
  it('links the tabs and the panels and declares the orientation of a vertical list', () => {
    render(<TabsTest orientation='vertical' />);

    expect(document.querySelector('[role="tablist"]')!.getAttribute('aria-orientation')).toBe('vertical');
    expect(panelOf('Account').getAttribute('role')).toBe('tabpanel');
    expect(panelOf('Account').getAttribute('aria-labelledby')).toBe(tab('Account').id);
    expect([...document.querySelectorAll('[role="tab"]')].map((element) => element.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);
  });
});
