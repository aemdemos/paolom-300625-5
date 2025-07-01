/* global WebImporter */
export default function parse(element, { document }) {
  // Find all sibling .collapse-wrapper elements (typically only one, but can be grouped)
  let wrappers = [];
  if (element.classList.contains('collapse-wrapper') && element.parentElement) {
    wrappers = Array.from(element.parentElement.querySelectorAll(':scope > .collapse-wrapper'));
  }
  if (!wrappers.length) wrappers = [element];

  // Header row: exactly one cell
  const cells = [['Accordion (accordion13)']];

  wrappers.forEach(wrapper => {
    // Find the title and content divs
    let titleDiv = null;
    let contentDiv = null;
    for (const child of wrapper.children) {
      if (
        child.classList.contains('sf_colsIn') &&
        child.getAttribute('data-sf-element') === 'Accordion Title'
      ) {
        titleDiv = child.querySelector('.collapse-title');
      }
      if (
        child.classList.contains('sf_colsIn') &&
        child.classList.contains('collapse-content')
      ) {
        contentDiv = child;
      }
    }
    if (!titleDiv || !contentDiv) return;

    // Extract the title (preserving any HTML structure)
    let titleContent;
    if (titleDiv.childNodes.length === 1) {
      titleContent = titleDiv.firstChild;
    } else {
      const frag = document.createDocumentFragment();
      Array.from(titleDiv.childNodes).forEach(n => frag.appendChild(n));
      titleContent = frag.childNodes.length === 1 ? frag.firstChild : frag;
    }

    // Extract content: remove leading/trailing <br> and empty text nodes
    let contentNodes = Array.from(contentDiv.childNodes);
    // Remove leading/trailing <br> and whitespace-only text nodes
    while (
      contentNodes.length &&
      ((contentNodes[0].nodeType === 1 && contentNodes[0].nodeName === 'BR') ||
        (contentNodes[0].nodeType === 3 && !contentNodes[0].textContent.trim()))
    ) {
      contentNodes.shift();
    }
    while (
      contentNodes.length &&
      ((contentNodes[contentNodes.length - 1].nodeType === 1 && contentNodes[contentNodes.length - 1].nodeName === 'BR') ||
        (contentNodes[contentNodes.length - 1].nodeType === 3 && !contentNodes[contentNodes.length - 1].textContent.trim()))
    ) {
      contentNodes.pop();
    }
    // Flatten if only one node, else fragment
    let contentCell;
    if (contentNodes.length === 1) {
      contentCell = contentNodes[0];
    } else {
      const frag = document.createDocumentFragment();
      contentNodes.forEach(n => frag.appendChild(n));
      contentCell = frag.childNodes.length === 1 ? frag.firstChild : frag;
    }

    // Add the accordion item row: [title, content]
    cells.push([titleContent, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace only the original element (not all wrappers)
  element.replaceWith(table);
}
