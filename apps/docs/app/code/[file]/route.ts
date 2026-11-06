import { codeKey, isPartial } from '@/lib/code';
import { getComponentPage, getComponents } from '@/lib/content';
import { getHighlightStyles, highlight, readExamples } from '@/lib/highlight';
import { LOCALES } from '@/lib/i18n';
import { getPreviewSource } from '@/lib/previewSource';

export const dynamic = 'force-static';

const getPartialCode = () => {
  const examples = LOCALES.flatMap((locale) => getComponents(locale).flatMap((component) => component.pages.flatMap((page) => readExamples(getComponentPage(component.slug, page, locale).source))));
  const previews = getComponents().flatMap((component) => {
    const code = getPreviewSource(component.slug);

    return code ? [{ code, language: 'tsx' }] : [];
  });

  return new Map([...examples, ...previews].filter((fence) => isPartial(fence.code)).map((fence) => [`${codeKey(fence.code)}.html`, fence]));
};

export const generateStaticParams = () => [...getPartialCode().keys()].map((file) => ({ file }));

export const GET = async (_request: Request, { params }: { params: Promise<{ file: string }> }) => {
  const fence = getPartialCode().get((await params).file);
  if (!fence) return new Response(null, { status: 404 });

  const html = await highlight(fence.code, fence.language);

  return new Response(`<style>${getHighlightStyles([html])}</style>${html}`, { headers: { 'content-type': 'text/html; charset=utf-8' } });
};
