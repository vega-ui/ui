import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';

import { Collapsible } from '../Collapsible';
import { CollapsibleContent, CollapsibleTrigger } from '../components';

const CollapsibleTest = (props: ComponentProps<typeof Collapsible>) => {
  const { children, ...rest } = props;
  
  return (
    <Collapsible {...rest}>
      {children ?? (
        <>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'>Content</CollapsibleContent>
        </>
      )}
    </Collapsible>
  );
};

const getTrigger = (r: RenderResult) => r.getByTestId('trigger');
const getContent = (r: RenderResult) => r.getByTestId('content');

afterEach(cleanup);

describe('Collapsible', () => {
  describe('Critical User Paths', () => {
    describe('uncontrolled (defaultOpen=false)', () => {
      describe('default', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<CollapsibleTest />);
        });
        
        it('content is hidden', async () => {
          await expect.element(getContent(r)).toHaveAttribute('hidden');
          await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
          await expect.element(getTrigger(r)).toHaveAttribute('data-open', 'false');
          await expect.element(getContent(r)).toHaveAttribute('data-open', 'false');
        });
        
        describe('when clicking trigger', () => {
          beforeEach(async () => {
            await userEvent.click(getTrigger(r));
          });
          
          it('opens (removes hidden)', async () => {
            await expect.element(getContent(r)).not.toHaveAttribute('hidden');
          });
          
          it('sets aria-expanded=true and data-open=true', async () => {
            await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
            await expect.element(getTrigger(r)).toHaveAttribute('data-open', 'true');
            await expect.element(getContent(r)).toHaveAttribute('data-open', 'true');
          });
          
          describe('when clicking trigger again', () => {
            beforeEach(async () => {
              await userEvent.click(getTrigger(r));
            });
            
            it('closes (still visible until transition end)', async () => {
              await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
              await expect.element(getContent(r)).toHaveAttribute('data-open', 'false');
              await expect.element(getContent(r)).not.toHaveAttribute('hidden');
            });
            
            describe('when transition ends', () => {
              beforeEach(async () => {
                getContent(r).dispatchEvent(new TransitionEvent('transitionend', { bubbles: true }));
              });
              
              it('sets hidden=true', async () => {
                await expect.element(getContent(r)).toHaveAttribute('hidden');
              });
            });
          });
        });
      });
      
      describe('with defaultOpen=true', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<CollapsibleTest defaultOpen />);
        });
        
        it('starts opened (not hidden)', async () => {
          await expect.element(getContent(r)).not.toHaveAttribute('hidden');
          await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
          await expect.element(getContent(r)).toHaveAttribute('data-open', 'true');
        });
      });
    });
    
    describe('contentId', () => {
      it('uses provided contentId for aria-controls and content id', async () => {
        const r = render(<CollapsibleTest contentId='my-content' />);
        await expect.element(getContent(r)).toHaveAttribute('id', 'my-content');
        await expect.element(getTrigger(r)).toHaveAttribute('aria-controls', 'my-content');
      });
      
      it('generates stable id when not provided', async () => {
        const r = render(<CollapsibleTest />);
        const id = getContent(r).getAttribute('id');
        expect(id).toBeTruthy();
        await expect.element(getTrigger(r)).toHaveAttribute('aria-controls', id!);
      });
    });
    
    describe('controlled', () => {
      let r: RenderResult;
      let onChangeOpen: Mock;
      
      beforeEach(() => {
        onChangeOpen = vi.fn();
        r = render(<CollapsibleTest open={false} onChangeOpen={onChangeOpen} />);
      });
      
      it('renders from prop (closed)', async () => {
        await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
        await expect.element(getContent(r)).toHaveAttribute('hidden');
      });
      
      describe('when clicking trigger', () => {
        beforeEach(async () => {
          await userEvent.click(getTrigger(r));
        });
        
        it('calls onChangeOpen(true)', async () => {
          await waitFor(() => {
            expect(onChangeOpen).toHaveBeenLastCalledWith(true);
          });
        });
        
        it('does not open UI without prop update', async () => {
          await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
          await expect.element(getContent(r)).not.toBeVisible();
        })
        
        describe('when parent updates open=true', () => {
          beforeEach(() => {
            r.rerender(<CollapsibleTest open onChangeOpen={onChangeOpen} />);
          });
          
          it('opens UI', async () => {
            await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
            await expect.element(getContent(r)).not.toHaveAttribute('hidden');
          });
        });
      });
    });
  });
  
  describe('Error Handling', () => {
    it('controlled without onChangeOpen: click does not throw and UI stays controlled', async () => {
      const r = render(<CollapsibleTest open={false} />);
      
      await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
      await expect.element(getContent(r)).toHaveAttribute('data-open', 'false');
      
      await userEvent.click(getTrigger(r));
      
      await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
      await expect.element(getContent(r)).toHaveAttribute('data-open', 'false');
    });
  });
  
  describe('Edge Cases', () => {
    it('supports duplicate text in trigger and content (use testids)', async () => {
      const text = 'Same';
      const r = render(
        <CollapsibleTest>
          <CollapsibleTrigger data-testid='trigger'>{text}</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'>{text}</CollapsibleContent>
        </CollapsibleTest>,
      );
      
      await expect.element(getTrigger(r)).toBeInTheDocument();
      await expect.element(getContent(r)).toBeInTheDocument();
    });
    
    it('sets --content-height CSS variable from scrollHeight (layout effect)', async () => {
      const r = render(
        <CollapsibleTest>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'>Content</CollapsibleContent>
        </CollapsibleTest>,
      );
      
      const content = getContent(r) as HTMLDivElement;
      
      Object.defineProperty(content, 'scrollHeight', {
        configurable: true,
        get() {
          return 123;
        },
      });
      
      r.rerender(
        <CollapsibleTest>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'>Content</CollapsibleContent>
        </CollapsibleTest>,
      );
      
      await waitFor(() => {
        expect(content.style.getPropertyValue('--content-height')).toBe('123px');
      });
    });
    
    it('passes props to trigger and content', async () => {
      const r = render(
        <CollapsibleTest>
          <CollapsibleTrigger data-testid='trigger' title='t' />
          <CollapsibleContent data-testid='content' data-x='y' />
        </CollapsibleTest>,
      );
      
      await expect.element(getTrigger(r)).toHaveAttribute('title', 't');
      await expect.element(getContent(r)).toHaveAttribute('data-x', 'y');
    });
  });
  
  describe('Accessibility', () => {
    describe('default trigger (button)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<CollapsibleTest />);
      });
      
      it('trigger is a button and has type=button', async () => {
        await expect.element(getTrigger(r)).toHaveProperty('tagName', 'BUTTON');
        await expect.element(getTrigger(r)).toHaveAttribute('type', 'button');
      });
      
      it('trigger has aria-controls pointing to content id', async () => {
        const id = getContent(r).getAttribute('id');
        expect(id).toBeTruthy();
        await expect.element(getTrigger(r)).toHaveAttribute('aria-controls', id!);
      });
      
      describe('keyboard', () => {
        it('Enter toggles', async () => {
          getTrigger(r).focus();
          await expect.element(getTrigger(r)).toHaveFocus();
          
          await userEvent.keyboard('{Enter}');
          await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
          await expect.element(getContent(r)).not.toHaveAttribute('hidden');
        });
        
        it('Space toggles', async () => {
          getTrigger(r).focus();
          await expect.element(getTrigger(r)).toHaveFocus();
          
          await userEvent.keyboard(' ');
          await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'true');
          await expect.element(getContent(r)).not.toHaveAttribute('hidden');
        });
      });
    });
  });
});

