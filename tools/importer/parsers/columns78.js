/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns inside the element
  const columns = Array.from(element.querySelectorAll(':scope > .mega-menu-content-onefourth-width'));

  // Extract contents for each column
  const columnCells = columns.map(col => {
    const frag = document.createDocumentFragment();
    const subtitle = col.querySelector(':scope > .mega-menu-subtitle');
    if (subtitle) frag.appendChild(subtitle);
    const item = col.querySelector(':scope > .mega-menu-item');
    if (item) frag.appendChild(item);
    return frag;
  });

  // Extract main image from background-image
  let imgEl = '';
  const bgDiv = element.querySelector('.mega-menu-entering-departing-image');
  if (bgDiv && bgDiv.style.backgroundImage) {
    const match = bgDiv.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
    if (match && match[1]) {
      const img = document.createElement('img');
      img.src = match[1];
      img.alt = bgDiv.getAttribute('title') || '';
      imgEl = img;
    }
  }

  // The first column is the image, followed by the content columns
  const contentRow = [imgEl, ...columnCells];
  const numColumns = contentRow.length;

  // Header row: first cell is block name, rest are empty so col count matches content row
  const headerRow = ["Columns (columns78)"];
  for (let i = 1; i < numColumns; i++) headerRow.push("");

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
