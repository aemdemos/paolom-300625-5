/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the prompt
  const headerRow = ['Table (striped, bordered, tableStripedBordered29)'];

  // Defensive: look for the anchor with class 'button' as the main content
  const link = element.querySelector('a.button');
  if (!link) return;

  // Reference the anchor directly (it contains both the text and the icon)
  const tableRows = [
    headerRow,
    [link]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}