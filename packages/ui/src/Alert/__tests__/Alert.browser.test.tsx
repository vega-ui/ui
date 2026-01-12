import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { cleanup, render, type RenderResult, within } from '@testing-library/react';

import { Alert } from '../Alert';
import { AlertContent, AlertIcon, AlertMain, AlertTitle } from '../components';

afterEach(cleanup);

const AlertTest = (props: ComponentProps<typeof Alert>) => {
  const { children, ...rest } = props;
  
  return (
    <Alert data-testid='alert' {...rest}>
      {children ?? (
        <>
          <AlertIcon data-testid='icon' />
          <AlertMain data-testid='main'>
            <AlertTitle data-testid='title'>I'm a title</AlertTitle>
            <AlertContent data-testid='content'>I'm a content!</AlertContent>
          </AlertMain>
        </>
      )}
    </Alert>
  );
};

const getRoot = (r: RenderResult) => r.getByTestId('alert');
const getMain = (r: RenderResult) => r.getByTestId('main');
const getTitle = (r: RenderResult) => r.getByTestId('title');
const getContent = (r: RenderResult) => r.getByTestId('content');
const getIcon = (r: RenderResult) => r.getByTestId('icon');

describe('Alert', () => {
  describe('Critical User Paths', () => {
    describe('default', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<AlertTest />);
      });
      
      it('renders root', async () => {
        await expect.element(getRoot(r)).toBeInTheDocument();
      });
      
      it('renders icon, title, content', async () => {
        await expect.element(getIcon(r)).toBeInTheDocument();
        await expect.element(getTitle(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toBeInTheDocument();
      });
      
      it('sets default data attributes', async () => {
        await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'info');
        await expect.element(getRoot(r)).toHaveAttribute('data-appearance', 'fill');
      });
    });
    
    it('applies variant prop', async () => {
      const r = render(<AlertTest variant='success' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'success');
    });
    
    it('applies appearance prop', async () => {
      const r = render(<AlertTest appearance='outline' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-appearance', 'outline');
    });
    
    describe('composition', () => {
      it('renders custom layout', async () => {
        const r = render(
          <AlertTest>
            <AlertIcon data-testid='icon' />
            <AlertMain data-testid='main'>
              <AlertTitle data-testid='title'>Left</AlertTitle>
              <AlertContent data-testid='content'>Right</AlertContent>
            </AlertMain>
          </AlertTest>,
        );
        
        await expect.element(getTitle(r)).toBeInTheDocument();
        await expect.element(getContent(r)).toBeInTheDocument();
      });
      
      it('renders custom icon children', async () => {
        const r = render(
          <AlertTest>
            <AlertIcon data-testid='icon'>
              <span data-testid='custom-icon'>X</span>
            </AlertIcon>
            <AlertMain data-testid='main'>
              <AlertTitle data-testid='title'>I'm a title</AlertTitle>
              <AlertContent data-testid='content'>I'm a content!</AlertContent>
            </AlertMain>
          </AlertTest>,
        );
        
        await expect.element(r.getByTestId('custom-icon')).toBeInTheDocument();
      });
    });
  });
  
  describe('Error handling', () => {
    it('renders with no children', async () => {
      const r = render(<Alert data-testid='alert' />);
      await expect.element(r.getByTestId('alert')).toBeInTheDocument();
    });
    
    it('renders with arbitrary children structure (does not crash)', async () => {
      const r = render(
        <AlertTest>
          <span data-testid='anything'>Anything</span>
        </AlertTest>,
      );
      
      await expect.element(r.getByTestId('anything')).toBeInTheDocument();
    });
    
    it('does not throw on click (non-interactive container)', async () => {
      const r = render(<AlertTest />);
      await userEvent.click(getRoot(r));
      await expect.element(getRoot(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge cases', () => {
    it('passes className to root', async () => {
      const r = render(<AlertTest className='my-alert' />);
      await expect.element(getRoot(r)).toHaveClass('my-alert');
    });
    
    it('supports long title and content (distinct nodes)', async () => {
      const longTitle = 'T'.repeat(2000);
      const longContent = 'C'.repeat(2000);
      
      const r = render(
        <AlertTest>
          <AlertIcon data-testid='icon' />
          <AlertMain data-testid='main'>
            <AlertTitle data-testid='title'>{longTitle}</AlertTitle>
            <AlertContent data-testid='content'>{longContent}</AlertContent>
          </AlertMain>
        </AlertTest>,
      );
      
      await expect.element(getTitle(r)).toHaveTextContent(longTitle);
      await expect.element(getContent(r)).toHaveTextContent(longContent);
    });
    
    it('supports empty title/content', async () => {
      const r = render(
        <AlertTest>
          <AlertIcon data-testid='icon' />
          <AlertMain data-testid='main'>
            <AlertTitle data-testid='title'>{''}</AlertTitle>
            <AlertContent data-testid='content'>{''}</AlertContent>
          </AlertMain>
        </AlertTest>,
      );
      
      await expect.element(getRoot(r)).toBeInTheDocument();
      await expect.element(getTitle(r)).toBeInTheDocument();
      await expect.element(getContent(r)).toBeInTheDocument();
    });
    
    it('allows overriding data attributes via props (document current behavior)', async () => {
      const r = render(<AlertTest data-variant='x' data-appearance='y' />);
      await expect.element(getRoot(r)).toHaveAttribute('data-variant', 'x');
      await expect.element(getRoot(r)).toHaveAttribute('data-appearance', 'y');
    });
    
    it('supports rendering multiple alerts with same text', async () => {
      const r = render(
        <>
          <AlertTest />
          <AlertTest />
        </>,
      );
      
      const allTitles = r.getAllByTestId('title');
      const allContents = r.getAllByTestId('content');
      
      expect(allTitles).toHaveLength(2);
      expect(allContents).toHaveLength(2);
      
      await expect.element(allTitles[0]).toHaveTextContent('I\'m a title');
      await expect.element(allContents[0]).toHaveTextContent('I\'m a content!');
    });
    
    it('scoped queries via within(AlertMain) work', async () => {
      const r = render(<AlertTest />);
      const scope = within(getMain(r));
      
      await expect.element(scope.getByTestId('title')).toBeInTheDocument();
      await expect.element(scope.getByTestId('content')).toBeInTheDocument();
    });
  });
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('supports aria props passthrough', async () => {
        const r = render(<AlertTest role='status' aria-live='polite' />);
        await expect.element(getRoot(r)).toHaveAttribute('role', 'status');
        await expect.element(getRoot(r)).toHaveAttribute('aria-live', 'polite');
      });
      
      it('icon is hidden from accessibility tree', async () => {
        const r = render(<AlertTest />);
        
        await expect
          .element(getIcon(r))
          .toHaveAttribute('aria-hidden', 'true');
      });
    });
    
    describe('focus', () => {
      it('becomes focusable with tabIndex', async () => {
        const r = render(<AlertTest tabIndex={0} />);
        getRoot(r).focus();
        await expect.element(getRoot(r)).toHaveFocus();
      });
    });
  });
});