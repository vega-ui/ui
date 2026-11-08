import { ComponentProps, FC, FormEvent, Profiler, PropsWithChildren, StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { server, userEvent } from 'vitest/browser';

import { Select } from '../Select';
import {
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
} from '../components';

afterEach(cleanup);

const FORM_TESTID = 'form';
const SUBMIT_TESTID = 'submit';

const TESTID_ROOT = 'select';
const TESTID_COMBOBOX = 'combobox';
const TESTID_LISTBOX = 'listbox';
const TESTID_HIDDEN_SELECT = 'hidden-select';
const TESTID_VALUE = 'value';

const NAME = 'city';

const VALUE_MOSCOW = 'moscow';
const VALUE_SPB = 'saint-petersburg';
const VALUE_NSK = 'novosibirsk';

const LABEL_MOSCOW = 'Moscow';
const LABEL_SPB = 'Saint Petersburg';
const LABEL_NSK = 'Novosibirsk';

const PLACEHOLDER = 'Choose a city';

const SelectTest: FC<ComponentProps<typeof Select>> = (props) => {
  return (
    <Select data-testid={TESTID_ROOT} {...props}>
      <SelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} name={NAME} />
      <SelectCombobox data-testid={TESTID_COMBOBOX}>
        <SelectValue data-testid={TESTID_VALUE} placeholder={PLACEHOLDER} />
        <SelectIcon />
      </SelectCombobox>
      
      <SelectListbox data-testid={TESTID_LISTBOX}>
        <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
        <SelectOption value={VALUE_SPB}>{LABEL_SPB}</SelectOption>
        <SelectOption value={VALUE_NSK}>{LABEL_NSK}</SelectOption>
      </SelectListbox>
    </Select>
  );
};

const FormTest: FC<PropsWithChildren<{ onSubmit: (data: Record<string, string>) => void }>> = ({ onSubmit, children }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => {
      data[k] = String(v);
    });
    
    onSubmit(data);
  };
  
  return (
    <form data-testid={FORM_TESTID} onSubmit={handleSubmit}>
      {children}
      <button data-testid={SUBMIT_TESTID} type='submit'>
        Submit
      </button>
    </form>
  );
};

const getCombobox = (r: RenderResult) => r.getByTestId(TESTID_COMBOBOX) as HTMLButtonElement;
const getListbox = (r: RenderResult) => r.getByTestId(TESTID_LISTBOX) as HTMLDivElement;
const getHiddenSelect = (r: RenderResult) => r.getByTestId(TESTID_HIDDEN_SELECT) as HTMLSelectElement;
const getValue = (r: RenderResult) => r.getByTestId(TESTID_VALUE)
const getSubmit = (r: RenderResult) => r.getByTestId(SUBMIT_TESTID)
const getOptionByName = (r: RenderResult, name: string) => r.getByRole('option', { name }) as HTMLDivElement;

const queryOptionByName = (r: RenderResult, name: string) =>
  r.queryByRole('option', { name }) as HTMLDivElement | null;

const toBeActive = async (r: RenderResult, name: string) => {
  await expect.element(getCombobox(r)).toHaveFocus();
  await expect.poll(() => getCombobox(r).getAttribute('aria-activedescendant')).toBe(getOptionByName(r, name).id);
};

const toBeOpened = async (r: RenderResult) => {
  await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(true);
};

const toBeClosed = async (r: RenderResult) => {
  await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(false);
};

const openByClick = async (r: RenderResult) => {
  await userEvent.click(getCombobox(r));
  await toBeOpened(r);
};

describe('Select', () => {
  describe('Critical User Paths', () => {
    describe('listbox', () => {
      describe('open/close', () => {
        describe('uncontrolled', () => {
          describe('defaultOpen=false', () => {
            let r: RenderResult;
            
            beforeEach(() => {
              r = render(<SelectTest defaultOpen={false} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
            });
            
            it('closes on outside click when opened', async () => {
              await userEvent.click(getCombobox(r));
              await toBeOpened(r);
              
              await userEvent.click(document.body);
              await toBeClosed(r);
            });
          });
        })
        
        describe('controlled', () => {
          describe('open=false', () => {
            let r: RenderResult;
            const onChangeOpen = vi.fn();
            
            beforeEach(() => {
              onChangeOpen.mockReset();
              r = render(<SelectTest open={false} onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />);
            });
            
            it('click requests open via onChangeOpen(true)', async () => {
              await userEvent.click(getCombobox(r));
              expect(onChangeOpen).toHaveBeenCalledWith(true);
            });
            
            it('Escape does not open and does not call onChangeOpen(true)', async () => {
              await userEvent.keyboard('{Escape}');
              expect(onChangeOpen).not.toHaveBeenCalledWith(true);
              await toBeClosed(r)
            });
            
            it('closes when open becomes false (rerender)', async () => {
              r.rerender(<SelectTest open onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />);
              await toBeOpened(r);
              
              r.rerender(<SelectTest open={false} onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />);
              await toBeClosed(r);
            });
          });
          
          describe('open=true', () => {
            let r: RenderResult;
            const onChangeOpen = vi.fn();
            
            beforeEach(() => {
              r = render(<SelectTest open onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />)
            })
            
            it('Escape requests close via onChangeOpen(false)', async () => {
              r.rerender(<SelectTest open onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />)
              await userEvent.keyboard('{Escape}');
              expect(onChangeOpen).toHaveBeenCalledWith(false);
            });
          })
        })
      })
      
      describe('selection', () => {
        describe('uncontrolled', () => {
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
          });
          
          it('selects option by click: calls onChangeValue and closes', async () => {
            const onChangeValue = vi.fn();
            r.rerender(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);
            
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_SPB));
            
            expect(onChangeValue).toHaveBeenCalledWith(VALUE_SPB);
            await toBeClosed(r);
          });
          
          it('switches value when selecting another option', async () => {
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_MOSCOW));
            await toBeClosed(r);
            
            expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
            
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_SPB));
            await toBeClosed(r);
            
            expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
          });
        });
        
        describe('controlled', () => {
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SelectTest value={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
          });
          
          it('emits onChangeValue with next value', async () => {
            const onChangeValue = vi.fn();
            r.rerender(<SelectTest value={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);
            
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_SPB));
            
            await waitFor(() => {
              expect(onChangeValue).toHaveBeenCalledWith(VALUE_SPB);
            });
          });
          
          it('reflects external value update into hidden native select', async () => {
            r.rerender(<SelectTest value={VALUE_SPB} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
            expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
          });
        });
      })
    })
    
    describe('typeahead', () => {
      describe('enabled', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        });
        
        it('opens on typing while closed and moves to the match without selecting it', async () => {
          const onChangeValue = vi.fn();
          r.rerender(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);

          getCombobox(r).focus();
          await userEvent.keyboard('nov');

          await toBeOpened(r);
          await toBeActive(r, LABEL_NSK);
          expect(onChangeValue).not.toHaveBeenCalled();
        });

        it('matches from the start of the label, ignoring case', async () => {
          getCombobox(r).focus();

          await userEvent.keyboard('SAI');
          await toBeActive(r, LABEL_SPB);
        });

        it('does not match in the middle of the label', async () => {
          await openByClick(r);

          await userEvent.keyboard('peter');
          await toBeActive(r, LABEL_MOSCOW);
        });

        it('selects an option with a falsy value (0) by typing and Enter', async () => {
          const onChangeValue = vi.fn();

          const r2 = render(
            <Select data-testid='select-numeric' onChangeValue={onChangeValue}>
              <SelectCombobox data-testid='combobox-numeric'>
                <SelectValue placeholder={PLACEHOLDER} />
              </SelectCombobox>

              <SelectListbox>
                <SelectOption value={0}>Zero</SelectOption>
                <SelectOption value={1}>One</SelectOption>
              </SelectListbox>
            </Select>,
          );

          (r2.getByTestId('combobox-numeric') as HTMLElement).focus();
          await userEvent.keyboard('zer');
          await userEvent.keyboard('{Enter}');

          await waitFor(() => {
            expect(onChangeValue).toHaveBeenCalledWith(0);
          });
        });

        it('does not auto-select while open (typing only searches)', async () => {
          const onChangeValue = vi.fn();
          r.rerender(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);
          
          await openByClick(r);
          
          const before = getHiddenSelect(r).value;
          getCombobox(r).focus();
          
          await userEvent.keyboard('nov');
          
          expect(onChangeValue).not.toHaveBeenCalled();
          expect(getHiddenSelect(r).value).toBe(before);
          await toBeOpened(r)
        });
      });
      
      describe('disabled', () => {
        it('does not select by typing when disabled', async () => {
          const onChangeValue = vi.fn();
          const r = render(
            <SelectTest
              typeahead={false}
              onChangeOpen={vi.fn()}
              onChangeValue={onChangeValue}
            />
          );
          
          getCombobox(r).focus();
          await userEvent.keyboard('nov');
          
          expect(onChangeValue).not.toHaveBeenCalled();
          expect(getHiddenSelect(r).value).toBe('');
          await expect.element(getValue(r)).toHaveTextContent(PLACEHOLDER);
        });
      });
    });
    
    describe('disabled', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SelectTest disabled defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
      });
      
      it('renders combobox as disabled button', async () => {
        await expect.element(getCombobox(r)).toBeDisabled();
      });
      
      it('does not open by keyboard (ArrowDown)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeClosed(r);
      });
      
      it('does not select by typing (typeahead)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('mos');
        
        expect(getHiddenSelect(r).value).toBe('');
        await expect.element(getValue(r)).toHaveTextContent(PLACEHOLDER);
      });
      
      it('does not render options as interactive content after interaction attempts', async () => {
        fireEvent.click(getCombobox(r));
        expect(queryOptionByName(r, LABEL_MOSCOW)).toBeNull();
      });
    });
    
    describe('readOnly', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SelectTest readOnly defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
      });
      
      it('keeps combobox enabled but exposes aria-readonly=true', async () => {
        await expect.element(getCombobox(r)).not.toBeDisabled();
        await expect.element(getCombobox(r)).toHaveAttribute('aria-readonly', 'true');
      });
      
      it('does not open by keyboard (ArrowDown)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeClosed(r);
      });
      
      it('does not select by typing (typeahead)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('mos');
        
        expect(getHiddenSelect(r).value).toBe('');
        await expect.element(getValue(r)).toHaveTextContent(PLACEHOLDER);
      });
      
      it('does not render options as interactive content after interaction attempts', async () => {
        fireEvent.click(getCombobox(r));
        expect(queryOptionByName(r, LABEL_MOSCOW)).toBeNull();
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('lets a form field in the list take the focus and closes when the focus leaves it', async () => {
      const r = render(
        <>
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox>
              <input data-testid='search' />
              <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
            </SelectListbox>
          </Select>
          <button type='button' data-testid='after' />
        </>
      );
      const combobox = r.getByTestId(TESTID_COMBOBOX);
      const search = r.getByTestId('search');

      await userEvent.click(combobox);
      await expect.poll(() => getComputedStyle(search).visibility).toBe('visible');
      await userEvent.click(search);

      expect(document.activeElement).toBe(search);
      expect(combobox.getAttribute('aria-expanded')).toBe('true');

      r.getByTestId('after').focus();

      await expect.poll(() => combobox.getAttribute('aria-expanded')).toBe('false');
    });

    it('moves Tab from the combobox into a form field in the open list', async () => {
      const r = render(
        <Select>
          <SelectCombobox data-testid={TESTID_COMBOBOX} aria-label='City'><SelectValue /></SelectCombobox>
          <SelectListbox>
            <input aria-label='Search' />
            <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
          </SelectListbox>
        </Select>
      );

      getCombobox(r).focus();
      await userEvent.keyboard('{ArrowDown}');
      await expect.poll(() => getCombobox(r).getAttribute('aria-expanded')).toBe('true');
      await userEvent.tab();

      await expect.element(r.getByLabelText('Search')).toHaveFocus();
      expect(getCombobox(r).getAttribute('aria-expanded')).toBe('true');
    });

    it('keeps the value on Tab after an arrow that could not move', async () => {
      const onChangeValue = vi.fn();
      const r = render(<SelectTest onChangeValue={onChangeValue} />);
      const combobox = r.getByTestId(TESTID_COMBOBOX);

      combobox.focus();
      await userEvent.keyboard('{ArrowDown}');
      await expect.poll(() => combobox.getAttribute('aria-activedescendant')).toBeTruthy();
      await userEvent.keyboard('{ArrowUp}');
      await userEvent.keyboard('{Tab}');

      await expect.poll(() => combobox.getAttribute('aria-expanded')).toBe('false');
      expect(onChangeValue).not.toHaveBeenCalled();
    });

    it('stays closed when typing matches nothing', async () => {
      const r = render(<SelectTest />);
      const combobox = r.getByTestId(TESTID_COMBOBOX);

      combobox.focus();
      await userEvent.keyboard('z');

      expect(combobox.getAttribute('aria-expanded')).toBe('false');
    });

    it('stays closed on an arrow with Meta or Ctrl', () => {
      const r = render(<SelectTest />);
      const combobox = r.getByTestId(TESTID_COMBOBOX);

      fireEvent.keyDown(combobox, { key: 'ArrowDown', metaKey: true });
      fireEvent.keyDown(combobox, { key: 'ArrowDown', ctrlKey: true });

      expect(combobox.getAttribute('aria-expanded')).toBe('false');
    });

    it.each(['disabled', 'readOnly'])('stays closed with defaultOpen when %s', (state) => {
      const r = render(<SelectTest defaultOpen {...{ [state]: true }} />);

      expect(r.getByTestId(TESTID_COMBOBOX).getAttribute('aria-expanded')).toBe('false');
    });

    it('clears a controlled value with null', async () => {
      const r = render(<SelectTest value={VALUE_MOSCOW} />);

      await expect.poll(() => r.getByTestId(TESTID_VALUE).textContent).toBe(LABEL_MOSCOW);

      r.rerender(<SelectTest value={null} />);

      await expect.poll(() => r.getByTestId(TESTID_VALUE).textContent).toBe(PLACEHOLDER);
    });

    it('uses label for typeahead and shows the option content in the value', async () => {
      const r = render(
        <Select>
          <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue data-testid={TESTID_VALUE} /></SelectCombobox>
          <SelectListbox data-testid={TESTID_LISTBOX}>
            <SelectOption value='a' label='Anna'><b>New</b> Anna</SelectOption>
            <SelectOption value='b' label='Boris'><b>New</b> Boris</SelectOption>
          </SelectListbox>
        </Select>
      );

      getCombobox(r).focus();
      await userEvent.keyboard('b');
      await toBeOpened(r);
      await userEvent.keyboard('{Enter}');

      await toBeClosed(r);
      await expect.element(getValue(r)).toHaveTextContent('New Boris');
    });

    it('keeps the label of the selected option when SelectValue has a ref', async () => {
      const ref = vi.fn();
      const r = render(
        <Select defaultValue={VALUE_MOSCOW}>
          <SelectCombobox><SelectValue data-testid={TESTID_VALUE} ref={ref} /></SelectCombobox>
          <SelectListbox>
            <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
          </SelectListbox>
        </Select>
      );

      await expect.element(getValue(r)).toHaveTextContent(LABEL_MOSCOW);
      expect(ref).toHaveBeenCalledExactlyOnceWith(getValue(r));
    });

    it('activates an option under StrictMode', async () => {
      const r = render(<StrictMode><SelectTest defaultOpen /></StrictMode>);

      await toBeOpened(r);
      await expect.poll(() => getCombobox(r).getAttribute('aria-activedescendant')).toBe(getOptionByName(r, LABEL_MOSCOW).id);
    });

    it('activates an option after the parent rejected opening without one', async () => {
      const r = render(<SelectTest open={false} />);

      getCombobox(r).focus();
      await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
      r.rerender(<SelectTest open />);

      await toBeOpened(r);
      await expect.poll(() => getCombobox(r).getAttribute('aria-activedescendant')).toBe(getOptionByName(r, LABEL_MOSCOW).id);
    });

    it('scrolls to the selected option when opened', async () => {
      const r = render(
        <Select defaultValue={49}>
          <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
          <SelectListbox data-testid={TESTID_LISTBOX}>
            {Array.from({ length: 50 }, (_, index) => <SelectOption key={index} value={index}>{`Item ${index}`}</SelectOption>)}
          </SelectListbox>
        </Select>,
      );

      await openByClick(r);

      await expect.poll(() => getListbox(r).scrollTop).toBeGreaterThan(0);
    });

    it('handles option values with spaces and same-looking values of different types', async () => {
      const r = render(
        <Select>
          <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
          <SelectListbox data-testid={TESTID_LISTBOX}>
            <SelectOption value='a b'>Spaced</SelectOption>
            <SelectOption value={1}>Number</SelectOption>
            <SelectOption value='1'>String</SelectOption>
          </SelectListbox>
        </Select>,
      );

      await openByClick(r);
      await toBeActive(r, 'Spaced');
      expect(getOptionByName(r, 'Spaced').id).not.toMatch(/\s/);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await toBeActive(r, 'String');
    });

    it('scales the listbox in place, wherever the select is on the page', async () => {
      const r = render(<div style={{ padding: '300px 0 0 100px' }}><SelectTest /></div>);

      await openByClick(r);
      const listbox = getListbox(r);
      listbox.style.transition = 'none';
      const full = listbox.getBoundingClientRect();
      listbox.style.scale = '0.5';
      const scaled = listbox.getBoundingClientRect();

      expect(scaled.left).toBeGreaterThanOrEqual(full.left);
      expect(scaled.top).toBeGreaterThanOrEqual(full.top);
      expect(scaled.right).toBeLessThanOrEqual(full.right);
      expect(scaled.bottom).toBeLessThanOrEqual(full.bottom);
    });

    it('stays open after the press on the combobox is released', async () => {
      const r = render(<SelectTest />);

      await openByClick(r);
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(getListbox(r).matches(':popover-open')).toBe(true);
      await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(true);
    });

    it('closes a controlled list for good on an outside click, as a native popover does', async () => {
      const onChangeOpen = vi.fn();
      const r = render(<SelectTest open onChangeOpen={onChangeOpen} />);

      await toBeOpened(r);
      await userEvent.click(document.body);

      await toBeClosed(r);
      expect(onChangeOpen).toHaveBeenCalledExactlyOnceWith(false);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(getListbox(r).matches(':popover-open')).toBe(false);
    });

    it('does not loop between two lists their parents keep open', async () => {
      let toggles = 0;
      const countToggle = () => {
        toggles += 1;
      };
      document.addEventListener('toggle', countToggle, true);
      onTestFinished(() => document.removeEventListener('toggle', countToggle, true));

      render(
        <>
          <SelectTest open />
          <SelectTest open />
        </>
      );
      await new Promise((resolve) => setTimeout(resolve, 300));

      expect(toggles).toBeLessThan(5);
    });

    it.runIf(server.browser === 'chromium')('keeps the list in place while it fades out inside a container', async () => {
      const r = render(
        <div style={{ containerType: 'inline-size', marginLeft: 200, marginTop: 100 }}>
          <SelectTest />
        </div>
      );
      const center = () => {
        const rect = getListbox(r).getBoundingClientRect();
        return [Math.round(rect.left + rect.width / 2), Math.round(rect.top + rect.height / 2)];
      };

      await userEvent.click(getCombobox(r));
      await toBeOpened(r);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const opened = center();

      await userEvent.keyboard('{Escape}');
      await new Promise(requestAnimationFrame);

      expect(getListbox(r).matches(':popover-open')).toBe(false);
      expect(center()).toEqual(opened);
    });

    it('stays closed after Escape pressed right after opening', async () => {
      const r = render(<SelectTest />);

      getCombobox(r).focus();
      await userEvent.keyboard('{ArrowDown}{Escape}');

      await toBeClosed(r);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(getListbox(r).matches(':popover-open')).toBe(false);
      expect(getCombobox(r).getAttribute('aria-expanded')).toBe('false');
    });

    it('makes the listbox at least as wide as the combobox', async () => {
      const r = render(<SelectTest style={{ width: 600 }} />);

      await openByClick(r);

      await expect.poll(() => getListbox(r).getBoundingClientRect().width).toBeGreaterThanOrEqual(getCombobox(r).getBoundingClientRect().width);
    });

    it('keeps the listbox as wide as the combobox when the combobox resizes while open', async () => {
      const r = render(<SelectTest style={{ width: 300 }} />);

      await openByClick(r);
      r.getByTestId(TESTID_ROOT).style.width = '600px';

      await expect.poll(() => getListbox(r).getBoundingClientRect().width).toBeGreaterThanOrEqual(getCombobox(r).getBoundingClientRect().width);
    });

    describe('option with an empty value', () => {
      const LABEL_ANY = 'Any city';

      const EmptyOptionSelectTest: FC<ComponentProps<typeof Select>> = (props) => (
        <Select data-testid={TESTID_ROOT} {...props}>
          <SelectCombobox data-testid={TESTID_COMBOBOX}>
            <SelectValue data-testid={TESTID_VALUE} placeholder={PLACEHOLDER} />
          </SelectCombobox>
          <SelectListbox data-testid={TESTID_LISTBOX}>
            <SelectOption value=''>{LABEL_ANY}</SelectOption>
            <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
          </SelectListbox>
        </Select>
      );

      it('is not selected without defaultValue', async () => {
        const r = render(<EmptyOptionSelectTest />);

        await userEvent.click(getCombobox(r));

        await expect.element(r.getByRole('option', { name: LABEL_ANY })).not.toHaveAttribute('aria-selected', 'true');
      });
    });

    it('submits empty string when nothing selected (defaultValue="")', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: '',
      });
    });
    
    it('submits defaultValue when user did not interact', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest defaultValue={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: VALUE_MOSCOW,
      });
    });
    
    it('controlled value: submits controlled value even if user attempted to select another option', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest value={VALUE_MOSCOW} defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />
        </FormTest>
      );
      
      await userEvent.click(getCombobox(r));
      await userEvent.click(r.getByRole('option', { name: LABEL_SPB }));
      await userEvent.click(getSubmit(r));
      
      expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
      expect(submitted).toEqual({
        [NAME]: VALUE_MOSCOW,
      });
    });
    
    it('disabled: does not submit value via form', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest
            disabled
            defaultValue={VALUE_MOSCOW}
            onChangeOpen={vi.fn()}
            onChangeValue={vi.fn()}
          />
        </FormTest>
      );
      
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({});
    });
    
    it('submits the option selected by keyboard', async () => {
      let submitted: Record<string, string> | null = null;

      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest defaultValue='' />
        </FormTest>
      );

      getCombobox(r).focus();
      await userEvent.keyboard('{ArrowDown}');
      await toBeOpened(r);
      await userEvent.keyboard('{End}{Enter}');
      await toBeClosed(r);
      await userEvent.click(getSubmit(r));

      expect(submitted).toEqual({ [NAME]: VALUE_NSK });
    });

    it('is invalid while required and empty', async () => {
      const onSubmit = vi.fn();

      const r = render(
        <FormTest onSubmit={onSubmit}>
          <Select>
            <SelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} name={NAME} required />
            <SelectCombobox data-testid={TESTID_COMBOBOX} aria-label='City'><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
            </SelectListbox>
          </Select>
        </FormTest>
      );

      expect((r.getByTestId(FORM_TESTID) as HTMLFormElement).checkValidity()).toBe(false);
      expect(getHiddenSelect(r).validity.valueMissing).toBe(true);
    });

    it('submits a required select once an option is chosen', async () => {
      const onSubmit = vi.fn();

      const r = render(
        <FormTest onSubmit={onSubmit}>
          <Select>
            <SelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} name={NAME} required />
            <SelectCombobox data-testid={TESTID_COMBOBOX} aria-label='City'><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
            </SelectListbox>
          </Select>
        </FormTest>
      );

      await openByClick(r);
      await userEvent.click(getOptionByName(r, LABEL_MOSCOW));
      await userEvent.click(getSubmit(r));

      expect(onSubmit).toHaveBeenCalledWith({ [NAME]: VALUE_MOSCOW });
    });

    it.skipIf(server.browser === 'firefox')('moves the focus to the combobox when an invalid submit reports the required select', async () => {
      const r = render(
        <FormTest onSubmit={vi.fn()}>
          <Select>
            <SelectHiddenSelect data-testid={TESTID_HIDDEN_SELECT} name={NAME} required />
            <SelectCombobox data-testid={TESTID_COMBOBOX} aria-label='City'><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
            </SelectListbox>
          </Select>
        </FormTest>
      );

      await userEvent.click(getSubmit(r));
      await expect.poll(() => [document.body, getSubmit(r)].includes(document.activeElement as HTMLElement)).toBe(false);
      const focused = document.activeElement;

      await openByClick(r);
      await userEvent.click(getOptionByName(r, LABEL_MOSCOW));
      await userEvent.click(getSubmit(r));

      expect(focused).toBe(getCombobox(r));
    });

    it('restores the default value in the combobox on form reset', async () => {
      const r = render(
        <FormTest onSubmit={vi.fn()}>
          <SelectTest defaultValue={VALUE_MOSCOW} />
        </FormTest>
      );

      await openByClick(r);
      await userEvent.click(getOptionByName(r, LABEL_SPB));
      await expect.element(getValue(r)).toHaveTextContent(LABEL_SPB);

      (r.getByTestId(FORM_TESTID) as HTMLFormElement).reset();

      await expect.poll(() => getValue(r).textContent).toBe(LABEL_MOSCOW);
      expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
    });

    it('readOnly: blocks selection changes, submits initial value (defaultValue)', async () => {
      let submitted: Record<string, string> | null = null;
      
      const r = render(
        <FormTest onSubmit={(d) => (submitted = d)}>
          <SelectTest readOnly defaultValue={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />
        </FormTest>
      );
      
      fireEvent.click(getCombobox(r));
      await userEvent.click(getSubmit(r));
      
      expect(submitted).toEqual({
        [NAME]: VALUE_MOSCOW,
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
      });

      it('combobox exposes the popup state and the list it controls', async () => {
        const combobox = getCombobox(r);

        await expect.element(combobox).toHaveAttribute('aria-haspopup', 'listbox');
        await expect.element(combobox).toHaveAttribute('aria-expanded', 'false');
        await expect.element(combobox).toHaveAttribute('aria-controls', getListbox(r).id);

        await openByClick(r);
        await expect.element(combobox).toHaveAttribute('aria-expanded', 'true');
      });
      
      it('marks only the selected option with aria-selected=true', async () => {
        r.unmount();
        r = render(<SelectTest defaultValue={VALUE_SPB} />);

        await openByClick(r);

        expect(getOptionByName(r, LABEL_SPB).getAttribute('aria-selected')).toBe('true');
        expect(getOptionByName(r, LABEL_MOSCOW).getAttribute('aria-selected')).not.toBe('true');
        expect(getOptionByName(r, LABEL_NSK).getAttribute('aria-selected')).not.toBe('true');
      });

      it('moves aria-selected to the option chosen by keyboard', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        await userEvent.keyboard('{ArrowDown}{Enter}');
        await toBeClosed(r);

        await openByClick(r);

        expect(getOptionByName(r, LABEL_SPB).getAttribute('aria-selected')).toBe('true');
        expect(getOptionByName(r, LABEL_MOSCOW).getAttribute('aria-selected')).not.toBe('true');
      });

      it('drops aria-activedescendant when closed', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_MOSCOW);

        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);

        expect(getCombobox(r).hasAttribute('aria-activedescendant')).toBe(false);
      });

      it('takes the accessible names passed by the user', async () => {
        r.unmount();
        r = render(
          <>
            <span id='city-label'>City</span>
            <Select>
              <SelectCombobox data-testid={TESTID_COMBOBOX} aria-labelledby='city-label'><SelectValue /></SelectCombobox>
              <SelectListbox data-testid={TESTID_LISTBOX} aria-labelledby='city-label'>
                <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
              </SelectListbox>
            </Select>
          </>
        );

        await openByClick(r);

        expect(r.getByRole('combobox', { name: 'City' })).toBe(getCombobox(r));
        expect(r.getByRole('listbox', { name: 'City' })).toBe(getListbox(r));
      });

      it('is labelled by a native label', async () => {
        r.unmount();
        r = render(
          <>
            <label htmlFor='city'>City</label>
            <Select>
              <SelectCombobox id='city' data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
              <SelectListbox data-testid={TESTID_LISTBOX}>
                <SelectOption value={VALUE_MOSCOW}>{LABEL_MOSCOW}</SelectOption>
              </SelectListbox>
            </Select>
          </>
        );

        expect(r.getByRole('combobox', { name: 'City' })).toBe(getCombobox(r));
      });
    });
    
    describe('focus', () => {
      it('skips a disabled first option when opened', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value={VALUE_MOSCOW} disabled>{LABEL_MOSCOW}</SelectOption>
              <SelectOption value={VALUE_SPB}>{LABEL_SPB}</SelectOption>
            </SelectListbox>
          </Select>,
        );

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);

        await toBeActive(r, LABEL_SPB);
      });

      it('activates the selected option when opened', async () => {
        const r = render(<SelectTest defaultValue={VALUE_SPB} />);

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);

        await toBeActive(r, LABEL_SPB);
      });

      it('keeps the focus on the combobox when an option is clicked', async () => {
        const r = render(<SelectTest defaultValue='' />);

        await openByClick(r);
        await userEvent.click(getOptionByName(r, LABEL_SPB));
        await toBeClosed(r);

        await expect.element(getCombobox(r)).toHaveFocus();
      });

      it('restores focus to combobox after closing with Escape', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        await openByClick(r);
        
        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);
        
        await expect.element(getCombobox(r)).toHaveFocus();
      });
      
      it('restores focus to combobox after selecting with Enter', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await toBeActive(r, LABEL_MOSCOW);
        
        await userEvent.keyboard('{Enter}');
        await toBeClosed(r);
        
        await waitFor(async () => {
          await expect.element(getCombobox(r)).toHaveFocus();
        });
      });
    });
    
    describe('keyboard', () => {
      it('ArrowDown opens; ArrowDown/ArrowUp move the active option and stop at the ends', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await toBeActive(r, LABEL_MOSCOW);
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_SPB);
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_NSK);
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_NSK);
        
        await userEvent.keyboard('{ArrowUp}');
        await toBeActive(r, LABEL_SPB);
      });
      
      it('Home focuses first option and End focuses last option', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await userEvent.keyboard('{End}');
        await toBeActive(r, LABEL_NSK);
        
        await userEvent.keyboard('{Home}');
        await toBeActive(r, LABEL_MOSCOW);
      });
      
      it('Enter selects focused option and closes (uncontrolled)', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_SPB);
        
        await userEvent.keyboard('{Enter}');
        await toBeClosed(r);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
        await expect.element(getValue(r)).toHaveTextContent(LABEL_SPB);
      });
      
      it('Space selects focused option and closes (uncontrolled)', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await toBeActive(r, LABEL_MOSCOW);
        
        await userEvent.keyboard(' ');
        await toBeClosed(r);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
        await expect.element(getValue(r)).toHaveTextContent(LABEL_MOSCOW);
      });
      
      it('Tab selects the active option, closes and leaves the combobox', async () => {
        const r = render(<><SelectTest defaultValue='' /><button>after</button></>);

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, LABEL_SPB);

        await userEvent.keyboard('{Tab}');

        await toBeClosed(r);
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
      });

      it('Tab keeps the value when the keyboard did not move in the opened list', async () => {
        const r = render(<><SelectTest defaultValue='' /><button>after</button></>);

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);

        await userEvent.keyboard('{Tab}');

        await toBeClosed(r);
        expect(getHiddenSelect(r).value).toBe('');
      });

      it('Alt+ArrowDown opens keeping the focus and the value, Alt+ArrowUp closes', async () => {
        const r = render(<SelectTest defaultValue='' />);

        getCombobox(r).focus();
        await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}');
        await toBeOpened(r);
        await expect.element(getCombobox(r)).toHaveFocus();
        expect(getHiddenSelect(r).value).toBe('');

        await userEvent.keyboard('{Alt>}{ArrowUp}{/Alt}');
        await toBeClosed(r);
      });

      it('skips disabled options', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value='a'>Alpha</SelectOption>
              <SelectOption value='b' disabled>Beta</SelectOption>
              <SelectOption value='c'>Gamma</SelectOption>
            </SelectListbox>
          </Select>,
        );

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        await userEvent.keyboard('{ArrowDown}');

        await toBeActive(r, 'Gamma');
      });

      it.each([
        ['{Enter}', 'Enter'],
        [' ', 'Space'],
        ['{ArrowUp}', 'ArrowUp'],
      ])('%s opens a closed list on the first option without selecting it (%s)', async (key) => {
        const onChangeValue = vi.fn();
        const r = render(<SelectTest defaultValue='' onChangeValue={onChangeValue} />);

        getCombobox(r).focus();
        await userEvent.keyboard(key);

        await toBeOpened(r);
        await toBeActive(r, LABEL_MOSCOW);
        expect(onChangeValue).not.toHaveBeenCalled();
        expect(getHiddenSelect(r).value).toBe('');
      });

      it('Home and End open a closed list on the first and the last option', async () => {
        const r = render(<SelectTest defaultValue={VALUE_SPB} />);

        getCombobox(r).focus();
        await userEvent.keyboard('{End}');
        await toBeOpened(r);
        await toBeActive(r, LABEL_NSK);

        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);

        await userEvent.keyboard('{Home}');
        await toBeOpened(r);
        await toBeActive(r, LABEL_MOSCOW);
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
      });

      it('PageDown and PageUp move the active option by 10 and stop at the ends', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              {Array.from({ length: 15 }, (_, index) => <SelectOption key={index} value={index}>{`Item ${index}`}</SelectOption>)}
            </SelectListbox>
          </Select>,
        );

        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeActive(r, 'Item 0');

        await userEvent.keyboard('{PageDown}');
        await toBeActive(r, 'Item 10');

        await userEvent.keyboard('{PageDown}');
        await toBeActive(r, 'Item 14');

        await userEvent.keyboard('{PageUp}');
        await toBeActive(r, 'Item 4');

        await userEvent.keyboard('{PageUp}');
        await toBeActive(r, 'Item 0');
      });

      it('cycles among the options starting with the same typed character', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value='a'>Alpha</SelectOption>
              <SelectOption value='b'>Avocado</SelectOption>
              <SelectOption value='c'>Beta</SelectOption>
            </SelectListbox>
          </Select>,
        );

        getCombobox(r).focus();
        await userEvent.keyboard('a');
        await toBeActive(r, 'Alpha');

        await userEvent.keyboard('a');
        await toBeActive(r, 'Avocado');

        await userEvent.keyboard('a');
        await toBeActive(r, 'Alpha');
      });

      it('starts a new search after a pause in typing', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value='a'>Alpha</SelectOption>
              <SelectOption value='b'>Beta</SelectOption>
              <SelectOption value='c'>Bravo</SelectOption>
            </SelectListbox>
          </Select>,
        );

        await openByClick(r);
        await userEvent.keyboard('a');
        await toBeActive(r, 'Alpha');

        await new Promise((resolve) => setTimeout(resolve, 600));
        await userEvent.keyboard('br');

        await toBeActive(r, 'Bravo');
      });

      it('typeahead skips disabled options', async () => {
        const r = render(
          <Select>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value='a'>Alpha</SelectOption>
              <SelectOption value='b' disabled>Beta</SelectOption>
              <SelectOption value='c'>Bravo</SelectOption>
            </SelectListbox>
          </Select>,
        );

        getCombobox(r).focus();
        await userEvent.keyboard('b');

        await toBeActive(r, 'Bravo');
      });

      it('does not select a disabled option by click', async () => {
        const onChangeValue = vi.fn();
        const r = render(
          <Select onChangeValue={onChangeValue}>
            <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
            <SelectListbox data-testid={TESTID_LISTBOX}>
              <SelectOption value='a'>Alpha</SelectOption>
              <SelectOption value='b' disabled>Beta</SelectOption>
            </SelectListbox>
          </Select>,
        );

        await openByClick(r);
        expect(getOptionByName(r, 'Beta').getAttribute('aria-disabled')).toBe('true');
        fireEvent.click(getOptionByName(r, 'Beta'));

        expect(onChangeValue).not.toHaveBeenCalled();
        await toBeOpened(r);
      });

      it('Escape closes without changing value', async () => {
        const r = render(<SelectTest defaultValue={VALUE_SPB} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
        
        await openByClick(r);
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');
        
        await userEvent.keyboard('{Escape}');
        await toBeClosed(r);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
        await expect.element(getValue(r)).toHaveTextContent(LABEL_SPB);
      });
    });
  });
  describe('Performance', () => {
    it('re-renders only the options whose active state changes on arrows', async () => {
      const rendered = new Set<string>();
      const r = render(
        <Select defaultOpen>
          <SelectCombobox data-testid={TESTID_COMBOBOX}><SelectValue /></SelectCombobox>
          <SelectListbox data-testid={TESTID_LISTBOX}>
            {[LABEL_MOSCOW, LABEL_SPB, LABEL_NSK].map((name) => (
              <Profiler key={name} id={name} onRender={(id) => rendered.add(id)}>
                <SelectOption value={name}>{name}</SelectOption>
              </Profiler>
            ))}
          </SelectListbox>
        </Select>,
      );

      getCombobox(r).focus();
      await toBeActive(r, LABEL_MOSCOW);
      rendered.clear();

      await userEvent.keyboard('{ArrowDown}');
      await toBeActive(r, LABEL_SPB);

      expect([...rendered].sort()).toEqual([LABEL_MOSCOW, LABEL_SPB]);
    });
  });
});
