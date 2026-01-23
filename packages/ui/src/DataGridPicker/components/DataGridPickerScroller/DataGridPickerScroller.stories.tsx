import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataGridPickerScroller } from './DataGridPickerScroller';
import { FC } from 'react';
import { IndexedSnapScrollerContent, useIndexedSnapScrollerContext } from '../../../IndexedSnapScroller';
import { DataGridPickerRowGroup } from '../DataGridPickerRowGroup';
import { DataGridPickerRow } from '../DataGridPickerRow';
import { DataGridPickerItem } from '../DataGridPickerItem';

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

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof DataGridPickerScroller> = {
  title: 'Data/DataGridPicker/DataGridPickerScroller',
  component: DataGridPickerScroller,
  tags: ['autodocs'],
  args: {
    style: { width: 210 }
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  }
}

export default meta;
type Story = StoryObj<typeof meta>;

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
    <DataGridPickerRowGroup scope={index}>
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

export const Default: Story = {
  args: {
    children: (
      <IndexedSnapScrollerContent>
        <DefaultSwipableLayout />
      </IndexedSnapScrollerContent>
    )
  },
};