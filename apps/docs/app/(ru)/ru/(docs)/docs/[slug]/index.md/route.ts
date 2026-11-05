import { getGuideMarkdown, getGuideMarkdownParams } from '@/lib/llms';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = () => getGuideMarkdownParams(1);

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => getGuideMarkdown('ru', (await params).slug);
