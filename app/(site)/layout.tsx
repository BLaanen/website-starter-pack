export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header will be added in Phase 4 */}
      <main>{children}</main>
      {/* Footer will be added in Phase 4 */}
    </>
  );
}
