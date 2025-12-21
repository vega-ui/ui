import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fieldset } from './Fieldset.tsx';
import { TextField } from '../TextField';
import { Label } from '../Label';
import { Button } from '../Button';
import { Text } from '../Text';
import {
  Checkbox,
  CheckboxCheckedIcon,
  CheckboxHiddenInput,
  CheckboxIndeterminateIcon,
  CheckboxIndicator,
} from '../Checkbox';
import { Switch } from '../Switch';
import { Radio } from '../Radio';

import { FieldsetHeader, FieldsetLegend } from './components';
import { FC, PropsWithChildren } from 'react';

const meta: Meta<typeof Fieldset> = {
  title: 'Form/Layout/Fieldset/Fieldset',
  component: Fieldset,
  subcomponents: {
    FieldsetLegend,
    FieldsetHeader,
  },
  parameters: { layout: 'centered' },
  argTypes: {
    appearance: { control: 'radio', options: ['transparent', 'outlined'] },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Col: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 6 }}>{children}</div>
);

const Row: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{children}</div>
);

const Stack: FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: 'grid', gap: 14, minWidth: 420 }}>{children}</div>
);

export const Default: Story = {
  args: {
    children: [
      <FieldsetHeader key={0}>
        <FieldsetLegend>Title</FieldsetLegend>
      </FieldsetHeader>,
      <div key={1}>
        <TextField placeholder='Field' />
      </div>,
    ],
  },
};

export const ProfileBasics: Story = {
  name: 'Profile form',
  render: (props) => (
    <Fieldset {...props}>
      <FieldsetHeader>
        <FieldsetLegend>Profile</FieldsetLegend>
        <Text asChild size={2} style={{ opacity: 0.7, maxWidth: 420 }}>
          <p>
            Basic profile information. Use a fieldset to logically group related
            fields and improve accessibility.
          </p>
        </Text>
      </FieldsetHeader>
      
      <Stack>
        <Col>
          <Label htmlFor='firstName'>First name</Label>
          <TextField id='firstName' placeholder='John' />
        </Col>
        
        <Col>
          <Label htmlFor='lastName'>Last name</Label>
          <TextField id='lastName' placeholder='Doe' />
        </Col>
        
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <Button fullWidth>Save</Button>
          <Button fullWidth variant='secondary'>
            Cancel
          </Button>
        </div>
      </Stack>
    </Fieldset>
  ),
};

export const OutlinedWithActions: Story = {
  name: 'Outlined with header actions',
  args: { appearance: 'outlined' },
  render: (props) => (
    <Fieldset {...props}>
      <FieldsetHeader>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: 12,
            width: '100%',
          }}
        >
          <FieldsetLegend>Shipping details</FieldsetLegend>
          <Button size='xs' appearance='ghost' variant='secondary'>
            Autofill
          </Button>
        </div>
        <Text asChild size={2} style={{ opacity: 0.7, maxWidth: 420 }}>
          <p>
            An outlined group with header actions for advanced interactions.
          </p>
        </Text>
      </FieldsetHeader>
      
      <Stack>
        <Col>
          <Label htmlFor='city'>City</Label>
          <TextField id='city' placeholder='New York' />
        </Col>
        
        <Col>
          <Label htmlFor='address'>Address</Label>
          <TextField id='address' placeholder='123 Main St' />
        </Col>
        
        <Col>
          <Label htmlFor='zip'>ZIP code</Label>
          <TextField id='zip' placeholder='10001' />
        </Col>
      </Stack>
    </Fieldset>
  ),
};

export const DisabledGroup: Story = {
  name: 'Disabled group',
  args: { appearance: 'outlined' },
  render: (props) => (
    <Fieldset {...props}>
      <FieldsetHeader>
        <FieldsetLegend>Payment</FieldsetLegend>
        <Text asChild size={2} style={{ opacity: 0.7, maxWidth: 420 }}>
          <p>
            The entire field group is disabled, for example when a payment
            method is unavailable.
          </p>
        </Text>
      </FieldsetHeader>
      
      <Stack>
        <Col>
          <Label htmlFor='card'>Card number</Label>
          <TextField disabled id='card' placeholder='0000 0000 0000 0000' />
        </Col>
        
        <Col>
          <Label htmlFor='nameOnCard'>Name on card</Label>
          <TextField disabled id='nameOnCard' placeholder='JOHN DOE' />
        </Col>
        
        <Col>
          <Label htmlFor='cvc'>CVC</Label>
          <TextField disabled id='cvc' placeholder='123' />
        </Col>
        
        <Text asChild size={2} style={{ opacity: 0.6 }}>
          <p>Unavailable until a plan is selected.</p>
        </Text>
      </Stack>
    </Fieldset>
  ),
};

export const PreferencesMixedControls: Story = {
  name: 'Mixed controls',
  render: (props) => (
    <Fieldset {...props}>
      <FieldsetHeader>
        <FieldsetLegend>Preferences</FieldsetLegend>
        <Text asChild size={2} style={{ opacity: 0.7, maxWidth: 420 }}>
          <p>
            Fieldset works well for grouping mixed controls such as switches,
            checkboxes, and radios.
          </p>
        </Text>
      </FieldsetHeader>
      
      <Stack>
        <div style={{ display: 'grid', gap: 10 }}>
          <Row>
            <Switch size='small' defaultChecked />
            <Label>Email notifications</Label>
          </Row>
          <Row>
            <Switch size='small' />
            <Label>Marketing updates</Label>
          </Row>
          <Row>
            <Switch size='small' />
            <Label>In-app notifications</Label>
          </Row>
        </div>
        
        <div style={{ display: 'grid', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Text asChild size={3} style={{ fontWeight: 600 }}>
              <p>Autosave</p>
            </Text>
            <Switch defaultChecked />
          </div>
          
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>Automatically save changes while editing.</p>
          </Text>
        </div>
        
        <div style={{ display: 'grid', gap: 10 }}>
          <Text asChild size={3} style={{ fontWeight: 600 }}>
            <p>Profile visibility</p>
          </Text>
          <Stack>
            <Row>
              <Label>Public</Label>
              <Radio value='public' name='visibility' />
            </Row>
            <Row>
              <Label>Friends only</Label>
              <Radio value='friends' name='visibility' />
            </Row>
            <Row>
              <Label>Private</Label>
              <Radio value='private' name='visibility' />
            </Row>
          </Stack>
        </div>
      </Stack>
    </Fieldset>
  ),
};

export const WithoutHeader: Story = {
  name: 'Without header (plain grouping)',
  args: { appearance: 'transparent' },
  render: (props) => (
    <Fieldset {...props}>
      <Stack>
        <Col>
          <Label htmlFor='email'>Email</Label>
          <TextField id='email' placeholder='name@company.com' />
        </Col>
        
        <Col>
          <Label htmlFor='phone'>Phone</Label>
          <TextField id='phone' placeholder='+1 (555) 000-0000' />
        </Col>
        
        <Text asChild size={2} style={{ opacity: 0.7 }}>
          <p>
            A fieldset without a header or legend, used as a simple grouping
            container.
          </p>
        </Text>
      </Stack>
    </Fieldset>
  ),
};

export const MultipleGroupsOnPage: Story = {
  name: 'Multiple groups (page layout)',
  parameters: { layout: 'padded' },
  render: (props) => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 760 }}>
      <Fieldset {...props} appearance='outlined'>
        <FieldsetHeader>
          <FieldsetLegend>Account</FieldsetLegend>
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>Account-related information.</p>
          </Text>
        </FieldsetHeader>
        
        <Stack>
          <Col>
            <Label htmlFor='username'>Username</Label>
            <TextField id='username' placeholder='johndoe' />
          </Col>
          <Col>
            <Label htmlFor='email2'>Email</Label>
            <TextField id='email2' placeholder='john@domain.com' />
          </Col>
        </Stack>
      </Fieldset>
      
      <Fieldset {...props} appearance='outlined'>
        <FieldsetHeader>
          <FieldsetLegend>Security</FieldsetLegend>
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>Security-related settings often placed in a separate group.</p>
          </Text>
        </FieldsetHeader>
        
        <Stack>
          <Row>
            <Checkbox defaultChecked>
              <CheckboxHiddenInput />
              <CheckboxIndicator>
                <CheckboxIndeterminateIcon />
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
            </Checkbox>
            <Label>Two-factor authentication</Label>
          </Row>
          <Row>
            <Checkbox>
              <CheckboxHiddenInput />
              <CheckboxIndicator>
                <CheckboxIndeterminateIcon />
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
            </Checkbox>
            <Label>Require password on login</Label>
          </Row>
        </Stack>
      </Fieldset>
      
      <Fieldset {...props} appearance='transparent'>
        <FieldsetHeader>
          <FieldsetLegend>Sessions</FieldsetLegend>
          <Text asChild size={2} style={{ opacity: 0.7 }}>
            <p>
              A group without a border, used when the fieldset is part of a
              larger layout.
            </p>
          </Text>
        </FieldsetHeader>
        
        <div style={{ display: 'grid', gap: 10 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: 12,
                borderRadius: 12,
                border: '1px solid rgba(0,0,0,.12)',
              }}
            >
              <div style={{ display: 'grid', gap: 2 }}>
                <Text asChild size={2} style={{ fontWeight: 600 }}>
                  <p>Desktop • New York</p>
                </Text>
                <Text asChild size={2} style={{ opacity: 0.7 }}>
                  <p>Last active: today</p>
                </Text>
              </div>
              <Button size='sm' variant='secondary'>
                Revoke
              </Button>
            </div>
          ))}
        </div>
      </Fieldset>
    </div>
  ),
};
