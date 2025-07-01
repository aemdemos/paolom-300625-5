/* global WebImporter */
export default function parse(element, { document }) {
  // Header as required
  const headerRow = ['Embed (embedVideo67)'];
  
  // Helper: Replace iframes (and other non-img src) with link, leave images as is
  function processNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // If iframe or embed or video or audio, replace with <a href=src>
      if (
        (node.tagName.toLowerCase() === 'iframe' ||
         node.tagName.toLowerCase() === 'embed' ||
         node.tagName.toLowerCase() === 'video' ||
         node.tagName.toLowerCase() === 'audio') &&
        node.src
      ) {
        const a = document.createElement('a');
        a.href = node.src;
        a.textContent = node.src;
        return a;
      }
      // For <img>, keep as is
      if (node.tagName.toLowerCase() === 'img') {
        return node;
      }
      // For other elements, process children recursively
      const clone = document.createElement(node.tagName);
      // Copy attributes except for src
      for (const attr of node.attributes) {
        if (attr.name !== 'src') {
          clone.setAttribute(attr.name, attr.value);
        }
      }
      for (const child of node.childNodes) {
        const processed = processNode(child);
        if (processed) clone.appendChild(processed);
      }
      return clone;
    } else if (node.nodeType === Node.TEXT_NODE) {
      return document.createTextNode(node.textContent);
    }
    return null;
  }

  // Process all top-level nodes preserving their order
  const content = [];
  for (const child of element.childNodes) {
    const processed = processNode(child);
    if (processed) content.push(processed);
  }
  if (content.length === 0) {
    content.push(document.createTextNode(''));
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [content.length === 1 ? content[0] : content]
  ], document);

  // Replace the element with the new table
  element.replaceWith(table);
}
