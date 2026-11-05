import { getView } from './views';

const REPOSITORY = 'https://github.com/vega-ui/ui/blob/main/';

export const resolveHref = (href: string, locale: string, slug?: string, base = slug ? `docs/${locale}/components/${slug}/` : `docs/${locale}/`) => {
  if (/^(https?:|mailto:|#|\/)/.test(href)) return href;

  const [path, hash = ''] = href.split('#');
  const anchor = hash ? `#${hash}` : '';
  const target = new URL(path, `https://repo/${base}`).pathname.slice(1);

  const component = target.match(/^docs\/[a-z]{2}\/components\/([a-z-]+)\/(?:([a-z-]+)\.md)?$/);
  if (component) {
    const file = component[2] ?? 'index';
    const view = getView(file);
    const section = anchor || (file === view ? '' : `#${file}`);

    return `/components/${component[1]}/${view === 'index' ? '' : `${view}/`}${section}`;
  }

  const guide = target.match(/^docs\/[a-z]{2}\/([a-z0-9-]+(?:\/[a-z0-9-]+)?)(?:\/README)?\.md$/);
  if (guide && !guide[1].startsWith('components')) return `/docs/${guide[1]}/${anchor}`;

  return `${REPOSITORY}${target}${anchor}`;
};
