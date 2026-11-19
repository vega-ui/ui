import type { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from '@vega-ui/icons';
import { AlertContent, AlertIcon, AlertMain, AlertTitle } from './components';
import { AlertAppearance, AlertVariant } from './types';

const variants: AlertVariant[] = ['info', 'error', 'success', 'warning'];
const appearances: AlertAppearance[] = ['fill', 'surface'];
const rows = variants.flatMap((variant) => appearances.map((appearance) => ({ variant, appearance })));
const glyphs: Record<AlertVariant, ReactElement> = { info: <InfoIcon />, error: <CircleAlertIcon />, success: <CircleCheckIcon />, warning: <TriangleAlertIcon /> };

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  subcomponents: {
    AlertContent,
    AlertTitle,
    AlertIcon,
    AlertMain,
  },
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-548&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['info', 'error', 'success', 'warning'],
    },
    appearance: {
      control: 'radio',
      options: ['fill', 'surface'],
    },
  },
  args: {
    children: (
      <AlertMain>
        <AlertTitle>I'm a title</AlertTitle>
        <AlertContent>I'm a content!</AlertContent>
      </AlertMain>
    ),
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ children, ...args }) => (
    <Alert {...args}>
      <AlertIcon>{glyphs[args.variant ?? 'info']}</AlertIcon>
      {children}
    </Alert>
  ),
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {rows.flatMap((row) => (
        [
          <Alert key={`${row.variant}-${row.appearance}-full`} {...row}>
            <AlertIcon>{glyphs[row.variant]}</AlertIcon>
            <AlertMain>
              <AlertTitle>{`${row.variant} / ${row.appearance}`}</AlertTitle>
              <AlertContent>I'm a content!</AlertContent>
            </AlertMain>
          </Alert>,
          <Alert key={`${row.variant}-${row.appearance}-title`} {...row}>
            <AlertIcon>{glyphs[row.variant]}</AlertIcon>
            <AlertMain>
              <AlertTitle>{`${row.variant} / ${row.appearance} / title only`}</AlertTitle>
            </AlertMain>
          </Alert>,
          <Alert key={`${row.variant}-${row.appearance}-no-icon`} {...row}>
            <AlertMain>
              <AlertTitle>{`${row.variant} / ${row.appearance} / no icon`}</AlertTitle>
              <AlertContent>I'm a content!</AlertContent>
            </AlertMain>
          </Alert>,
        ]
      ))}
    </div>
  ),
};
