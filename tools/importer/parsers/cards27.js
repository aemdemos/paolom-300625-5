/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all card rows
  const cardRows = [];

  // Facebook card
  const fbSection = element.querySelector('.news-guide__fb');
  if (fbSection) {
    let leftCell = '';
    const fbHeader = fbSection.querySelector('.news-guide__title');
    const contentDiv = document.createElement('div');
    if (fbHeader) {
      const strong = document.createElement('strong');
      strong.textContent = fbHeader.textContent.trim();
      contentDiv.appendChild(strong);
    }
    const fbIframe = fbSection.querySelector('iframe');
    if (fbIframe && fbIframe.src) {
      if (contentDiv.childNodes.length) {
        contentDiv.appendChild(document.createElement('br'));
      }
      const link = document.createElement('a');
      link.href = fbIframe.src;
      link.textContent = 'View on Facebook';
      link.target = '_blank';
      contentDiv.appendChild(link);
    }
    cardRows.push([leftCell, contentDiv]);
  }

  // News cards
  const newsCards = element.querySelectorAll('.news-article-card');
  newsCards.forEach((card) => {
    let img = card.querySelector('img');
    const textSection = card.querySelector('.news-article-card__text');
    let rightCell;
    if (textSection) {
      rightCell = textSection;
    } else {
      rightCell = document.createElement('div');
      rightCell.textContent = card.textContent.trim();
    }
    cardRows.push([img, rightCell]);
  });

  // Traffic card
  const trafficSection = element.querySelector('.news-guide__traffic');
  if (trafficSection) {
    let img = '';
    const imgElem = trafficSection.querySelector('img');
    if (imgElem) img = imgElem;
    const rightCell = document.createElement('div');
    const mainLink = trafficSection.querySelector('.news-guide__link');
    if (mainLink) {
      const strong = document.createElement('strong');
      strong.textContent = mainLink.textContent.replace(/\s+/g, ' ').trim();
      rightCell.appendChild(strong);
      rightCell.appendChild(document.createElement('br'));
    }
    trafficSection.querySelectorAll('p').forEach(p => {
      rightCell.appendChild(p);
    });
    cardRows.push([img, rightCell]);
  }

  // Build cells: header row should be a single cell, then 2-cell data rows
  const cells = [];
  // Header row: one cell only
  cells.push(['Cards (cards27)']);
  // Data rows: two cells ([img, content])
  cardRows.forEach(row => cells.push(row));

  // After table is created, add colspan=2 to the first <th> (header row)
  const table = WebImporter.DOMUtils.createTable(cells, document);
  const firstTh = table.querySelector('tr:first-child > th');
  if (firstTh) {
    firstTh.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
