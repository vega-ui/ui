import { getGuideMarkdown, getGuideMarkdownParams } from '@/lib/llms';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = () => getGuideMarkdownParams(2);

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string, page: string }> }) => {
  const { slug, page } = await params;

  return getGuideMarkdown('en', `${slug}/${page}`);
};
