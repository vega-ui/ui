import type { Meta, StoryObj } from '@storybook/react-vite';

import { PasswordField } from './PasswordField.tsx';
import {
  PasswordFieldHiddenIcon,
  PasswordFieldInput,
  PasswordFieldShownIcon,
  PasswordFieldToggleButton,
} from './components';
import { Text } from '../Text';
import { Button } from '../Button';
import { Card } from '../Card';
import { Lock, LockOpen } from '@vega-ui/icons';
import { PartialMeter, PartialMeterItem } from '../PartialMeter';
import { CSSProperties, FC, PropsWithChildren, useMemo, useState } from 'react';

const meta = {
  title: 'Form/Fields/PasswordField/PasswordField',
  component: PasswordField,
  subcomponents: {
    PasswordFieldHiddenIcon,
    PasswordFieldInput,
    PasswordFieldShownIcon,
    PasswordFieldToggleButton,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-4614&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    children: [
      <PasswordFieldInput key={0} placeholder='Password' autoComplete='current-password' />,
      <PasswordFieldToggleButton key={1} aria-label='Toggle password visibility'>
        <PasswordFieldShownIcon />
        <PasswordFieldHiddenIcon />
      </PasswordFieldToggleButton>,
    ],
  },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

const Stack: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 12, minWidth: 420 }}>{children}</div>
);

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: (props) => (
    <Stack>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <PasswordField key={size} size={size} {...props}>
          <PasswordFieldInput placeholder={`Size: ${size}`} />
          <PasswordFieldToggleButton aria-label='Toggle password visibility'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleButton>
        </PasswordField>
      ))}
    </Stack>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: [
      <PasswordFieldInput key={0} placeholder='Disabled password' />,
      <PasswordFieldToggleButton key={1} aria-label='Toggle password visibility'>
        <PasswordFieldShownIcon />
        <PasswordFieldHiddenIcon />
      </PasswordFieldToggleButton>
    ]
  },
};

export const CustomIcons: Story = {
  name: 'Custom toggle icons (Lock / LockOpen)',
  render: (props) => (
    <Stack>
      <PasswordField {...props}>
        <PasswordFieldInput placeholder='Password' autoComplete='current-password' />
        <PasswordFieldToggleButton aria-label='Toggle password visibility'>
          <PasswordFieldShownIcon>
            <Lock />
          </PasswordFieldShownIcon>
          <PasswordFieldHiddenIcon>
            <LockOpen />
          </PasswordFieldHiddenIcon>
        </PasswordFieldToggleButton>
      </PasswordField>
    </Stack>
  ),
};

function getPasswordScore(password: string) {
  if (!password) return 0;
  
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  
  return Math.min(score, 5);
}

function scoreLabel(score: number) {
  if (score <= 1) return 'Weak';
  if (score === 2) return 'Fair';
  if (score === 3) return 'Good';
  if (score === 4) return 'Strong';
  return 'Very strong';
}

export const WithStrengthMeter: Story = {
  name: 'With password strength meter',
  render: (props) => {
    const [value, setValue] = useState('');
    
    const score = useMemo(() => getPasswordScore(value), [value]);
    
    const meter = useMemo(() => {
      const fill = Math.min(score / 5, 1);
      const a = Math.min(fill / 0.25, 1);
      const b = Math.min(Math.max((fill - 0.25) / 0.25, 0), 1);
      const c = Math.min(Math.max((fill - 0.5) / 0.25, 0), 1);
      const d = Math.min(Math.max((fill - 0.75) / 0.25, 0), 1);
      
      return { a, b, c, d };
    }, [score]);
    
    const veryStrongPassword = '#AaBB78_%$_asd'
    
    return (
      <Stack>
        <PasswordField {...props}>
          <PasswordFieldInput
            placeholder='Create a password'
            autoComplete='new-password'
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <PasswordFieldToggleButton aria-label='Toggle password visibility'>
            <PasswordFieldShownIcon />
            <PasswordFieldHiddenIcon />
          </PasswordFieldToggleButton>
        </PasswordField>
        
        <div style={{ display: 'grid', gap: 8 }}>
          <PartialMeter value={getPasswordScore(value)}>
            <PartialMeterItem
              value={meter.a * 0.25}
              style={{ '--meter-item-color': 'var(--color-red-accent-500)' } as CSSProperties}
            />
            <PartialMeterItem
              value={meter.b * 0.25}
              style={{ '--meter-item-color': 'var(--color-orange-accent-500)' } as CSSProperties}
            />
            <PartialMeterItem
              value={meter.c * 0.25}
              style={{ '--meter-item-color': 'var(--color-yellow-accent-500)' } as CSSProperties}
            />
            <PartialMeterItem
              value={meter.d * 0.25}
              style={{ '--meter-item-color': 'var(--color-green-accent-500)' } as CSSProperties}
            />
          </PartialMeter>
          
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>
              Strength: <span style={{ fontWeight: 600 }}>{scoreLabel(score)}</span>
            </p>
          </Text>
          
          <Text asChild size={2} style={{ opacity: 0.6 }}>
            <p>Tip: use 12+ characters, mixed case, numbers, and symbols.</p>
          </Text>
        </div>
        
        <Card>
          <Button fullWidth onClick={() => setValue(veryStrongPassword)}>Generate</Button>
        </Card>
      </Stack>
    );
  },
};
