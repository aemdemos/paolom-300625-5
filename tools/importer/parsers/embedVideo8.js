/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Embed (embedVideo8)'];

  // The example requires all visible text ("Documents Required") and the info icon (the image in .tooltip-group) in a single cell.
  // We want to preserve formatting and any icons, so we'll assemble the cell from the visible accordion bar.

  // The bar is always the immediate child .collapse-title
  const titleBar = element.querySelector('.collapse-title') || element;
  const cellContent = [];

  // Collect all nodes inside the title bar, preserving order and formatting
  titleBar.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      cellContent.push(document.createTextNode(node.textContent.replace(/\s+/g, ' ')));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      cellContent.push(node);
    }
  });

  // The info icon image may be inside a nested .tooltip-group span/img
  // It's already included above if it's a child, but if not, look for it
  if (!cellContent.some(n => n.tagName === 'IMG')) {
    const infoIcon = titleBar.querySelector('img');
    if (infoIcon) cellContent.push(infoIcon);
  }

  // Remove any empty nodes from the array
  const filteredContent = cellContent.filter(
    n => !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim())
  );

  // Compose the table rows
  const cells = [
    headerRow,
    [filteredContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
