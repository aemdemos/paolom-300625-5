/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match the example exactly
  const headerRow = ['Cards (cards54)'];
  const rows = [];

  // Get all card links inside the listing container
  const listing = element.querySelector('.explore-more__listing');
  if (listing) {
    listing.querySelectorAll(':scope > a').forEach((card) => {
      // IMAGE cell: prefer <picture>; fallback to <img>
      let imageEl = null;
      const picture = card.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = card.querySelector('img');
        if (img) imageEl = img;
      }
      // TEXT cell: capture all text content, including formatting and <br>
      // Use the <p> if present, preserving all children (not only innerHTML)
      let textCell;
      const p = card.querySelector('p');
      if (p) {
        textCell = p;
      } else {
        // If no <p>, construct a div with all non-media/overlay text content
        textCell = document.createElement('div');
        // Remove media and overlays from the card to extract pure text
        const cardClone = card.cloneNode(true);
        cardClone.querySelectorAll('.explore-more__media, .explore-more__overlay, picture, img').forEach(el => el.remove());
        textCell.innerHTML = cardClone.innerHTML.trim();
      }
      rows.push([imageEl, textCell]);
    });
  }

  // Build and replace the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
