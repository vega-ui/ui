import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Heading,
  Icon,
  IconButton,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight, XIcon } from '@vega-ui/icons';
import { useRef, useState, type CSSProperties } from 'react';

const rooms = [
  { name: 'Living room', area: '24 m²' },
  { name: 'Kitchen', area: '11 m²' },
  { name: 'Bedroom', area: '16 m²' },
  { name: 'Bathroom', area: '6 m²' },
  { name: 'Balcony', area: '5 m²' },
];

const slideStyle: CSSProperties = {
  display: 'grid',
  alignContent: 'end',
  gap: 'var(--spacing-2)',
  width: '100%',
  height: 200,
  padding: 'var(--spacing-10)',
  boxSizing: 'border-box',
  borderRadius: 'var(--radius-4)',
  background: 'var(--fills-secondary)',
};

export default function GalleryInDialog() {
  const api = useRef<SnapScrollerApiRef>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openAt = (index: number) => {
    setCurrent(index);
    setOpen(true);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)', width: '100%' }}>
        {rooms.map((room, index) => (
          <Button key={room.name} size='sm' variant='secondary' appearance='ghost' onClick={() => openAt(index)}>
            {room.name}
          </Button>
        ))}
      </div>
      <Dialog open={open} onChangeOpen={setOpen}>
        <DialogContent aria-labelledby='apartment-gallery-title' style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading as='h2' size={5} id='apartment-gallery-title'>Apartment 4B</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <SnapScroller
            apiRef={api}
            defaultIndex={current}
            tabIndex={0}
            aria-label='Rooms'
            onScrollSnapChange={(_, index) => setCurrent(index)}
            style={{ gap: 'var(--spacing-6)' }}
          >
            {rooms.map((room, index) => (
              <SnapScrollerContent key={room.name} index={index} style={slideStyle}>
                <Text size={3} fontWeight={500}>{room.name}</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>{room.area}</Text>
              </SnapScrollerContent>
            ))}
          </SnapScroller>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton
              aria-label='Previous room'
              variant='secondary'
              appearance='ghost'
              disabled={current === 0}
              onClick={() => api.current?.prev()}
            >
              <Icon><ChevronLeft /></Icon>
            </IconButton>
            <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{current + 1} / {rooms.length}</Text>
            <IconButton
              aria-label='Next room'
              variant='secondary'
              appearance='ghost'
              disabled={current === rooms.length - 1}
              onClick={() => api.current?.next()}
            >
              <Icon><ChevronRight /></Icon>
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
