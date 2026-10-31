import { ComponentProps, FC, FormEvent, PropsWithChildren } from 'react';
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
const getOptionByName = (r: RenderResult, name: string) => r.getByRole('option', { name }) as HTMLButtonElement;

const queryOptionByName = (r: RenderResult, name: string) =>
  r.queryByRole('option', { name }) as HTMLButtonElement | null;

const toBeOpened = async (r: RenderResult) => {
  await expect.element(getListbox(r)).toHaveAttribute('data-status', 'open');
};

const toBeClosed = async (r: RenderResult) => {
  await expect.element(getListbox(r)).toHaveAttribute('data-status', 'close');
};

const toBeUnmounted = async (r: RenderResult) => {
  await expect.element(getListbox(r)).toHaveAttribute('data-status', 'unmounted');
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
              await toBeUnmounted(r)
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
              await toBeUnmounted(r)
            });
            
            it('click requests open via onChangeOpen(true)', async () => {
              await userEvent.click(getCombobox(r));
              expect(onChangeOpen).toHaveBeenCalledWith(true);
            });
            
            it('Escape does not open and does not call onChangeOpen(true)', async () => {
              await userEvent.keyboard('{Escape}');
              expect(onChangeOpen).not.toHaveBeenCalledWith(true);
              await toBeUnmounted(r)
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
            await toBeUnmounted(r);
            
            expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
            
            await openByClick(r);
            await userEvent.click(getOptionByName(r, LABEL_SPB));
            await toBeUnmounted(r);
            
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
            await toBeUnmounted(r);
            
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
        
        it('selects matching option when closed by typing (updates hidden select + value UI)', async () => {
          const combobox = getCombobox(r);
          combobox.focus();
          
          await userEvent.keyboard('nov');
          
          await waitFor(() => {
            expect(getHiddenSelect(r).value).toBe(VALUE_NSK);
          });
          
          await expect.element(getValue(r)).toHaveTextContent(LABEL_NSK);
          expect(r.queryByText(PLACEHOLDER)).toBeNull();
        });
        
        it('matches by substring and case-insensitively', async () => {
          const combobox = getCombobox(r);
          combobox.focus();
          
          await userEvent.keyboard('PETER');
          
          await waitFor(() => {
            expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
          });
          
          await expect.element(getValue(r)).toHaveTextContent(LABEL_SPB);
        });
        
        it('calls onChangeValue when selecting by typing while closed', async () => {
          const onChangeValue = vi.fn();
          r.rerender(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={onChangeValue} />);
          
          getCombobox(r).focus();
          await userEvent.keyboard('mos');
          
          await waitFor(() => {
            expect(onChangeValue).toHaveBeenCalledWith(VALUE_MOSCOW);
          });
        });
        
        it('selects an option with a falsy value (0) by typing', async () => {
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
              typeMatchEnabled={false}
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
      
      it('stays closed and listbox is inert', async () => {
        await toBeUnmounted(r);
      });
      
      it('does not open by keyboard (ArrowDown)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeUnmounted(r);
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
      
      it('stays closed and listbox is inert', async () => {
        await toBeUnmounted(r);
      });
      
      it('does not open by keyboard (ArrowDown)', async () => {
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeUnmounted(r);
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
      await toBeUnmounted(r);
      expect(getListbox(r).matches(':popover-open')).toBe(false);
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
      
      it('hidden native select is aria-hidden and not tabbable', async () => {
        expect(getHiddenSelect(r).getAttribute('aria-hidden')).toBe('true');
        expect(getHiddenSelect(r).tabIndex).toBe(-1);
      });
      
      it('listbox is inert while closed and not inert when opened', async () => {
        await expect.element(getListbox(r)).toHaveAttribute('inert');
        
        await openByClick(r);
        
        await waitFor(async () => {
          await expect.element(getListbox(r)).not.toHaveAttribute('inert');
        });
      });
    });
    
    describe('focus', () => {
      it('moves focus to the first option when opened by ArrowDown', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await expect.element(getCombobox(r)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await waitFor(async () => {
          await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
        });
      });
      
      it('restores focus to combobox after closing with Escape', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        await openByClick(r);
        
        await userEvent.keyboard('{Escape}');
        await toBeUnmounted(r);
        
        await expect.element(getCombobox(r)).toHaveFocus();
      });
      
      it('restores focus to combobox after selecting with Enter', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await waitFor(async () => {
          await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
        });
        
        await userEvent.keyboard('{Enter}');
        await toBeUnmounted(r);
        
        await waitFor(async () => {
          await expect.element(getCombobox(r)).toHaveFocus();
        });
      });
    });
    
    describe('keyboard', () => {
      it('ArrowDown opens; ArrowDown/ArrowUp move focus with loop', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await waitFor(async () => {
          await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
        });
        
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getOptionByName(r, LABEL_SPB)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getOptionByName(r, LABEL_NSK)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
        
        await userEvent.keyboard('{ArrowUp}');
        await expect.element(getOptionByName(r, LABEL_NSK)).toHaveFocus();
      });
      
      it('Home focuses first option and End focuses last option', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await userEvent.keyboard('{End}');
        await expect.element(getOptionByName(r, LABEL_NSK)).toHaveFocus();
        
        await userEvent.keyboard('{Home}');
        await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
      });
      
      it('Enter selects focused option and closes (uncontrolled)', async () => {
        const r = render(<SelectTest defaultValue='' onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        getCombobox(r).focus();
        await userEvent.keyboard('{ArrowDown}');
        await toBeOpened(r);
        
        await userEvent.keyboard('{ArrowDown}');
        await expect.element(getOptionByName(r, LABEL_SPB)).toHaveFocus();
        
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
        
        await waitFor(async () => {
          await expect.element(getOptionByName(r, LABEL_MOSCOW)).toHaveFocus();
        });
        
        await userEvent.keyboard(' ');
        await toBeClosed(r);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_MOSCOW);
        await expect.element(getValue(r)).toHaveTextContent(LABEL_MOSCOW);
      });
      
      it('Escape closes without changing value', async () => {
        const r = render(<SelectTest defaultValue={VALUE_SPB} onChangeOpen={vi.fn()} onChangeValue={vi.fn()} />);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
        
        await openByClick(r);
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');
        
        await userEvent.keyboard('{Escape}');
        await toBeUnmounted(r);
        
        expect(getHiddenSelect(r).value).toBe(VALUE_SPB);
        await expect.element(getValue(r)).toHaveTextContent(LABEL_SPB);
      });
    });
  });
});