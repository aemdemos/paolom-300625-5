/* global WebImporter */
export default function parse(element, { document }) {
  // Header should match the block name as specified
  const headerRow = ['Table (striped, bordered, tableStripedBordered6)'];
  const rows = [headerRow];

  // Get the button/link inside the element
  // Structure: div.button-place > div.center > a.button > p
  const centerDiv = element.querySelector('.center');
  let link = null;
  if (centerDiv) {
    link = centerDiv.querySelector('a.button');
  }

  if (link) {
    // Reference the existing <a> element. Remove <p> wrappers, flatten text content directly into link.
    // If <a> contains a <p>, use only its text as the .textContent of <a>
    const p = link.querySelector('p');
    if (p) {
      link.textContent = p.textContent;
      p.remove();
    }
    // Only reference the original <a> element, do not clone
    rows.push([link]);
  } else {
    // Fallback: If no button found, do not add any extra row
  }

  // Create and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
