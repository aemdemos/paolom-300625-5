/* global WebImporter */
export default function parse(element, { document }) {
  // Header must be a single cell, following the example
  const headerRow = ['Accordion (accordion60)'];

  // Get all direct children: title block and content block
  const children = Array.from(element.children);
  if (children.length < 2) return;

  // Title Block: find the title node, removing tooltip if present for clean text
  let titleBlock = children[0];
  let titleContainer = titleBlock.querySelector('.collapse-title') || titleBlock;
  // Remove tooltip if any
  const tooltip = titleContainer.querySelector('.tooltip-group');
  if (tooltip) tooltip.remove();
  // Get trimmed text content for title
  const titleText = titleContainer.textContent.trim();
  const titleCell = document.createElement('span');
  titleCell.textContent = titleText;

  // Content cell: reference content block as-is
  const contentCell = children[1];

  // Compose the rows: header (one cell), then [title, content] row
  const rows = [
    headerRow,
    [titleCell, contentCell]
  ];

  // Use createTable, replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
