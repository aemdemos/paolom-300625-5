/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row per block spec
  const headerRow = ['Hero (hero68)'];
  // No background image in the HTML, so 2nd row is empty
  const bgRow = [''];

  // Content row: Title ("Documents Required"), Call-to-Action (button), Tooltip icon, Tooltip text
  // We want to preserve the semantic structure and reference existing elements

  // Find the apply button
  const button = element.querySelector('a.btn');

  // Find the 'Documents Required' text node (between button and tooltip group)
  let titleText = '';
  let currentNode = button && button.nextSibling;
  // Find first non-empty text node after the button
  while (currentNode && (currentNode.nodeType !== Node.TEXT_NODE || !currentNode.textContent.trim())) {
    currentNode = currentNode.nextSibling;
  }
  if (currentNode && currentNode.nodeType === Node.TEXT_NODE) {
    titleText = currentNode.textContent.trim();
  }

  // Find tooltip group (icon and tooltip)
  const tooltipGroup = element.querySelector('.tooltip-group');
  // The icon
  const tooltipIcon = tooltipGroup ? tooltipGroup.querySelector('img') : null;
  // The tooltip content is deep inside nested .tooltip-content divs
  let tooltipContent = null;
  if (tooltipGroup) {
    tooltipContent = tooltipGroup.querySelector('.tooltip-content');
  }

  // Compose content as a single container
  const contentDiv = document.createElement('div');
  // Add the title (as heading, since it's the only big text)
  if (titleText) {
    const h2 = document.createElement('h2');
    h2.textContent = titleText;
    contentDiv.appendChild(h2);
  }
  // Add icon if present
  if (tooltipIcon) {
    contentDiv.appendChild(tooltipIcon);
  }
  // Add button if present
  if (button) {
    contentDiv.appendChild(button);
  }
  // Add tooltip text if present
  if (tooltipContent) {
    // If tooltipContent contains another tooltip-content, extract the innermost
    let innerTooltip = tooltipContent;
    while (innerTooltip.querySelector('.tooltip-content')) {
      innerTooltip = innerTooltip.querySelector('.tooltip-content');
    }
    // Add as a paragraph for clarity
    const tipPara = document.createElement('p');
    tipPara.innerHTML = innerTooltip.innerHTML;
    contentDiv.appendChild(tipPara);
  }

  const contentRow = [contentDiv];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
