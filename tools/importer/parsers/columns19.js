/* global WebImporter */
export default function parse(element, { document }) {
  // Remove unwanted divs
  Array.from(element.querySelectorAll('.clearfix')).forEach(el => el.remove());
  // Remove the mega-menu-title
  const titleEl = element.querySelector('.mega-menu-title');
  if (titleEl) titleEl.remove();

  // Get all columns
  const columns = Array.from(element.querySelectorAll('.mega-menu-content-onefourth-width'));
  const numColumns = columns.length || 1;

  // Header row: first cell is block name, rest are empty strings (to match columns)
  const headerRow = Array(numColumns).fill('');
  headerRow[0] = 'Columns (columns19)';

  // Content row: subtitle + menu item for each column
  const contentRow = columns.map(col => {
    const content = [];
    const subtitle = col.querySelector('.mega-menu-subtitle');
    if (subtitle) content.push(subtitle);
    const item = col.querySelector('.mega-menu-item');
    if (item) content.push(item);
    return content;
  });

  // Fallback if no columns found
  const cells = [
    headerRow,
    contentRow.length > 0 ? contentRow : [[...element.childNodes]]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
