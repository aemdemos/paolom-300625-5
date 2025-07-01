/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child divs (these are likely the title/content wrappers)
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));
  let titleDiv = null, contentDiv = null;

  // Find the div with class containing 'collapse-title' and 'collapse-content'
  for (const div of childDivs) {
    if (div.className && div.className.includes('collapse-title')) {
      titleDiv = div;
    }
    if (div.className && div.className.includes('collapse-content')) {
      contentDiv = div;
    }
  }

  // If either is missing, fallback to searching deeper
  if (!titleDiv || !contentDiv) {
    element.querySelectorAll('div').forEach((div) => {
      if (!titleDiv && div.className && div.className.includes('collapse-title')) titleDiv = div;
      if (!contentDiv && div.className && div.className.includes('collapse-content')) contentDiv = div;
    });
  }

  // Prepare table rows: header + one row per accordion item
  const cells = [
    ['Accordion (accordion59)']
  ];

  if (titleDiv && contentDiv) {
    // For the title cell, reference the existing titleDiv directly.
    // For the content cell, we want all content as it appears (exclude leading/trailing <br>s)
    // But do not clone; reference the actual nodes.

    // Title: reference the whole titleDiv, which already contains icons/tooltips.
    // Content: gather all children of contentDiv except <br>
    let contentNodes = Array.from(contentDiv.childNodes).filter(n => {
      // Only skip <br> nodes
      return !(n.nodeType === 1 && n.nodeName === 'BR');
    });
    // If contentNodes is empty, push empty string so table structure is not broken
    cells.push([
      titleDiv,
      contentNodes.length > 0 ? contentNodes : ['']
    ]);
  }

  // Replace the original element with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
