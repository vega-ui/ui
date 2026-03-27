import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Alert } from './Alert/Alert';
import { AlertContent, AlertIcon, AlertMain, AlertTitle } from './Alert/components';
import { Avatar } from './Avatar/Avatar';
import { AvatarIcon } from './Avatar/components';
import { Heart } from '@vega-ui/icons';
import { Badge } from './Badge/Badge';
import { Button } from './Button/Button';
import { Checkbox } from './Checkbox/Checkbox';
import { Radio } from './Radio/Radio';
import { SegmentedControl } from './SegmentedControl/SegmentedControl';
import {
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemHiddenInput,
} from './SegmentedControl/components';
import { Slider } from './Slider/Slider';
import { SliderHiddenInput, SliderProgress, SliderThumb } from './Slider/components';

const meta = {
  title: 'Playground',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
    {children}
  </div>
);

const Col = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {children}
  </div>
);

export const Playground: Story = {
  render() {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('a');
    const [segmentValue, setSegmentValue] = useState('1');
    const [sliderValue, setSliderValue] = useState(40);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>

        <Row>
          {(['ghost', 'fill', 'outline', 'surface'] as const).map((appearance, index) => (
            <Badge key={index} variant='success' appearance={appearance}>
              Badge
            </Badge>
          ))}
        </Row>

        <Row>
          <Button variant='primary' appearance='fill'>Fill</Button>
          <Button variant='primary' appearance='outline'>Outline</Button>
          <Button variant='primary' appearance='ghost'>Ghost</Button>
          <Button variant='primary' appearance='transparent'>Transparent</Button>
        </Row>

        <Col>
          {(['surface', 'fill'] as const).map((appearance) => (
            (['info', 'success', 'warning', 'error'].map((variant) => (
              <Alert key={variant} variant={variant} appearance={appearance}>
                <AlertIcon />
                <AlertMain>
                  <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</AlertTitle>
                  <AlertContent>This is a {variant} alert message.</AlertContent>
                </AlertMain>
              </Alert>
            )))
          ))}
        </Col>

        <Row>
          <Checkbox checked={checked} onChangeChecked={setChecked} />
          <Checkbox checked indeterminate />
          <Checkbox disabled />
          <Checkbox checked disabled />
        </Row>

        <Row>
          {(['a', 'b', 'c'] as const).map((val) => (
            <Radio
              key={val}
              name='playground-radio'
              value={val}
              checked={radioValue === val}
              onChange={() => setRadioValue(val)}
            />
          ))}
          <Radio name='playground-radio' value='d' disabled />
        </Row>

        <Row>
          <Avatar size='md'><AvatarIcon><Heart /></AvatarIcon></Avatar>
          <Avatar size='lg'><AvatarIcon><Heart /></AvatarIcon></Avatar>
          <Avatar size='xl'><AvatarIcon><Heart /></AvatarIcon></Avatar>
        </Row>
        
        <Row>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-500)',
          }}>
            <Heart size={18} />
          </div>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-500)',
          }}>
            <Heart size={20} />
          </div>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--color-primary-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary-500)',
          }}>
            <Heart size={22} />
          </div>
        </Row>

        <SegmentedControl
          variant='primary'
          name='playground-segmented'
          value={segmentValue}
          onChange={(e) => setSegmentValue(e.target.value)}
        >
          <SegmentedControlItem value='1'>
            <SegmentedControlItemHiddenInput />
            Day
          </SegmentedControlItem>
          <SegmentedControlItem value='2'>
            <SegmentedControlItemHiddenInput />
            Week
          </SegmentedControlItem>
          <SegmentedControlItem value='3'>
            <SegmentedControlItemHiddenInput />
            Month
          </SegmentedControlItem>
          <SegmentedControlItem value='4'>
            <SegmentedControlItemHiddenInput />
            Year
          </SegmentedControlItem>
          <SegmentedControlIndicator />
        </SegmentedControl>

        <Slider
          value={sliderValue}
          onChangeValue={setSliderValue}
          min={0}
          max={100}
          step={1}
        >
          <SliderProgress />
          <SliderThumb>
            <SliderHiddenInput name='range' />
          </SliderThumb>
        </Slider>

      </div>
    );
  },
};
