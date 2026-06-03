import type { Metadata } from 'next';
import { JobDetailPage } from '@/components/site/JobDetailPage';
import { getJob } from '@/lib/jobs';

export const revalidate = 300;

export async function generateMetadata({ params: { slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const job = await getJob(slug);
  return { title: job?.title ?? 'Not found' };
}

export default function Page({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  return <JobDetailPage slug={slug} locale={locale} />;
}
