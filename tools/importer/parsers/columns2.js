/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child '.item' elements
  const items = Array.from(element.querySelectorAll(':scope > .item'));

  // For each item, combine its content into a single div for its column
  const columns = items.map((item) => {
    const cellDiv = document.createElement('div');
    // Append image, subtitle, and description preserving order and structure
    const img = item.querySelector('img');
    if (img) cellDiv.appendChild(img);
    const subtitle = item.querySelector('.subtitle');
    if (subtitle) cellDiv.appendChild(subtitle);
    const description = item.querySelector('.description');
    if (description) cellDiv.appendChild(description);
    return cellDiv;
  });
  if (columns.length === 0) return;
  // Ensure header row is a single cell spanning all columns
  const cells = [
    ['Columns (columns2)'], // Correct: one header cell only
    columns                // Second row: one cell per column
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
