/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per specification
  const cells = [['Cards (cards30)']];

  // Find the cards container
  const newsCards = element.querySelector('.news-cards');
  if (!newsCards) return;

  // Extract all text and elements before the cards container as intro content
  const introNodes = [];
  let curr = element.firstChild;
  while (curr && curr !== newsCards) {
    // Only include elements and text nodes with visible content
    if (
      (curr.nodeType === Node.ELEMENT_NODE && curr.textContent.trim() !== '') ||
      (curr.nodeType === Node.TEXT_NODE && curr.textContent.trim() !== '')
    ) {
      introNodes.push(curr);
    }
    curr = curr.nextSibling;
  }
  // If there is intro content, push as a row
  if (introNodes.length) {
    // If only text nodes, wrap in a paragraph
    if (introNodes.every(n => n.nodeType === Node.TEXT_NODE)) {
      const p = document.createElement('p');
      p.textContent = introNodes.map(n => n.textContent).join(' ').replace(/\s+/g, ' ').trim();
      cells.push([p]);
    } else {
      cells.push([introNodes]);
    }
  }

  // For each card, extract image and text content
  newsCards.querySelectorAll('a.news-card').forEach((card) => {
    // First cell: image (referenced directly)
    const img = card.querySelector('.news-card-image img');
    let imgCell = '';
    if (img) {
      imgCell = img;
    }

    // Second cell: text content (title + CTA)
    const textCellContent = [];
    // Title
    const titleDiv = card.querySelector('.news-card-title > div');
    if (titleDiv && titleDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textCellContent.push(strong);
    }
    // CTA link
    if (card.href) {
      // If title exists, add a <br>
      if (textCellContent.length > 0) {
        textCellContent.push(document.createElement('br'));
      }
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = 'View report';
      link.target = '_blank';
      textCellContent.push(link);
    }
    if (textCellContent.length === 1) {
      cells.push([imgCell, textCellContent[0]]);
    } else {
      cells.push([imgCell, textCellContent]);
    }
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
