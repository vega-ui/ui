import type { Meta, StoryObj } from '@storybook/react-vite';

import { BoldIcon, ItalicIcon, TextAlignCenterIcon, TextAlignEndIcon, TextAlignStartIcon, UnderlineIcon } from '@vega-ui/icons';
import { Icon } from '../Icon';
import { ToggleGroup } from './ToggleGroup';
import { ToggleGroupToggle } from './components';

const meta = {
  title: 'Actions/ToggleGroup',
  component: ToggleGroup,
  subcomponents: {
    ToggleGroupToggle,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
  args: {
    'aria-label': 'Alignment',
    defaultValue: 'start',
    children: [
      <ToggleGroupToggle key='start' value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>,
      <ToggleGroupToggle key='center' value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>,
      <ToggleGroupToggle key='end' value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>,
    ],
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 24, alignItems: 'center' }}>
      {sizes.flatMap((size) => [
        <ToggleGroup key={`${size}-single`} aria-label={`View, ${size}`} size={size} defaultValue='week'>
          <ToggleGroupToggle value='day'>Day</ToggleGroupToggle>
          <ToggleGroupToggle value='week'>Week</ToggleGroupToggle>
          <ToggleGroupToggle value='month' disabled>Month</ToggleGroupToggle>
        </ToggleGroup>,
        <ToggleGroup key={`${size}-multiple`} aria-label={`Style, ${size}`} size={size} multiple defaultValue={['bold', 'underline']}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>,
        <ToggleGroup key={`${size}-disabled`} aria-label={`Disabled, ${size}`} size={size} disabled defaultValue='day'>
          <ToggleGroupToggle value='day'>Day</ToggleGroupToggle>
          <ToggleGroupToggle value='week'>Week</ToggleGroupToggle>
        </ToggleGroup>,
      ])}
    </div>
  ),
};
