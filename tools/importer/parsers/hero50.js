/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const headerRow = ['Hero (hero50)'];

  // There is no background image in the provided HTML, so 2nd row is blank
  const imageRow = [''];

  // Third row: Content (Title, Text, CTA)
  // Title extraction
  let title;
  const titleDiv = element.querySelector('.title-text__title');
  if (titleDiv) {
    const h = titleDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (h) {
      title = h;
    }
  }
  // Text extraction
  let text;
  const textDiv = element.querySelector('.title-text__text');
  if (textDiv) {
    const p = textDiv.querySelector('p');
    if (p) {
      text = p;
    }
  }
  // CTA extraction
  let cta;
  const centerDiv = element.querySelector('.center');
  if (centerDiv) {
    const a = centerDiv.querySelector('a');
    if (a) {
      cta = a;
    }
  }
  // Assemble content array for the row, skip any missing parts
  const contentElems = [];
  if (title) contentElems.push(title);
  if (text) contentElems.push(text);
  if (cta) contentElems.push(cta);
  const contentRow = [contentElems];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
