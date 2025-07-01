/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate .sf_colsIn children with .deck-group (skip empty ones)
  const allCols = Array.from(element.querySelectorAll(':scope > div.sf_colsIn.page-content-onequarter-width'));
  const columns = allCols.filter(col => col.querySelector('.deck-group'));

  // Compose one row with all .deck-group elements as columns
  const contentRow = columns.map(col => col.querySelector('.deck-group'));

  // The header row should be a single cell (block name),
  // matching the markdown example (regardless of the number of columns below)
  const tableData = [
    ['Columns (columns39)'],
    contentRow
  ];

  // Create the table with the DOMUtils helper
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Manually set the header cell to span all content columns, if needed
  // (since createTable doesn't handle colspan for header row by default)
  const th = block.querySelector('th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  // Replace the original element
  element.replaceWith(block);
}
