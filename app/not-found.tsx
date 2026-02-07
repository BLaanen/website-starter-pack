import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-xl">Page not found</h2>
      <Link href="/" className="text-primary underline hover:no-underline">
        Return to homepage
      </Link>
    </div>
  );
}
