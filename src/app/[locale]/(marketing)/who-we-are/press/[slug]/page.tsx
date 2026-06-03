import type { Metadata } from 'next';
import { PostDetailPage } from '@/components/site/PostDetailPage';
import { getPost } from '@/lib/content';

export const revalidate = 300;

export async function generateMetadata({ params: { slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const post = await getPost('press', slug);
  return { title: post?.title ?? 'Not found' };
}

export default function Page({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  return <PostDetailPage section="press" type="press" slug={slug} locale={locale} />;
}
