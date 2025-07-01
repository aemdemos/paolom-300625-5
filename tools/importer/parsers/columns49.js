/* global WebImporter */
export default function parse(element, { document }) {
  // Define a single-cell header row as per requirement
  const headerRow = ['Columns (columns49)'];

  // Find the row containing the columns
  const row = element.querySelector('.row');

  // Defensive: if there's no .row, output an empty block
  if (!row) {
    const block = WebImporter.DOMUtils.createTable([headerRow, ['']], document);
    element.replaceWith(block);
    return;
  }

  // Get all immediate column elements
  const columns = Array.from(row.children).filter(div => div.classList.contains('col-md-4'));

  // Defensive: if no columns, output an empty block
  if (!columns.length) {
    const block = WebImporter.DOMUtils.createTable([headerRow, ['']], document);
    element.replaceWith(block);
    return;
  }

  // Build each column's content
  const cells = columns.map(col => {
    const card = col.querySelector('a.feedback-card');
    if (!card) return '';
    // Compose cell contents
    const parts = [];
    const imageDiv = card.querySelector('.card-image');
    if (imageDiv && imageDiv.firstElementChild) {
      parts.push(imageDiv.firstElementChild);
    }
    const titleDiv = card.querySelector('.card-title');
    if (titleDiv && titleDiv.textContent.trim()) {
      parts.push(titleDiv);
    }
    return parts.length === 1 ? parts[0] : parts;
  });

  // The table must have a single-cell header row, then a row with N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells // this is a single array of N columns (cells)
  ], document);

  element.replaceWith(table);
}
