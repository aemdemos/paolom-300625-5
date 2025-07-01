/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Accordion (accordion28)'];

  // Helper to extract accordion items (returns array of [titleElem, contentElem])
  function getAccordionItems(col) {
    const items = [];
    col.querySelectorAll(':scope > .accordion-item').forEach((item) => {
      const title = item.querySelector('.collapse-title');
      const content = item.querySelector('.collapse-content');
      // Defensive: Only add if both title and content are present
      if (title && content) {
        items.push([title, content]);
      }
    });
    return items;
  }

  // Find columns: look for immediate children with accordion-items
  let leftCol = null, rightCol = null;
  const directDivs = element.querySelectorAll(':scope > div');
  for (let i = 0; i < directDivs.length; i++) {
    if (directDivs[i].querySelector(':scope > .accordion-item')) {
      if (!leftCol) {
        leftCol = directDivs[i];
      } else if (!rightCol) {
        rightCol = directDivs[i];
      }
    }
  }
  // Fallback by id/class (robustness)
  if (!leftCol) {
    leftCol = element.querySelector('#Main_C016_Col00, .column-left');
  }
  if (!rightCol) {
    rightCol = element.querySelector('#Main_C016_Col01, .column-right');
  }

  // Extract all items for each column
  const leftItems = leftCol ? getAccordionItems(leftCol) : [];
  const rightItems = rightCol ? getAccordionItems(rightCol) : [];
  // Determine number of rows (the greater of either column)
  const maxRows = Math.max(leftItems.length, rightItems.length);

  // Prepare table rows: each row has 2 cells, [leftCell, rightCell], each is [title, content]
  const table = [headerRow];
  for (let i = 0; i < maxRows; i++) {
    // If a side is missing, cell is empty
    const leftCell = leftItems[i] ? [leftItems[i][0], leftItems[i][1]] : '';
    const rightCell = rightItems[i] ? [rightItems[i][0], rightItems[i][1]] : '';
    table.push([leftCell, rightCell]);
  }

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
