import type { Meta, StoryObj } from '@storybook/react-vite';

import { Fieldset } from './Fieldset.tsx';
import { TextField, TextFieldInput } from '../TextField';
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
import { Switch, SwitchHiddenInput, SwitchIndicator } from '../Switch';
import { Radio } from '../Radio';

import { FieldsetHeader, FieldsetLegend } from './components';
import { FC, PropsWithChildren } from 'react';
import { Card } from '../Card';

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
        <TextField>
          <TextFieldInput placeholder='Field' />
        </TextField>
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
          <TextField>
            <TextFieldInput id='firstName' placeholder='John' />
          </TextField>
        </Col>
        
        <Col>
          <Label htmlFor='lastName'>Last name</Label>
          <TextField>
            <TextFieldInput id='lastName' placeholder='Doe' />
          </TextField>
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
          <TextField>
            <TextFieldInput id='city' placeholder='New York' />
          </TextField>
        </Col>
        
        <Col>
          <Label htmlFor='address'>Address</Label>
          <TextField>
            <TextFieldInput id='address' placeholder='123 Main St' />
          </TextField>
        </Col>
        
        <Col>
          <Label htmlFor='zip'>ZIP code</Label>
          <TextField>
            <TextFieldInput id='zip' placeholder='10001' />
          </TextField>
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
          <TextField>
            <TextFieldInput disabled id='card' placeholder='0000 0000 0000 0000' />
          </TextField>
        </Col>
        
        <Col>
          <Label htmlFor='nameOnCard'>Name on card</Label>
          <TextField>
            <TextFieldInput disabled id='nameOnCard' placeholder='JOHN DOE' />
          </TextField>
        </Col>
        
        <Col>
          <Label htmlFor='cvc'>CVC</Label>
          <TextField>
            <TextFieldInput disabled id='cvc' placeholder='123' />
          </TextField>
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
            <Switch size='sm'>
              <SwitchIndicator />
              <SwitchHiddenInput defaultChecked />
            </Switch>
            <Label>Email notifications</Label>
          </Row>
          <Row>
            <Switch size='sm'>
              <SwitchIndicator />
              <SwitchHiddenInput />
            </Switch>
            <Label>Marketing updates</Label>
          </Row>
          <Row>
            <Switch size='sm'>
              <SwitchIndicator />
              <SwitchHiddenInput defaultChecked />
            </Switch>
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
              <Label htmlFor='public-visibility'>Public</Label>
              <Radio id='public-visibility' value='public' name='visibility' />
            </Row>
            <Row>
              <Label htmlFor='friends-visibility'>Friends only</Label>
              <Radio id='friends-visibility' value='friends' name='visibility' />
            </Row>
            <Row>
              <Label htmlFor='private-visibility'>Private</Label>
              <Radio id='private-visibility' value='private' name='visibility' />
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
          <TextField>
            <TextFieldInput id='email' placeholder='name@company.com' />
          </TextField>
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
            <TextField>
              <TextFieldInput id='username' placeholder='johndoe' />
            </TextField>
          </Col>
          <Col>
            <Label htmlFor='email2'>Email</Label>
            <TextField>
              <TextFieldInput id='email2' placeholder='john@domain.com' />
            </TextField>
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
              <CheckboxHiddenInput id='two-factor' />
              <CheckboxIndicator>
                <CheckboxIndeterminateIcon />
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
            </Checkbox>
            <Label htmlFor='two-factor'>Two-factor authentication</Label>
          </Row>
          <Row>
            <Checkbox>
              <CheckboxHiddenInput id='password-required' />
              <CheckboxIndicator>
                <CheckboxIndeterminateIcon />
                <CheckboxCheckedIcon />
              </CheckboxIndicator>
            </Checkbox>
            <Label htmlFor='password-required'>Require password on login</Label>
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
            <Card key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 6 }}>
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
            </Card>
          ))}
        </div>
      </Fieldset>
    </div>
  ),
};
