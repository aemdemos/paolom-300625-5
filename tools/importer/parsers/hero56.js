/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches exactly
  const headerRow = ['Hero (hero56)'];

  // Extract image from the responsive <picture>
  let imgEl = null;
  const imageContainer = element.querySelector('.banner-image__image');
  if (imageContainer) {
    const picture = imageContainer.querySelector('picture');
    if (picture) {
      imgEl = picture.querySelector('img');
    } else {
      imgEl = imageContainer.querySelector('img');
    }
  }

  // Extract all visible text, keeping hierarchy: primary, sub, paragraph if present
  const textContainer = element.querySelector('.banner-image__text');
  const textFragment = document.createDocumentFragment();
  if (textContainer) {
    // Only use non-empty spans, preserve their order in the DOM
    const spans = Array.from(textContainer.children).filter(s => s.textContent.trim());
    if (spans[0]) {
      const h1 = document.createElement('h1');
      h1.textContent = spans[0].textContent.trim();
      textFragment.appendChild(h1);
    }
    if (spans[1]) {
      const h2 = document.createElement('h2');
      h2.textContent = spans[1].textContent.trim();
      textFragment.appendChild(h2);
    }
    if (spans[2]) {
      const h3 = document.createElement('h3');
      h3.textContent = spans[2].textContent.trim();
      textFragment.appendChild(h3);
    }
    // If there is only one blue and one red span, just use h1 and h2, with h2 bold if it's .banner-image__text--red
    if (spans.length === 2 && spans[1].classList.contains('banner-image__text--red')) {
      textFragment.removeChild(textFragment.lastChild);
      const h2 = document.createElement('h2');
      const strong = document.createElement('strong');
      strong.textContent = spans[1].textContent.trim();
      h2.appendChild(strong);
      textFragment.appendChild(h2);
    }
  }

  const cells = [
    headerRow,
    [imgEl || ''],
    [textFragment]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
