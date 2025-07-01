/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main scene container representing the columns area
  const sceneContainer = element.querySelector('.scene-container');
  if (!sceneContainer) return;

  // Each .info-panel (4 of them) is a column: left, right (x3)
  // Only immediate children of .scene-container
  const infoPanels = Array.from(sceneContainer.querySelectorAll(':scope > div.info-panel'));
  if (infoPanels.length < 2) return;

  // For each panel, use its .info-panel__content-container if present
  const columns = infoPanels.map(panel => {
    const content = panel.querySelector(':scope > .info-panel__content-container');
    return content || panel;
  });

  // Table cells array: header row, columns row
  const cells = [
    ['Columns (columns1)'],
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original root element
  element.replaceWith(block);
}
