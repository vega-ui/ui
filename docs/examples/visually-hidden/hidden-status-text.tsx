import { Button, Icon, VisuallyHidden } from '@vega-ui/react';
import { ShoppingCartIcon } from '@vega-ui/icons';
import { useState } from 'react';

const products = ['Linen shirt', 'Canvas tote', 'Wool socks'];

export default function HiddenStatusText() {
  const [cart, setCart] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');

  const add = (product: string) => {
    const next = [...cart, product];
    setCart(next);
    setAnnouncement(`${product} added. Cart has ${next.length} items.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)' }}>
        {products.map((product) => (
          <Button key={product} type='button' size='sm' variant='secondary' appearance='ghost' onClick={() => add(product)}>
            Add {product}
          </Button>
        ))}
      </div>
      <span aria-hidden='true' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontVariantNumeric: 'tabular-nums' }}>
        <Icon size='sm'><ShoppingCartIcon /></Icon>
        {cart.length}
      </span>
      <VisuallyHidden asChild>
        <p role='status'>{announcement}</p>
      </VisuallyHidden>
    </div>
  );
}
