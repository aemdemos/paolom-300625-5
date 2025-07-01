/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content container inside the given element
  let mainDiv = null;
  const childDivs = element.querySelectorAll(':scope > div');
  for (const div of childDivs) {
    if (div.classList.contains('collapse-title') && div.classList.contains('accordion')) {
      mainDiv = div;
      break;
    }
  }
  if (!mainDiv) mainDiv = element;

  // Extract CTA button if present (move out of DOM so not in leftCol)
  const cta = mainDiv.querySelector('a.btn');
  let rightCol = [];
  if (cta) {
    if (cta.parentNode) cta.parentNode.removeChild(cta);
    rightCol.push(cta);
  } else {
    rightCol.push('');
  }

  // Extract the text (Documents Required) and tooltip group
  let leftCol = [];
  for (const node of mainDiv.childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      leftCol.push(node);
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      const span = document.createElement('span');
      span.textContent = node.textContent.trim();
      leftCol.push(span);
    }
  }
  if (leftCol.length === 0) leftCol = [mainDiv];

  // To fix: Header row must have a single cell, as in the example
  const cells = [
    ['Columns (columns25)'], // single header cell
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
