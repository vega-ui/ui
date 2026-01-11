import { FC, PropsWithChildren, Ref, useEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, type RenderResult } from '@testing-library/react';

import { IndexedSnapScroller } from '../IndexedSnapScroller';
import { useIndexedSnapScrollerContext } from '../contexts';
import { IndexedSnapScrollerApiRef } from '../types';

afterEach(cleanup);

const TESTID_PAGE_PREFIX = 'page';
const TESTID_MOUNT_COUNT = 'mount-count';

const IndexedPage: FC = () => {
  const { index } = useIndexedSnapScrollerContext();
  return <div data-testid={`${TESTID_PAGE_PREFIX}-${index}`}>{index}</div>;
};

const MountCounter: FC<{ onMount: () => void }> = ({ onMount }) => {
  const { index } = useIndexedSnapScrollerContext();
  
  useEffect(() => {
    onMount();
  }, [onMount]);
  
  return <div data-testid={`${TESTID_MOUNT_COUNT}-${index}`} />;
};

const IndexedSnapScrollerTest: FC<
  PropsWithChildren<{
    apiRef?: Ref<IndexedSnapScrollerApiRef>;
    size?: number;
    start?: number;
    startDir?: -1 | 1;
    shift?: number;
  }>
> = ({ children, ...props }) => {
  return <IndexedSnapScroller {...props}>{children}</IndexedSnapScroller>;
};

const getPage = (r: RenderResult, index: number) =>
  r.getByTestId(`${TESTID_PAGE_PREFIX}-${index}`);

describe('IndexedSnapScroller', () => {
  describe('Critical User Paths', () => {
    let r: RenderResult;
    let apiRef: { current: IndexedSnapScrollerApiRef | null };
    
    beforeEach(() => {
      apiRef = { current: null };
      r = render(
        <IndexedSnapScrollerTest apiRef={apiRef}>
          <IndexedPage />
        </IndexedSnapScrollerTest>,
      );
    });
    
    it('renders exactly `size` pages and each page index matches apiRef.indexes', async () => {
      const api = apiRef.current;
      expect(api).toBeTruthy();
      
      const indexes = api!.indexes;
      expect(indexes.length).toBe(5);
      
      for (const idx of indexes) {
        const page = getPage(r, idx);
        await expect.element(page).toBeInTheDocument();
        await expect.element(page).toHaveTextContent(String(idx));
      }
    });
    
    it('supports `startDir=1` with a consistent step between adjacent indexes', async () => {
      r.rerender(
        <IndexedSnapScrollerTest apiRef={apiRef} size={5} start={0} startDir={1}>
          <IndexedPage />
        </IndexedSnapScrollerTest>,
      );
      
      const api = apiRef.current!;
      const indexes = api.indexes;
      
      expect(indexes.length).toBe(5);
      
      const step = indexes[1] - indexes[0];
      expect(step).toBe(1);
      
      for (let i = 1; i < indexes.length; i += 1) {
        expect(indexes[i] - indexes[i - 1]).toBe(1);
      }
    });
    
    it('exposes `reset(index, resetKeys)` via apiRef and `resetKeys=true` remounts pages', async () => {
      const SIZE = 5;
      const onMount = vi.fn();
      
      r.rerender(
        <IndexedSnapScrollerTest apiRef={apiRef} size={SIZE}>
          <MountCounter onMount={onMount} />
        </IndexedSnapScrollerTest>,
      );
      
      const api = apiRef.current!;
      expect(api.indexes.length).toBe(SIZE);
      
      await act(async () => {});
      
      expect(onMount).toHaveBeenCalledTimes(SIZE);
      
      await act(async () => {
        api.reset(0, true);
      });
      
      await act(async () => {});
      
      expect(onMount).toHaveBeenCalledTimes(SIZE * 2);
    });
  });
  
  describe('Edge Cases', () => {
    it('renders with `size=1`', async () => {
      const apiRef = { current: null as IndexedSnapScrollerApiRef | null };
      
      const r = render(
        <IndexedSnapScrollerTest apiRef={apiRef} size={1}>
          <IndexedPage />
        </IndexedSnapScrollerTest>,
      );
      
      const api = apiRef.current!;
      expect(api.indexes.length).toBe(1);
      
      const idx = api.indexes[0];
      await expect.element(getPage(r, idx)).toBeInTheDocument();
    });
    
    it('works when `children` is `null`', async () => {
      const apiRef = { current: null as IndexedSnapScrollerApiRef | null };
      
      render(
        <IndexedSnapScrollerTest apiRef={apiRef} size={5}>
          {null}
        </IndexedSnapScrollerTest>,
      );
      
      const api = apiRef.current!;
      expect(api.indexes.length).toBe(5);
    });
  });
});