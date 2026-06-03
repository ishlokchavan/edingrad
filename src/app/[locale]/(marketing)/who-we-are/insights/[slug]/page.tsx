import type { Metadata } from 'next';
import { PostDetailPage } from '@/components/site/PostDetailPage';
import { getPost } from '@/lib/content';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const post = await getPost('insight', slug);
  return { title: post?.title ?? 'Not found' };
}

export default function Page({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  return <PostDetailPage section="insights" type="insight" slug={slug} locale={locale} />;
}
