import { KeyboardEvent, useState } from 'react';
import { Grid, GridCell, GridRow, GridRowGroup } from '@vega-ui/react';
import './examples.css';

type Operator = '÷' | '×' | '−' | '+';

const keys = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '00', '.', '='],
];

const names: Record<string, string> = {
  'C': 'Clear',
  '±': 'Change sign',
  '%': 'Percent',
  '÷': 'Divide',
  '×': 'Multiply',
  '−': 'Subtract',
  '+': 'Add',
  '=': 'Equals',
};

const shortcuts: Record<string, string> = {
  '/': '÷',
  '*': '×',
  '-': '−',
  '+': '+',
  '=': '=',
  '%': '%',
  '.': '.',
  ',': '.',
  'Escape': 'C',
};

const operators = ['÷', '×', '−', '+'];

const calculate = (left: number, operator: Operator, right: number) => {
  if (operator === '÷') return left / right;
  if (operator === '×') return left * right;
  if (operator === '−') return left - right;

  return left + right;
};

const format = (value: number) => {
  if (!Number.isFinite(value)) return 'Error';

  return String(Number(value.toPrecision(12)));
};

const grouping = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

const group = (value: string) => {
  if (value === 'Error') return value;

  const [integer, fraction] = value.split('.');
  const grouped = grouping.format(Number(integer));

  return fraction === undefined ? grouped : `${grouped}.${fraction}`;
};

const getKind =(key: string) => {
  if (key === '=') return 'equals';
  if (operators.includes(key)) return 'operator';
  if (['C', '±', '%'].includes(key)) return 'function';

  return 'digit';
};

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [pending, setPending] = useState<{ value: number, operator: Operator } | null>(null);
  const [fresh, setFresh] = useState(true);

  const type = (digits: string) => {
    if (fresh || display === '0' || display === 'Error') {
      setDisplay(digits === '00' ? '0' : digits);
      setFresh(false);
      return;
    }

    if (display.length >= 12) return;

    setDisplay(display + digits);
  };

  const typeDot = () => {
    if (fresh || display === 'Error') {
      setDisplay('0.');
      setFresh(false);
      return;
    }

    if (display.includes('.')) return;

    setDisplay(display + '.');
  };

  const getResult = () => {
    if (!pending || fresh) return Number(display);

    return calculate(pending.value, pending.operator, Number(display));
  };

  const press = (key: string) => {
    if (key === 'C') {
      setDisplay('0');
      setPending(null);
      setFresh(true);
      return;
    }

    if (key === '±') {
      setDisplay(format(-Number(display)));
      return;
    }

    if (key === '%') {
      setDisplay(format(Number(display) / 100));
      return;
    }

    if (key === '.') {
      typeDot();
      return;
    }

    if (key === '=') {
      if (!pending) return;

      setDisplay(format(getResult()));
      setPending(null);
      setFresh(true);
      return;
    }

    if (operators.includes(key)) {
      const result = getResult();

      setDisplay(format(result));
      setPending({ value: result, operator: key as Operator });
      setFresh(true);
      return;
    }

    type(key);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = /^\d$/.test(event.key) ? event.key : shortcuts[event.key];
    if (!key) return;

    event.preventDefault();
    press(key);
  };

  return (
    <div className='calculator'>
      <div className='calculatorScreen'>
        <span className='calculatorExpression'>
          {pending ? `${group(format(pending.value))} ${pending.operator}` : ' '}
        </span>
        <output aria-live='polite' className='calculatorDisplay'>{group(display)}</output>
      </div>
      <Grid aria-label='Calculator keys' wrap='horizontal' onKeyDown={onKeyDown} className='calculatorKeys'>
        <GridRowGroup>
          {keys.map((line, row) => (
            <GridRow key={row} row={row}>
              {line.map((key, col) => (
                <GridCell key={key} col={col} asChild>
                  <button type='button' aria-label={names[key]} data-kind={getKind(key)} onClick={() => press(key)}>
                    {key}
                  </button>
                </GridCell>
              ))}
            </GridRow>
          ))}
        </GridRowGroup>
      </Grid>
    </div>
  );
}
