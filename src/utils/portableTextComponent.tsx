import { PortableTextMarkComponentProps } from '@portabletext/react';

export const portableTextComponents = {
  marks: {
    link: ({ value, children }: PortableTextMarkComponentProps<any>) => {
      const href = value?.href;

      // Fallback safely
      if (!href) return <>{children}</>;

      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};
