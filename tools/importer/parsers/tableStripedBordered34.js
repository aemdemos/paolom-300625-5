/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review: extract all direct image children (logo variants)
  const link = element.querySelector('a');
  // Since both logos are inside the <a>, reference the <a> directly.
  // If the <a> or images are missing, fallback gracefully
  let cellContent;
  if (link) {
    cellContent = link;
  } else {
    // If there's no <a>, collect any images directly
    const imgs = Array.from(element.querySelectorAll('img'));
    if (imgs.length > 0) {
      cellContent = imgs;
    } else {
      // If no images, fallback to empty cell
      cellContent = '';
    }
  }

  const cells = [
    ['Table (striped, bordered, tableStripedBordered34)'], // Header row matches requirement
    [cellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}