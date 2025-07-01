/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as in the example
  const headerRow = ['Search (search43)'];

  // Collect all top-level divs (the key content blocks)
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));
  const content = [];

  // Collect non-empty children for robust coverage
  topDivs.forEach(div => {
    if (div && div.textContent.trim().length > 0) {
      content.push(div);
    }
  });

  // If not found, fall back to the element itself
  const rowContent = content.length > 0 ? content : [element];

  // Compose the single-column, two-row table
  const cells = [
    headerRow,
    [rowContent],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
