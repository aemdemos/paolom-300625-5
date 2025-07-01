/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row of columns
  const row = element.querySelector('.row');
  if (!row) return;
  const cols = Array.from(row.children);
  if (cols.length === 0) return;

  // Compose header row with exactly one cell as required
  const headerRow = ['Columns (columns9)'];

  // Compose content row: as many cells as columns
  const contentRow = cols.map(col => {
    const card = col.querySelector('a.feedback-card');
    return card ? card : '';
  });

  // Compose table rows: header and content
  const rows = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // After table creation, set the th in the first row to span all columns visually
  const th = table.querySelector('tr:first-child th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  // Replace original element with the block table
  element.replaceWith(table);
}
