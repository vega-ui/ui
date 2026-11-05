import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch, SwitchProps } from './Switch';
import { SwitchInput, SwitchIndicator } from './components';

const meta = {
  title: 'Form/Selectors/Switch',
  component: Switch,
  subcomponents: {
    SwitchIndicator,
    SwitchInput,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=2110-5998&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    children: [
      <SwitchInput key='input' aria-label='Switch' />,
      <SwitchIndicator key='indicator' />,
    ],
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: SwitchProps['variant'][] = ['primary', 'secondary'];
const sizes: SwitchProps['size'][] = ['sm', 'md', 'lg'];
const rows = variants.flatMap((variant) => [false, true].flatMap((checked) => [false, true].map((disabled) => ({ variant, checked, disabled }))));

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => {
        const name = `${row.variant}${row.checked ? ' / checked' : ''}${row.disabled ? ' / disabled' : ''} / ${size}`;

        return (
          <Switch key={name} variant={row.variant} size={size}>
            <SwitchInput aria-label={name} defaultChecked={row.checked} disabled={row.disabled} />
            <SwitchIndicator />
          </Switch>
        );
      }))}
    </div>
  ),
};
