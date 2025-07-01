/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Accordion block - single column
  const headerRow = ['Accordion (accordion14)'];
  const rows = [headerRow];

  // The accordion pairs: title and content, as two columns per row
  // Children are expected to appear in pairs (title, content)
  const children = Array.from(element.children);
  let i = 0;
  while (i < children.length) {
    // Title div
    const titleDiv = children[i].querySelector('.collapse-title, .accordion');
    // Content div (next sibling)
    const contentDiv = (children[i + 1] && children[i + 1].classList.contains('collapse-content')) ? children[i + 1] : null;
    if (titleDiv && contentDiv) {
      rows.push([titleDiv, contentDiv]);
      i += 2;
    } else {
      i++;
    }
  }

  // Only create the table if there are rows to display
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
