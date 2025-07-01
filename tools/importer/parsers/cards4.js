/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Cards (cards4)'];

  // Get all direct .cp-group children (each is a card)
  const cardEls = Array.from(element.querySelectorAll(':scope > .cp-group'));

  // Generate card rows
  const rows = cardEls.map((group) => {
    // Title
    const titleEl = group.querySelector('.cp-title');
    // Description/content (may include paragraphs, line breaks, links)
    const contentEl = group.querySelector('.cp-content');

    // Compose the cell: title in <strong>, then a <br>, then all cp-content nodes
    const cellFragment = document.createDocumentFragment();
    if (titleEl && titleEl.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      cellFragment.appendChild(strong);
      cellFragment.appendChild(document.createElement('br'));
    }
    if (contentEl) {
      Array.from(contentEl.childNodes).forEach((node) => {
        // Append nodes directly to retain HTML, links, br, etc.
        cellFragment.appendChild(node);
      });
    }
    return [cellFragment];
  });

  // Handle trailing notes (text or <br> nodes after last .cp-group)
  // Find non-.cp-group direct children after all cards
  const trailing = [];
  let foundCards = false;
  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === 1 && node.classList.contains('cp-group')) {
      foundCards = true;
    } else if (foundCards) {
      // Only after cp-groups
      if (
        (node.nodeType === 1 && node.tagName === 'BR') ||
        (node.nodeType === 3 && node.textContent.trim())
      ) {
        trailing.push(node);
      }
    }
  });
  // Remove empty trailing text nodes
  const trailingContent = trailing.filter(
    (n) => !(n.nodeType === 3 && !n.textContent.trim())
  );
  const cells = [headerRow, ...rows];
  if (trailingContent.length) {
    cells.push([trailingContent]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
