/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards31) block
  const cells = [['Cards (cards31)']];

  // --- Card 1: Icon (tooltip), Text: Heading, Tooltip, CTA ---
  // Extract left icon (the information icon)
  const icon = element.querySelector('.tooltip-btn img');

  // Extract heading
  const h1 = element.querySelector('h1');

  // Extract tooltip content (description)
  const tooltipContent = element.querySelector('.tooltip-content');

  // Extract CTA button
  const cta = element.querySelector('a.btn');

  // Build text cell content (reference existing nodes, don't clone)
  const textFragment = document.createDocumentFragment();
  if (h1) {
    // Use the existing h1 for correct semantics
    textFragment.appendChild(h1);
  }
  if (tooltipContent) {
    // Place all content from tooltipContent (preserve structure)
    Array.from(tooltipContent.childNodes).forEach(child => {
      textFragment.appendChild(child);
    });
  }
  if (cta) {
    // Add CTA below content
    // Add a <br> for spacing if needed
    textFragment.appendChild(document.createElement('br'));
    textFragment.appendChild(cta);
  }

  // Add card row if any content exists
  if (icon && textFragment.childNodes.length > 0) {
    cells.push([icon, textFragment]);
  }

  // Create and replace with the cards table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
