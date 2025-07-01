/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: 1 column (as per example)
  const rows = [
    ['Accordion (accordion21)']
  ];
  // Find all option titles
  let options = [];
  const select = element.querySelector('select');
  if (select) {
    options = Array.from(select.options).map(opt => opt.textContent.trim());
  } else {
    // Fallback: custom dropdown
    const ul = element.querySelector('.options-container ul');
    if (ul) {
      options = Array.from(ul.querySelectorAll('li span')).map(span => span.textContent.trim());
    } else {
      // Fallback: single button
      const button = element.querySelector('button');
      if (button) options = [button.textContent.trim()];
    }
  }
  // Each option becomes a 2-cell row: title, empty content
  options.forEach(title => {
    rows.push([title, '']);
  });
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
