/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with the exact block name
  const headerRow = ['Table (bordered)'];
  // The element contains just the section label (e.g. 'Fees'), so we use its text content as the single data row
  const sectionLabel = element.textContent ? element.textContent.trim() : '';
  const dataRow = [sectionLabel];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow,
  ], document);
  
  element.replaceWith(table);
}
