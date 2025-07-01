/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare all child nodes (including text and elements)
  const content = Array.from(element.childNodes).filter(node => {
    // Include non-empty text nodes and all element nodes
    return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  });

  // Compose the table: header row (block name), then a single cell with all original content
  const cells = [
    ['Embed (embedVideo72)'],
    [content.length === 1 ? content[0] : content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
