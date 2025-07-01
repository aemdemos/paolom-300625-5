/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block expects: 1 header row (block name), then for each item, 2 cells: [title, content]
  // In this example HTML, there is only one accordion item inside the .accordion-item element.

  // 1. Header row
  const headerRow = ['Accordion (accordion16)'];

  // 2. Accordion item row: get immediate children from .collapse-wrapper
  const wrapper = element.querySelector('.collapse-wrapper');
  if (!wrapper) {
    // If the structure is unexpected, do nothing
    return;
  }

  // Defensive: Find the title and content elements
  // Only direct children of .collapse-wrapper should be considered
  const directChildren = Array.from(wrapper.children);
  let titleEl = null;
  let contentEl = null;
  for (const child of directChildren) {
    if (child.classList.contains('collapse-title')) {
      titleEl = child;
    } else if (child.classList.contains('collapse-content')) {
      contentEl = child;
    }
  }

  // If any are missing, use empty fallback
  if (!titleEl) {
    titleEl = document.createElement('div');
  }
  if (!contentEl) {
    contentEl = document.createElement('div');
  }

  // Compose the table structure
  const cells = [
    headerRow,
    [titleEl, contentEl]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
