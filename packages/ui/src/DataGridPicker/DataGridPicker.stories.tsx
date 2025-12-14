import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataGridPicker } from './DataGridPicker.tsx';
import {
  DataGridPickerItem,
  DataGridPickerRowGroup,
  DataGridPickerRow,
} from './components';
import { FC, useRef } from 'react';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { ChevronLeft, ChevronRight } from '@vega-ui/icons'
import { IndexedSnapScroller, IndexedSnapScrollerContent, useIndexedSnapScrollerContext } from '../IndexedSnapScroller';
import { IndexedSnapScrollerApiRef } from '../IndexedSnapScroller/types.ts';

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

const meta = {
  title: 'Data/DataGridPicker/DataGridPicker',
  component: DataGridPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    size: 'sm',
  },
  argTypes: {
    selection: {
      control: 'radio',
      options: ['single', 'multiple', 'range'],
    },
    wrap: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'both'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
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
              <DataGridPickerItem col={col} key={col}>
                {col + 1}
              </DataGridPickerItem>
            ))}
          </DataGridPickerRow>
        ))}
      </DataGridPickerRowGroup>
    )
  }
};

const DefaultSwipableLayout: FC = () => {
  const { index } = useIndexedSnapScrollerContext()
  
  const makeKey = (index: number, row: number, col: number, emoji: string) => `${index}:${row}:${col}:${emoji.codePointAt(0)}`;
  
  const grid: EmojiCell[][] = getEmojiGridByOffset(index, 5).map((row, rowIndex) =>
    row.map((emoji, col) => ({
      emoji,
      row: rowIndex + 5 * index,
      col,
    }))
  );
  
  return (
    <DataGridPickerRowGroup>
      {grid.map((row, rowIndex) => (
        <DataGridPickerRow row={row[rowIndex]?.row} key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <DataGridPickerItem
              col={columnIndex}
              value={makeKey(index, cell.row, cell.col, cell.emoji)}
              key={columnIndex}
            >
              {cell.emoji}
            </DataGridPickerItem>
          ))}
        </DataGridPickerRow>
      ))}
    </DataGridPickerRowGroup>
  )
}

export const DefaultSwipableRange: Story = {
  args: {
    selection: 'range',
    defaultActive: '1:5:0:9992'
  },
  render(props) {
    const apiRef = useRef<IndexedSnapScrollerApiRef>(null)
    
    return (
      <DataGridPicker{...props}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '16px' }}>
          <IconButton onClick={() => apiRef?.current?.prev()} variant='secondary' appearance='transparent' size='sm'>
            <Icon><ChevronLeft /></Icon>
          </IconButton>
          <IconButton onClick={() => apiRef?.current?.next()} variant='secondary' appearance='transparent' size='sm'>
            <Icon><ChevronRight /></Icon>
          </IconButton>
        </div>
        <IndexedSnapScroller apiRef={apiRef} style={{ width: 210 }}>
          <IndexedSnapScrollerContent>
            <DefaultSwipableLayout />
          </IndexedSnapScrollerContent>
        </IndexedSnapScroller>
      </DataGridPicker>
    )
  }
};