import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextField, TextFieldProps } from './TextField';
import { TextFieldInput } from './components';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Text } from '../Text';
import { Minus, Plus } from '@vega-ui/icons';
import { FC, useMemo, useState } from 'react';

const sizes: TextFieldProps['size'][] = ['sm', 'md', 'lg'];

const meta = {
  title: 'Form/Fields/TextField/TextField',
  component: TextField,
  subcomponents: {
    TextFieldInput,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1782&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'grid', gap: 12, minWidth: 420 }}>{children}</div>
);

const Helper: FC<{ children: string }> = ({ children }) => (
  <Text asChild size={2} style={{ opacity: 0.7  }}>
    <p>{children}</p>
  </Text>
);

export const Default: Story = {
  args: {
    children: <TextFieldInput placeholder='Type something…' />,
  },
};

export const Sizes: Story = {
  render(props) {
    return (
      <Stack>
        {sizes.map((size) => (
          <TextField key={size} size={size} {...props}>
            <TextFieldInput placeholder={`Size: ${size}`} />
          </TextField>
        ))}
      </Stack>
    );
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    children: [
      <IconButton key={0} size='md' variant='secondary' appearance='ghost' aria-label='Decrease'>
        <Icon>
          <Minus />
        </Icon>
      </IconButton>,
      <TextFieldInput key={1} inputMode='numeric' placeholder='0' />,
      <IconButton key={0} size='md' variant='secondary' appearance='ghost' aria-label='Increase'>
        <Icon>
          <Plus />
        </Icon>
      </IconButton>
    ]
  }
};

export const Disabled: Story = {
  args: {
    children: <TextFieldInput disabled placeholder='Disabled input' />,
  },
};

export const ErrorState: Story = {
  name: 'Error state',
  args: {
    error: true,
    children: <TextFieldInput placeholder='Invalid value' />,
  },
  render(props) {
    return (
      <Stack>
        <TextField {...props} />
        <Helper>Use the error state to highlight invalid input</Helper>
      </Stack>
    );
  },
};

export const SearchField: Story = {
  args: {
    children: [
      <TextFieldInput type='search' placeholder='Search...' />,
      <Button size='md'>Search</Button>
    ]
  }
};

export const Controlled: Story = {
  name: 'Controlled value',
  render(props) {
    const ControlledExample: FC = () => {
      const [value, setValue] = useState('Example');
      const length = useMemo(() => value.length, [value]);
      
      return (
        <Stack>
          <TextField {...props}>
            <TextFieldInput
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder='Controlled input'
            />
            <Text asChild size={2} style={{ opacity: 0.7, whiteSpace: 'nowrap', paddingInline: 24 }}>
              <p>{length}</p>
            </Text>
          </TextField>
          
          <div style={{ display: 'flex', gap: 10 }}>
            <Button
              fullWidth
              variant='secondary'
              appearance='ghost'
              onClick={() => setValue('')}
            >
              Clear
            </Button>
            <Button
              fullWidth
              onClick={() => setValue('Example')}
            >
              Reset
            </Button>
          </div>
        </Stack>
      );
    };
    
    return <ControlledExample />;
  },
};

export const Uncontrolled: Story = {
  name: 'Uncontrolled (defaultValue)',
  render(props) {
    return (
      <Stack>
        <TextField {...props}>
          <TextFieldInput defaultValue='Uncontrolled' placeholder='Uncontrolled input' />
          <Button size='md' variant='secondary'>
            Submit
          </Button>
        </TextField>
        
        <Helper>Uncontrolled usage: use defaultValue and read value on submit.</Helper>
      </Stack>
    );
  },
};

export const RealisticFormRow: Story = {
  name: 'Realistic form row',
  render(props) {
    return (
      <Stack>
        <div style={{ display: 'grid', gap: 6 }}>
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>Email</p>
          </Text>
          <TextField {...props}>
            <TextFieldInput type='email' placeholder='name@company.com' autoComplete='email' />
          </TextField>
          <Text asChild size={2} style={{ opacity: 0.6 }}>
            <p>We’ll only use this to send account-related updates.</p>
          </Text>
        </div>
        
        <div style={{ display: 'grid', gap: 6 }}>
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>Phone</p>
          </Text>
          <TextField {...props}>
            <TextFieldInput type='tel' placeholder='+1 (555) 000-0000' autoComplete='tel' />
          </TextField>
        </div>
      </Stack>
    );
  },
};
