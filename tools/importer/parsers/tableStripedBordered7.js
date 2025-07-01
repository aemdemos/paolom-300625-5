/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as single cell, matching the example
  const rows = [['Table (striped, bordered, tableStripedBordered7)']];

  // Find the <ul> menu list
  const ul = element.querySelector('ul.eservice-sidebar__list');
  if (!ul) return;

  // The first data row should be ['Menu Item', 'Link'] (not a header row)
  // All subsequent rows are menu entries
  const lis = ul.querySelectorAll(':scope > li');

  // Add the column titles as the first data row
  rows.push(['Menu Item', 'Link']);

  lis.forEach(li => {
    // The menu label
    let labelEl = li.querySelector('.label');
    let labelText = '';
    if (labelEl && labelEl.textContent) {
      labelText = labelEl.textContent.trim();
    } else {
      const aEl = li.querySelector('a');
      labelText = aEl ? aEl.textContent.trim() : '';
    }
    // The link
    const a = li.querySelector('a');
    let href = '';
    if (a && a.getAttribute('href')) {
      href = a.getAttribute('href');
      if (!/^https?:\/\//i.test(href)) {
        const dummy = document.createElement('a');
        dummy.href = href;
        href = dummy.href;
      }
    }
    let linkEl = '';
    if (href) {
      linkEl = document.createElement('a');
      linkEl.href = href;
      linkEl.textContent = href;
    }
    rows.push([labelText, linkEl || '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
