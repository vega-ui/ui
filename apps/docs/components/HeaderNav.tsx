'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { localize } from '@/lib/i18n';
import { useDictionary, useLocale } from './LocaleProvider';

export const HeaderNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useDictionary();
  const links = [
    { section: localize(locale, '/docs/'), href: localize(locale, '/docs/getting-started/'), label: t.nav.docs },
    { section: localize(locale, '/components/'), href: localize(locale, '/components/'), label: t.nav.components },
    { section: localize(locale, '/templates/'), href: localize(locale, '/templates/'), label: t.nav.templates },
  ];

  const current = (link: typeof links[number]) => {
    if (pathname === link.href) return 'page';
    if (pathname.startsWith(link.section)) return 'true';

    return undefined;
  };

  return (
    <nav aria-label={t.nav.main} className={className}>
      {links.map((link) => (
        <NextLink key={link.href} href={link.href} aria-current={current(link)}>
          {link.label}
        </NextLink>
      ))}
      <a href={`${process.env.NEXT_PUBLIC_BASE_PATH}/storybook/`}>{t.nav.storybook}</a>
    </nav>
  );
};
