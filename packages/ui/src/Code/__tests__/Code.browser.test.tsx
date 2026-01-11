import { ComponentProps, ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Code } from '../Code';

afterEach(cleanup);

const TESTID_CODE = 'code';

const DEFAULT_TEXT = 'const a = 1';
const CLASSNAME = 'my-code';
const TITLE = 'snippet';

const CodeTest = (props: ComponentProps<typeof Code> & { children?: ReactNode }) => {
  const { children, ...rest } = props;
  
  return (
    <Code data-testid={TESTID_CODE} {...rest}>
      {children ?? DEFAULT_TEXT}
    </Code>
  );
};

const getCode = (r: RenderResult) => r.getByTestId(TESTID_CODE);

describe('Code', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<CodeTest />);
    });
    
    it('renders', async () => {
      await expect.element(getCode(r)).toBeInTheDocument();
    });
    
    it('renders children text', async () => {
      await expect.element(getCode(r)).toHaveTextContent(DEFAULT_TEXT);
    });
    
    it('forwards className', async () => {
      r.rerender(<CodeTest className={CLASSNAME} />);
      await expect.element(getCode(r)).toHaveClass(CLASSNAME);
    });
    
    it('forwards html attributes', async () => {
      r.rerender(<CodeTest title={TITLE} />);
      await expect.element(getCode(r)).toHaveAttribute('title', TITLE);
    });
    
    it('supports size prop', async () => {
      r.rerender(<CodeTest size={'size' as never} />);
      await expect.element(getCode(r)).toBeInTheDocument();
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without children', async () => {
      const r = render(<CodeTest>{undefined}</CodeTest>);
      await expect.element(getCode(r)).toBeInTheDocument();
      await expect.element(getCode(r)).toHaveTextContent(DEFAULT_TEXT);
    });
    
    it('renders complex children', async () => {
      const r = render(
        <CodeTest>
          <span>let</span> <b>x</b>
          {' = 1'}
        </CodeTest>,
      );
      
      await expect.element(getCode(r)).toBeInTheDocument();
      await expect.element(getCode(r)).toHaveTextContent('let x = 1');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      it('renders semantic <code> element', async () => {
        const r = render(<CodeTest />);
        expect(getCode(r).tagName.toLowerCase()).toBe('code');
      });
    });
  });
});