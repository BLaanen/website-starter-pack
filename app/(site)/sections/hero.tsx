import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/primitives";

interface HeroProps {
  title?: string | null;
}

export function Hero({ title }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"
        aria-hidden="true"
      />
      <Container className="relative z-10 text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {title || "Welcome"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          A modern website built with Next.js and Sanity CMS. Edit this content
          in your Sanity Studio.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="#contact">Get Started</Link>
        </Button>
      </Container>
    </section>
  );
}
