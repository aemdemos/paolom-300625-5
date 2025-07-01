/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct content except mobile-nav wrappers
  function collectColumnContent(col) {
    const nodes = [];
    Array.from(col.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!node.classList.contains('mobile-nav-wrapper-2')) {
          nodes.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim().length > 0) {
          nodes.push(document.createTextNode(node.textContent));
        }
      }
    });
    return nodes.length ? nodes : [col];
  }

  // Find the two main columns
  const cols = element.querySelectorAll('.mega-menu-content-half-widthv2-padding');
  let leftCell, rightCell;
  if (cols.length === 2) {
    leftCell = collectColumnContent(cols[0]);
    rightCell = collectColumnContent(cols[1]);
  } else {
    // fallback: treat the whole element as one column
    leftCell = [element];
    rightCell = [];
  }

  // Table header must have exactly one cell
  const header = ['Columns (columns48)'];
  // The next row must have as many columns as needed for the layout (usually two)
  const rows = [
    header,
    [leftCell, rightCell].filter(cell => cell.length > 0)
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
