import type { Meta, StoryObj } from '@storybook/react-vite';

import { PhoneFieldSelect } from './PhoneFieldSelect';
import { PhoneFieldSelectHiddenSelect } from '../PhoneFieldSelectHiddenSelect';
import { PhoneFieldSelectCombobox } from '../PhoneFieldSelectCombobox';
import { PhoneFieldSelectIcon } from '../PhoneFieldSelectIcon';
import { PhoneFieldSelectListbox } from '../PhoneFieldSelectListbox';
import { PhoneFieldSelectOption } from '../PhoneFieldSelectOption';
import { PhoneFieldSelectPortal } from '../PhoneFieldSelectPortal';
import { PhoneField } from '../../PhoneField';
import { PhoneFieldInput } from '../PhoneFieldInput';

import { FlagRU, FlagUS, FlagFR } from '@vega-ui/icons';
import { useSelectContext } from '../../../Select';
import { PhoneFieldSelectValue } from '../PhoneFieldSelectValue';

const meta = {
  title: 'Form/Fields/PhoneField/PhoneFieldSelect/PhoneFieldSelect',
  component: PhoneFieldSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['field', 'inline'] },
    disabled: { control: 'boolean' },
  },
  decorators(Story, ctx) {
    if (ctx.parameters?.noDecorator) return <Story />;
    
    return (
      <PhoneField>
        <Story />
        <PhoneFieldInput />
      </PhoneField>
    )
  },
} satisfies Meta<typeof PhoneFieldSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: 'RU', label: 'Russia', code: '+7', Flag: <FlagRU height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} /> },
  { value: 'US', label: 'United States', code: '+1', Flag: <FlagUS height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} /> },
  { value: 'FR', label: 'France', code: '+33', Flag: <FlagFR height={18} stroke='none' style={{ borderRadius: 'var(--radius-1)' }} /> },
] as const;

const FlagOnlyValue = () => {
  const { selected } = useSelectContext();
  const item = countries.find((c) => c.value === selected);
  const Flag = item?.Flag;
  
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {Flag}
    </span>
  );
};

const EmojiValue = () => {
  const { selected } = useSelectContext();
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span aria-hidden>
        {selected === 'RU' ? '🇷🇺' : selected === 'US' ? '🇺🇸' : selected === 'FR' ? '🇫🇷' : ''}
      </span>
    </span>
  );
};

export const Default: Story = {
  args: {
    children: [
      <PhoneFieldSelectHiddenSelect />,
      <PhoneFieldSelectCombobox>
        <PhoneFieldSelectValue />
        <PhoneFieldSelectIcon />
      </PhoneFieldSelectCombobox>,
      <PhoneFieldSelectPortal>
        <PhoneFieldSelectListbox>
          <PhoneFieldSelectOption value='RU'>RU</PhoneFieldSelectOption>
          <PhoneFieldSelectOption value='US'>US</PhoneFieldSelectOption>
          <PhoneFieldSelectOption value='FR'>FR</PhoneFieldSelectOption>
        </PhoneFieldSelectListbox>
      </PhoneFieldSelectPortal>,
    ],
  },
};

export const FlagsInList: Story = {
  args: {
    children: [
      <PhoneFieldSelectHiddenSelect />,
      <PhoneFieldSelectCombobox>
        <PhoneFieldSelectValue />
        <PhoneFieldSelectIcon />
      </PhoneFieldSelectCombobox>,
      <PhoneFieldSelectPortal>
        <PhoneFieldSelectListbox>
          {countries.map(({ value, label, code, Flag }) => (
            <PhoneFieldSelectOption key={value} value={value}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {Flag}
                <span>{label}</span>
              </span>
              <span style={{ marginLeft: 'auto', opacity: 0.8 }}>{code}</span>
            </PhoneFieldSelectOption>
          ))}
        </PhoneFieldSelectListbox>
      </PhoneFieldSelectPortal>,
    ],
  },
};

export const FlagOnlyValueStory: Story = {
  args: {
    children: [
      <PhoneFieldSelectHiddenSelect />,
      <PhoneFieldSelectCombobox>
        <FlagOnlyValue />
        <PhoneFieldSelectIcon />
      </PhoneFieldSelectCombobox>,
      <PhoneFieldSelectPortal>
        <PhoneFieldSelectListbox>
          {countries.map(({ value, label, code, Flag }) => (
            <PhoneFieldSelectOption key={value} value={value}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                {Flag}
                {label}
              </span>
              <span style={{ marginLeft: 'auto', opacity: 0.8 }}>{code}</span>
            </PhoneFieldSelectOption>
          ))}
        </PhoneFieldSelectListbox>
      </PhoneFieldSelectPortal>,
    ],
  },
};

/* ----------------------- custom value: emoji ---------------------- */

export const Emoji: Story = {
  args: {
    children: [
      <PhoneFieldSelectHiddenSelect />,
      <PhoneFieldSelectCombobox>
        <EmojiValue />
        <PhoneFieldSelectIcon />
      </PhoneFieldSelectCombobox>,
      <PhoneFieldSelectPortal>
        <PhoneFieldSelectListbox>
          <PhoneFieldSelectOption value='RU'>🇷🇺 Russia <span style={{ marginLeft: 'auto' }}>+7</span></PhoneFieldSelectOption>
          <PhoneFieldSelectOption value='US'>🇺🇸 United States <span style={{ marginLeft: 'auto' }}>+1</span></PhoneFieldSelectOption>
          <PhoneFieldSelectOption value='FR'>🇫🇷 France <span style={{ marginLeft: 'auto' }}>+33</span></PhoneFieldSelectOption>
        </PhoneFieldSelectListbox>
      </PhoneFieldSelectPortal>,
    ],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: [
      <PhoneFieldSelectHiddenSelect />,
      <PhoneFieldSelectCombobox>
        <FlagOnlyValue />
        <PhoneFieldSelectIcon />
      </PhoneFieldSelectCombobox>,
    ],
  },
};

export const Sizes: Story = {
  parameters: {
    noDecorator: true,
  },
  render() {
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <PhoneField style={{ width: 300 }} size={size} key={size}>
            <PhoneFieldSelect>
              <PhoneFieldSelectHiddenSelect />
              <PhoneFieldSelectCombobox>
                <FlagOnlyValue />
                <PhoneFieldSelectIcon />
              </PhoneFieldSelectCombobox>
              <PhoneFieldSelectPortal>
                <PhoneFieldSelectListbox>
                  {countries.map(({ value, label, code, Flag }) => (
                    <PhoneFieldSelectOption key={value} value={value}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                        {Flag}
                        {label}
                      </span>
                      <span style={{ marginLeft: 'auto', opacity: 0.8 }}>{code}</span>
                    </PhoneFieldSelectOption>
                  ))}
                </PhoneFieldSelectListbox>
              </PhoneFieldSelectPortal>
            </PhoneFieldSelect>
            <PhoneFieldInput />
          </PhoneField>
        ))}
      </div>
    )
  }
};
