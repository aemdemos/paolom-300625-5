/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell exactly matching the block name
  const headerRow = ['Columns (columns17)'];
  // Each column: direct children divs of element
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, gather its content (all child nodes that are not empty text)
  const contentRow = columns.map(col => {
    const nodes = Array.from(col.childNodes).filter(node => {
      return node.nodeType !== 3 || node.textContent.trim() !== '';
    });
    return nodes.length === 1 ? nodes[0] : nodes;
  });
  // The table structure: first row is a single cell header, next row is N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
