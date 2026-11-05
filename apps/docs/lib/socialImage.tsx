import { ImageResponse } from 'next/og';
import { getComponents } from './content';
import { getDictionary, type Locale } from './i18n';
import { OG_SIZE, SITE_NAME, SITE_URL } from './site';

const glow = [
  'radial-gradient(circle at 16% 24%, rgba(90, 55, 209, 0.7), transparent 46%)',
  'radial-gradient(circle at 88% 14%, rgba(0, 140, 183, 0.55), transparent 42%)',
  'radial-gradient(circle at 56% -8%, rgba(163, 43, 158, 0.45), transparent 40%)',
].join(', ');

interface OgImageProps {
  eyebrow?: string
  title: string
  muted?: string
  text: string
}

const renderOgImage = ({ eyebrow, title, muted, text }: OgImageProps) => new ImageResponse(
  (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '72px 80px', background: '#0a0a0a', backgroundImage: glow, color: '#f5f5f5' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, backgroundImage: 'linear-gradient(135deg, #58b0ff, #0083ff 55%, #2f5bff)', border: '2px solid rgba(255, 255, 255, 0.25)' }} />
        <div style={{ fontSize: 38, letterSpacing: '-0.02em' }}>{SITE_NAME}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        {eyebrow && <div style={{ fontSize: 28, color: '#a1a1a1', marginBottom: 16 }}>{eyebrow}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: muted ? 76 : 104, lineHeight: 1.05, letterSpacing: '-0.035em' }}>
          <div>{title}</div>
          {muted && <div style={{ color: '#a1a1a1' }}>{muted}</div>}
        </div>
        <div style={{ display: 'block', lineClamp: 3, fontSize: 32, lineHeight: 1.4, color: '#a1a1a1', marginTop: 28, maxWidth: 980 }}>{text}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#737373', marginTop: 44 }}>{SITE_URL.replace(/^https?:\/\//, '')}</div>
    </div>
  ),
  OG_SIZE,
);

export const getHomeImage = (locale: Locale) => {
  const t = getDictionary(locale).home;

  return renderOgImage({ title: 'Vega UI', muted: t.tagline, text: t.lead });
};

export const getComponentImage = (locale: Locale, slug: string) => {
  const t = getDictionary(locale);
  const component = getComponents(locale).find((entry) => entry.slug === slug);

  if (!component) return getHomeImage(locale);

  return renderOgImage({
    eyebrow: `${t.categories[component.category] ?? component.category} · ${t.meta.component}`,
    title: component.title,
    text: component.summary,
  });
};

export const getImageParams = () => getComponents().map(({ slug }) => ({ slug }));
