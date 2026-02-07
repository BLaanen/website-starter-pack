import { Container } from "@/components/primitives";
import { PortableText } from "@/components/portable-text";

interface AboutProps {
  content?: any;
}

export function About({ content }: AboutProps) {
  if (!content) return null;
  return (
    <section className="py-16 md:py-24">
      <Container width="narrow">
        <PortableText value={content} />
      </Container>
    </section>
  );
}
