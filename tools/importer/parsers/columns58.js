/* global WebImporter */
export default function parse(element, { document }) {
  // Find the sidebar list of links
  const container = element.querySelector('.container');
  if (!container) return;

  const list = container.querySelector('.eservice-sidebar__list');
  if (!list) return;

  const items = Array.from(list.children);
  // Each LI becomes a column
  const columns = items.map(li => {
    // Use the first <a> in each li directly
    const a = li.querySelector('a');
    if (!a) return '';
    // Use only the first normal image
    const normalImg = a.querySelector('img.normal');
    if (normalImg) normalImg.removeAttribute('class');
    // Use the label span
    const labelSpan = a.querySelector('.label');
    if (labelSpan) labelSpan.removeAttribute('class');
    // Compose the column content array
    const cellContent = [];
    if (normalImg) cellContent.push(normalImg);
    if (labelSpan) cellContent.push(document.createElement('br'), labelSpan);
    // Compose a new <a> element (must not move the original anchor from the DOM)
    const link = document.createElement('a');
    link.href = a.getAttribute('href');
    // Copy alt/title attributes if present for accessibility
    if (normalImg) {
      if (normalImg.hasAttribute('alt')) link.setAttribute('aria-label', normalImg.getAttribute('alt'));
      if (normalImg.hasAttribute('title')) link.setAttribute('title', normalImg.getAttribute('title'));
    }
    cellContent.forEach(node => link.appendChild(node));
    return link;
  });

  // Table header: single cell spanning all columns
  const headerRow = ['Columns (columns58)'];
  // Second row: one cell per column
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
