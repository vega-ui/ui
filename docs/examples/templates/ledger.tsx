import { UIEvent, useId, useState } from 'react';
import {
  Button,
  Grid,
  GridCell,
  GridColumnHeader,
  type GridIntent,
  GridRow,
  GridRowGroup,
  GridRowHeader,
  Heading,
  Text,
} from '@vega-ui/react';
import './ledger.css';

const ROWS = 100_000;
const COLS = 5;
const AMOUNT_COL = 4;
const ROW_HEIGHT = 40;
const VIEW_ROWS = 12;
const OVERSCAN = 6;
const PER_DAY = 40;
const TODAY = Date.UTC(2026, 10, 3);

const columns = ['#', 'Date', 'Description', 'Category', 'Amount'];

const payroll = { name: 'Payroll — Acme Inc.', category: 'Income', max: 0 };

const merchants = [
  { name: 'Blue Bottle Coffee', category: 'Food', max: 14 },
  { name: 'Whole Foods Market', category: 'Groceries', max: 180 },
  { name: 'Uber', category: 'Transport', max: 42 },
  { name: 'Shell', category: 'Transport', max: 90 },
  { name: 'Netflix', category: 'Subscriptions', max: 23 },
  { name: 'Spotify', category: 'Subscriptions', max: 12 },
  { name: 'Delta Air Lines', category: 'Travel', max: 640 },
  { name: 'Airbnb', category: 'Travel', max: 520 },
  { name: 'Apple Store', category: 'Shopping', max: 1200 },
  { name: 'Amazon', category: 'Shopping', max: 260 },
  { name: 'Transfer to savings', category: 'Transfers', max: 500 },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const count = new Intl.NumberFormat('en-US');
const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

const toKey = (row: number, col: number) => row * COLS + col;
const rowOf = (key: number) => Math.floor(key / COLS);
const colOf = (key: number) => key % COLS;

const noise =(seed: number) => ((seed * 2654435761) % 4294967296) / 4294967296;

const getTransaction = (row: number) => {
  const isPayday = row % (PER_DAY * 14) === PER_DAY - 1;
  const merchant = isPayday ? payroll : merchants[Math.floor(noise(row + 1) * merchants.length)];
  const amount = isPayday ? 4200 : -Math.round((2 + noise(row + 7) * merchant.max) * 100) / 100;

  return { merchant, amount, date: TODAY - Math.floor(row / PER_DAY) * 86_400_000 };
};

const getNextKey = (intent: GridIntent, from: number, next: number | undefined) => {
  const row = rowOf(from);
  const col = colOf(from);

  if (intent === 'up') return row > 0 ? toKey(row - 1, col) : undefined;
  if (intent === 'down') return row < ROWS - 1 ? toKey(row + 1, col) : undefined;
  if (intent === 'pageUp') return toKey(Math.max(0, row - VIEW_ROWS), col);
  if (intent === 'pageDown') return toKey(Math.min(ROWS - 1, row + VIEW_ROWS), col);
  if (intent === 'gridStart') return toKey(0, 0);
  if (intent === 'gridEnd') return toKey(ROWS - 1, COLS - 1);

  return next;
};

const resolveRange = (start: number, end: number) => {
  const top = Math.min(rowOf(start), rowOf(end));
  const bottom = Math.max(rowOf(start), rowOf(end));
  const left = Math.max(1, Math.min(colOf(start), colOf(end)));
  const right = Math.max(colOf(start), colOf(end));
  const keys: number[] = [];

  for (let row = top; row <= bottom; row += 1) {
    for (let col = left; col <= right; col += 1) keys.push(toKey(row, col));
  }

  return keys;
};

const getRows = (first: number, activeRow: number) => {
  const last = Math.min(ROWS - 1, first + VIEW_ROWS + OVERSCAN * 2);
  const rows = Array.from({ length: last - first + 1 }, (_, index) => first + index);

  if (activeRow < first) return [activeRow, ...rows];
  if (activeRow > last) return [...rows, activeRow];

  return rows;
};

const plural = (value: number, word: string) => `${count.format(value)} ${value === 1 ? word : `${word}s`}`;

const getSum = (keys: number[]) => {
  return keys.reduce((sum, key) => colOf(key) === AMOUNT_COL ? sum + getTransaction(rowOf(key)).amount : sum, 0);
};

export default function Ledger() {
  const id = useId();
  const [first, setFirst] = useState(0);
  const [active, setActive] = useState(toKey(0, 1));
  const [selected, setSelected] = useState<number[]>([]);

  const onScroll = (event: UIEvent<HTMLDivElement>) => {
    const next = Math.max(0, Math.floor(event.currentTarget.scrollTop / ROW_HEIGHT) - OVERSCAN);
    if (next !== first) setFirst(next);
  };

  const sum = getSum(selected);
  const amounts = selected.filter((key) => colOf(key) === AMOUNT_COL).length;

  return (
    <div className='lg-root'>
      <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
        <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Ledger</Heading>
        <Text size={3} style={{ color: 'var(--label-secondary)' }}>
          {count.format(ROWS)} transactions. Select cells with Shift + arrows, a drag or Ctrl+A to add up the amounts.
        </Text>
      </header>

      <Grid
        aria-labelledby={`${id}-title`}
        aria-rowcount={ROWS + 1}
        aria-colcount={COLS}
        selection='multiple'
        active={active}
        onChangeActive={setActive}
        value={selected}
        onChangeValue={setSelected}
        getNextKey={getNextKey}
        compare={(a, b) => a - b}
        resolveRange={resolveRange}
        className='lg-grid'
        onScroll={onScroll}
      >
        <GridRowGroup className='lg-head'>
          <GridRow row={-1} aria-rowindex={1} className='lg-row'>
            {columns.map((column, col) => (
              <GridColumnHeader key={column} col={col} value={-1 - col} excluded className={col === AMOUNT_COL ? 'lg-end' : undefined}>
                {column}
              </GridColumnHeader>
            ))}
          </GridRow>
        </GridRowGroup>
        <GridRowGroup className='lg-body' style={{ blockSize: ROWS * ROW_HEIGHT }}>
          {getRows(first, rowOf(active)).map((row) => {
            const transaction = getTransaction(row);

            return (
              <GridRow
                key={row}
                row={row}
                aria-rowindex={row + 2}
                className='lg-row'
                style={{ transform: `translateY(${row * ROW_HEIGHT}px)` }}
              >
                <GridRowHeader col={0} value={toKey(row, 0)}>{count.format(row + 1)}</GridRowHeader>
                <GridCell col={1} value={toKey(row, 1)}>{date.format(transaction.date)}</GridCell>
                <GridCell col={2} value={toKey(row, 2)}>
                  <span className='lg-text'>{transaction.merchant.name}</span>
                </GridCell>
                <GridCell col={3} value={toKey(row, 3)} className='lg-muted'>{transaction.merchant.category}</GridCell>
                <GridCell col={AMOUNT_COL} value={toKey(row, AMOUNT_COL)} className='lg-end' data-income={transaction.amount > 0 || undefined}>
                  {currency.format(transaction.amount)}
                </GridCell>
              </GridRow>
            );
          })}
        </GridRowGroup>
      </Grid>

      <div className='lg-status'>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>
          Row {count.format(rowOf(active) + 1)} of {count.format(ROWS)}
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Text size={2} role='status'>
            {selected.length === 0
              ? 'No cells selected'
              : `${plural(selected.length, 'cell')} · ${plural(amounts, 'amount')} · Sum ${currency.format(sum)}`}
          </Text>
          <Button size='xs' variant='secondary' appearance='ghost' disabled={selected.length === 0} onClick={() => setSelected([])}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
