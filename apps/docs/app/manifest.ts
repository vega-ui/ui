import type { MetadataRoute } from 'next';
import { getDictionary } from '@/lib/i18n';
import { SITE_NAME, THEME_COLOR } from '@/lib/site';

export const dynamic = 'force-static';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: getDictionary('en').meta.description,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: 'browser',
    background_color: THEME_COLOR,
    theme_color: THEME_COLOR,
    icons: [
      { src: `${basePath}/icon.svg`, sizes: 'any', type: 'image/svg+xml' },
      { src: `${basePath}/apple-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  };
}
