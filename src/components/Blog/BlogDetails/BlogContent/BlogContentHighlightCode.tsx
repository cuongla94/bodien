import highlight from 'highlight.js';
import { useEffect, useRef } from 'react';

export const BlogContentHighlightCode = ({ children, language }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      highlight.highlightElement(codeRef.current);
    }
  }, []);

  return (
    <pre>
      <code
        ref={codeRef}
        className={language}>
        {children}
      </code>
    </pre>
  );
};
