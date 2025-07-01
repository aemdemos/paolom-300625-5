/* global WebImporter */
export default function parse(element, { document }) {
  // Only replace if there is a video embed (iframe src or anchor to known video platforms)
  function isVideoLink(href) {
    if (!href) return false;
    return /youtube.com|youtu.be|vimeo.com/.test(href);
  }
  // Check for iframe
  const iframe = element.querySelector('iframe[src]');
  if (iframe) {
    // Build cell with optional poster image above link
    const imgs = element.querySelectorAll('img');
    const cellContent = [];
    if (imgs.length > 0) cellContent.push(imgs[0]);
    const a = document.createElement('a');
    a.href = iframe.src;
    a.textContent = iframe.src;
    cellContent.push(a);
    const rows = [
      ['Embed (embedVideo37)'],
      [cellContent]
    ];
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
    return;
  }
  // Check for anchor video links
  const links = element.querySelectorAll('a[href]');
  for (const l of links) {
    if (isVideoLink(l.href)) {
      const imgs = element.querySelectorAll('img');
      const cellContent = [];
      if (imgs.length > 0) cellContent.push(imgs[0]);
      const a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.href;
      cellContent.push(a);
      const rows = [
        ['Embed (embedVideo37)'],
        [cellContent]
      ];
      const table = WebImporter.DOMUtils.createTable(rows, document);
      element.replaceWith(table);
      return;
    }
  }
  // No embed present: do not replace element
}
