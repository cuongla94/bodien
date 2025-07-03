import { JSDOM } from 'jsdom'; // if you're doing this server-side

export function convertHtmlToPortableText(html: string): any[] {
  const dom = new JSDOM(`<body>${html}</body>`);
  const body = dom.window.document.body;
  const blocks: any[] = [];

  body.childNodes.forEach((node, blockIndex) => {
    const block = {
      _type: 'block',
      _key: `b${blockIndex}`,
      style: getBlockStyle(node),
      children: parseChildren(node),
      markDefs: [],
    };
    if (block.children.length > 0) blocks.push(block);
  });

  return blocks;
}

function getBlockStyle(node: any): string {
  if (node.nodeName === 'H1') return 'h1';
  if (node.nodeName === 'H2') return 'h2';
  if (node.nodeName === 'H3') return 'h3';
  if (node.nodeName === 'BLOCKQUOTE') return 'blockquote';
  return 'normal';
}

function parseChildren(node: any): any[] {
  const children: any[] = [];
  node.childNodes?.forEach((childNode, i) => {
    if (childNode.nodeType === 3) {
      // text node
      children.push({
        _type: 'span',
        _key: `s${i}`,
        text: childNode.nodeValue,
        marks: [],
      });
    } else if (childNode.nodeName === 'STRONG' || childNode.nodeName === 'B') {
      children.push({
        _type: 'span',
        _key: `s${i}`,
        text: childNode.textContent,
        marks: ['strong'],
      });
    } else if (childNode.nodeName === 'EM' || childNode.nodeName === 'I') {
      children.push({
        _type: 'span',
        _key: `s${i}`,
        text: childNode.textContent,
        marks: ['em'],
      });
    } else {
      // fallback
      children.push({
        _type: 'span',
        _key: `s${i}`,
        text: childNode.textContent || '',
        marks: [],
      });
    }
  });
  return children;
}
