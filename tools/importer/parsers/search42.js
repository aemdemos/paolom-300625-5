/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the example
  const headerRow = ['Search (search42)'];

  // Reference all content inside the element for the cell
  // We want to preserve all text and HTML structure
  const cellContent = Array.from(element.childNodes);

  // Required: add the query index URL link as in the example
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.textContent = queryIndexUrl;

  // Table content: header, then cell with all block content and query URL
  const cells = [
    headerRow,
    [[...cellContent, link]],
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
