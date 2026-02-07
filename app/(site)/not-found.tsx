import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container width="narrow">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="font-heading text-8xl font-bold text-muted-foreground/30">
          404
        </h1>
        <h2 className="font-heading text-2xl font-semibold">Page not found</h2>
        <p className="max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return to homepage</Link>
        </Button>
      </div>
    </Container>
  );
}
