import { getLlmsText, TEXT_HEADERS } from '@/lib/llms';

export const dynamic = 'force-static';

export const GET = () => new Response(getLlmsText(), { headers: TEXT_HEADERS });
