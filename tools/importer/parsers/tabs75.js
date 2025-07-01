/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table rows for Tabs (tabs75)
  // Header row: single cell
  const cells = [
    ['Tabs (tabs75)'],
  ];

  // Find all direct children that represent tabs
  const children = element.querySelectorAll(':scope > div');

  // For this HTML, each tab content is a div with 'collapse-title' class
  // Each one is a label, with no extra content
  for (const child of children) {
    if (child.classList.contains('collapse-title')) {
      // Each tab row: [Tab Label, Tab Content]
      // In this HTML there is only the tab label, so content cell is empty
      cells.push([
        child.textContent.trim(),
        ''
      ]);
    }
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
