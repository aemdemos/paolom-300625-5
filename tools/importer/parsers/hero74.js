/* global WebImporter */
export default function parse(element, { document }) {
  // --- Header row ---
  const headerRow = ['Hero (hero74)'];

  // --- Row 2: Background Image ---
  // Find the <img> inside <picture> (prefer the largest, usually the last source)
  let imageElem = null;
  const picture = element.querySelector('.banner-image__image picture');
  if (picture) {
    // Use <img> directly (as per instructions, do not clone)
    imageElem = picture.querySelector('img');
  }

  // --- Row 3: Hero Text Content ---
  // The block expects a heading, subheading, and smaller heading, if present
  // We'll preserve them as headings if possible
  const textContainer = element.querySelector('.banner-image__text');
  let textContent = null;
  if (textContainer) {
    // Extract spans and map to heading levels for semantic meaning
    const spans = Array.from(textContainer.children);
    // Avoid referencing empty elements
    if (spans.length > 0) {
      const frag = document.createDocumentFragment();
      if (spans[0]) {
        const h1 = document.createElement('h1');
        h1.textContent = spans[0].textContent.trim();
        frag.appendChild(h1);
      }
      if (spans[1]) {
        const h2 = document.createElement('h2');
        h2.textContent = spans[1].textContent.trim();
        frag.appendChild(h2);
      }
      if (spans[2]) {
        const h3 = document.createElement('h3');
        h3.textContent = spans[2].textContent.trim();
        frag.appendChild(h3);
      }
      textContent = frag;
    }
  }

  // -- Compose the block table --
  // Each row is a single cell, following the 1-column, 3-row pattern.
  const cells = [
    headerRow,
    [imageElem || ''],
    [textContent || '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
