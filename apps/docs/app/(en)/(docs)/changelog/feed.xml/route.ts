import { getChangelogFeed } from '@/lib/feed';

export const dynamic = 'force-static';

export const GET = () => new Response(getChangelogFeed(), { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
