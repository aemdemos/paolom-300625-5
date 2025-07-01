/* global WebImporter */
export default function parse(element, { document }) {
  // Get the <ul> containing the sidebar items
  const ul = element.querySelector('ul.eservice-sidebar__list');
  if (!ul) return;

  // Collect each <li> (column)
  const liNodes = Array.from(ul.children).filter(n => n.tagName === 'LI');

  // For each <li>, use the <a> element (with its images and text) as the column content
  const columns = liNodes.map(li => {
    const a = li.querySelector('a');
    return a ? a : li;
  });

  // The header row must be a SINGLE cell, as per the example
  const cells = [
    ['Columns (columns57)'], // Header row: single cell
    columns                 // Content row: one cell per column
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
