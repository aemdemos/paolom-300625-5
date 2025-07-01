/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 'Our Commissioners' info-panel block
  const panels = Array.from(element.querySelectorAll('.info-panel__content-container'));
  // Find the one with title 'Our Commissioners'
  const panel = panels.find(p => {
    const h = p.querySelector('.info-panel__title');
    return h && h.textContent.trim().toLowerCase().includes('commissioner');
  });
  if (!panel) return;

  // Header row
  const headerRow = ['Tabs (tabs70)'];

  // Get the main navigation (sub-category: the tab bar of years)
  const nav = panel.querySelector('.sub-category');
  if (!nav) return;
  const navTabs = Array.from(nav.querySelectorAll('.sub-category__item'));
  if(!navTabs.length) return;

  // Extract tab label and its data-value
  const tabLabels = navTabs.map(tab => tab.textContent.trim());
  const tabValues = navTabs.map(tab => tab.getAttribute('data-value'));

  // Map the card data-target to the content element
  const cardsContainer = panel.querySelector('.content-container__cards');
  if (!cardsContainer) return;
  // Build map: data-target => .info-panel__card
  const cardsMap = {};
  cardsContainer.querySelectorAll('.info-panel__card-container').forEach(cardContainer => {
    const t = cardContainer.getAttribute('data-target');
    const card = cardContainer.querySelector('.info-panel__card');
    if (t && card) cardsMap[t] = card;
  });

  // Build rows: [Tab Label, Content Element]
  const rows = [headerRow];
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const dataValue = tabValues[i];
    // Defensive: sometimes data-value/data-target may be missing or not align exactly
    // Accept the first card if not found by dataValue
    let contentElem = cardsMap[dataValue];
    if (!contentElem) {
      // fallback: try matching by lowercased, stripped spaces
      const tryKey = dataValue && dataValue.replace(/[-_ ]/g, '').toLowerCase();
      for (const key in cardsMap) {
        if (key.replace(/[-_ ]/g, '').toLowerCase() === tryKey) {
          contentElem = cardsMap[key];
          break;
        }
      }
      // fallback: just pick first available
      if (!contentElem) {
        contentElem = Object.values(cardsMap)[i] || Object.values(cardsMap)[0];
      }
    }
    rows.push([label, contentElem || document.createTextNode('')]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the whole panel (not just its content) for robustness
  panel.replaceWith(table);
}
