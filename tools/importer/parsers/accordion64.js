/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion64) block: header row (1 cell), then 2 columns: Title | Content
  // For this HTML, there is only one accordion item, so the output is just 2 rows (header + content)

  // Header row
  const headerRow = ['Accordion (accordion64)'];

  // Extract the title element (must reference existing element, not clone or create)
  // Title: .collapse-title or .accordion (they are on same div)
  let titleEl = null;
  const directChildren = Array.from(element.children);
  for (const child of directChildren) {
    if (child.classList.contains('collapse-wrapper')) {
      // Title is inside collapse-wrapper
      const t = child.querySelector('.collapse-title, .accordion');
      if (t) titleEl = t;
      break;
    }
  }
  // Fallback if not found
  if (!titleEl) {
    titleEl = document.createTextNode('');
  }

  // Extract the content element (must reference existing element, not clone or create)
  let contentEl = null;
  for (const child of directChildren) {
    if (child.classList.contains('collapse-wrapper')) {
      const c = child.querySelector('.collapse-content, .panel');
      if (c) contentEl = c;
      break;
    }
  }
  if (!contentEl) {
    contentEl = document.createTextNode('');
  }

  const cells = [
    headerRow,
    [titleEl, contentEl]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
