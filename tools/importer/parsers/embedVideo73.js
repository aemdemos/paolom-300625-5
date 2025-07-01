/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as specified in the example
  const headerRow = ['Embed (embedVideo73)'];

  // Gather all elements that should appear in the embed cell
  // 1. Collect all images (for poster)
  const images = Array.from(element.querySelectorAll('img'));

  // 2. Collect all text content, preserving structure (get all visible text from descendants)
  function extractTextNodes(node) {
    let arr = [];
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const txt = child.textContent.trim();
        if (txt) arr.push(txt);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== 'img') {
        arr = arr.concat(extractTextNodes(child));
      }
    }
    return arr;
  }
  const allText = extractTextNodes(element);
  let textBlock = null;
  if (allText.length) {
    textBlock = document.createElement('div');
    // Join text content, separated by <br> between blocks (not between every line)
    textBlock.innerHTML = allText.join('<br>');
  }

  // 3. Collect embed video links (iframe src, or plain <a> links to video providers)
  // (None in this sample, but make code resilient)
  let embedLink = null;
  const iframe = element.querySelector('iframe');
  if (iframe && iframe.src) {
    embedLink = document.createElement('a');
    embedLink.href = iframe.src;
    embedLink.textContent = iframe.src;
  } else {
    // Find <a> to known video providers
    const link = element.querySelector('a[href*="youtube.com"], a[href*="youtu.be"], a[href*="vimeo.com"], a[href*="dailymotion.com"]');
    if (link) {
      embedLink = document.createElement('a');
      embedLink.href = link.href;
      embedLink.textContent = link.href;
    }
  }

  // 4. Combine all content into a single array, in order: images, then text, then video link
  const cellContent = [];
  if (images.length) cellContent.push(...images);
  if (textBlock) cellContent.push(textBlock);
  if (embedLink) cellContent.push(embedLink);

  // fallback: if nothing, at least include something (shouldn't happen, but to be robust)
  if (cellContent.length === 0) {
    // Put the element's HTML as a last resort
    cellContent.push(document.createTextNode(element.textContent || ''));
  }

  // Construct the block table
  const cells = [
    headerRow,
    [cellContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
