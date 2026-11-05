import { Icon, IconButton } from '@vega-ui/react';
import { BookOpenIcon, LifeBuoyIcon, RssIcon } from '@vega-ui/icons';

const links = [
  { href: '/docs', label: 'Documentation', icon: <BookOpenIcon /> },
  { href: '/support', label: 'Help center', icon: <LifeBuoyIcon /> },
  { href: '/blog/rss.xml', label: 'Blog RSS feed', icon: <RssIcon /> },
];

export default function NavigationalIconSurface() {
  return (
    <nav aria-label='Resources'>
      <ul style={{ display: 'flex', gap: 'var(--spacing-4)', margin: 0, padding: 0, listStyle: 'none' }}>
        {links.map((link) => (
          <li key={link.href}>
            <IconButton asChild variant='secondary' appearance='ghost'>
              <a href={link.href} aria-label={link.label}>
                <Icon>{link.icon}</Icon>
              </a>
            </IconButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
