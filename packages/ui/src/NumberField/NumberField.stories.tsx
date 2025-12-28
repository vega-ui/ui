import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumberField } from './NumberField';
import { NumberFieldDecrementButton, NumberFieldIncrementButton, NumberFieldInput } from './components';
import { Text } from '../Text';
import { Button } from '../Button';
import { Card } from '../Card';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import { Code } from '../Code';

const meta = {
  title: 'Form/Fields/NumberField/NumberField',
  component: NumberField,
  subcomponents: {
    NumberFieldInput,
    NumberFieldDecrementButton,
    NumberFieldIncrementButton,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4515&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    min: { type: 'number' },
    max: { type: 'number' },
    step: { type: 'number' },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {},
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 12, minWidth: 420 }}>{children}</div>
);

const Row: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
);

export const Default: Story = {
  args: {
    children: [
      <NumberFieldDecrementButton key={0} />,
      <NumberFieldInput key={1} placeholder='0' />,
      <NumberFieldIncrementButton key={2} />,
    ],
  },
};

export const Sizes: Story = {
  render: (props) => (
    <Stack>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <NumberField key={size} size={size} {...props}>
          <NumberFieldDecrementButton />
          <NumberFieldInput placeholder={`Size: ${size}`} />
          <NumberFieldIncrementButton />
        </NumberField>
      ))}
    </Stack>
  ),
};

export const WithMinMax: Story = {
  name: 'Min/Max bounds (buttons disable at limits)',
  args: {
    min: 0,
    max: 10,
  },
  render: (props) => (
    <Stack>
      <NumberField {...props}>
        <NumberFieldDecrementButton />
        <NumberFieldInput defaultValue={0} inputMode='numeric' />
        <NumberFieldIncrementButton />
      </NumberField>
      
      <Row>
        <Text size={2} style={{ opacity: 0.7 }}>
          Try stepping below 0 or above 10.
        </Text>
      </Row>
    </Stack>
  ),
};

export const StepAndDecimals: Story = {
  args: {
    min: 0,
    max: 5,
    step: .25,
    children: [
      <NumberFieldDecrementButton key={0} />,
      <NumberFieldInput key={1} defaultValue={1} />,
      <NumberFieldIncrementButton />
    ]
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: [
      <NumberFieldDecrementButton key={0} />,
      <NumberFieldInput key={1} placeholder='Disabled' />,
      <NumberFieldIncrementButton key={2} />
    ]
  },
};

export const UncontrolledWithFormSubmit: Story = {
  name: 'Uncontrolled + native form submit',
  render: (props) => {
    const [payload, setPayload] = useState<string>('');
    
    return (
      <Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            setPayload(JSON.stringify(Object.fromEntries(Object.entries(data)), null, 2));
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <NumberField {...props} min={0} max={99}>
            <NumberFieldDecrementButton />
            <NumberFieldInput name='quantity' defaultValue={2} />
            <NumberFieldIncrementButton />
          </NumberField>
          
          <Row>
            <Button type='submit'>Submit</Button>
            <Button type='reset' variant='secondary'>
              Reset
            </Button>
          </Row>
        </form>
        
        {payload && <Code>{payload}</Code>}
      </Stack>
    );
  },
};

export const ControlledValue: Story = {
  name: 'Controlled value',
  render: (props) => {
    const [value, setValue] = useState<number>(3);
    
    return (
      <Stack>
        <NumberField {...props} min={0} max={10}>
          <NumberFieldDecrementButton />
          <NumberFieldInput
            value={String(value)}
            onChange={(e) => {
              const n = Number(e.currentTarget.value);
              if (Number.isFinite(n)) setValue(n);
              else if (e.currentTarget.value === '') setValue(0);
            }}
          />
          <NumberFieldIncrementButton />
        </NumberField>
        
        <Row>
          <Button variant='secondary' onClick={() => setValue(0)}>
            Reset to 0
          </Button>
          <Text size={2} style={{ opacity: 0.7 }}>
            Current: {value}
          </Text>
        </Row>
      </Stack>
    );
  },
};

export const WithExternalFocusControl: Story = {
  name: 'External focus control (ref)',
  render: (props) => {
    const Example: FC = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      
      return (
        <Stack>
          <NumberField {...props} min={0} max={10}>
            <NumberFieldDecrementButton />
            <NumberFieldInput ref={inputRef} placeholder='Focus me' />
            <NumberFieldIncrementButton />
          </NumberField>
          
          <Row>
            <Button variant='secondary' onClick={() => inputRef.current?.focus()}>
              Focus input
            </Button>
            <Button variant='secondary' onClick={() => inputRef.current?.select()}>
              Select value
            </Button>
          </Row>
        </Stack>
      );
    };
    
    return <Example />;
  },
};

export const NestedInCardLayout: Story = {
  render: (props) => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
      <Card>
        <Text asChild size={3} style={{ fontWeight: 600 }}>
          <p>Item</p>
        </Text>
        <Text asChild size={2} style={{ opacity: 0.7 }}>
          <p>Adjust quantity with buttons or typing; bounds are enforced by the native input.</p>
        </Text>
        
        <div style={{ marginTop: 12 }}>
          <NumberField {...props} min={1} max={12}>
            <NumberFieldDecrementButton />
            <NumberFieldInput defaultValue={1} />
            <NumberFieldIncrementButton />
          </NumberField>
        </div>
      </Card>
      
      <Card>
        <Text asChild size={3} style={{ fontWeight: 600 }}>
          <p>Discount</p>
        </Text>
        <Text asChild size={2} style={{ opacity: 0.7 }}>
          <p>Decimal steps for precise control.</p>
        </Text>
        
        <div style={{ marginTop: 12 }}>
          <NumberField {...props} min={0} max={50} step={0.5}>
            <NumberFieldDecrementButton />
            <NumberFieldInput defaultValue={10} />
            <NumberFieldIncrementButton />
          </NumberField>
        </div>
      </Card>
    </div>
  ),
};
