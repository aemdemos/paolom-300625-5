/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [['Cards (cards23)']];

  // Find all card containers
  const articles = element.querySelectorAll('.news-article-card');

  articles.forEach((article) => {
    // Image cell: Use the existing <img> element if present
    let imageCell = '';
    const imageDiv = article.querySelector('.news-article-card__image');
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) imageCell = img;
    }

    // Text cell: Compose all text content including time, title, and link
    const textDiv = article.querySelector('.news-article-card__text');
    const textCell = document.createElement('div');
    if (textDiv) {
      // Time (date)
      const time = textDiv.querySelector('time');
      if (time && time.textContent.trim()) {
        const timeEl = document.createElement('div');
        timeEl.textContent = time.textContent.trim();
        textCell.appendChild(timeEl);
      }
      // Title
      const h3 = textDiv.querySelector('.h3');
      if (h3 && h3.textContent.trim()) {
        const titleEl = document.createElement('strong');
        titleEl.textContent = h3.textContent.trim();
        textCell.appendChild(titleEl);
        textCell.appendChild(document.createElement('br'));
      }
      // Remove arrow icon (not useful for import)
      // No further action required as it's not appended
    }
    // Add CTA link to full article
    const a = article.querySelector('a');
    if (a && a.href) {
      const linkEl = document.createElement('a');
      linkEl.href = a.href;
      linkEl.textContent = 'Read more';
      // Add a space if cell has other text
      if (textCell.childNodes.length) {
        textCell.appendChild(document.createElement('br'));
      }
      textCell.appendChild(linkEl);
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
