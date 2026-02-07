import {
  PortableText as PortableTextReact,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 font-heading text-3xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 font-heading text-2xl font-semibold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 font-heading text-xl font-semibold">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value?.href}
          className="text-primary underline underline-offset-2 hover:no-underline"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    imageBlock: ({ value }) => {
      if (!value?.image?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value.image).width(800).url()}
            alt={value.alt || ""}
            width={800}
            height={450}
            className="h-auto w-full rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    callout: ({ value }) => {
      const toneStyles: Record<string, string> = {
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-100",
        warning:
          "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-100",
        success:
          "bg-green-50 border-green-200 text-green-900 dark:bg-green-950 dark:border-green-800 dark:text-green-100",
      };
      return (
        <aside
          className={cn(
            "my-6 rounded-lg border p-4",
            toneStyles[value.tone || "info"],
          )}
          role="note"
        >
          <p>{value.text}</p>
        </aside>
      );
    },
    ctaButton: ({ value }) => (
      <div className="my-6">
        <Button
          asChild
          variant={value.style === "secondary" ? "outline" : "default"}
        >
          <a href={value.url}>{value.text}</a>
        </Button>
      </div>
    ),
    videoEmbed: ({ value }) => {
      let embedUrl = value.url;
      if (embedUrl?.includes("youtube.com/watch")) {
        embedUrl = embedUrl.replace("watch?v=", "embed/");
      } else if (embedUrl?.includes("vimeo.com/")) {
        embedUrl = embedUrl.replace("vimeo.com/", "player.vimeo.com/video/");
      }
      return (
        <div className="my-8 aspect-video">
          <iframe
            src={embedUrl}
            title={value.title || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-lg"
          />
        </div>
      );
    },
  },
};

export function PortableText({
  value,
  className,
}: {
  value: any;
  className?: string;
}) {
  if (!value) return null;
  return (
    <div className={cn("portable-text", className)}>
      <PortableTextReact value={value} components={components} />
    </div>
  );
}
