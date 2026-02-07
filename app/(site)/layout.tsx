import { sanityFetch } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import Header from "@/components/Header";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: siteSettings } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        siteName={siteSettings?.siteName || "Website"}
        navigation={siteSettings?.navigation || []}
      />
      <main className="flex-1">{children}</main>
      {/* Footer will be added in 04-02 */}
    </div>
  );
}
