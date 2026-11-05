import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fieldset, FieldsetProps } from './Fieldset';
import { FieldsetHeader, FieldsetLegend } from './components';
import { TextField, TextFieldInput } from '../TextField';
import { Label } from '../Label';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxInput,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
} from '../Checkbox';

const meta: Meta<typeof Fieldset> = {
  title: 'Form/Layout/Fieldset',
  component: Fieldset,
  subcomponents: {
    FieldsetLegend,
    FieldsetHeader,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    appearance: { control: 'radio', options: ['transparent', 'outlined'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: [
      <FieldsetLegend key='legend'>Title</FieldsetLegend>,
      <Label key='label' htmlFor='fieldset-playground-field'>Field</Label>,
      <TextField key='field'>
        <TextFieldInput id='fieldset-playground-field' />
      </TextField>,
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const appearances: FieldsetProps['appearance'][] = ['transparent', 'outlined'];
const cells = appearances.flatMap((appearance) => [false, true].map((disabled) => ({ appearance, disabled })));

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: 24, alignItems: 'start' }}>
      {cells.map((cell) => {
        const id = `fieldset-${cell.appearance}-${cell.disabled ? 'disabled' : 'enabled'}`;

        return (
          <Fieldset key={id} {...cell}>
            <FieldsetLegend>{`${cell.appearance}${cell.disabled ? ' / disabled' : ''}`}</FieldsetLegend>
            <FieldsetHeader>Helper copy in the header.</FieldsetHeader>
            <Label htmlFor={`${id}-field`}>Field</Label>
            <TextField>
              <TextFieldInput id={`${id}-field`} />
            </TextField>
            <Checkbox>
              <CheckboxInput defaultChecked />
              <CheckboxIndicator>
                <CheckboxCheckedIcon />
                <CheckboxIndeterminateIcon />
              </CheckboxIndicator>
              Option
            </Checkbox>
          </Fieldset>
        );
      })}
    </div>
  ),
};
