import type { Meta, StoryObj } from '@storybook/react';

import { Sheet } from './Sheet.tsx';
import { Text } from '../Text';
import { Button } from '../Button';
import { Fieldset } from '../Fieldset';
import { TextField } from '../TextField';
import { Label } from '../Label';
import { Separator } from '../Separator';
import { SheetContent, SheetTrigger } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Sheet> = {
  title: 'UI-Core/Sheet/Sheet',
  component: Sheet,
  parameters: {
    layout: 'padded'
  },
  args: {},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <Text asChild size={3} style={{ textAlign: 'center', marginTop: '30px' }}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </SheetContent>
      </Sheet>
    )
  }
}

export const Scrollable: Story = {
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent style={{ maxHeight: '430px' }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Text key={index} asChild size={3} style={{marginBottom: index !== 9 ? '32px' : undefined}}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </Text>
          ))}
        </SheetContent>
      </Sheet>
    )
  }
}

export const SnapPoints: Story = {
  args: {
    snapPoints: [.5, 1],
  },
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <Text asChild size={3} style={{textAlign: 'center', marginTop: '30px', paddingBottom: '250px'}}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </SheetContent>
      </Sheet>
    )
  }
}

export const SteppedSnapPoints: Story = {
  args: {
    snapPoints: [.25, .5, .75, 1],
    steppedSnapPoints: true,
  },
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <Text asChild size={3} style={{textAlign: 'center', marginTop: '30px'}}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </SheetContent>
      </Sheet>
    )
  }
}

export const NotClosable: Story = {
  args: {
    snapPoints: [.5, 1],
    closable: false,
  },
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <Text asChild size={3} style={{textAlign: 'center', marginTop: '30px'}}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </SheetContent>
      </Sheet>
    )
  }
}

export const WithoutOverlay: Story = {
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent overlaid={false}>
          <Text asChild size={3} style={{textAlign: 'center', marginTop: '30px'}}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </SheetContent>
      </Sheet>
    )
  }
}

export const WithFormInside: Story = {
  args: {
    snapPoints: ['100px', .5, 1],
  },
  render(props) {
    return (
      <Sheet {...props}>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent>
          <form>
            <Fieldset>
              <Text asChild size={4} fontWeight={500}>
                <legend>
                  Personal
                </legend>
              </Text>
              <Separator style={{margin: '16px 0'}}/>
              <div style={{marginBottom: '32px'}}>
                <Label htmlFor='firstName'>First Name</Label>
                <TextField id='firstName' placeholder='Ivan'/>
              </div>
              <div>
                <Label htmlFor='lastName'>Last Name</Label>
                <TextField id='lastName' placeholder='Ivanov'/>
              </div>
            </Fieldset>
            <Button style={{marginTop: '32px'}}>Submit</Button>
          </form>
        </SheetContent>
      </Sheet>
    )
  }
}