/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header exactly as in the example
  const headerRow = ['Table (striped, bordered, tableStripedBordered45)'];

  // Find the 'ul.search-results' element which contains the error message
  const ul = element.querySelector('ul.search-results');
  let contentCell;
  if (ul) {
    // Reference the existing <ul> element, not just its text, to preserve structure
    contentCell = ul;
  } else {
    // Fallback: If ul is missing, display a generic error message
    contentCell = document.createTextNode('Something went wrong.');
  }

  // Compose the table structure: header + message row
  const cells = [
    headerRow,
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}