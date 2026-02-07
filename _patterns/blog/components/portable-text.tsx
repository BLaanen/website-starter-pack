// Self-contained Portable Text renderer for the blog pattern.
// Only imports from npm packages -- no @/ paths.

import {
  PortableText as BasePortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from '@portabletext/react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      // TODO: Wire up your project's image URL builder here.
      // Example with next/image:
      //   import Image from 'next/image';
      //   const src = urlFor(value).width(800).url();
      //   return <Image src={src} alt={value.alt || ''} width={800} height={450} />;
      return (
        <figure className="my-8">
          <img
            src={value.asset?._ref || ''}
            alt={value.alt || ''}
            className="w-full rounded-lg"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <pre
        data-language={value.language}
        className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
      >
        <code>{value.code}</code>
      </pre>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          target={isExternal ? '_blank' : undefined}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
};

export function PortableText(props: Omit<PortableTextProps, 'components'>) {
  return <BasePortableText {...props} components={components} />;
}
