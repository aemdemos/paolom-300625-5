/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];
  // Header row as per block guidelines
  rows.push(['Accordion (accordion76)']);

  // Find all accordion items: each is a pair of adjacent [title, content] elements
  // The input pattern is: [title, content, title, content, ...]
  const children = Array.from(element.children);
  for (let i = 0; i < children.length; i++) {
    const titleCandidate = children[i];
    const contentCandidate = children[i + 1];
    // Make sure both title and content exist, and that the content panel has the right kind of class
    if (
      titleCandidate &&
      contentCandidate &&
      titleCandidate.matches('[data-sf-element="Accordion Title"]') &&
      contentCandidate.matches('[data-sf-element="Accordion Content"]')
    ) {
      // Find the title element inside the titleCandidate
      let titleElem = titleCandidate.querySelector('.collapse-title, .accordion');
      if (!titleElem) titleElem = titleCandidate.firstElementChild || titleCandidate;
      // Use the entire contentCandidate as the content cell
      rows.push([
        titleElem,
        contentCandidate
      ]);
      i++; // Skip the next, as it's just been processed as content
    }
  }

  // Only replace if at least one accordion item found
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
