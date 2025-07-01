/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block name, as required
  const headerRow = ['Hero (hero51)'];

  // Second row: background image cell (none in this HTML, so blank)
  const backgroundRow = [''];

  // Third row: Title, Subheading, CTA in a single cell, using existing elements
  const contents = [];
  // Title
  const titleDiv = element.querySelector('.title-text__title');
  if (titleDiv) {
    // Try to preserve bold styling by using the first child (likely <p>) as-is
    if (titleDiv.firstElementChild) {
      // Wrap in h1 to maintain semantic heading
      const h1 = document.createElement('h1');
      h1.innerHTML = titleDiv.firstElementChild.innerHTML;
      contents.push(h1);
    } else if (titleDiv.textContent.trim()) {
      const h1 = document.createElement('h1');
      h1.textContent = titleDiv.textContent.trim();
      contents.push(h1);
    }
  }

  // Subheading
  const subheadingDiv = element.querySelector('.title-text__text');
  if (subheadingDiv) {
    // Use the paragraph as-is if present
    if (subheadingDiv.firstElementChild) {
      contents.push(subheadingDiv.firstElementChild);
    } else if (subheadingDiv.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = subheadingDiv.textContent.trim();
      contents.push(p);
    }
  }

  // CTA button
  const ctaLink = element.querySelector('.center-join-us a');
  if (ctaLink) {
    // Reference the existing anchor tag, but adjust its text if needed
    // Remove any nested <p>, use its textContent
    let ctaText = '';
    if (ctaLink.querySelector('p')) {
      ctaText = ctaLink.querySelector('p').textContent.trim();
      ctaLink.textContent = ctaText; // Replace the anchor's content with just the text
    } else {
      ctaText = ctaLink.textContent.trim();
    }
    // Keep class for styling
    contents.push(ctaLink);
  }

  const contentRow = [contents];

  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
