import { ComponentProps } from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

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

describe('Alert', () => {
  describe('Critical User Paths', () => {
    describe('composition', () => {
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
  
  describe('Accessibility', () => {
    describe('aria', () => {
      it('is not a live region by default', async () => {
        const r = render(<AlertTest variant='error' />);
        await expect.element(getRoot(r)).not.toHaveAttribute('role');
        await expect.element(getRoot(r)).not.toHaveAttribute('aria-live');
      });
    });
  });
});
