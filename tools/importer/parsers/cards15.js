/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Cards (cards15)'];

  // Get all direct card <a> children
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map((card) => {
    // First cell: the image, prefer <picture> if present
    let imageCell = null;
    const picture = card.querySelector('picture');
    if (picture) {
      imageCell = picture;
    } else {
      // fallback: last image
      const imgs = card.querySelectorAll('img');
      if (imgs.length) imageCell = imgs[imgs.length - 1];
    }

    // Second cell: preserve all text in <p>, with line breaks collapsed to spaces
    let textCell = '';
    const p = card.querySelector('p');
    if (p) {
      // Get all text including <br>, collapse whitespace sensibly
      // Use innerHTML and replace <br> with spaces for clarity
      let html = p.innerHTML;
      html = html.replace(/<br\s*\/?>(\s*)/gi, ' ');
      // Create a temporary element to get the textContent
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const plainText = temp.textContent.replace(/\s+/g, ' ').trim();
      textCell = plainText;
    }
    return [imageCell, textCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
