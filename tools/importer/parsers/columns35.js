/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell, matching the example
  const headerRow = ['Columns (columns35)'];

  // Find the image (the map background)
  const img = element.querySelector('img');

  // Find all column divs
  const columnsContainer = element.querySelector('.countries-list__links');
  const columnDivs = columnsContainer ? Array.from(columnsContainer.querySelectorAll(':scope > .countries-list__column')) : [];

  // If the image exists, it should be visually above the three columns (see screenshot)
  // Per block rules: place image along with the columns in the first column cell
  // But for a three-column layout, put just the three country columns as columns
  // Per rules: do NOT make header span 3 columns—header must be a single cell

  // Prepare columns row: each cell is a column
  const columnsRow = columnDivs;

  // Compose the table as per the correct block structure
  const tableData = [
    headerRow,        // first row: one cell (header)
    columnsRow        // second row: N cells (columns)
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace original element
  element.replaceWith(block);
}
