import { Text, VisuallyHidden } from '@vega-ui/react';

const reviews = [
  { author: 'Maria K.', rating: 5, text: 'Arrived in two days, fits perfectly.' },
  { author: 'Tom B.', rating: 3, text: 'Good fabric, but the sleeves run long.' },
];

export default function SlottedHiddenElement() {
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', width: '100%', margin: 0, padding: 0, listStyle: 'none' }}>
      {reviews.map((review) => (
        <li key={review.author} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
          <Text size={3} fontWeight={500}>{review.author}</Text>
          <p style={{ margin: 0 }}>
            <span aria-hidden='true' style={{ color: 'var(--color-primary-500)', letterSpacing: 'var(--spacing-1)' }}>
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </span>
            <VisuallyHidden asChild>
              <span>Rated {review.rating} out of 5</span>
            </VisuallyHidden>
          </p>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>{review.text}</Text>
        </li>
      ))}
    </ul>
  );
}
