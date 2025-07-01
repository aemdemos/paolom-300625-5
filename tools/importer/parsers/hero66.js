/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero66)'];

  // 2. Background image row (second row): find picture or img
  let bgContent = '';
  const imageDiv = element.querySelector('.banner-image__image');
  if (imageDiv) {
    // Use the <picture> if present, else <img>
    const picture = imageDiv.querySelector('picture');
    if (picture) {
      bgContent = picture;
    } else {
      const img = imageDiv.querySelector('img');
      if (img) bgContent = img;
    }
  }

  // 3. Text row (third row): build heading(s) from spans
  let textContent = '';
  const textDiv = element.querySelector('.banner-image__text');
  if (textDiv) {
    // Gather all direct span children (ignore empty ones)
    const spans = Array.from(textDiv.querySelectorAll('span')).filter(s => s.textContent && s.textContent.trim());
    if (spans.length > 0) {
      // Compose heading: concatenate all text with spaces
      const headingText = spans.map(s => s.textContent.trim()).join(' ');
      // Use <h1> for block heading
      const h1 = document.createElement('h1');
      h1.textContent = headingText;
      textContent = h1;
    }
  }

  // Compose table rows
  const cells = [
    headerRow,
    [bgContent].filter(Boolean),
    [textContent ? textContent : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
