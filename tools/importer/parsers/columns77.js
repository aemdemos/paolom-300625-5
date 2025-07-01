/* global WebImporter */
export default function parse(element, { document }) {
  // The header must be a single cell
  const headerRow = ['Columns (columns77)'];

  // Gather the columns (col-md-4 wrappers)
  const cols = Array.from(element.querySelectorAll(':scope > .col-md-4'));

  // Defensive fallback if no columns found
  if (cols.length === 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(table);
    return;
  }

  // Each column: just use the <a class="feedback-card"> as-is (removing style)
  const columnCells = cols.map(col => {
    const link = col.querySelector('a.feedback-card');
    if (link) link.removeAttribute('style');
    return link || '';
  });

  // Compose table rows: single header cell row, then row of columns
  const rows = [
    headerRow,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
