import { ComponentProps, FC } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';

import { Dialog } from '../Dialog';
import { DialogClose, DialogContent, DialogTrigger } from '../components';
import { Select, SelectCombobox, SelectListbox, SelectOption, SelectValue } from '../../Select';

afterEach(cleanup);

const TESTID_TRIGGER = 'trigger';
const TESTID_CONTENT = 'content';
const TESTID_CLOSE = 'close';
const TESTID_OUTSIDE = 'outside';

const TESTID_INNER_TRIGGER = 'inner-trigger';
const TESTID_INNER_CONTENT = 'inner-content';
const TESTID_INNER_CLOSE = 'inner-close';

const TITLE = 'Title';

type DialogTestProps = ComponentProps<typeof Dialog> & Pick<ComponentProps<typeof DialogContent>, 'onCancel' | 'onClose' | 'blurred' | 'overlay' | 'closedBy'>

const DialogTest: FC<DialogTestProps> = ({ children, onCancel, onClose, blurred, overlay, closedBy, ...props }) => {
  return (
    <>
      <button data-testid={TESTID_OUTSIDE}>Outside</button>
      <Dialog {...props}>
        <DialogTrigger data-testid={TESTID_TRIGGER}>Open</DialogTrigger>
        <DialogContent data-testid={TESTID_CONTENT} aria-labelledby='title' onCancel={onCancel} onClose={onClose} blurred={blurred} overlay={overlay} closedBy={closedBy}>
          <h2 id='title'>{TITLE}</h2>
          <form method='dialog'>
            <button data-testid={TESTID_CLOSE} aria-label='Close dialog'>×</button>
          </form>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};

const InnerDialogTest: FC<ComponentProps<typeof Dialog>> = (props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger data-testid={TESTID_INNER_TRIGGER}>Open inner</DialogTrigger>
      <DialogContent data-testid={TESTID_INNER_CONTENT} aria-label='Inner title' closedBy='any'>
        <form method='dialog'>
          <button data-testid={TESTID_INNER_CLOSE} aria-label='Close inner'>×</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId(TESTID_TRIGGER);
const queryContent = (r: RenderResult) => r.queryByTestId(TESTID_CONTENT) as HTMLDialogElement | null;
const getContent = (r: RenderResult) => r.getByTestId(TESTID_CONTENT) as HTMLDialogElement;
const getClose = (r: RenderResult) => r.getByTestId(TESTID_CLOSE);

const getInnerTrigger = (r: RenderResult) => r.getByTestId(TESTID_INNER_TRIGGER);
const queryInnerContent = (r: RenderResult) => r.queryByTestId(TESTID_INNER_CONTENT) as HTMLDialogElement | null;
const getInnerContent = (r: RenderResult) => r.getByTestId(TESTID_INNER_CONTENT) as HTMLDialogElement;
const getInnerClose = (r: RenderResult) => r.getByTestId(TESTID_INNER_CLOSE);

const toBeOpened = async (r: RenderResult) => {
  await expect.element(queryContent(r)).toBeInTheDocument();
  await expect.poll(() => getContent(r).matches(':modal')).toBe(true);
};

const toBeClosed = async (r: RenderResult) => {
  await expect.element(queryContent(r)).not.toBeInTheDocument();
};

const openByTrigger = async (r: RenderResult) => {
  await userEvent.click(getTrigger(r));
};

const clickBackdrop = async (dialog: HTMLDialogElement) => {
  await userEvent.click(dialog, { position: { x: -1, y: -1 } });
};

const closeByCloseButton = async (r: RenderResult) => {
  await userEvent.click(getClose(r));
};

describe('Dialog', () => {
  describe('Critical User Paths', () => {
    describe('DialogClose', () => {
      it('closes the dialog with the close transition', async () => {
        document.documentElement.dataset.motion = '';
        onTestFinished(() => {
          delete document.documentElement.dataset.motion;
        });
        const r = render(
          <Dialog defaultOpen>
            <DialogContent data-testid='close-content' aria-label='Panel'>
              <DialogClose>Done</DialogClose>
            </DialogContent>
          </Dialog>
        );
        await expect.poll(() => (r.getByTestId('close-content') as HTMLDialogElement).matches(':modal')).toBe(true);

        await userEvent.click(r.getByRole('button', { name: 'Done' }));

        expect((r.getByTestId('close-content') as HTMLDialogElement).open).toBe(true);
        expect(r.getByTestId('close-content')).toHaveAttribute('data-status', 'close');
        await expect.element(r.queryByTestId('close-content')).not.toBeInTheDocument();
      });

      it('renders a button that does not submit a form', async () => {
        const r = render(
          <Dialog defaultOpen>
            <DialogContent aria-label='Panel'>
              <DialogClose>Done</DialogClose>
            </DialogContent>
          </Dialog>
        );

        await expect.element(r.getByRole('button', { name: 'Done' })).toHaveAttribute('type', 'button');
      });

      it('closes through its child with asChild and keeps the child onClick', async () => {
        const onClick = vi.fn();
        const onChangeOpen = vi.fn();
        const r = render(
          <Dialog open onChangeOpen={onChangeOpen}>
            <DialogContent aria-label='Panel'>
              <DialogClose asChild>
                <button aria-label='Close' onClick={onClick}>×</button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        );

        await userEvent.click(r.getByRole('button', { name: 'Close' }));

        expect(onClick).toHaveBeenCalledOnce();
        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });
    });

    describe('uncontrolled', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<DialogTest />);
      });

      it('is closed by default', async () => {
        await toBeClosed(r)
      });

      it('opens a modal native dialog on trigger click', async () => {
        await openByTrigger(r);
        await toBeOpened(r);

        expect(getContent(r).tagName).toBe('DIALOG');
        expect(getContent(r).open).toBe(true);
      });

      it('stays open on backdrop click by default', async () => {
        await openByTrigger(r);
        await toBeOpened(r);

        await clickBackdrop(getContent(r));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('closes on backdrop click when closedBy=any', async () => {
        r.rerender(<DialogTest closedBy='any' />);
        await openByTrigger(r);
        await toBeOpened(r);

        await clickBackdrop(getContent(r));
        await toBeClosed(r);
      });

      it('stays open when a press starts inside and ends on the backdrop', async () => {
        r.rerender(<DialogTest closedBy='any' />);
        await openByTrigger(r);
        await toBeOpened(r);

        await commands.mouseDrag(`[data-testid="${TESTID_CONTENT}"]`, getContent(r).offsetHeight);
        await new Promise((resolve) => setTimeout(resolve, 100));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('ignores Escape and backdrop click when closedBy=none', async () => {
        r.rerender(<DialogTest closedBy='none' />);
        await openByTrigger(r);
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');
        await clickBackdrop(getContent(r));

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('ignores a repeated Escape when closedBy=none', async () => {
        r.rerender(<DialogTest closedBy='none' />);
        await openByTrigger(r);
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');
        await userEvent.keyboard('{Escape}');
        await userEvent.keyboard('{Escape}');

        expect(getContent(r).open).toBe(true);
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('stays open on a click inside the content', async () => {
        await openByTrigger(r);
        await toBeOpened(r);

        await userEvent.click(getContent(r), { position: { x: 1, y: 1 } });

        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('reopens after close', async () => {
        await openByTrigger(r);
        await toBeOpened(r);

        await closeByCloseButton(r);
        await toBeClosed(r);

        await openByTrigger(r);
        await toBeOpened(r);
      });

      describe('defaultOpen', () => {
        let r: RenderResult;

        beforeEach(() => {
          cleanup();
          r = render(<DialogTest defaultOpen />);
        });

        it('is open on mount', async () => {
          await toBeOpened(r);
        });

        it('closes on close button click', async () => {
          await closeByCloseButton(r);
          await toBeClosed(r);
        });
      });


      it('blurs the backdrop by default', async () => {
        await openByTrigger(r);
        await toBeOpened(r);

        await expect.element(getContent(r)).toHaveAttribute('data-blurred', 'true');
      });

      it('applies blurred prop', async () => {
        r.rerender(<DialogTest blurred={false} />);
        await openByTrigger(r);
        await toBeOpened(r);

        await expect.element(getContent(r)).toHaveAttribute('data-blurred', 'false');
      });

      it('dims the page behind the dialog by default', async () => {
        document.documentElement.style.setProperty('--overlay', 'rgb(0, 0, 0)');
        await openByTrigger(r);
        await toBeOpened(r);

        expect(getComputedStyle(getContent(r), '::backdrop').backgroundColor).toBe('rgb(0, 0, 0)');
        document.documentElement.style.removeProperty('--overlay');
      });

      it('leaves the page behind the dialog visible without an overlay', async () => {
        document.documentElement.style.setProperty('--overlay', 'rgb(0, 0, 0)');
        r.rerender(<DialogTest overlay={false} />);
        await openByTrigger(r);
        await toBeOpened(r);

        const backdrop = getComputedStyle(getContent(r), '::backdrop');

        expect(backdrop.backgroundColor).toBe('rgba(0, 0, 0, 0)');
        expect(backdrop.backdropFilter).toBe('none');
        document.documentElement.style.removeProperty('--overlay');
      });
    });

    describe('controlled', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<DialogTest open={false} />);
      });

      it('does not open itself when open=false (requires parent update)', async () => {
        await openByTrigger(r);

        await waitFor(() => {
          expect(queryContent(r)).not.toBeInTheDocument();
        });
      });

      it('calls onChangeOpen(true) on trigger interaction', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open={false} onChangeOpen={onChangeOpen} />);

        await openByTrigger(r);

        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(true);
      });

      it('opens when parent sets open=true', async () => {
        r.rerender(<DialogTest open />);
        await toBeOpened(r);
      });

      it('calls onChangeOpen(false) on backdrop click when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open onChangeOpen={onChangeOpen} closedBy='any' />);
        await toBeOpened(r);

        await clickBackdrop(getContent(r));

        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });

      it('calls onChangeOpen(false) on close button click when open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open onChangeOpen={onChangeOpen} />);
        await toBeOpened(r);

        await closeByCloseButton(r);

        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      });

      it('calls onChangeOpen(false) on Escape and stays open', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open onChangeOpen={onChangeOpen} />);
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');

        expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
        await toBeOpened(r);
      });

      it('stays closed after the browser closes it while open=true', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open onChangeOpen={onChangeOpen} />);
        await toBeOpened(r);

        getContent(r).close();

        await expect.poll(() => onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
        await new Promise((resolve) => setTimeout(resolve, 100));
        expect(getContent(r).open).toBe(false);
      });

      it('does not close itself until parent updates open=false', async () => {
        const onChangeOpen = vi.fn();
        r.rerender(<DialogTest open onChangeOpen={onChangeOpen} closedBy='any' />);

        await toBeOpened(r);
        await clickBackdrop(getContent(r));

        expect(onChangeOpen).toHaveBeenCalledWith(false);
        await toBeOpened(r);

        r.rerender(<DialogTest open={false} onChangeOpen={onChangeOpen} />);
        await toBeClosed(r);
      });
    });
  });

  describe('Edge cases', () => {
    it('does not submit the surrounding form on trigger click', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <DialogTest />
        </form>
      );

      await userEvent.click(getTrigger(r));

      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('closes on submit of a form with method dialog', async () => {
      const onChangeOpen = vi.fn();
      const r = render(
        <DialogTest defaultOpen onChangeOpen={onChangeOpen}>
          <form method='dialog'>
            <button>Submit</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      await toBeClosed(r);
      expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('animates out when a form with method dialog closes it', async () => {
      const r = render(
        <DialogTest defaultOpen>
          <form method='dialog'>
            <button>Submit</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      expect(getContent(r).open).toBe(true);
      expect(getContent(r)).toHaveAttribute('data-status', 'close');
      await toBeClosed(r);
    });

    it('sets the return value from the submitter of a form with method dialog', async () => {
      const onClose = vi.fn((event: { currentTarget: HTMLDialogElement }) => event.currentTarget.returnValue);
      const r = render(
        <DialogTest defaultOpen onClose={onClose}>
          <form method='dialog'>
            <button value='confirm'>Confirm</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Confirm' }));

      await toBeClosed(r);
      expect(onClose).toHaveLastReturnedWith('confirm');
    });

    it('stays open when a controlled parent rejects a close by a form with method dialog', async () => {
      const r = render(
        <DialogTest open onChangeOpen={() => undefined}>
          <form method='dialog'>
            <button>Submit</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      expect(getContent(r).open).toBe(true);
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });

    it('renders into the container passed to DialogContent', async () => {
      const container = document.createElement('div');
      document.body.append(container);
      onTestFinished(() => container.remove());

      const r = render(
        <Dialog defaultOpen>
          <DialogContent data-testid={TESTID_CONTENT} aria-label='Panel' container={container} />
        </Dialog>
      );
      await toBeOpened(r);

      expect(container.contains(getContent(r))).toBe(true);
    });

    it('stays open on a cancel request when closedBy=none, as in browsers without closedby', async () => {
      const r = render(<DialogTest defaultOpen closedBy='none' />);
      await toBeOpened(r);

      getContent(r).dispatchEvent(new Event('cancel', { cancelable: true }));

      await new Promise((resolve) => setTimeout(resolve, 300));
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });

    it('closes on a backdrop click when closedBy=any in browsers without closedby', async () => {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'closedBy');
      if (descriptor) {
        Reflect.deleteProperty(HTMLDialogElement.prototype, 'closedBy');
        onTestFinished(() => {
          Object.defineProperty(HTMLDialogElement.prototype, 'closedBy', descriptor);
        });
      }
      const r = render(<DialogTest defaultOpen closedBy='any' />);
      await toBeOpened(r);
      const dialog = getContent(r);
      const press = { bubbles: true, clientX: 1, clientY: 1 };

      dialog.dispatchEvent(new PointerEvent('pointerdown', press));
      dialog.dispatchEvent(new MouseEvent('click', press));

      await toBeClosed(r);
    });

    it('stays open when a press starts inside and ends on the backdrop in browsers without closedby', async () => {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'closedBy');
      if (descriptor) {
        Reflect.deleteProperty(HTMLDialogElement.prototype, 'closedBy');
        onTestFinished(() => {
          Object.defineProperty(HTMLDialogElement.prototype, 'closedBy', descriptor);
        });
      }
      const r = render(<DialogTest defaultOpen closedBy='any' />);
      await toBeOpened(r);
      const dialog = getContent(r);
      const rect = dialog.getBoundingClientRect();

      dialog.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX: rect.left + 5, clientY: rect.top + 5 }));
      dialog.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 1, clientY: 1 }));

      await new Promise((resolve) => setTimeout(resolve, 300));
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });

    it('closes on submit of a form with method dialog when closedBy=none', async () => {
      const r = render(
        <DialogTest defaultOpen closedBy='none'>
          <form method='dialog'>
            <button>Submit</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      await toBeClosed(r);
    });

    it('stays open when the user prevents the submit of a form with method dialog', async () => {
      const r = render(
        <DialogTest defaultOpen>
          <form method='dialog' onSubmit={(event) => event.preventDefault()}>
            <button>Submit</button>
          </form>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Submit' }));

      await new Promise((resolve) => setTimeout(resolve, 500));
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
    });

    it('closes with DialogClose inside a form without submitting it', async () => {
      const onSubmit = vi.fn();
      const r = render(
        <Dialog defaultOpen>
          <DialogContent data-testid={TESTID_CONTENT} aria-label='Panel'>
            <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
              <DialogClose>Cancel</DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByRole('button', { name: 'Cancel' }));

      await toBeClosed(r);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('requests close once when DialogClose asChild submits a form with method dialog', async () => {
      const onChangeOpen = vi.fn();
      const r = render(
        <Dialog open onChangeOpen={onChangeOpen}>
          <DialogContent aria-label='Panel'>
            <form method='dialog'>
              <DialogClose asChild>
                <button>Done</button>
              </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
      );

      await userEvent.click(r.getByRole('button', { name: 'Done' }));

      expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('syncs state when the browser closes the dialog', async () => {
      const onChangeOpen = vi.fn();
      const r = render(<DialogTest defaultOpen onChangeOpen={onChangeOpen} />);
      await toBeOpened(r);

      getContent(r).close();

      await toBeClosed(r);
      expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
    });

    it('closes only an open Select listbox on Escape', async () => {
      const onChangeOpen = vi.fn();
      const r = render(
        <Dialog defaultOpen onChangeOpen={onChangeOpen}>
          <DialogContent>
            <Select>
              <SelectCombobox data-testid='combobox'><SelectValue placeholder='Pick' /></SelectCombobox>
              <SelectListbox data-testid='listbox'>
                <SelectOption value='a'>Alpha</SelectOption>
              </SelectListbox>
            </Select>
          </DialogContent>
        </Dialog>,
      );

      await userEvent.click(r.getByTestId('combobox'));
      await expect.poll(() => r.getByTestId('listbox').matches(':popover-open')).toBe(true);

      await userEvent.keyboard('{Escape}');

      await expect.poll(() => r.getByTestId('listbox').matches(':popover-open')).toBe(false);
      expect(onChangeOpen).not.toHaveBeenCalled();
    });

    it('does not clip a Select listbox that overflows the dialog', async () => {
      const r = render(
        <DialogTest defaultOpen>
          <Select>
            <SelectCombobox data-testid='combobox'><SelectValue placeholder='Pick' /></SelectCombobox>
            <SelectListbox data-testid='listbox'>
              {Array.from({ length: 8 }, (_, index) => (
                <SelectOption key={index} value={`option-${index}`}>Option {index}</SelectOption>
              ))}
            </SelectListbox>
          </Select>
        </DialogTest>
      );
      await toBeOpened(r);

      await userEvent.click(r.getByTestId('combobox'));
      await expect.poll(() => r.getByTestId('listbox').matches(':popover-open')).toBe(true);
      await Promise.all(r.getByTestId('listbox').getAnimations().map((animation) => animation.finished));

      const listbox = r.getByTestId('listbox').getBoundingClientRect();
      const dialog = getContent(r).getBoundingClientRect();
      const x = listbox.left + listbox.width / 2;

      expect(listbox.top < dialog.top || listbox.bottom > dialog.bottom).toBe(true);
      expect(r.getByTestId('listbox').contains(document.elementFromPoint(x, listbox.top + 4))).toBe(true);
      expect(r.getByTestId('listbox').contains(document.elementFromPoint(x, listbox.bottom - 4))).toBe(true);
    });

    it('stays open when reopened during the close transition', async () => {
      const r = render(<DialogTest defaultOpen />);
      await toBeOpened(r);

      await closeByCloseButton(r);
      await expect.element(getContent(r)).toHaveAttribute('data-status', 'close');
      r.rerender(<DialogTest open />);

      await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      await new Promise((resolve) => setTimeout(resolve, 500));
      await toBeOpened(r);
    });

    it('calls onCancel and onClose passed to DialogContent', async () => {
      const onCancel = vi.fn();
      const onClose = vi.fn();
      const r = render(<DialogTest onCancel={onCancel} onClose={onClose} />);
      await openByTrigger(r);
      await toBeOpened(r);

      await userEvent.keyboard('{Escape}');
      await toBeClosed(r);

      expect(onCancel).toHaveBeenCalledOnce();
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('locks page scroll while open', async () => {
      const r = render(<DialogTest defaultOpen />);
      await toBeOpened(r);

      expect(getComputedStyle(document.documentElement).overflow).toBe('hidden');

      await closeByCloseButton(r);
      await toBeClosed(r);

      expect(getComputedStyle(document.documentElement).overflow).not.toBe('hidden');
    });

    describe('nested dialogs', () => {
      let r: RenderResult;

      beforeEach(async () => {
        r = render(<DialogTest closedBy='any'><InnerDialogTest /></DialogTest>)
        await openByTrigger(r)
        await toBeOpened(r)

        getInnerTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await expect.element(queryInnerContent(r)).toBeInTheDocument();
        await expect.poll(() => getInnerContent(r).matches(':modal')).toBe(true);
      })

      it('opening inner does not close outer', async () => {
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
        await expect.element(getInnerContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('Escape closes only the inner dialog', async () => {
        await userEvent.keyboard('{Escape}');

        await expect.element(queryInnerContent(r)).not.toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('backdrop click closes only the inner dialog', async () => {
        await clickBackdrop(getInnerContent(r));

        await expect.element(queryInnerContent(r)).not.toBeInTheDocument();
        await expect.element(getContent(r)).toHaveAttribute('data-status', 'open');
      });

      it('keeps Tab inside the inner dialog', async () => {
        getInnerClose(r).focus();

        for (let i = 0; i < 4; i++) {
          await userEvent.tab();
          expect(getContent(r).querySelector(':focus')).toBeNull();
        }
      });

      it('restores focus to the inner trigger after inner closes', async () => {
        await userEvent.keyboard('{Escape}');

        await expect.element(queryInnerContent(r)).not.toBeInTheDocument();
        await expect.element(getInnerTrigger(r)).toHaveFocus();
      });
    })
  });

  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;

      beforeEach(() => {
        r = render(<DialogTest defaultOpen />);
      });

      it('takes its name from aria-labelledby', async () => {
        await toBeOpened(r);
        await expect.element(getContent(r)).toHaveAccessibleName(TITLE);
      });

      it('close button has accessible name', async () => {
        await toBeOpened(r);
        await expect.element(getClose(r)).toHaveAccessibleName('Close dialog');
      });

      it('trigger describes the dialog it opens', async () => {
        await toBeOpened(r);

        await expect.element(getTrigger(r)).toHaveAttribute('aria-haspopup', 'dialog');
        await expect.element(getTrigger(r)).not.toHaveAttribute('aria-controls');
      });

    });

    describe('roles', () => {
      it('dialog is exposed with role=dialog', async () => {
        const r = render(<DialogTest defaultOpen />);
        await toBeOpened(r);
        await expect.element(r.getByRole('dialog')).toBeInTheDocument();
      });
    });

    describe('focus', () => {
      it('focuses the dialog itself on open', async () => {
        const r = render(<DialogTest />);
        await openByTrigger(r);
        await toBeOpened(r);

        await expect.element(getContent(r)).toHaveFocus();
      });

      it('focuses the autoFocus element on open', async () => {
        const r = render(<DialogTest><input data-testid='input' autoFocus /></DialogTest>);
        await openByTrigger(r);
        await toBeOpened(r);

        await expect.element(r.getByTestId('input')).toHaveFocus();
      });

      it('makes the page outside inert', async () => {
        const r = render(<DialogTest defaultOpen />);
        await toBeOpened(r);

        r.getByTestId(TESTID_OUTSIDE).focus();

        await expect.element(r.getByTestId(TESTID_OUTSIDE)).not.toHaveFocus();
      });

      it('restores focus to the trigger after close', async () => {
        const r = render(<DialogTest />);

        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);

        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('restores focus to the trigger opened by a mouse click', async () => {
        const r = render(<DialogTest />);

        await openByTrigger(r);
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);

        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('restores focus to the trigger after closing with DialogClose', async () => {
        const r = render(
          <Dialog>
            <DialogTrigger data-testid={TESTID_TRIGGER}>Open</DialogTrigger>
            <DialogContent data-testid={TESTID_CONTENT} aria-label='Panel'>
              <DialogClose>Done</DialogClose>
            </DialogContent>
          </Dialog>
        );

        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await toBeOpened(r);

        r.getByRole('button', { name: 'Done' }).focus();
        await userEvent.keyboard('{Enter}');
        await toBeClosed(r);

        await expect.element(getTrigger(r)).toHaveFocus();
      });

      it('keeps the focus the user moves in onClose when the trigger is gone', async () => {
        const Test: FC<{ trigger: boolean }> = ({ trigger }) => (
          <>
            <button data-testid={TESTID_OUTSIDE}>Outside</button>
            <Dialog>
              {trigger && <DialogTrigger data-testid={TESTID_TRIGGER}>Open</DialogTrigger>}
              <DialogContent data-testid={TESTID_CONTENT} aria-label='Panel' onClose={() => r.getByTestId(TESTID_OUTSIDE).focus()}>
                <DialogClose>Done</DialogClose>
              </DialogContent>
            </Dialog>
          </>
        );
        const r = render(<Test trigger />);

        getTrigger(r).focus();
        await userEvent.keyboard('{Enter}');
        await toBeOpened(r);
        r.rerender(<Test trigger={false} />);

        await userEvent.click(r.getByRole('button', { name: 'Done' }));
        await toBeClosed(r);

        await expect.element(r.getByTestId(TESTID_OUTSIDE)).toHaveFocus();
      });
    });

    describe('keyboard', () => {
      const TabTest: FC = () => (
        <Dialog defaultOpen>
          <DialogContent data-testid={TESTID_CONTENT} aria-label='Panel'>
            <input aria-label='First' />
            <input aria-label='Last' />
          </DialogContent>
        </Dialog>
      );

      it('moves Tab from the dialog to its first tabbable element', async () => {
        const r = render(<TabTest />);
        await toBeOpened(r);
        await expect.element(getContent(r)).toHaveFocus();

        await userEvent.tab();

        await expect.element(r.getByRole('textbox', { name: 'First' })).toHaveFocus();
      });

      it('closes on Escape in uncontrolled mode', async () => {
        const r = render(<DialogTest />);
        await openByTrigger(r);
        await toBeOpened(r);

        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);
      });

      it('closes on Escape again after reopening', async () => {
        const r = render(<DialogTest />);
        await openByTrigger(r);
        await toBeOpened(r);
        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);

        await openByTrigger(r);
        await toBeOpened(r);
        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);
      });
    });
  });
});
