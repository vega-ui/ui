import { useId, useRef, useState, type FormEvent } from 'react';
import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
  Button,
  Card,
  Fieldset,
  FieldsetLegend,
  Heading,
  HelperText,
  Label,
  PhoneField,
  PhoneFieldInput,
  PhoneFieldSelect,
  PhoneFieldSelectCombobox,
  PhoneFieldSelectHiddenSelect,
  PhoneFieldSelectIcon,
  PhoneFieldSelectListbox,
  PhoneFieldSelectOption,
  PhoneFieldSelectValue,
  Radio,
  Select,
  SelectCombobox,
  SelectHiddenSelect,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Table,
  TableBody,
  TableData,
  TableFoot,
  TableHeading,
  TableRow,
  Text,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { FlagCA, FlagDE, FlagFR, FlagGBUKM, FlagNL, FlagUS } from '@vega-ui/icons';

const countries = [
  { code: 'US', name: 'United States', callingCode: '+1', Flag: FlagUS },
  { code: 'CA', name: 'Canada', callingCode: '+1', Flag: FlagCA },
  { code: 'GB', name: 'United Kingdom', callingCode: '+44', Flag: FlagGBUKM },
  { code: 'DE', name: 'Germany', callingCode: '+49', Flag: FlagDE },
  { code: 'FR', name: 'France', callingCode: '+33', Flag: FlagFR },
  { code: 'NL', name: 'Netherlands', callingCode: '+31', Flag: FlagNL },
] as const;

const shippingOptions = [
  { value: 'standard', title: 'Standard', eta: '5–7 business days', price: 0 },
  { value: 'express', title: 'Express', eta: '2–3 business days', price: 12 },
  { value: 'overnight', title: 'Next day', eta: 'Order before 2 pm', price: 24 },
];

const items = [
  { name: 'Merino crew sweater', variant: 'Oat · M', quantity: 1, price: 98 },
  { name: 'Organic cotton tee', variant: 'Black · M', quantity: 2, price: 32 },
  { name: 'Wool hiking socks', variant: '3-pack', quantity: 1, price: 24 },
];

const TAX_RATE = 0.08;

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const field = { display: 'grid', gap: 'var(--spacing-3)', alignContent: 'start' } as const;
const columns = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'var(--spacing-8)' } as const;
const amount = { fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' } as const;
const fieldOrder = ['email', 'phone', 'country', 'name', 'address', 'city', 'postal'];
const legend = { fontWeight: 600, marginBlockEnd: 'var(--spacing-6)' } as const;

type Errors = Partial<Record<string, string>>;

const validate = (data: FormData, country: string | null) => {
  const errors: Errors = {};
  const value = (name: string) => String(data.get(name) ?? '').trim();

  if (value('email') === '') errors.email = 'Enter an email for the receipt.';
  if (value('email') !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))) errors.email = 'Use the full address, like ada@example.com.';
  if (value('phone').replace(/\D/g, '').length < 7) errors.phone = 'Enter a phone number so the courier can reach you.';
  if (value('name') === '') errors.name = 'Enter the name of the person receiving the order.';
  if (value('address') === '') errors.address = 'Enter a street address.';
  if (value('city') === '') errors.city = 'Enter a city.';
  if (value('postal') === '') errors.postal = 'Enter a postal code.';
  if (country === null) errors.country = 'Choose a country to see delivery options.';

  return errors;
};

export default function Checkout() {
  const id = useId();
  const countryRef = useRef<HTMLButtonElement>(null);
  const [phoneCountry, setPhoneCountry] = useState<(typeof countries)[number]>(countries[0]);
  const [country, setCountry] = useState<string | null>(null);
  const [shipping, setShipping] = useState('standard');
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const delivery = shippingOptions.find((option) => option.value === shipping)?.price ?? 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + delivery + tax;

  const describe = (name: string) => errors[name] ? `${id}-${name}-error` : undefined;

  const clearError = (name: string) => {
    if (!errors[name]) return;
    setErrors({ ...errors, [name]: undefined });
  };

  const changePhoneCountry = (code: string) => {
    const found = countries.find((item) => item.code === code);
    if (found) setPhoneCountry(found);
  };

  const changeCountry = (next: string | undefined) => {
    setCountry(next ?? null);
    clearError('country');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next = validate(data, country);
    const invalid = fieldOrder.find((name) => next[name]);

    setErrors(next);

    if (invalid === 'country') {
      countryRef.current?.focus();
      return;
    }

    if (invalid) {
      const element = form.elements.namedItem(invalid);
      if (element instanceof HTMLElement) element.focus();
      return;
    }

    setPlaced(String(data.get('email')));
  };

  if (placed !== '') {
    return (
      <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 560, marginInline: 'auto' }}>
        <Alert variant='success'>
          <AlertIcon />
          <AlertMain>
            <AlertTitle>Order #10482 is confirmed</AlertTitle>
            <AlertContent>{`We sent the receipt to ${placed}. You will get a tracking link when it ships.`}</AlertContent>
          </AlertMain>
        </Alert>
        <Button size='xs' variant='secondary' appearance='ghost' style={{ justifySelf: 'start' }} onClick={() => setPlaced('')}>Back to checkout</Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      aria-labelledby={`${id}-title`}
      onSubmit={submit}
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: 'var(--spacing-16)', width: '100%', maxWidth: 960, marginInline: 'auto' }}
    >
      <div style={{ display: 'grid', gap: 'var(--spacing-16)', flex: '999 1 420px', minWidth: 0 }}>
        <header style={{ display: 'grid', gap: 'var(--spacing-2)' }}>
          <Heading id={`${id}-title`} as='h1' size={7} fontWeight={700}>Checkout</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Free returns within 30 days.</Text>
        </header>

        <Fieldset style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend style={legend}>Contact</FieldsetLegend>
          <div style={columns}>
            <div style={field}>
              <Label htmlFor={`${id}-email`}>Email</Label>
              <TextField error={errors.email !== undefined}>
                <TextFieldInput
                  id={`${id}-email`}
                  name='email'
                  type='email'
                  autoComplete='email'
                  aria-invalid={errors.email !== undefined}
                  aria-describedby={describe('email')}
                  onChange={() => clearError('email')}
                />
              </TextField>
              {errors.email && <HelperText id={`${id}-email-error`} error>{errors.email}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-phone`}>Phone</Label>
              <PhoneField code={phoneCountry.code} onChangeCode={changePhoneCountry} error={errors.phone !== undefined}>
                <PhoneFieldSelect>
                  <PhoneFieldSelectHiddenSelect name='phoneCountry' />
                  <PhoneFieldSelectCombobox aria-label={`Country code: ${phoneCountry.name}`}>
                    <PhoneFieldSelectValue>
                      <phoneCountry.Flag width={20} height={15} aria-hidden='true' />
                    </PhoneFieldSelectValue>
                    <PhoneFieldSelectIcon />
                  </PhoneFieldSelectCombobox>
                  <PhoneFieldSelectListbox>
                    {countries.map(({ code, name, callingCode, Flag }) => (
                      <PhoneFieldSelectOption key={code} value={code} label={name}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
                          <Flag width={20} height={15} aria-hidden='true' />
                          {name}
                        </span>
                        <span style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{callingCode}</span>
                      </PhoneFieldSelectOption>
                    ))}
                  </PhoneFieldSelectListbox>
                </PhoneFieldSelect>
                <PhoneFieldInput
                  id={`${id}-phone`}
                  name='phone'
                  autoComplete='tel'
                  aria-invalid={errors.phone !== undefined}
                  aria-describedby={describe('phone')}
                  onChange={() => clearError('phone')}
                />
              </PhoneField>
              {errors.phone && <HelperText id={`${id}-phone-error`} error>{errors.phone}</HelperText>}
            </div>
          </div>
        </Fieldset>

        <Fieldset style={{ gap: 'var(--spacing-8)' }}>
          <FieldsetLegend style={legend}>Shipping address</FieldsetLegend>
          <div style={field}>
            <Label htmlFor={`${id}-country`}>Country</Label>
            <Select value={country} onChangeValue={changeCountry}>
              <SelectHiddenSelect name='country' />
              <SelectCombobox
                id={`${id}-country`}
                ref={countryRef}
                aria-invalid={errors.country !== undefined}
                aria-describedby={describe('country')}
              >
                <SelectValue placeholder='Choose a country' />
                <SelectIcon />
              </SelectCombobox>
              <SelectListbox>
                {countries.map((item) => (
                  <SelectOption key={item.code} value={item.code}>{item.name}</SelectOption>
                ))}
              </SelectListbox>
            </Select>
            {errors.country && <HelperText id={`${id}-country-error`} error>{errors.country}</HelperText>}
          </div>
          <div style={field}>
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <TextField error={errors.name !== undefined}>
              <TextFieldInput
                id={`${id}-name`}
                name='name'
                autoComplete='shipping name'
                aria-invalid={errors.name !== undefined}
                aria-describedby={describe('name')}
                onChange={() => clearError('name')}
              />
            </TextField>
            {errors.name && <HelperText id={`${id}-name-error`} error>{errors.name}</HelperText>}
          </div>
          <div style={field}>
            <Label htmlFor={`${id}-address`}>Address</Label>
            <TextField error={errors.address !== undefined}>
              <TextFieldInput
                id={`${id}-address`}
                name='address'
                autoComplete='shipping address-line1'
                aria-invalid={errors.address !== undefined}
                aria-describedby={describe('address')}
                onChange={() => clearError('address')}
              />
            </TextField>
            {errors.address && <HelperText id={`${id}-address-error`} error>{errors.address}</HelperText>}
          </div>
          <div style={field}>
            <Label htmlFor={`${id}-apartment`}>Apartment, suite (optional)</Label>
            <TextField>
              <TextFieldInput id={`${id}-apartment`} name='apartment' autoComplete='shipping address-line2' />
            </TextField>
          </div>
          <div style={columns}>
            <div style={field}>
              <Label htmlFor={`${id}-city`}>City</Label>
              <TextField error={errors.city !== undefined}>
                <TextFieldInput
                  id={`${id}-city`}
                  name='city'
                  autoComplete='shipping address-level2'
                  aria-invalid={errors.city !== undefined}
                  aria-describedby={describe('city')}
                  onChange={() => clearError('city')}
                />
              </TextField>
              {errors.city && <HelperText id={`${id}-city-error`} error>{errors.city}</HelperText>}
            </div>
            <div style={field}>
              <Label htmlFor={`${id}-postal`}>Postal code</Label>
              <TextField error={errors.postal !== undefined}>
                <TextFieldInput
                  id={`${id}-postal`}
                  name='postal'
                  autoComplete='shipping postal-code'
                  aria-invalid={errors.postal !== undefined}
                  aria-describedby={describe('postal')}
                  onChange={() => clearError('postal')}
                />
              </TextField>
              {errors.postal && <HelperText id={`${id}-postal-error`} error>{errors.postal}</HelperText>}
            </div>
          </div>
        </Fieldset>

        <Fieldset style={{ gap: 'var(--spacing-4)' }}>
          <FieldsetLegend style={legend}>Shipping method</FieldsetLegend>
          {shippingOptions.map((option) => (
            <label
              key={option.value}
              htmlFor={`${id}-${option.value}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-6)',
                padding: 'var(--spacing-7) var(--spacing-8)',
                border: '1px solid',
                borderColor: shipping === option.value ? 'var(--color-primary-500)' : 'var(--separator-opaque)',
                borderRadius: 'var(--radius-4)',
                background: 'var(--surface-primary)',
                cursor: 'pointer',
              }}
            >
              <Radio
                id={`${id}-${option.value}`}
                name='shipping'
                value={option.value}
                checked={shipping === option.value}
                aria-describedby={`${id}-${option.value}-eta`}
                onChange={() => setShipping(option.value)}
                style={{ flexShrink: 0 }}
              />
              <span style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
                <Text size={3} fontWeight={500}>{option.title}</Text>
                <Text id={`${id}-${option.value}-eta`} size={2} style={{ color: 'var(--label-secondary)' }}>{option.eta}</Text>
              </span>
              <Text size={3} fontWeight={500} style={{ ...amount, marginInlineStart: 'auto' }}>
                {option.price === 0 ? 'Free' : currency.format(option.price)}
              </Text>
            </label>
          ))}
        </Fieldset>
      </div>

      <Card style={{ alignItems: 'stretch', gap: 'var(--spacing-10)', flex: '1 1 300px', minWidth: 0 }} aria-labelledby={`${id}-summary`}>
        <Heading id={`${id}-summary`} as='h2' size={4} fontWeight={600}>Order summary</Heading>
        <Table fullWidth style={{ borderStyle: 'hidden' }}>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>
                  <span style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
                    <Text size={2} fontWeight={500}>{item.name}</Text>
                    <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`${item.variant} · Qty ${item.quantity}`}</Text>
                  </span>
                </TableHeading>
                <TableData dataAlign='end' style={amount}>{currency.format(item.quantity * item.price)}</TableData>
              </TableRow>
            ))}
          </TableBody>
          <TableFoot>
            <TableRow>
              <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>Subtotal</TableHeading>
              <TableData dataAlign='end' style={amount}>{currency.format(subtotal)}</TableData>
            </TableRow>
            <TableRow>
              <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>Shipping</TableHeading>
              <TableData dataAlign='end' style={amount}>{delivery === 0 ? 'Free' : currency.format(delivery)}</TableData>
            </TableRow>
            <TableRow>
              <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400 }}>Estimated tax</TableHeading>
              <TableData dataAlign='end' style={amount}>{currency.format(tax)}</TableData>
            </TableRow>
            <TableRow>
              <TableHeading scope='row' dataAlign='start'>Total</TableHeading>
              <TableData dataAlign='end' aria-live='polite' style={{ ...amount, fontWeight: 600 }}>{currency.format(total)}</TableData>
            </TableRow>
          </TableFoot>
        </Table>
        <Button type='submit' size='sm' fullWidth>{`Pay ${currency.format(total)}`}</Button>
        <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>You won’t be charged until the order ships.</Text>
      </Card>
    </form>
  );
}
