import { ComponentProps, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, onTestFinished, vi, type Mock } from 'vitest';
import { commands, userEvent } from 'vitest/browser';
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

const GrowingText = () => {
  const [lines, setLines] = useState(1);

  return (
    <div>
      {Array.from({ length: lines }, (_, line) => <p key={line}>Line {line}</p>)}
      <button type='button' onClick={() => setLines(lines + 3)}>More</button>
    </div>
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
            
            it('closes (still visible until animation end)', async () => {
              await expect.element(getTrigger(r)).toHaveAttribute('aria-expanded', 'false');
              await expect.element(getContent(r)).toHaveAttribute('data-open', 'false');
              await expect.element(getContent(r)).not.toHaveAttribute('hidden');
            });
            
            describe('when animation ends', () => {
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
  
  describe('Error handling', () => {
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
    it('shows the content when the parent opens it', async () => {
      const r = render(<CollapsibleTest open={false} />);

      r.rerender(<CollapsibleTest open />);

      await expect.element(getContent(r)).not.toHaveAttribute('hidden');
      await expect.element(getContent(r)).toBeVisible();
    });

    it('grows with content that changes after opening', async () => {
      const r = render(
        <CollapsibleTest defaultOpen>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'><GrowingText /></CollapsibleContent>
        </CollapsibleTest>
      );
      const content = getContent(r);

      await userEvent.click(r.getByRole('button', { name: 'More' }));

      await expect.poll(() => content.getBoundingClientRect().height).toBeCloseTo(content.scrollHeight, 0);
    });

    it('does not animate content that starts open', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const r = render(<CollapsibleTest defaultOpen />);
      const content = getContent(r);

      expect(content.getBoundingClientRect().height).toBeCloseTo(content.scrollHeight, 0);
    });

    it('fits nested content after it opens and closes', async () => {
      const r = render(
        <CollapsibleTest defaultOpen>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'>
            <Collapsible>
              <CollapsibleTrigger>Inner</CollapsibleTrigger>
              <CollapsibleContent><div style={{ height: 300 }} /></CollapsibleContent>
            </Collapsible>
          </CollapsibleContent>
        </CollapsibleTest>
      );
      const content = getContent(r);
      const initialHeight = content.getBoundingClientRect().height;

      await userEvent.click(r.getByRole('button', { name: 'Inner' }));
      await expect.poll(() => content.getBoundingClientRect().height).toBe(initialHeight + 300);

      await userEvent.click(r.getByRole('button', { name: 'Inner' }));
      await expect.poll(() => content.getBoundingClientRect().height).toBe(initialHeight);
    });

    it('animates opening again after it closed', async () => {
      const r = render(
        <CollapsibleTest defaultOpen>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'><div style={{ height: 300 }} /></CollapsibleContent>
        </CollapsibleTest>
      );
      const content = getContent(r);

      await userEvent.click(getTrigger(r));
      await expect.element(content).toHaveAttribute('hidden');
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      (getTrigger(r) as HTMLButtonElement).click();
      await new Promise(requestAnimationFrame);

      expect(content.getBoundingClientRect().height).toBeLessThan(300);
    });

    it('reverses from the current height when toggled mid-animation', async () => {
      document.documentElement.dataset.motion = '';
      onTestFinished(() => {
        delete document.documentElement.dataset.motion;
      });
      const r = render(
        <CollapsibleTest defaultOpen>
          <CollapsibleTrigger data-testid='trigger'>Toggle</CollapsibleTrigger>
          <CollapsibleContent data-testid='content'><div style={{ height: 300 }} /></CollapsibleContent>
        </CollapsibleTest>
      );
      const content = getContent(r);

      await userEvent.click(getTrigger(r));
      await expect.poll(() => content.getBoundingClientRect().height).toBeLessThan(250);
      const height = content.getBoundingClientRect().height;
      (getTrigger(r) as HTMLButtonElement).click();
      await new Promise(requestAnimationFrame);

      expect(content.getBoundingClientRect().height).toBeGreaterThan(height - 100);
      expect(content.getBoundingClientRect().height).toBeLessThan(300);
    });

    it('still hides the content when the user prefers reduced motion', async () => {
      await commands.emulateReducedMotion('reduce');
      onTestFinished(() => commands.emulateReducedMotion('no-preference'));
      const r = render(<CollapsibleTest defaultOpen />);

      await expect.element(getContent(r)).not.toHaveAttribute('hidden');
      await userEvent.click(getTrigger(r));

      await expect.element(getContent(r)).toHaveAttribute('hidden');
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
    });
  });
});

