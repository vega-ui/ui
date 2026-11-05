import { getComponentIndexMarkdownParams, getComponentMarkdown } from '@/lib/llms';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = getComponentIndexMarkdownParams;

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => getComponentMarkdown('en', (await params).slug);
