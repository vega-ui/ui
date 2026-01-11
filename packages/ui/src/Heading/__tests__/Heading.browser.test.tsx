import { ComponentProps } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, type RenderResult } from '@testing-library/react';

import { Heading } from '../Heading';

afterEach(cleanup);

const TESTID = 'heading';
const TEXT = 'Heading title';

const HeadingTest = (props?: Partial<ComponentProps<typeof Heading>>) => {
  return (
    <Heading data-testid={TESTID} {...props}>
      {TEXT}
    </Heading>
  );
};

const getHeading = (r: RenderResult) => r.getByTestId(TESTID);

describe('Heading', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    
    beforeEach(() => {
      r = render(<HeadingTest />);
    });
    
    it('renders with default tag', async () => {
      const el = getHeading(r);
      await expect.element(el).toBeInTheDocument();
      expect(el.tagName.toLowerCase()).toBe('h1');
    });
    
    it('renders children', async () => {
      await expect.element(getHeading(r)).toHaveTextContent(TEXT);
    });
    
    it('supports as prop (semantic tag)', async () => {
      r.rerender(<HeadingTest as='h2' />);
      expect(getHeading(r).tagName.toLowerCase()).toBe('h2');
      
      r.rerender(<HeadingTest as='h6' />);
      expect(getHeading(r).tagName.toLowerCase()).toBe('h6');
    });
    
    it('sets data-font-weight when provided', async () => {
      r.rerender(<HeadingTest fontWeight={700} />);
      await expect.element(getHeading(r)).toHaveAttribute('data-font-weight', '700');
    });
    
    it('does not set data-font-weight when not provided', async () => {
      r.rerender(<HeadingTest fontWeight={undefined} />);
      await expect.element(getHeading(r)).not.toHaveAttribute('data-font-weight');
    });
    
    it('sets data-size from size prop when provided', async () => {
      r.rerender(<HeadingTest size={9} />);
      await expect.element(getHeading(r)).toHaveAttribute('data-size', '9');
    });
    
    it('maps data-size from as when size is not provided', async () => {
      r.rerender(<HeadingTest as='h1' size={undefined} />);
      await expect.element(getHeading(r)).toHaveAttribute('data-size');
      
      r.rerender(<HeadingTest as='h3' size={undefined} />);
      await expect.element(getHeading(r)).toHaveAttribute('data-size');
    });
    
    it('forwards native attributes', async () => {
      const title = 'native-title';
      r.rerender(<HeadingTest title={title} />);
      await expect.element(getHeading(r)).toHaveAttribute('title', title);
    });
  });
  
  describe('Edge Cases', () => {
    it('renders without children', async () => {
      const r = render(<Heading data-testid={TESTID} />);
      await expect.element(getHeading(r)).toBeInTheDocument();
      await expect.element(getHeading(r)).toHaveTextContent('');
    });
    
    it('supports empty string children', async () => {
      const r = render(<Heading data-testid={TESTID}>{''}</Heading>);
      await expect.element(getHeading(r)).toBeInTheDocument();
      await expect.element(getHeading(r)).toHaveTextContent('');
    });
  });
  
  describe('Accessibility', () => {
    describe('roles', () => {
      let r: RenderResult;
      
      beforeEach(() => {
        r = render(<HeadingTest as='h2' />);
      });
      
      it('exposes heading role', async () => {
        await expect.element(getHeading(r)).toHaveRole('heading');
      });
    });
  });
});