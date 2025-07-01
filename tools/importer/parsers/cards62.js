/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards62)'];
  const rows = [headerRow];

  // Select all card links
  const cards = element.querySelectorAll('.explore-more__item');
  cards.forEach((card) => {
    // 1. Image in the card
    let imgEl = null;
    const picture = card.querySelector('.explore-more__media picture');
    if (picture) {
      // Reference the picture element directly
      imgEl = picture;
    }

    // 2. Text: The <p> inside the card link, reference it directly
    let textEl = card.querySelector('p');
    // Fallback: if no <p>, skip card
    if (!textEl) return;
    
    rows.push([imgEl, textEl]);
  });

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
