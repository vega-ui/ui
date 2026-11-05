import { FormEvent, useState } from 'react';
import {
  Button,
  HelperText,
  Label,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
} from '@vega-ui/react';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function RequiredVisibleChoiceWithoutASelection() {
  const [invalid, setInvalid] = useState(false);
  const [added, setAdded] = useState('');

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.value === sizes[0]) {
      event.currentTarget.focus();
    }
    setInvalid(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setAdded(`Size ${data.get('size')} added to the cart.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label id='size-label'>Size</Label>
        <SegmentedControl
          name='size'
          role='radiogroup'
          aria-labelledby='size-label'
          aria-describedby={invalid ? 'size-error' : undefined}
          onChange={() => setInvalid(false)}
        >
          {sizes.map((size) => (
            <SegmentedControlItem key={size} value={size}>
              <SegmentedControlItemInput
                required
                aria-invalid={invalid}
                onInvalid={handleInvalid}
              />
              {size}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
        {invalid && <HelperText id='size-error' error>Choose a size to add the jacket to the cart.</HelperText>}
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'start' }}>
        <Button type='submit'>Add to cart</Button>
        {added && <HelperText aria-live='polite'>{added}</HelperText>}
      </div>
    </form>
  );
}
