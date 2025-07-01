/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Build header row
  const headerRow = ['Columns (columns5)'];

  // 2. Get all direct children div.item
  const items = Array.from(element.querySelectorAll(':scope > .item'));

  // 3. For each item, extract img and the .red-lay > p (text)
  //    Reference the actual elements from the DOM
  const columns = items.map(item => {
    const img = item.querySelector('img');
    const text = item.querySelector('.red-lay > p');
    // Compose the content for this cell
    const content = [];
    if (img) content.push(img);
    if (text) content.push(text);
    return content;
  });

  // 4. Build the table rows according to the correct structure:
  //    - First row: single cell header
  //    - Second row: array with one cell per column
  const tableRows = [
    headerRow,
    columns
  ];

  // 5. Build and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
