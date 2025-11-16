import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataGridPicker } from './DataGridPicker';
import {
  DataGridPickerItem,
  DataGridPickerRowGroup,
  DataGridPickerRow,
} from './components';
import { useRef, useState } from 'react';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons'
import { SnapScroller } from '../SnapScroller';
import { SnapScrollerApiRef, SnapScrollerContent } from '../SnapScroller';
import { DataGridCellKey } from '../DataGrid/types.ts';

const EMOJI_POOL = [
  '😀','😃','😄','😁','😆','😅','😂','🤣','😊','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋',
  '😛','😜','🤪','😝','🤑','🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','🙄','😬','😮‍💨','🤥','😌',
  '😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','😎','🤓','🧐',
  '😕','😟','🙁','☹️','😮','😯','😲','😳','🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖','😣','😞',
  '😓','😩','😫','😤','😡','😠','🤬','🤯','😇','🥹','🤡','💀','☠️','👻','👽','🤖','💩','😺','😸','😹',
  '😻','😼','😽','🙀','😿','😾','🙈','🙉','🙊','👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞',
  '🤟','🤘','🤙','👈','👉','👆','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','👐','🤲','🙏',
  '💪','🦾','🦵','🦶','👂','🦻','👃','🧠','🫀','🫁','👀','👁️','👅','👄','🦷','🧑‍💻','🧑‍🍳','🧑‍🎨','🧑‍🚀','🧑‍🔬',
  '🌞','🌝','🌛','🌜','⭐','🌟','✨','⚡','🔥','💧','🌈','☂️','❄️','☃️','🍀','🍁','🍂','🌸','🌼','🌻',
  '🌺','🥀','🌷','🌵','🌴','🍎','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍒','🍑','🍍','🥥','🥝','🥑','🍆',
  '🌶️','🥕','🌽','🥔','🥦','🧀','🍔','🍟','🍕','🌭','🥪','🌮','🌯','🍜','🍣','🍱','🍩','🍪','🎂','🍰',
  '🧁','🍫','🍬','🍭','☕','🫖','🍵','🍺','🍻','🍷','🍸','🍹','🥤','🥂','🥃','⚽','🏀','🏈','🎾','🏐',
  '🎲','🧩','♟️','🎮','🕹️','🎯','🎳','🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚲','🛴','🛵','✈️',
  '🚀','🛸','⛵','🚁','🛶','🏝️','🗻','⛰️','🏔️','🏜️','🏖️','🏟️','🎡','🎢','🎠','🗽','🗿','🧭','⌛','⏳'
];

// Mulberry32 PRNG (deterministic by 32-bit seed)
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Simple 32-bit hash for number offsets (handles negatives too)
function hash32(n: number): number {
  let x = n | 0;
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = Math.imul(x ^ (x >>> 16), 0x45d9f3b);
  x = x ^ (x >>> 16);
  return x >>> 0;
}

// Deterministic sample without replacement using PRNG
function sampleUnique<T>(arr: T[], count: number, rnd: () => number): T[] {
  const a = arr.slice(); // copy
  // Partial Fisher–Yates for first `count`
  const n = Math.min(count, a.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(rnd() * (a.length - i));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

function getEmojiGridByOffset(offset: number, size = 5): string[][] {
  const seed = hash32(offset);
  const rnd = mulberry32(seed);
  
  const need = size * size;
  const picks =
    EMOJI_POOL.length >= need
      ? sampleUnique(EMOJI_POOL, need, rnd)
      : // If pool is smaller than need, expand deterministically
      (() => {
        const out: string[] = [];
        while (out.length < need) {
          const batch = sampleUnique(EMOJI_POOL, Math.min(EMOJI_POOL.length, need - out.length), rnd);
          out.push(...batch);
        }
        return out;
      })();
  
  const grid: string[][] = [];
  for (let r = 0; r < size; r++) {
    grid.push(picks.slice(r * size, (r + 1) * size));
  }
  return grid;
}

interface EmojiCell {
  emoji: string;
  row: number;
  col: number;
}

interface EmojiGridPage {
  index: number;
  grid: EmojiCell[][];
}

function buildEmojiGridList(
  startIndex: number,
  pages: number,
  size = 5
): EmojiGridPage[] {
  return Array.from({ length: pages }, (_, i) => {
    const index = startIndex + i + 1;
    const emojis = getEmojiGridByOffset(index, size);
    
    const grid: EmojiCell[][] = [];
    
    for (let localRow = 0; localRow < size; localRow++) {
      const absoluteRow = localRow + size * index;
      const row: EmojiCell[] = [];
      
      for (let col = 0; col < size; col++) {
        row.push({
          emoji: emojis[localRow][col],
          row: absoluteRow,
          col,
        });
      }
      
      grid.push(row);
    }
    
    return {
      index,
      grid,
    };
  });
}

const meta = {
  title: 'Data/DataGridPicker/DataGridPicker',
  component: DataGridPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    wrap: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'both'],
    }
  }
} satisfies Meta<typeof DataGridPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const matrix = Array.from({ length: 5 }, (_, row) => Array.from({ length: 5 }, (_, col) => [row, col] ))

export const Default: Story = {
  args: {
    defaultActive: '0:0',
    children: (
      <DataGridPickerRowGroup>
        {matrix.map((row, index) => (
          <DataGridPickerRow row={index} key={index}>
            {row.map(([, col]) => (
              <DataGridPickerItem style={{ width: 42, height: 42 }} col={col} key={col}>
                {col + 1}
              </DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    )
  }
};

const SIZE = 3
const MAX_GRIDS = SIZE * 2
const defaultGrid = buildEmojiGridList(-1, SIZE, 5);

export const DefaultSwipable: Story = {
  args: {
    selection: 'range'
  },
  render(props) {
    const apiRef = useRef<SnapScrollerApiRef>(null)
    
    const index = useRef<number>(1)
    const [gridList, setGridList] = useState(defaultGrid)
    
    const onSnapChanged = (value: number) => {
      index.current = value
    }
    
    const makePage = (index: number, size = 5): EmojiGridPage => {
      const base = getEmojiGridByOffset(index, size);
      const grid: EmojiCell[][] = base.map((row, rowIndex) =>
        row.map((emoji, col) => ({
          emoji,
          row: rowIndex + size * index,
          col,
        }))
      );
      return { index, grid };
    };
    
    const start = () => {
      const startIndex = gridList[0].index;
      const next = Array.from({ length: SIZE }, (_, i) => makePage(startIndex - i - 1, 5)).reverse();
      const merged = [...next, ...gridList];
      
      if (merged.length > MAX_GRIDS) setGridList(merged.slice(0, MAX_GRIDS));
      else setGridList(merged);
    };
    
    const end = () => {
      const startIndex = gridList[gridList.length - 1].index;
      const next = Array.from({ length: SIZE }, (_, i) => makePage(startIndex + i + 1, 5));
      const merged = [...gridList, ...next];
      
      if (merged.length > MAX_GRIDS) setGridList(merged.slice(merged.length - MAX_GRIDS));
      else setGridList(merged);
    };
    
    const onOffset = (offset: number) => {
      if (offset === -1) start()
      if (offset === 1) end()
    }
    
    const makeKey = (index: number, row: number, col: number, emoji: string) => `${index}:${row}:${col}:${emoji.codePointAt(0)}`;
    
    const parseCoordinatesFromKey = (key: string): [number, number] => {
      const [,row, col] = key.split(':')
      return [Number(row), Number(col)]
    }
    
    const isBetween = (key: DataGridCellKey, selected: DataGridCellKey[]): boolean => {
      const [startKey, endKey] = selected
      
      if (selected.length !== 2) return selected.includes(key)
      const toIndex = (row: number, col: number, cols: number = 5) => row * cols + col
      const start = parseCoordinatesFromKey(startKey as string)
      const end = parseCoordinatesFromKey(endKey as string)
      const cell = parseCoordinatesFromKey(key as string)
      
      const a = toIndex(...start)
      const b = toIndex(...end)
      const i = toIndex(...cell)
      
      const lo = Math.min(a, b)
      const hi = Math.max(a, b)
      
      return i >= lo && i <= hi
    }
    
    const [active, setActive] = useState<string | number | undefined>('1:9:1:128569')
    
    const onActive = (active: DataGridCellKey) => {
      setActive(active)
      
      const { current } = index
      const gridIndex = Number(active.toString().split(':')[0])
      if (!isNaN(gridIndex) && gridIndex !== current) {
        if (gridIndex < current) apiRef.current?.prev()
        if (gridIndex > current) apiRef.current?.next()
      }
    }
    
    return (
      <DataGridPicker
        {...props}
        disabled={['1:8:1:129395']}
        exclude={['1:8:1:129395']}
        active={active}
        onChangeActive={onActive}
        resolveRange={(start, end) => [start.key, end.key]}
        selectedEqual={isBetween}
      >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '16px' }}>
          <IconButton onClick={() => apiRef?.current?.prev()} variant='secondary' appearance='transparent' size='sm'>
            <Icon><ChevronLeft /></Icon>
          </IconButton>
          <IconButton onClick={() => apiRef?.current?.next()} variant='secondary' appearance='transparent' size='sm'>
            <Icon><ChevronRight /></Icon>
          </IconButton>
        </div>
        <SnapScroller
          onSnap={onSnapChanged}
          onOffset={onOffset}
          apiRef={apiRef}
          style={{ width: 210 }}
        >
          {gridList.map(({ grid, index }) => (
            <SnapScrollerContent index={index} key={index}>
              <DataGridPickerRowGroup>
                {grid.map((row, rowIndex) => (
                  <DataGridPickerRow row={row[rowIndex]?.row} key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <DataGridPickerItem
                        col={columnIndex}
                        cellKey={makeKey(index, cell.row, cell.col, cell.emoji)}
                        style={{ width: 42, height: 42 }}
                        key={columnIndex}
                      >
                        {cell.emoji}
                      </DataGridPickerItem>
                    ))}
                  </DataGridPickerRow>
                ))}
              </DataGridPickerRowGroup>
            </SnapScrollerContent>
          ))}
        </SnapScroller>
      </DataGridPicker>
    )
  }
};