import { sanityFetch } from "@/sanity/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import { Hero } from "./sections/hero";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";

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
