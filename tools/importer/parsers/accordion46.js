/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const headerRow = ['Accordion (accordion46)'];

  // We'll treat all meaningful content as one accordion item
  // Title: first <p> with text, Content: everything else
  const children = Array.from(element.childNodes);

  // Find the first non-empty <p> as the title
  let title = null;
  let titleIndex = -1;
  for (let i = 0; i < children.length; i++) {
    const node = children[i];
    if (node.nodeType === 1 && node.tagName === 'P' && node.textContent.trim()) {
      title = node;
      titleIndex = i;
      break;
    }
  }

  // If no <p> found, fallback to first non-empty text node
  if (!title) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      if (node.nodeType === 3 && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        title = span;
        titleIndex = i;
        break;
      }
    }
  }

  // Content is everything except the title
  let contentNodes = children.filter((_, i) => i !== titleIndex);

  // Filter out empty text nodes and <br> nodes from content
  contentNodes = contentNodes.filter(node => {
    if (node.nodeType === 3 && !node.textContent.trim()) return false;
    if (node.nodeType === 1 && node.tagName === 'BR') return false;
    return true;
  });

  // If there are still <br>s at boundaries, remove
  while (contentNodes.length && contentNodes[0].nodeType === 1 && contentNodes[0].tagName === 'BR') contentNodes.shift();
  while (contentNodes.length && contentNodes[contentNodes.length-1].nodeType === 1 && contentNodes[contentNodes.length-1].tagName === 'BR') contentNodes.pop();

  // If only one node remains, use it directly; if many, use them as array
  let contentCell;
  if (contentNodes.length === 1) {
    contentCell = contentNodes[0];
  } else if (contentNodes.length > 1) {
    contentCell = contentNodes;
  } else {
    contentCell = '';
  }

  // Compose cells array
  const cells = [
    headerRow,
    [title, contentCell]
  ];
  
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
