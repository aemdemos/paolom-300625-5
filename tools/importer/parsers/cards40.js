/* global WebImporter */
export default function parse(element, { document }) {
  // Block header must match example exactly
  const headerRow = ['Cards (cards40)'];

  // Find the cards container
  const cardsContainer = element.querySelector('.persona-cards');
  if (!cardsContainer) return;

  // Each card element
  const cardEls = cardsContainer.querySelectorAll('.persona-card');
  const rows = [];

  cardEls.forEach((cardEl) => {
    // First cell: image (prefer <picture> if available)
    let imageCell = null;
    const imgWrapper = cardEl.querySelector('.persona-card__img-wrapper');
    if (imgWrapper) {
      const picture = imgWrapper.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback to <img>
        const img = imgWrapper.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Second cell: text
    let textCell = null;
    const content = cardEl.querySelector('.persona-card__content');
    if (content) {
      const titleSpan = content.querySelector('.persona-card__title');
      if (titleSpan) {
        // Wrap in <strong> to resemble heading
        const strong = document.createElement('strong');
        strong.textContent = titleSpan.textContent;
        textCell = strong;
      } else {
        textCell = content.textContent.trim();
      }
    }

    // If either cell is missing, still include the row for resilience
    rows.push([imageCell, textCell]);
  });

  // Compose table
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  
  // Replace the original element
  element.replaceWith(table);
}
