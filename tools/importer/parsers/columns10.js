/* global WebImporter */
export default function parse(element, { document }) {
  // Find all details rows, each representing a row in the columns block
  const detailRows = Array.from(element.querySelectorAll(':scope > .details'));

  // Determine the number of columns by looking at the first detail row
  let columnsCount = 0;
  if (detailRows.length > 0) {
    columnsCount = detailRows[0].querySelectorAll(':scope > .table-cell').length;
  }
  if (!columnsCount) columnsCount = 1;

  // Header row: one cell, block name (must be a single cell array)
  const headerRow = ['Columns (columns10)'];

  // All data rows must have the correct number of columns
  const tableRows = detailRows.map(details => {
    const cells = Array.from(details.querySelectorAll(':scope > .table-cell'));
    // For each cell, use the .gradient-border if present, else the cell itself
    return cells.map(cell => {
      const gradient = cell.querySelector(':scope > .gradient-border');
      if (gradient) return gradient;
      return cell;
    });
  });

  // Compose table: header row as single column, content rows with N columns
  const tableData = [headerRow, ...tableRows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
