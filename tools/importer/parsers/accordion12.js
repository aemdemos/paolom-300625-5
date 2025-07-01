/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the accordion title div (always one per block)
  const titleDiv = element.querySelector('.collapse-title.accordion');

  let titleCell, contentCell;

  if (titleDiv) {
    const btn = titleDiv.querySelector('a.btn');
    if (btn) {
      // Remove the button from the titleDiv's children
      btn.remove();
      // Remaining text nodes (title)
      const titleParts = [];
      for (const node of titleDiv.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          titleParts.push(node.textContent.trim());
        }
      }
      titleCell = titleParts.join(' ');
      contentCell = btn;
    } else {
      titleCell = titleDiv.textContent.trim();
      contentCell = '';
    }
  } else {
    titleCell = element.textContent.trim();
    contentCell = '';
  }

  // The header row must be a single cell; data rows can have two cells
  const cells = [
    ['Accordion (accordion12)'],
    [titleCell, contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
