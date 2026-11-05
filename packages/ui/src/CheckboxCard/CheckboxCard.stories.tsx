import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxCard, CheckboxCardProps } from './CheckboxCard';
import {
  CheckboxCardContent,
  CheckboxCardControl,
  CheckboxCardControlCheckedIcon,
  CheckboxCardControlInput,
  CheckboxCardControlIndeterminateIcon,
  CheckboxCardDescription,
  CheckboxCardTitle,
} from './components';
import { CheckboxIndicator } from '../Checkbox';

const meta = {
  title: 'Form/Selectors/CheckboxCard',
  component: CheckboxCard,
  subcomponents: {
    CheckboxCardContent,
    CheckboxCardTitle,
    CheckboxCardDescription,
    CheckboxCardControl,
    CheckboxCardControlInput,
    CheckboxCardControlIndeterminateIcon,
    CheckboxCardControlCheckedIcon,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1159&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
  args: {
    children: [
      <CheckboxCardContent key='content'>
        <CheckboxCardTitle>What is Lorem Ipsum?</CheckboxCardTitle>
        <CheckboxCardDescription>Lorem Ipsum is simply dummy text of the printing and typesetting industry</CheckboxCardDescription>
      </CheckboxCardContent>,
      <CheckboxCardControl key='control'>
        <CheckboxCardControlInput />
        <CheckboxIndicator>
          <CheckboxCardControlCheckedIcon />
          <CheckboxCardControlIndeterminateIcon />
        </CheckboxIndicator>
      </CheckboxCardControl>,
    ],
  },
} satisfies Meta<typeof CheckboxCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const variants: CheckboxCardProps['variant'][] = ['primary', 'secondary'];
const orientations: CheckboxCardProps['orientation'][] = ['vertical', 'horizontal'];
const checks = ['unchecked', 'checked', 'indeterminate'];
const columns = checks.flatMap((check) => [false, true].map((disabled) => ({ check, disabled })));
const rows = variants.flatMap((variant) => orientations.map((orientation) => ({ variant, orientation })));

export const Playground: Story = {};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, auto)`, gap: 12, alignItems: 'start' }}>
      {rows.map((row) => columns.map((column) => {
        const name = `${row.variant} / ${row.orientation} / ${column.check}${column.disabled ? ' / disabled' : ''}`;

        return (
          <CheckboxCard key={name} variant={row.variant} orientation={row.orientation}>
            <CheckboxCardContent>
              <CheckboxCardTitle>{name}</CheckboxCardTitle>
              <CheckboxCardDescription>Description</CheckboxCardDescription>
            </CheckboxCardContent>
            <CheckboxCardControl>
              <CheckboxCardControlInput
                defaultChecked={column.check === 'checked'}
                indeterminate={column.check === 'indeterminate'}
                disabled={column.disabled}
              />
              <CheckboxIndicator>
                <CheckboxCardControlCheckedIcon />
                <CheckboxCardControlIndeterminateIcon />
              </CheckboxIndicator>
            </CheckboxCardControl>
          </CheckboxCard>
        );
      }))}
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 320 }}>
      {orientations.map((orientation) => (
        <CheckboxCard key={orientation} orientation={orientation}>
          <CheckboxCardContent>
            <CheckboxCardTitle>A very long title that does not fit on one line and has to wrap somewhere</CheckboxCardTitle>
            <CheckboxCardDescription>
              A long description with an unbreakable word: Supercalifragilisticexpialidociousandevenlongerthanthat. It keeps going to show how the card grows and where the control stays.
            </CheckboxCardDescription>
          </CheckboxCardContent>
          <CheckboxCardControl>
            <CheckboxCardControlInput />
            <CheckboxIndicator>
              <CheckboxCardControlCheckedIcon />
              <CheckboxCardControlIndeterminateIcon />
            </CheckboxIndicator>
          </CheckboxCardControl>
        </CheckboxCard>
      ))}
    </div>
  ),
};
