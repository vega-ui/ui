import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhoneField } from './PhoneField';
import { Text } from '../Text';
import { Button } from '../Button';
import { FC, PropsWithChildren, ReactElement, useState } from 'react';
import { Code } from '../Code';
import {
  PhoneFieldSelect,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectValue,
  PhoneFieldSelectIcon,
  PhoneFieldSelectPortal,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldInput,
} from './components';
import { FlagFR, FlagRU, FlagUS } from '@vega-ui/icons';
import { CountryCode } from 'libphonenumber-js';
import { useSelectContext } from '../Select';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneField',
  component: PhoneField,
  subcomponents: {
    PhoneFieldSelect,
    PhoneFieldSelectHiddenSelect,
    PhoneFieldSelectCombobox,
    PhoneFieldSelectValue,
    PhoneFieldSelectIcon,
    PhoneFieldSelectPortal,
    PhoneFieldSelectListbox,
    PhoneFieldSelectOption,
    PhoneFieldInput,
  },
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    strictMask: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {},
} satisfies Meta<typeof PhoneField>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 12, minWidth: 420 }}>{children}</div>
);

const Helper: FC<{ children: string }> = ({ children }) => (
  <Text asChild size={2} style={{ opacity: 0.7 }}>
    <p>{children}</p>
  </Text>
);

export const Default: Story = {
  args: {
    code: 'RU',
    children: <PhoneFieldInput placeholder='+7 (___) ___-__-__' autoComplete='tel' />,
  },
};

export const WithSelect: Story = {
  args: {
    defaultCode: 'RU',
    strictMask: false,
  },
  render(props) {
    const options: CountryCode[] = ['RU', 'US', 'FR', 'IT']
    
    return (
      <PhoneField {...props}>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect />
          <PhoneFieldSelectCombobox>
            <PhoneFieldSelectValue />
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectPortal>
            <PhoneFieldSelectListbox>
              {options.map((code) => (
                <PhoneFieldSelectOption value={code}>
                  {code}
                </PhoneFieldSelectOption>
              ))}
            </PhoneFieldSelectListbox>
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput placeholder='+7' autoComplete='tel' />
      </PhoneField>
    )
  }
};

const SelectedValue: FC<{ options: Array<{ code: CountryCode, icon: ReactElement, label: string, post: string }> }> = ({ options }) => {
  const { selected } = useSelectContext()
  return options.find(v => v.code === selected)?.icon
}

export const WithSelectAndIcons: Story = {
  args: {
    defaultCode: 'RU',
    strictMask: false,
  },
  render(props) {
    const options: Array<{ code: CountryCode, icon: ReactElement, label: string, post: string }> = [
      { code: 'RU', icon: <FlagRU height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} />, label: 'Russia', post: '+7' },
      { code: 'US', icon: <FlagUS height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} />, label: 'United States', post: '+1' },
      { code: 'FR', icon: <FlagFR height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} />, label: 'France', post: '+33' },
    ]
    
    return (
      <PhoneField {...props}>
        <PhoneFieldSelect>
          <PhoneFieldSelectHiddenSelect />
          <PhoneFieldSelectCombobox>
            <PhoneFieldSelectValue>
              <SelectedValue options={options} />
            </PhoneFieldSelectValue>
            <PhoneFieldSelectIcon />
          </PhoneFieldSelectCombobox>
          <PhoneFieldSelectPortal>
            <PhoneFieldSelectListbox>
              {options.map(({ code, icon, label, post }) => (
                <PhoneFieldSelectOption value={code}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {icon}
                    {label}
                  </div>
                  {post}
                </PhoneFieldSelectOption>
              ))}
            </PhoneFieldSelectListbox>
          </PhoneFieldSelectPortal>
        </PhoneFieldSelect>
        <PhoneFieldInput placeholder='+7' autoComplete='tel' />
      </PhoneField>
    )
  }
};

export const Sizes: Story = {
  render: (props) => (
    <Stack>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <PhoneField key={size} size={size} code='RU' {...props}>
          <PhoneFieldInput placeholder={`Size: ${size}`} />
        </PhoneField>
      ))}
    </Stack>
  ),
};

export const CountryMasks: Story = {
  name: 'Country mask presets (ISO)',
  render: (props) => (
    <Stack>
      <Helper>Switch ISO to see how the mask formatting changes per country preset.</Helper>
      
      <PhoneField code='US' {...props}>
        <PhoneFieldInput placeholder='+1 (___) ___-____' autoComplete='tel' />
      </PhoneField>
      
      <PhoneField code='RU' {...props}>
        <PhoneFieldInput placeholder='+7 (___) ___-__-__' autoComplete='tel' />
      </PhoneField>
      
      <PhoneField code='FR' {...props}>
        <PhoneFieldInput placeholder='+33 _ __ __ __ __' autoComplete='tel' />
      </PhoneField>
    </Stack>
  ),
};

export const StrictMask: Story = {
  name: 'Strict mask',
  args: {
    code: 'RU',
    strictMask: true,
  },
  render: (props) => (
    <Stack>
      <Helper>
        Strict mask mode prevents invalid characters and keeps the cursor within valid positions of the mask.
      </Helper>
      
      <PhoneField {...props}>
        <PhoneFieldInput placeholder='+7 (___) ___-__-__' />
      </PhoneField>
      
      <Text asChild size={2} style={{ opacity: 0.6 }}>
        <p>Try typing letters or pasting random text to verify strict behavior.</p>
      </Text>
    </Stack>
  ),
};

export const NonStrictMask: Story = {
  name: 'Non-strict mask (lenient input)',
  args: {
    code: 'RU',
    strictMask: false,
  },
  render: (props) => (
    <Stack>
      <Helper>
        Non-strict mode is more forgiving for pasting and partial input. Useful for international numbers or mixed
        sources.
      </Helper>
      
      <PhoneField {...props}>
        <PhoneFieldInput placeholder='+7 (___) ___-__-__' />
      </PhoneField>
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    code: 'US',
  },
  render: (props) => (
    <Stack>
      <Helper>Disabled state prevents editing and applies the disabled visual style.</Helper>
      <PhoneField {...props}>
        <PhoneFieldInput disabled placeholder='+1 (___) ___-____' />
      </PhoneField>
    </Stack>
  ),
};

export const ErrorState: Story = {
  name: 'Error state',
  args: {
    code: 'US',
    error: true,
  },
  render: (props) => (
    <Stack>
      <Helper>Use the error state to highlight invalid or incomplete phone numbers.</Helper>
      <PhoneField {...props}>
        <PhoneFieldInput placeholder='+1 (___) ___-____' />
      </PhoneField>
      <Text asChild size={2} style={{ opacity: 0.6 }}>
        <p>Example message: “Enter a valid phone number”.</p>
      </Text>
    </Stack>
  ),
};

export const UncontrolledFormSubmit: Story = {
  name: 'Uncontrolled + native form submit',
  render: (props) => {
    const [payload, setPayload] = useState<string>('');
    
    return (
      <Stack>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setPayload(JSON.stringify(Object.fromEntries(Object.entries(data)), null, 2));
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <PhoneField {...props} code='RU'>
            <PhoneFieldInput name='phone' placeholder='+7 (___) ___-__-__' />
          </PhoneField>
          
          <div style={{ display: 'flex', gap: 10 }}>
            <Button type='submit'>Submit</Button>
            <Button type='reset' variant='secondary'>
              Reset
            </Button>
          </div>
        </form>
        
        {payload && (
          <Code>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{payload}</pre>
          </Code>
        )}
      </Stack>
    );
  },
};

export const Controlled: Story = {
  name: 'Controlled value',
  render: (props) => {
    const [value, setValue] = useState('');
    
    return (
      <Stack>
        <Helper>Controlled usage: the value is stored in React state.</Helper>
        
        <PhoneField {...props} code='US' strictMask>
          <PhoneFieldInput
            name='phone'
            autoComplete='tel'
            placeholder='+1 (___) ___-____'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </PhoneField>
        
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant='secondary' onClick={() => setValue('')}>
            Clear
          </Button>
          <Text size={2} style={{ opacity: 0.7 }}>
            Value: {value || '—'}
          </Text>
        </div>
      </Stack>
    );
  },
};
