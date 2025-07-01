/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Tabs (tabs44)'];

  // Get all immediate child buttons (tab labels)
  const buttons = Array.from(element.querySelectorAll('button.quicklinks-item'));

  // For each button, make a row: [label, '']
  const rows = buttons.map(btn => [btn.textContent.trim(), '']);

  // Compose table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
