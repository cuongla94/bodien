import { PortableTextComponents } from '@portabletext/react';

export const portableTextComponents: PortableTextComponents = {
  types: {
    block: ({ value }) => {
      // Get the plain text from the first child span
      const text = value?.children?.[0]?.text;

      // If it starts like HTML, render it as raw HTML
      if (typeof text === 'string' && /<\/?[a-z][\s\S]*>/i.test(text)) {
        return <div dangerouslySetInnerHTML={{ __html: text }} />;
      }

      // Fallback to plain text
      return <p>{text}</p>;
    },
  },
};
