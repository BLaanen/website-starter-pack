import type { Metadata } from 'next';
import { sanityFetch } from "@/sanity/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({ type: 'siteSettings' });
}

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });

  return (
    <>
      <Hero title={data?.title} />
      {data?.body && <About content={data.body} />}
      <Contact />
    </>
  );
}
