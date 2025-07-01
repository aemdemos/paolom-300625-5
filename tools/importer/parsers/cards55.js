/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block (must have 2 columns to match the rest)
  const headerRow = ['Cards (cards55)', ''];

  // Get all immediate children <a> elements (cards)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.news-card'));

  // For each card, create a table row: [Image/Icon (or empty), Text]
  const rows = cardLinks.map((a) => {
    const titleDiv = a.querySelector('.news-card-title > div');
    const title = titleDiv && titleDiv.textContent.trim();
    const href = a.getAttribute('href');
    if (!title || !href || href === '#') return null;

    const link = document.createElement('a');
    link.href = href;
    link.textContent = title;
    link.target = '_blank';
    return ['', link];
  }).filter(Boolean);

  // Compose the full table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
