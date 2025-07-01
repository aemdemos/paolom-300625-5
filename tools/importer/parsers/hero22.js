/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row EXACTLY matches example
  const headerRow = ['Hero (hero22)'];

  // 2. Background image row
  let bgImgEl = null;
  let imgAlt = '';
  // Find the carousel element that contains image data attributes
  const carousel = element.querySelector('[data-desktop-image], [data-mobile-image]');
  if (carousel) {
    const bgImgSrc = carousel.getAttribute('data-desktop-image') || carousel.getAttribute('data-mobile-image');
    // Get the alt text from the contained <img>, if any
    const img = carousel.querySelector('img');
    if (img) imgAlt = img.getAttribute('alt') || '';
    if (bgImgSrc) {
      bgImgEl = document.createElement('img');
      bgImgEl.src = bgImgSrc;
      if (imgAlt) bgImgEl.alt = imgAlt;
    }
  }

  // 3. Content row (includes heading, subheading, CTA, all text)
  let contentElements = [];
  if (carousel) {
    const slideWrapper = carousel.querySelector('a.slide-wrapper');
    if (slideWrapper) {
      // Gather all visible text/content inside the slideWrapper except the image
      // We'll preserve <picture> for future-proofing, but skip it for text extraction
      const nodes = [];
      slideWrapper.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() !== 'picture') {
          nodes.push(node);
        } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          // Wrap text nodes in <span> to retain them
          const span = document.createElement('span');
          span.textContent = node.textContent.trim();
          nodes.push(span);
        }
      });
      // If there is no text or elements except image, use the image alt as heading
      if (nodes.length === 0 && imgAlt) {
        const h1 = document.createElement('h1');
        h1.textContent = imgAlt;
        nodes.push(h1);
      }
      // Always include a visible CTA link using the slideWrapper's href, but use its ARIA label or button text if available
      if (slideWrapper.href) {
        const ctaText = slideWrapper.getAttribute('aria-label') || imgAlt || 'Learn More';
        const ctaLink = document.createElement('a');
        ctaLink.href = slideWrapper.href;
        if (slideWrapper.target) ctaLink.target = slideWrapper.target;
        ctaLink.textContent = ctaText;
        nodes.push(ctaLink);
      }
      contentElements = nodes;
    }
  }

  // If no content was found, add an empty string for cell structure
  if (contentElements.length === 0) contentElements.push('');

  // Compose the table: 3 rows, 1 column each
  const cells = [
    headerRow,
    bgImgEl ? [bgImgEl] : [''],
    [contentElements.length === 1 ? contentElements[0] : contentElements],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
