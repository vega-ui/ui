import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox, CheckboxProps } from './Checkbox';
import { CheckboxCheckedIcon, CheckboxInput, CheckboxInputProps, CheckboxIndeterminateIcon, CheckboxIndicator } from './components';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type CheckboxStoryProps = CheckboxProps & Pick<CheckboxInputProps, 'indeterminate' | 'disabled'>;

const input = subcomponentArgs(CheckboxInput, ['indeterminate', 'disabled']);

const meta = {
  title: 'Form/Selectors/Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxInput,
    CheckboxIndicator,
    CheckboxCheckedIcon,
    CheckboxIndeterminateIcon,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-626&t=2RYEGgF9z3n5SpP5-4',
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
    children: { control: false },
    ...input.argTypes,
  },
  args: {
    indeterminate: false,
    disabled: false,
  },
} satisfies Meta<CheckboxStoryProps>;

export default meta;
type Story = StoryObj<CheckboxStoryProps>;

const variants: CheckboxProps['variant'][] = ['primary', 'secondary'];
const sizes: CheckboxProps['size'][] = ['sm', 'md', 'lg'];
const checks = ['unchecked', 'checked', 'indeterminate'];
const rows = variants.flatMap((variant) => checks.flatMap((check) => [false, true].map((disabled) => ({ variant, check, disabled }))));

export const Playground: Story = {
  render: (args) => {
    const [inputProps, checkboxProps] = input.split(args);

    return (
      <Checkbox {...checkboxProps}>
        <CheckboxInput {...inputProps} aria-label='Checkbox' />
        <CheckboxIndicator>
          <CheckboxCheckedIcon />
          <CheckboxIndeterminateIcon />
        </CheckboxIndicator>
      </Checkbox>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sizes.length}, auto)`, gap: 12, alignItems: 'center' }}>
      {rows.map((row) => sizes.map((size) => {
        const name = `${row.variant} / ${row.check}${row.disabled ? ' / disabled' : ''} / ${size}`;

        return (
          <Checkbox key={name} variant={row.variant} size={size}>
            <CheckboxInput
              aria-label={name}
              defaultChecked={row.check === 'checked'}
              indeterminate={row.check === 'indeterminate'}
              disabled={row.disabled}
            />
            <CheckboxIndicator>
              <CheckboxCheckedIcon />
              <CheckboxIndeterminateIcon />
            </CheckboxIndicator>
          </Checkbox>
        );
      }))}
    </div>
  ),
};
