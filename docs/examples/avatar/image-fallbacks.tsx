import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(150);
const placeholder = portrait(220);
const broken = 'data:image/png;base64,broken';

const cases = [
  { label: 'Image loads', name: 'Priya Nair', initials: 'PN', src: photo, fallbackSrc: undefined },
  { label: 'Image fails → initials', name: 'Diego Alvarez', initials: 'DA', src: broken, fallbackSrc: undefined },
  { label: 'Image fails → fallbackSrc', name: 'Sara Lindqvist', initials: 'SL', src: broken, fallbackSrc: placeholder },
];

export default function ImageFallbacks() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-8)', width: '100%' }}>
      {cases.map((item) => (
        <figure key={item.label} style={{ margin: 0, display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'center', alignContent: 'start', textAlign: 'center' }}>
          <Avatar size='lg' role='img' aria-label={item.name}>
            <AvatarImage src={item.src} fallbackSrc={item.fallbackSrc} alt='' />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <figcaption><Text size={1} style={{ color: 'var(--label-secondary)' }}>{item.label}</Text></figcaption>
        </figure>
      ))}
    </div>
  );
}
