import { getLlmsFullText, TEXT_HEADERS } from '@/lib/llms';

export const dynamic = 'force-static';

export const GET = () => new Response(getLlmsFullText(), { headers: TEXT_HEADERS });
