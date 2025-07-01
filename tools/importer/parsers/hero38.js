/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the example
  const headerRow = ['Hero (hero38)'];
  // Second row: background image (none in input)
  const imageRow = [''];
  // Third row: all content from the element, preserving all text and children
  let contentCell;
  if (element.childNodes.length > 0) {
    // If there are child nodes, include them all to retain all text and markup
    contentCell = Array.from(element.childNodes);
  } else {
    // If the element is just text, use its textContent
    contentCell = [element.textContent];
  }
  const contentRow = [contentCell];
  // Compose block cells array
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
