/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Carousel (carousel71)'];
  const cells = [headerRow];

  // Find the carousel track containing the slides
  const track = element.querySelector('.slick-track');
  if (!track) return;
  // Each .slick-slide is a slide (do not use tab-index attribute, just get all slides)
  const slides = Array.from(track.children).filter((slide) => slide.classList.contains('slick-slide'));
  slides.forEach((slide) => {
    // .info-panel__card-item-content-container wraps the slide's content
    const contentContainer = slide.querySelector('.info-panel__card-item-content-container');
    if (!contentContainer) return;

    // --- IMAGE CELL ---
    let imgElem = null;
    const posterContainer = contentContainer.querySelector('.poster-container');
    if (posterContainer) {
      const foundImg = posterContainer.querySelector('img');
      if (foundImg) imgElem = foundImg;
    }

    // --- TEXT CELL ---
    let textNodes = [];
    // Caption/desc under image (if exists) -- as a <p> above the rest
    const captionElem = contentContainer.querySelector('.info-panel__card-img .desc');
    if (captionElem) textNodes.push(captionElem);
    // Main slide description
    const descElem = contentContainer.querySelector('.info-panel__card-desc');
    if (descElem) textNodes.push(descElem);
    // If no text, use empty string
    const textCell = textNodes.length ? textNodes : '';

    // Add the row (image, text)
    cells.push([
      imgElem || '',
      textCell
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
