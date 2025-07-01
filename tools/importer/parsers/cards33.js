/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table header exactly as in the example
  const headerRow = ['Cards (cards33)'];

  // Helper to create text content for card
  function createTextContent(cardContent, linkHref) {
    const frag = document.createDocumentFragment();
    if (!cardContent) return frag;
    // Title (div.news-card-title), use <strong>
    const titleDiv = cardContent.querySelector('.news-card-title');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent;
      frag.appendChild(strong);
      frag.appendChild(document.createElement('br'));
    }
    // Subtitle (h4), optional
    const h4 = cardContent.querySelector('h4');
    if (h4) {
      frag.appendChild(h4);
      frag.appendChild(document.createElement('br'));
    }
    // Description (p)
    const p = cardContent.querySelector('p');
    if (p) {
      frag.appendChild(p);
    }
    // CTA: only if linkHref exists
    if (linkHref) {
      frag.appendChild(document.createElement('br'));
      const a = document.createElement('a');
      a.href = linkHref;
      a.textContent = 'View PDF';
      a.target = '_blank';
      frag.appendChild(a);
    }
    return frag;
  }

  // This function is given a single card. But if multiple .news-card siblings in the parent, group them
  let cards;
  if (element.classList.contains('news-card')) {
    // Try to find siblings also with .news-card to group as a block
    const parent = element.parentElement;
    const siblingCards = parent ? Array.from(parent.children).filter(el => el.classList && el.classList.contains('news-card')) : [];
    if (siblingCards.length > 1) {
      cards = siblingCards;
    } else {
      cards = [element];
    }
  } else {
    // If this is a wrapper, get direct .news-card children
    cards = Array.from(element.querySelectorAll(':scope > .news-card'));
    if (cards.length === 0) cards = [element];
  }

  const rows = [headerRow];

  cards.forEach(card => {
    // Image: .news-card-image img
    let img = null;
    const imgContainer = card.querySelector('.news-card-image');
    if (imgContainer) {
      img = imgContainer.querySelector('img'); // reference existing img
    }

    // Text content: .news-card-content inside <a> or direct
    let cardContent = null;
    let linkHref = null;
    const a = card.querySelector('a');
    if (a) {
      cardContent = a.querySelector('.news-card-content');
      linkHref = a.getAttribute('href');
    }
    if (!cardContent) {
      cardContent = card.querySelector('.news-card-content');
    }

    const textBlock = createTextContent(cardContent, linkHref);

    rows.push([
      img,
      textBlock
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
