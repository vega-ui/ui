import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, waitFor } from '@testing-library/react';

import { Accordion } from '../Accordion';
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from '../components';

const ITEMS = ['One', 'Two', 'Three'] as const;

const AccordionTest = (props: ComponentProps<typeof Accordion>) => {
  const { children, ...rest } = props;
  
  return (
    <Accordion {...rest}>
      {children ??
        ITEMS.map((val) => (
          <AccordionItem key={val} value={val} contentId={`content-${val.toLowerCase()}`}>
            <AccordionHeader>
              <AccordionTrigger>Trigger {val}</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Content {val}</AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
};

const getTrigger = (r: RenderResult, val: (typeof ITEMS)[number]) => r.getByText(`Trigger ${val}`);
const getContent = (r: RenderResult, val: (typeof ITEMS)[number]) => r.getByText(`Content ${val}`);

afterEach(cleanup);

describe('Accordion', () => {
  describe('Critical User Paths', () => {
    describe('single (multiple=false)', () => {
      describe('default', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<AccordionTest />);
        });
        
        it('all closed', async () => {
          await expect.element(getContent(r, 'One')).not.toBeVisible();
          await expect.element(getContent(r, 'Two')).not.toBeVisible();
          await expect.element(getContent(r, 'Three')).not.toBeVisible();
        });
        
        it('opens One (keeps others closed) and sets aria-expanded=true', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          
          await expect.element(getContent(r, 'One')).toBeVisible();
          await expect.element(getContent(r, 'Two')).not.toBeVisible();
          await expect.element(getContent(r, 'Three')).not.toBeVisible();
          await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-expanded', 'true');
        });
        
        it('switches from One to Two', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          await userEvent.click(getTrigger(r, 'Two'));
          
          await expect.element(getContent(r, 'Two')).toBeVisible();
          await expect.element(getContent(r, 'One')).not.toBeVisible();
        });
        
        it('closes opened item on second click and sets aria-expanded=false', async () => {
          await userEvent.click(getTrigger(r, 'Two'));
          await userEvent.click(getTrigger(r, 'Two'));
          
          await expect.element(getContent(r, 'Two')).not.toBeVisible();
          await expect.element(getTrigger(r, 'Two')).toHaveAttribute('aria-expanded', 'false');
        });
      });
      
      describe('with defaultOpened', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<AccordionTest defaultOpened={['One']} />);
        });
        
        it('opens default item and keeps others closed', async () => {
          await expect.element(getContent(r, 'One')).toBeVisible();
          await expect.element(getContent(r, 'Two')).not.toBeVisible();
          await expect.element(getContent(r, 'Three')).not.toBeVisible();
        });
      });
      
      describe('controlled', () => {
        let r: RenderResult;
        let onChangeOpened: Mock;
        
        beforeEach(() => {
          onChangeOpened = vi.fn();
          r = render(<AccordionTest opened={['Two']} onChangeOpened={onChangeOpened} />);
        });
        
        it('renders from prop', async () => {
          await expect.element(getContent(r, 'Two')).toBeVisible();
          await expect.element(getContent(r, 'One')).not.toBeVisible();
        });
        
        it('clicking another trigger calls onChangeOpened (UI stays controlled)', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          
          await waitFor(() => {
            expect(onChangeOpened).toHaveBeenLastCalledWith(['One']);
          })
          await expect.element(getContent(r, 'Two')).toBeVisible();
          await expect.element(getContent(r, 'One')).not.toBeVisible();
        });
      });
    });
    
    describe('multiple=true', () => {
      describe('default', () => {
        let r: RenderResult;
        
        beforeEach(() => {
          r = render(<AccordionTest multiple />);
        });
        
        it('keeps multiple items open', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          await userEvent.click(getTrigger(r, 'Two'));
          
          await expect.element(getContent(r, 'One')).toBeVisible();
          await expect.element(getContent(r, 'Two')).toBeVisible();
        });
        
        it('closing One keeps Two open', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          await userEvent.click(getTrigger(r, 'Two'));
          await userEvent.click(getTrigger(r, 'One'));
          
          await expect.element(getContent(r, 'One')).not.toBeVisible();
          await expect.element(getContent(r, 'Two')).toBeVisible();
        });
      });
      
      describe('with onChangeOpened', () => {
        let r: RenderResult;
        let onChangeOpened: Mock;
        
        beforeEach(() => {
          onChangeOpened = vi.fn();
          r = render(<AccordionTest multiple onChangeOpened={onChangeOpened} />);
        });
        
        it('accumulates values (order = open sequence)', async () => {
          await userEvent.click(getTrigger(r, 'One'));
          await userEvent.click(getTrigger(r, 'Two'));
          
          await waitFor(() => {
            expect(onChangeOpened).toHaveBeenLastCalledWith(['One', 'Two']);
          })
        });
      });
    });
  });
  
  describe('Error Handling', () => {
    it('duplicate value: opens only one', async () => {
      const r = render(
        <AccordionTest>
          <AccordionItem value='dup' contentId='content-a'>
            <AccordionHeader>
              <AccordionTrigger>Trigger A</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Content A</AccordionContent>
          </AccordionItem>
          
          <AccordionItem value='dup' contentId='content-b'>
            <AccordionHeader>
              <AccordionTrigger>Trigger B</AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>Content B</AccordionContent>
          </AccordionItem>
        </AccordionTest>,
      );
      
      await userEvent.click(r.getByText('Trigger A'));
      await expect.element(r.getByText('Content A')).toBeVisible();
      await expect.element(r.getByText('Content B')).not.toBeVisible();
    });
    
    describe('controlled without onChangeOpened', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest opened={['One']} />);
      });
      
      it('does not throw and keeps current open item', async () => {
        await userEvent.click(getTrigger(r, 'Two'));
        
        await expect.element(getContent(r, 'One')).toBeVisible();
        await expect.element(getContent(r, 'Two')).not.toBeVisible();
      });
    });
  });
  
  describe('Edge Cases', () => {
    it('empty children: renders ul', async () => {
      const r = render(<Accordion />);
      await expect.element(r.container.querySelector('ul')!).toBeInTheDocument();
    });
    
    describe('defaultOpened contains missing value', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest defaultOpened={['Missing']} />);
      });
      
      it('does not crash and nothing opens', async () => {
        await expect.element(getContent(r, 'One')).not.toBeVisible();
        await expect.element(getContent(r, 'Two')).not.toBeVisible();
        await expect.element(getContent(r, 'Three')).not.toBeVisible();
      });
    });
    
    describe('item open override (open=false)', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(
          <AccordionTest defaultOpened={['One']}>
            <AccordionItem value='One' contentId='content-one' open={false}>
              <AccordionHeader>
                <AccordionTrigger>Trigger One</AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>Content One</AccordionContent>
            </AccordionItem>
          </AccordionTest>,
        );
      });
      
      it('keeps item closed (even after click)', async () => {
        await expect.element(r.getByText('Content One')).not.toBeVisible();
        
        await userEvent.click(r.getByText('Trigger One'));
        await expect.element(r.getByText('Content One')).not.toBeVisible();
      });
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest />);
      });
      
      it('trigger has aria-controls', async () => {
        await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-controls', 'content-one');
      });
      
      it('trigger has aria-expanded=false by default', async () => {
        await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-expanded', 'false');
      });
      
      it('click toggles aria-expanded=true and keeps aria-controls stable', async () => {
        await userEvent.click(getTrigger(r, 'One'));
        
        await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-expanded', 'true');
        await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-controls', 'content-one');
      });
    });
    
    describe('focus', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest />);
      });
      
      it('trigger is focusable (programmatic)', async () => {
        getTrigger(r, 'One').focus();
        await expect.element(getTrigger(r, 'One')).toHaveFocus();
      });
    });
    
    describe('keyboard', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest />);
      });
      
      it('Enter toggles', async () => {
        getTrigger(r, 'One').focus();
        await expect.element(getTrigger(r, 'One')).toHaveFocus();
        
        await userEvent.keyboard('{Enter}');
        await expect.element(getContent(r, 'One')).toBeVisible();
      });
      
      it('Space toggles', async () => {
        getTrigger(r, 'One').focus();
        await expect.element(getTrigger(r, 'One')).toHaveFocus();
        
        await userEvent.keyboard(' ');
        await expect.element(getContent(r, 'One')).toBeVisible();
      });
    });
    
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AccordionTest />);
      });
      
      it('renders triggers as interactive elements (has aria-expanded)', async () => {
        await expect.element(getTrigger(r, 'One')).toHaveAttribute('aria-expanded');
      });
    });
  });
});