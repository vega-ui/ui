import { getComponentMarkdown, getComponentMarkdownParams } from '@/lib/llms';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = getComponentMarkdownParams;

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string, page: string }> }) => {
  const { slug, page } = await params;

  return getComponentMarkdown('en', slug, page);
};
