/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table rows
  const rows = [
    ['Accordion (accordion65)']
  ];

  // Find the outer accordion item block
  const accordionDiv = element.querySelector('.accordion');
  if (accordionDiv) {
    // Title cell content build
    const titleCellContent = [];
    // Find Apply Online button (may be anywhere in accordionDiv)
    const applyBtn = accordionDiv.querySelector('.btn');

    // Find the title text node (should be after the button, before tooltip-group)
    // and any other nodes that are part of the title
    let foundBtn = false;
    let foundTooltip = false;
    accordionDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('btn')) {
        titleCellContent.push(node);
        foundBtn = true;
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Only use the title text between button and tooltip-group
        titleCellContent.push(document.createTextNode(node.textContent.trim()));
      } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('tooltip-group')) {
        // Add the icon (tooltip-btn) to the title cell
        const tooltipBtn = node.querySelector('.tooltip-btn');
        if (tooltipBtn) titleCellContent.push(tooltipBtn);
        foundTooltip = true;
      }
    });

    // Defensive fallback if no text found (should not happen)
    if (titleCellContent.length === 0) {
      const fallbackTitle = accordionDiv.textContent.trim();
      if (fallbackTitle) titleCellContent.push(document.createTextNode(fallbackTitle));
    }

    // Content cell is the .tooltip-group .tooltip-content .modal-content (the actual tooltip body)
    let contentCell = '';
    const tooltipContent = accordionDiv.querySelector('.tooltip-group .tooltip-content .modal-content');
    if (tooltipContent) {
      contentCell = tooltipContent;
    }
    // Defensive: if tooltip content is missing, provide an empty content cell
    rows.push([
      titleCellContent,
      contentCell || ''
    ]);
  }

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
