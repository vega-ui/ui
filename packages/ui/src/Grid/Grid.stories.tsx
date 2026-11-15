import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';
import { GridRow, GridCell, GridRowGroup } from './components';
import { Text } from '../Text';

const rows = [0, 1, 2, 3, 4, 5, 6];
const cols = [0, 1, 2, 3, 4, 5, 6];

const meta = {
  title: 'Data/Grid',
  component: Grid,
  subcomponents: {
    GridRow,
    GridCell,
    GridRowGroup,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: 'radio',
      options: [undefined, 'single', 'multiple', 'range'],
    },
    wrap: {
      control: 'radio',
      options: [undefined, 'horizontal', 'vertical', 'both'],
    },
    exclude: {
      control: 'object',
    },
    disabled: {
      control: 'object',
    },
    min: {
      control: 'text',
    },
    max: {
      control: 'text',
    },
  },
  args: {
    'aria-label': 'Grid',
    wrap: 'horizontal',
    defaultActive: '0:0',
    exclude: [],
    children: (
      <GridRowGroup>
        {rows.map((row) => (
          <GridRow row={row} key={row}>
            {cols.map((col) => (
              <GridCell style={{ width: 42, height: 42 }} col={col} key={col}>
                <Text size={2}>{col + 1}</Text>
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridRowGroup>
    ),
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
