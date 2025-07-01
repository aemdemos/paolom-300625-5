/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to resolve relative URLs
  function resolveUrl(url) {
    const a = document.createElement('a');
    a.href = url;
    return a.href;
  }

  const headerRow = ['Carousel (carousel11)'];
  const rows = [];
  const carousel = element.querySelector('.two-col-carousel__container');
  if (!carousel) return;
  const track = carousel.querySelector('.slick-track');
  if (!track) return;

  // Only select real slides (not .slick-cloned)
  const slides = Array.from(track.children).filter((slide) => !slide.classList.contains('slick-cloned'));
  slides.forEach((slide) => {
    // Find .two-col-carousel-item__container on this slide
    const item = slide.querySelector('.two-col-carousel-item__container');
    if (!item) return;

    // --- IMAGE CELL ---
    // Always reference the actual <img> element (not clone)
    let imgElem = null;
    const imageWrap = item.querySelector('.two-col-carousel-item__image');
    if (imageWrap) {
      const img = imageWrap.querySelector('img');
      if (img) {
        img.src = resolveUrl(img.getAttribute('src'));
        imgElem = img;
      }
    }

    // --- TEXT CELL ---
    const contentDiv = item.querySelector('.two-col-carousel-item__content');
    const textCellContent = [];
    if (contentDiv) {
      // TITLE
      const title = contentDiv.querySelector('.two-col-carousel-item__content--title');
      if (title) {
        const h = document.createElement('h3');
        h.textContent = title.textContent.trim();
        textCellContent.push(h);
      }
      // DESC
      const desc = contentDiv.querySelector('.two-col-carousel-item__content--desc');
      if (desc) {
        const p = document.createElement('p');
        p.textContent = desc.textContent.trim();
        textCellContent.push(p);
      }
      // CTA (anchor button, flatten inner <p> if needed)
      const cta = contentDiv.querySelector('a.button');
      if (cta) {
        const ctaA = cta; // Use the original element
        const p = ctaA.querySelector('p');
        if (p) {
          ctaA.textContent = p.textContent.trim();
        }
        textCellContent.push(ctaA);
      }
    }
    rows.push([
      imgElem,
      textCellContent.length > 0 ? textCellContent : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
