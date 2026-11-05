import { Avatar, AvatarFallback, AvatarImage } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(210);

export default function MinimalComposition() {
  return (
    <Avatar role='img' aria-label='Jane Doe'>
      <AvatarImage src={photo} alt='' />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
