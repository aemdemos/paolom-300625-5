/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review: 
  // 1. Only one table needed (no Section Metadata in example)
  // 2. The block header must be exactly 'Columns (columns20)'
  // 3. All content comes from element, which only has an image
  // 4. Reference existing elements, do not clone or create new
  // 5. Edge case: If image is missing, use empty string as cell
  const headerRow = ['Columns (columns20)'];
  const img = element.querySelector('img') || '';
  const contentRow = [img];

  const rows = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
