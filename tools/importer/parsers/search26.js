/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example exactly
  const headerRow = ['Search (search26)'];

  // The block expects all visible search UI and text content in the cell (not a hardcoded url, but the form itself)
  // Use the main .site-search__form block as the content, referencing the existing DOM node (not cloning)
  const formEl = element.querySelector('.site-search__form') || element;

  // If .site-search__form exists, reference it directly; else use the element itself
  // Remove suggestions dropdowns if present (these are not part of the main UI)
  const suggestions = formEl.querySelector('.site-search__suggestions');
  if (suggestions) suggestions.remove();

  // The row should contain the referenced DOM node with all content and text
  const cells = [
    headerRow,
    [formEl],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
