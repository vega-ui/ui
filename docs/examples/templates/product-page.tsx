import { useId, useRef, useState, type CSSProperties, type FormEvent } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  Fieldset,
  FieldsetLegend,
  Heading,
  HelperText,
  Icon,
  IconButton,
  Label,
  NumberField,
  NumberFieldDecrementButton,
  NumberFieldIncrementButton,
  NumberFieldInput,
  PageControl,
  PageControlItem,
  Radio,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHandle,
  SnapScroller,
  SnapScrollerContent,
  Text,
  type SnapScrollerApiRef,
} from '@vega-ui/react';
import { ChevronLeft, ChevronRight, Heart, Maximize2, RotateCcw, Shirt, Star, Truck, XIcon } from '@vega-ui/icons';
import './product-page.css';

const PRICE = 98;

const colors = [
  { value: 'oat', name: 'Oat', swatch: 'var(--color-amber-200)' },
  { value: 'charcoal', name: 'Charcoal', swatch: 'var(--color-graphite-700)' },
  { value: 'navy', name: 'Navy', swatch: 'var(--color-blue-900)' },
  { value: 'forest', name: 'Forest', swatch: 'var(--color-green-800)' },
];

const sizes = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  { value: 'm', label: 'M' },
  { value: 'l', label: 'L' },
  { value: 'xl', label: 'XL', soldOut: true },
];

const photos = ['Front', 'Back', 'Collar detail', 'Folded'];

const details = [
  { value: 'description', title: 'Description', text: 'A relaxed crew neck in fine 18.5-micron merino. Warm without bulk, soft enough to wear on bare skin, and it doesn’t hold odour, so it needs washing less often.' },
  { value: 'materials', title: 'Materials', text: '100% extra-fine merino wool from mulesing-free farms in New Zealand. Knitted in Portugal. Machine wash cold on a wool cycle, dry flat.' },
  { value: 'shipping', title: 'Shipping & returns', text: 'Free standard delivery on orders over $75. Returns are free within 30 days; unworn items with tags get a full refund to the original payment method.' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const closeButton = { flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties;

const photoStyle = (swatch: string, height: string): CSSProperties => ({
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  height,
  borderRadius: 'var(--radius-5)',
  background: `color-mix(in oklch, ${swatch} 22%, var(--surface-secondary))`,
  color: `color-mix(in oklch, ${swatch} 70%, var(--label-primary))`,
});

interface OptionsProps {
  prefix: string
  color: string
  size: string
  sizeError: boolean
  onChangeColor(value: string): void
  onChangeSize(value: string): void
}

const ProductOptions = ({ prefix, color, size, sizeError, onChangeColor, onChangeSize }: OptionsProps) => {
  const colorName = colors.find((item) => item.value === color)?.name;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-10)' }}>
      <Fieldset style={{ gap: 'var(--spacing-5)' }}>
        <FieldsetLegend style={{ fontWeight: 500 }}>
          {'Color: '}
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>{colorName}</Text>
        </FieldsetLegend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-6)', paddingInline: 'var(--spacing-1)' }}>
          {colors.map((item) => (
            <Radio
              key={item.value}
              name={`${prefix}-color`}
              value={item.value}
              aria-label={item.name}
              checked={color === item.value}
              className='productPageSwatch'
              style={{ '--swatch': item.swatch } as CSSProperties}
              onChange={() => onChangeColor(item.value)}
            />
          ))}
        </div>
      </Fieldset>

      <div style={field}>
        <Label id={`${prefix}-size-label`}>Size</Label>
        <SegmentedControl
          name={`${prefix}-size`}
          role='radiogroup'
          value={size}
          aria-labelledby={`${prefix}-size-label`}
          aria-describedby={sizeError ? `${prefix}-size-error` : `${prefix}-size-hint`}
          style={{ width: '100%' }}
          onChange={(event) => onChangeSize(event.currentTarget.value)}
        >
          {sizes.map((item) => (
            <SegmentedControlItem key={item.value} value={item.value} disabled={item.soldOut} style={{ flex: 1 }}>
              <SegmentedControlItemInput disabled={item.soldOut} aria-label={item.soldOut ? `${item.label}, sold out` : undefined} />
              {item.soldOut ? <span style={{ textDecoration: 'line-through' }}>{item.label}</span> : item.label}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
        {sizeError
          ? <HelperText id={`${prefix}-size-error`} error>Choose a size to add this to your bag.</HelperText>
          : <HelperText id={`${prefix}-size-hint`}>XL is sold out. Fits true to size; size down for a closer fit.</HelperText>}
      </div>
    </div>
  );
};

export default function ProductPage() {
  const id = useId();
  const gallery = useRef<SnapScrollerApiRef>(null);
  const viewer = useRef<SnapScrollerApiRef>(null);
  const [photo, setPhoto] = useState(0);
  const [viewerPhoto, setViewerPhoto] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [color, setColor] = useState('oat');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState('');

  const selectedColor = colors.find((item) => item.value === color) ?? colors[0];
  const sizeLabel = sizes.find((item) => item.value === size)?.label;

  const changeColor = (value: string) => {
    setColor(value);
    setAdded('');
  };

  const changeSize = (value: string) => {
    setSize(value);
    setSizeError(false);
    setAdded('');
  };

  const openViewer = () => {
    setViewerPhoto(photo);
    setViewerOpen(true);
  };

  const changeViewerOpen = (open: boolean) => {
    setViewerOpen(open);
    if (!open) gallery.current?.scrollToElementByKey(viewerPhoto);
  };

  const addToBag = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (size === '') {
      setSizeError(true);
      const input = event.currentTarget.querySelector<HTMLInputElement>(`input[name='${id}-inline-size']:not(:disabled)`);

      if (input && input.offsetParent !== null) {
        input.focus();
        return;
      }

      setOptionsOpen(true);
      return;
    }

    setAdded(`${selectedColor.name} · ${sizeLabel} · Qty ${quantity}`);
  };

  return (
    <div className='productPage' style={{ width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)' }}>
        <section aria-label='Product photos' style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 'var(--spacing-6)', flex: '1 1 360px', minWidth: 0 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <SnapScroller
              apiRef={gallery}
              tabIndex={0}
              aria-label='Photos'
              onScrollSnapChange={(_, index) => setPhoto(index)}
              style={{ width: '100%', gap: 'var(--spacing-6)', borderRadius: 'var(--radius-5)' }}
            >
              {photos.map((name, index) => (
                <SnapScrollerContent key={name} index={index} style={{ width: '100%', flexShrink: 0 }}>
                  <div role='img' aria-label={`${name}, ${selectedColor.name}`} style={photoStyle(selectedColor.swatch, 'clamp(280px, 60vw, 440px)')}>
                    <Shirt size={index === 2 ? 160 : 120} strokeWidth={1} aria-hidden='true' />
                  </div>
                </SnapScrollerContent>
              ))}
            </SnapScroller>
            <IconButton size='xs'
              aria-label='Open full-screen photos'
              variant='secondary'
              appearance='ghost'
              onClick={openViewer}
              style={{ position: 'absolute', insetBlockStart: 'var(--spacing-6)', insetInlineEnd: 'var(--spacing-6)', background: 'var(--surface-primary)' }}
            >
              <Icon size='xs'><Maximize2 /></Icon>
            </IconButton>
          </div>
          <PageControl active={photo} style={{ justifySelf: 'center' }} aria-label='Choose a photo' onChangeActive={(index) => gallery.current?.scrollToElementByKey(index)}>
            {photos.map((name, index) => (
              <PageControlItem key={name} index={index} aria-label={name} />
            ))}
          </PageControl>
        </section>

        <form noValidate aria-labelledby={`${id}-title`} onSubmit={addToBag} style={{ display: 'grid', gap: 'var(--spacing-12)', flex: '1 1 340px', minWidth: 0 }}>
          <header style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
              <Badge size='sm' variant='info'>New season</Badge>
              <Text size={2} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)', fontVariantNumeric: 'tabular-nums' }}>
                <Icon size='xs' aria-hidden='true'><Star /></Icon>
                4.8 · 214 reviews
              </Text>
            </div>
            <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Merino crew sweater</Heading>
            <Text size={5} fontWeight={600} style={{ fontVariantNumeric: 'tabular-nums' }}>{currency.format(PRICE)}</Text>
          </header>

          <div className='productPageOptions'>
            <ProductOptions prefix={`${id}-inline`} color={color} size={size} sizeError={sizeError} onChangeColor={changeColor} onChangeSize={changeSize} />
          </div>

          <Button size='xs'
            type='button'
            variant='secondary'
            appearance='ghost'
            className='productPageSheetTrigger'
            aria-describedby={sizeError ? `${id}-sheet-error` : undefined}
            onClick={() => setOptionsOpen(true)}
            style={{ justifyContent: 'space-between', gap: 'var(--spacing-8)' }}
          >
            <span>{`${selectedColor.name} · ${sizeLabel ?? 'Choose a size'}`}</span>
            <span style={{ color: 'var(--color-primary-500)' }}>Change</span>
          </Button>
          {sizeError && <HelperText id={`${id}-sheet-error`} error className='productPageSheetTrigger'>Choose a size to add this to your bag.</HelperText>}

          <div style={field}>
            <Label htmlFor={`${id}-quantity`}>Quantity</Label>
            <NumberField min={1} max={5} value={quantity} onChangeValue={(next) => setQuantity(next ?? 1)} style={{ maxWidth: 160 }}>
              <NumberFieldDecrementButton aria-label='Decrease quantity' />
              <NumberFieldInput id={`${id}-quantity`} name='quantity' aria-describedby={`${id}-quantity-hint`} />
              <NumberFieldIncrementButton aria-label='Increase quantity' />
            </NumberField>
            <HelperText id={`${id}-quantity-hint`}>Up to 5 per order.</HelperText>
          </div>

          <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
            {added !== '' && (
              <Alert variant='success'>
                <AlertIcon />
                <AlertMain>
                  <AlertTitle>Added to your bag</AlertTitle>
                  <AlertContent>{`Merino crew sweater · ${added}`}</AlertContent>
                </AlertMain>
              </Alert>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
              <Button type='submit' size='xs' style={{ flex: '999 1 200px' }}>{`Add to bag · ${currency.format(PRICE * quantity)}`}</Button>
              <Button type='button' size='xs' variant='secondary' appearance='ghost' aria-pressed={saved} onClick={() => setSaved(!saved)} style={{ flex: '1 1 auto', gap: 'var(--spacing-4)' }}>
                <Icon size='xs' aria-hidden='true'><Heart fill={saved ? 'currentColor' : 'none'} /></Icon>
                {saved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>

          <ul style={{ display: 'grid', gap: 'var(--spacing-6)', margin: 0, padding: 0, listStyle: 'none' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
              <Icon aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><Truck /></Icon>
              <span style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                <Text size={3} fontWeight={500}>Free delivery Thu, Nov 12 – Mon, Nov 16</Text>
                <Text size={2} style={{ color: 'var(--label-secondary)' }}>Order within 3 h 20 min for dispatch today.</Text>
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
              <Icon aria-hidden='true' style={{ flexShrink: 0, color: 'var(--label-secondary)' }}><RotateCcw /></Icon>
              <Text size={3} fontWeight={500}>Free returns within 30 days</Text>
            </li>
          </ul>

          <Accordion multiple defaultOpened={['description']}>
            {details.map((item, index) => (
              <AccordionItem key={item.value} value={item.value}>
                {index === 0 && <Separator />}
                <AccordionHeader>
                  <AccordionTrigger>
                    {item.title}
                    <AccordionIcon />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent>
                  <Text size={3} style={{ color: 'var(--label-secondary)' }}>{item.text}</Text>
                </AccordionContent>
                <Separator />
              </AccordionItem>
            ))}
          </Accordion>
        </form>
      </div>

      <Sheet open={optionsOpen} onChangeOpen={setOptionsOpen}>
        <SheetContent aria-labelledby={`${id}-options-title`}>
          <SheetHandle aria-label='Resize sheet' />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', marginBlockEnd: 'var(--spacing-10)' }}>
            <Heading id={`${id}-options-title`} as='h2' size={4} fontWeight={600}>Choose options</Heading>
            <SheetClose asChild>
              <IconButton aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </SheetClose>
          </div>
          <ProductOptions prefix={`${id}-sheet`} color={color} size={size} sizeError={sizeError} onChangeColor={changeColor} onChangeSize={changeSize} />
          <SheetClose asChild>
            <Button fullWidth size='xs' style={{ marginBlockStart: 'var(--spacing-12)' }}>Done</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>

      <Dialog fluid open={viewerOpen} onChangeOpen={changeViewerOpen}>
        <DialogContent aria-labelledby={`${id}-viewer-title`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-8)', maxWidth: 960, marginInline: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <Heading id={`${id}-viewer-title`} as='h2' size={4} fontWeight={600}>{`Merino crew sweater, ${selectedColor.name}`}</Heading>
              <DialogClose asChild>
                <IconButton aria-label='Close' variant='secondary' appearance='ghost' style={closeButton}>
                  <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
                </IconButton>
              </DialogClose>
            </div>
            <SnapScroller
              apiRef={viewer}
              defaultIndex={viewerPhoto}
              tabIndex={0}
              aria-label='Full-screen photos'
              onScrollSnapChange={(_, index) => setViewerPhoto(index)}
              style={{ gap: 'var(--spacing-8)' }}
            >
              {photos.map((name, index) => (
                <SnapScrollerContent key={name} index={index} style={{ width: '100%', flexShrink: 0 }}>
                  <div role='img' aria-label={`${name}, ${selectedColor.name}`} style={photoStyle(selectedColor.swatch, 'min(70vh, 640px)')}>
                    <Shirt size={index === 2 ? 280 : 220} strokeWidth={0.75} aria-hidden='true' />
                  </div>
                </SnapScrollerContent>
              ))}
            </SnapScroller>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
              <IconButton size='xs' aria-label='Previous photo' variant='secondary' appearance='ghost' disabled={viewerPhoto === 0} onClick={() => viewer.current?.prev()}>
                <Icon size='xs' className='productPageChevron'><ChevronLeft /></Icon>
              </IconButton>
              <Text size={2} aria-live='polite' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
                {`${photos[viewerPhoto]} · ${viewerPhoto + 1} of ${photos.length}`}
              </Text>
              <IconButton size='xs' aria-label='Next photo' variant='secondary' appearance='ghost' disabled={viewerPhoto === photos.length - 1} onClick={() => viewer.current?.next()}>
                <Icon size='xs' className='productPageChevron'><ChevronRight /></Icon>
              </IconButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
