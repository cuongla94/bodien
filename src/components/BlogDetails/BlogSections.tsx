import { useEffect, useState } from 'react';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from 'utils/portableTextComponent';

type BlogSection = {
  _type: string;
  _key: string;
  content?: any;
  name?: string;
  description?: string;
};

type Props = {
  sections: BlogSection[];
};

export default function BlogSections({ sections }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      {sections.map((section) => {
        if (section._type === 'content') {
          return (
            <div key={section._key} className="mb-4">
              <PortableText value={section.content} components={portableTextComponents} />
            </div>
          );
        }

        if (section._type === 'product') {
          return (
            <div key={section._key} className="mb-4">
              <h4>{section.name}</h4>
              <p>{section.description}</p>
            </div>
          );
        }

        return null;
      })}
    </>
  );
}
