/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up header row with correct block name.
  const headerRow = ['Hero (hero3)'];

  // 2. Extract image element: prefer the <img> inside <picture> under .banner-image__image
  let imgEl = null;
  const imageDiv = element.querySelector('.banner-image__image');
  if (imageDiv) {
    // Try to find <picture> then <img>
    const picture = imageDiv.querySelector('picture');
    if (picture) {
      imgEl = picture.querySelector('img');
    } else {
      imgEl = imageDiv.querySelector('img');
    }
  }
  // Always pass the actual element (or blank) - never clone!
  const imageRow = [imgEl ? imgEl : ''];

  // 3. Extract content for the third row
  const textDiv = element.querySelector('.banner-image__text');
  const contentFrag = document.createDocumentFragment();
  if (textDiv) {
    // a) All .banner-image__text--blue in order (may be more than one)
    // Combine their text with a space (as seen in source)
    const blueSpans = textDiv.querySelectorAll('.banner-image__text--blue');
    if (blueSpans.length > 0) {
      // Collect non-empty text nodes
      let blueText = Array.from(blueSpans).map(s => s.textContent.trim()).filter(Boolean).join(' ');
      if (blueText) {
        const h1 = document.createElement('h1');
        h1.textContent = blueText;
        contentFrag.appendChild(h1);
      }
    }
    // b) .banner-image__text--red (subtitle)
    const redSpan = textDiv.querySelector('.banner-image__text--red');
    if (redSpan && redSpan.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = redSpan.textContent.trim();
      contentFrag.appendChild(h2);
    }
    // c) .banner-image__text--content (paragraph/quote)
    const quoteSpan = textDiv.querySelector('.banner-image__text--content');
    if (quoteSpan && quoteSpan.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = quoteSpan.textContent.trim();
      contentFrag.appendChild(p);
    }
    // d) .banner-image__text--name (byline, use italic by wrapping in <em>)
    const nameSpan = textDiv.querySelector('.banner-image__text--name');
    if (nameSpan && nameSpan.textContent.trim()) {
      // A line break then byline in italics
      contentFrag.appendChild(document.createElement('br'));
      const em = document.createElement('em');
      em.textContent = nameSpan.textContent.trim();
      contentFrag.appendChild(em);
    }
  }
  const contentRow = [contentFrag];

  // 4. Compose table and insert
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
