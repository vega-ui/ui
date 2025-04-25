import type { Meta, StoryObj } from '@storybook/react';
import { SheetContent } from './SheetContent.tsx';
import { Text } from '../../../Text';
import { Button } from '../../../Button';
import { SheetTrigger } from '../SheetTrigger';
import { Sheet } from '../../Sheet.tsx';

const meta = {
  title: 'UI-Core/Sheet/SheetContent',
  component: SheetContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SheetContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: <Text>Sheet content</Text>
  },
  render(props) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent {...props} />
      </Sheet>
    )
  }
}

export const LongText: Story = {
  args: {
    children: (
      <>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec ligula eget magna finibus faucibus.
          In magna lorem, fermentum a tincidunt sit amet, faucibus ut lacus. Nulla posuere nibh et odio pellentesque
          pellentesque. Vestibulum mauris justo, maximus in interdum ut, egestas in odio. Vestibulum purus tortor,
          pharetra quis nunc id, egestas posuere risus. Nulla dapibus magna ultricies posuere aliquam. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Sed eu arcu sed ante ullamcorper condimentum.
          Quisque lacinia odio nisl, ac eleifend quam faucibus eu. Aenean sagittis erat eu feugiat consequat.
        </Text>
        <br/>
        <br/>
        <Text>
          Nulla libero velit, blandit eu diam vitae, congue scelerisque nisl. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas.
          In malesuada leo libero, nec scelerisque lectus hendrerit accumsan. Curabitur pharetra porttitor suscipit.
          Donec interdum volutpat lacus ac pretium. Nam ut dolor nec elit varius tincidunt ut et libero.
          Vivamus id posuere augue. Integer quis feugiat ipsum. Quisque eu mauris nec justo dapibus consectetur.
          Pellentesque posuere sapien ac euismod laoreet. Fusce dolor mauris, hendrerit aliquet dignissim et,
          vehicula tincidunt turpis. Donec sollicitudin nisi magna, sit amet blandit lectus finibus ut.
          Etiam non ante et dolor gravida congue in eu nulla. Nullam id massa bibendum, maximus libero eget, dignissim
          enim.
        </Text>
        <br/>
        <br/>
        <Text>
          Sed sollicitudin dolor tincidunt lectus sagittis, et consequat enim semper. Suspendisse venenatis sem
          rutrum mauris porta mollis. Nunc sit amet sagittis magna, vel egestas massa. Aliquam id auctor tellus,
          eu bibendum lectus. Nunc eu elementum lectus. Aenean vitae facilisis justo. Nullam condimentum est risus,
          ac dignissim arcu condimentum in. Ut at fringilla nunc, non efficitur enim. Praesent laoreet fermentum mi
          ac vulputate. Praesent sollicitudin nulla eget arcu ultrices efficitur. Nullam nulla tortor, feugiat sed
          accumsan quis, aliquam tempus erat. Nunc lobortis non neque vel pellentesque. Fusce tempus malesuada ante
          sed egestas. In aliquam commodo cursus.
        </Text>
        <br/>
        <br/>
        <Text>
          Sed magna tortor, finibus dictum sapien vitae, facilisis viverra quam. Praesent sapien enim,
          eleifend at purus vitae, dapibus tristique nisl. Sed euismod sapien fermentum, ultrices urna vitae,
          sollicitudin neque. Proin vitae ex a tellus sollicitudin posuere. Nam nec nunc risus. Nulla elementum,
          dui eget laoreet aliquet, arcu sem pellentesque urna, ac vulputate arcu libero at dui. Donec eu metus massa.
          Fusce dictum sodales elit, nec accumsan orci cursus non. Integer tempor pharetra finibus. Cras ac augue quam.
          Integer pulvinar ipsum vel mi dapibus lacinia.
        </Text>
      </>
    )
  },
  render(props) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open</Button>
        </SheetTrigger>
        <SheetContent {...props} />
      </Sheet>
    )
  }
}