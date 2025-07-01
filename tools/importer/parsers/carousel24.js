/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Find the carousel slide(s)
  // Structure: .info-panel__card-item-container > .slick-list > .slick-track > .slick-slide
  // There might be only one slide in this HTML example
  const container = element.querySelector('.info-panel__card-item-container');
  if (!container) {
    // No slides found, do nothing
    return;
  }
  let slideDivs = container.querySelectorAll('.slick-slide');
  // Fallback: if .slick-slide is not present, maybe there's only one slide, not wrapped
  if (!slideDivs.length) {
    // Try to find .info-panel__card-item-content-container directly
    const fallbackContainer = container.querySelector('.info-panel__card-item-content-container');
    if (fallbackContainer) {
      slideDivs = [fallbackContainer]; // Not a slide div, but the container
    }
  }

  slideDivs.forEach((slideDiv) => {
    // .info-panel__card-item-content-container may be slideDiv or inside slideDiv
    let contentContainer = slideDiv;
    if (!contentContainer.classList.contains('info-panel__card-item-content-container')) {
      contentContainer = slideDiv.querySelector('.info-panel__card-item-content-container');
    }
    if (!contentContainer) return;

    // Get the image
    let imgEl = contentContainer.querySelector('.info-panel__card-img .poster-container img');
    if (!imgEl) {
      // Fallback: any img
      imgEl = contentContainer.querySelector('img');
    }

    // First cell: image element (reference, do not clone)
    const imageCell = imgEl || '';

    // Second cell: Combine optional description under image and main slide description
    const textCellContent = [];
    // Image caption (desc) under image
    const imgDesc = contentContainer.querySelector('.info-panel__card-img .desc');
    if (imgDesc) textCellContent.push(imgDesc);
    // Main description
    const desc = contentContainer.querySelector('.info-panel__card-desc');
    if (desc) textCellContent.push(desc);

    rows.push([imageCell, textCellContent]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
