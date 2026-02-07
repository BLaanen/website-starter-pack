import { sanityFetch } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <Footer
        siteName={siteSettings?.siteName || "Website"}
        siteDescription={siteSettings?.siteDescription}
        navigation={siteSettings?.navigation}
        socialLinks={siteSettings?.socialLinks}
        footerText={siteSettings?.footerText}
      />
    </div>
  );
}
