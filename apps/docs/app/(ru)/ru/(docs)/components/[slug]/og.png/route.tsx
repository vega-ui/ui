import { getComponentImage, getImageParams } from '@/lib/socialImage';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = getImageParams;

export const GET = async (_request: Request, { params }: { params: Promise<{ slug: string }> }) => getComponentImage('ru', (await params).slug);
