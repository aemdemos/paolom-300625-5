/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const rows = [['Cards']];

  // Each .cp-group is a card
  const groups = element.querySelectorAll(':scope > .cp-group');

  groups.forEach((group) => {
    // Reference the actual title and content elements
    const title = group.querySelector('.cp-title');
    const content = group.querySelector('.cp-content');

    const cellContent = [];
    if (title && title.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      cellContent.push(strong);
      cellContent.push(document.createElement('br'));
    }
    if (content) {
      // Reference the actual .cp-content element for robustness and to keep formatting
      cellContent.push(content);
    }
    rows.push([cellContent]);
  });

  // Handle any content after all .cp-group (e.g. * Closed on Public Holidays)
  let sibling = groups.length ? groups[groups.length - 1].nextSibling : null;
  while (sibling) {
    // Only care about non-empty text or element nodes
    if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim()) {
      const div = document.createElement('div');
      div.textContent = sibling.textContent.trim();
      rows.push([div]);
    } else if (sibling.nodeType === Node.ELEMENT_NODE && sibling.tagName !== 'BR') {
      rows.push([sibling]);
    }
    sibling = sibling.nextSibling;
  }

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
