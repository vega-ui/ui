import { ComponentProps, FC, FormEvent, PropsWithChildren, StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi } from 'vitest';
import { cleanup, fireEvent, render, type RenderResult, waitFor } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';

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
    describe('combobox', () => {
      describe('placeholder', () => {
        describe('has not selected option', () => {{
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
          });
          
          it('renders placeholder when defaultValue is empty', async () => {
            await expect.element(getValue(r)).toHaveTextContent(PLACEHOLDER);
          });
          
          it('marks placeholder state via data-placeholder=true', async () => {
            await expect.element(getValue(r)).toHaveAttribute('data-placeholder', 'true');
          });
        }})
        
        describe('has selected option', () => {{
          let r: RenderResult;
          
          beforeEach(() => {
            r = render(<SelectTest defaultValue={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
          });
          
          it('does not render placeholder state when defaultValue is non-empty', async () => {
            await expect.element(getValue(r)).toHaveAttribute('data-placeholder', 'false');
          });
          
          it('renders selected label (not placeholder) when defaultValue is non-empty', async () => {
            await expect.element(getValue(r)).not.toHaveTextContent(PLACEHOLDER);
          });
        }})
      })
    })
    
    describe('listbox', () => {
      describe('open/close', () => {
        describe('uncontrolled', () => {
          describe('defaultOpen=false', () => {
            let r: RenderResult;
            
            beforeEach(() => {
              r = render(<SelectTest defaultOpen={false} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
            });
            
            it('starts closed', async () => {
              await toBeClosed(r)
            });
            
            it('opens on combobox click', async () => {
              await userEvent.click(getCombobox(r));
              await toBeOpened(r);
            });
            
            it('closes on Escape when opened', async () => {
              await userEvent.click(getCombobox(r));
              await toBeOpened(r);
              
              await userEvent.keyboard('{Escape}');
              await toBeClosed(r);
            });
            
            it('closes on outside click when opened', async () => {
              await userEvent.click(getCombobox(r));
              await toBeOpened(r);
              
              await userEvent.click(document.body);
              await toBeClosed(r);
            });
          });
          
          describe('defaultOpen=true', () => {
            let r: RenderResult;
            
            beforeEach(() => {
              r = render(<SelectTest defaultOpen onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
            });
            
            it('starts opened', async () => {
              await toBeOpened(r)
            });
            
            it('closes on Escape', async () => {
              await userEvent.keyboard('{Escape}');
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
            
            it('stays closed while open prop is false', async () => {
              await toBeClosed(r)
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
            
            it('opens when open becomes true (rerender)', async () => {
              r.rerender(<SelectTest open onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />);
              await toBeOpened(r);
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
            
            it('outside click requests close via onChangeOpen(false)', async () => {
              r.rerender(<SelectTest open onChangeOpen={onChangeOpen} onChangeValue={vi.fn()} />)
              await userEvent.click(document.body);
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
          
          it('updates hidden native select value after selection', async () => {
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_NSK));
            await toBeClosed(r);
            
            expect(getHiddenSelect(r).value).toBe(VALUE_NSK);
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
          
          it('does not change hidden select value without external update', async () => {
            const onChangeValue = vi.fn();
            r.rerender(<SelectTest value={VALUE_MOSCOW} onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);
            
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_SPB));
            await toBeClosed(r);
            
            expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
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
      
      it('stays closed and listbox is hidden', async () => {
        await toBeClosed(r);
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
      
      it('stays closed and listbox is hidden', async () => {
        await toBeClosed(r);
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

    it('does not scale the listbox when the user prefers reduced motion', async () => {
      await commands.emulateReducedMotion('reduce');
      onTestFinished(() => commands.emulateReducedMotion('no-preference'));
      const r = render(<SelectTest />);
      const scale = getComputedStyle(getListbox(r)).scale;

      expect(['1', 'none']).toContain(scale);
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

    it('renders the listbox in the top layer only while shown', async () => {
      const r = render(<SelectTest />);

      expect(getListbox(r).matches(':popover-open')).toBe(false);

      await openByClick(r);
      expect(getListbox(r).matches(':popover-open')).toBe(true);

      await userEvent.keyboard('{Escape}');
      await toBeClosed(r);
      expect(getListbox(r).matches(':popover-open')).toBe(false);
    });

    it('stays open after the press on the combobox is released', async () => {
      const r = render(<SelectTest />);

      await openByClick(r);
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(getListbox(r).matches(':popover-open')).toBe(true);
      await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(true);
    });

    it('keeps a controlled list open when the parent rejects closing', async () => {
      const r = render(<SelectTest open />);

      await userEvent.keyboard('{Escape}');

      await expect.poll(() => getListbox(r).matches(':popover-open')).toBe(true);
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
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
      });
      
      it('combobox has role=combobox', async () => {
        await expect.element(getCombobox(r)).toHaveRole('combobox');
      });
      
      it('listbox has role=listbox', async () => {
        await expect.element(getListbox(r)).toHaveRole('listbox');
      });
      
      it('options have role=option when opened', async () => {
        await openByClick(r);
        
        await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveRole('option');
        await expect.element(getOptionByName(r, LABEL_SPB)).toHaveRole('option');
        await expect.element(getOptionByName(r, LABEL_NSK)).toHaveRole('option');
      });
    });
    
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
      
      it('hidden native select is aria-hidden and not tabbable', async () => {
        expect(getHiddenSelect(r).getAttribute('aria-hidden')).toBe('true');
        expect(getHiddenSelect(r).tabIndex).toBe(-1);
      });
      
      it('hides the listbox from assistive technology while closed', async () => {
        expect(getComputedStyle(getListbox(r)).visibility).toBe('hidden');
        
        await openByClick(r);
        
        await expect.poll(() => getComputedStyle(getListbox(r)).visibility).toBe('visible');
      });
    });
    
    describe('focus', () => {
      it('activates the first option and keeps focus on the combobox when opened by ArrowDown', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await expect.element(getCombobox(r)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await toBeActive(r, LABEL_MOSCOW);
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
});