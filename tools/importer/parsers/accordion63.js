/* global WebImporter */
export default function parse(element, { document }) {
  // Get the collapse-wrapper inside the accordion-item
  const wrapper = element.querySelector(':scope > .collapse-wrapper');
  if (!wrapper) return;

  // Get the title (should be direct child)
  const title = wrapper.querySelector(':scope > .collapse-title');
  // Get the content (should be direct child)
  const content = wrapper.querySelector(':scope > .collapse-content');

  // Defensive: handle missing title or content
  if (!title && !content) return;

  // Create the rows array for the block table
  const rows = [
    ['Accordion (accordion63)'],
    [title || '', content || '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(block);
}
