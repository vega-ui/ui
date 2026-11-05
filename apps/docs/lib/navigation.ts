import type { SidebarSection } from '@/components/Sidebar';
import { getCategories } from './content';
import { getGuides, type GuideSection } from './guides';
import { getDictionary, localize, type Locale } from './i18n';

export const getSidebar = (locale: Locale): SidebarSection[] => {
  const t = getDictionary(locale);
  const guides = getGuides(locale);
  const links = (section: GuideSection) => guides
    .filter((guide) => guide.section === section)
    .map((guide) => ({ href: localize(locale, guide.href), label: guide.title, exact: true }));

  return [
    {
      title: t.sidebar.start,
      links: [
        { href: localize(locale, '/docs/getting-started/'), label: t.sidebar.installation },
        { href: localize(locale, '/components/'), label: t.sidebar.all, exact: true },
        { href: localize(locale, '/changelog/'), label: t.changelog.title },
      ],
    },
    { title: t.sidebar.guides, links: [...links('guides'), { href: localize(locale, '/docs/theme/'), label: t.themeEditor.title, exact: true }] },
    { title: t.sidebar.families, links: links('families') },
    ...getCategories().map((category) => ({
      title: t.categories[category.name] ?? category.name,
      links: category.components.map((component) => ({ href: localize(locale, `/components/${component.slug}/`), label: component.title })),
    })),
  ];
};
