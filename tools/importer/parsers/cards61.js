/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the block description
  const headerRow = ['Cards (cards61)'];
  const rows = [headerRow];

  // Select all card links in the listing
  const cardLinks = element.querySelectorAll('.explore-more__listing > .explore-more__item');

  cardLinks.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the <img> inside <picture.explore-more__image>
    let imgEl = null;
    const picture = card.querySelector('picture.explore-more__image');
    if (picture) {
      imgEl = picture.querySelector('img');
    }

    // --- TEXT CELL ---
    // Use the <p> element as-is for card text (title/desc)
    let textCell = null;
    const p = card.querySelector('p');
    if (p) {
      textCell = p;
    }

    // Always include a row if we have *either* an image or some text
    if (imgEl || textCell) {
      rows.push([imgEl, textCell]);
    }
  });

  // Create and replace with the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
