/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import hero3Parser from './parsers/hero3.js';
import columns2Parser from './parsers/columns2.js';
import columns5Parser from './parsers/columns5.js';
import columns9Parser from './parsers/columns9.js';
import columns1Parser from './parsers/columns1.js';
import accordion14Parser from './parsers/accordion14.js';
import accordion16Parser from './parsers/accordion16.js';
import cards15Parser from './parsers/cards15.js';
import columns10Parser from './parsers/columns10.js';
import tableStripedBordered6Parser from './parsers/tableStripedBordered6.js';
import accordion12Parser from './parsers/accordion12.js';
import columns17Parser from './parsers/columns17.js';
import columns19Parser from './parsers/columns19.js';
import carousel24Parser from './parsers/carousel24.js';
import columns20Parser from './parsers/columns20.js';
import accordion13Parser from './parsers/accordion13.js';
import accordion21Parser from './parsers/accordion21.js';
import columns25Parser from './parsers/columns25.js';
import accordion28Parser from './parsers/accordion28.js';
import tableStripedBordered29Parser from './parsers/tableStripedBordered29.js';
import carousel11Parser from './parsers/carousel11.js';
import search26Parser from './parsers/search26.js';
import tableStripedBordered34Parser from './parsers/tableStripedBordered34.js';
import cards4Parser from './parsers/cards4.js';
import embedVideo8Parser from './parsers/embedVideo8.js';
import embedVideo37Parser from './parsers/embedVideo37.js';
import cards23Parser from './parsers/cards23.js';
import cards40Parser from './parsers/cards40.js';
import columns39Parser from './parsers/columns39.js';
import tableStripedBordered7Parser from './parsers/tableStripedBordered7.js';
import columns35Parser from './parsers/columns35.js';
import cards27Parser from './parsers/cards27.js';
import cards33Parser from './parsers/cards33.js';
import tableBordered47Parser from './parsers/tableBordered47.js';
import cards30Parser from './parsers/cards30.js';
import hero22Parser from './parsers/hero22.js';
import tableStripedBordered45Parser from './parsers/tableStripedBordered45.js';
import hero51Parser from './parsers/hero51.js';
import hero50Parser from './parsers/hero50.js';
import cards54Parser from './parsers/cards54.js';
import columns49Parser from './parsers/columns49.js';
import cards55Parser from './parsers/cards55.js';
import hero56Parser from './parsers/hero56.js';
import columns48Parser from './parsers/columns48.js';
import search42Parser from './parsers/search42.js';
import hero38Parser from './parsers/hero38.js';
import accordion60Parser from './parsers/accordion60.js';
import tabs44Parser from './parsers/tabs44.js';
import columns57Parser from './parsers/columns57.js';
import accordion63Parser from './parsers/accordion63.js';
import cards31Parser from './parsers/cards31.js';
import hero66Parser from './parsers/hero66.js';
import accordion65Parser from './parsers/accordion65.js';
import cardsNoImages69Parser from './parsers/cardsNoImages69.js';
import columns58Parser from './parsers/columns58.js';
import accordion59Parser from './parsers/accordion59.js';
import cards61Parser from './parsers/cards61.js';
import carousel71Parser from './parsers/carousel71.js';
import tabs70Parser from './parsers/tabs70.js';
import hero74Parser from './parsers/hero74.js';
import embedVideo72Parser from './parsers/embedVideo72.js';
import accordion64Parser from './parsers/accordion64.js';
import tabs75Parser from './parsers/tabs75.js';
import accordion76Parser from './parsers/accordion76.js';
import accordion46Parser from './parsers/accordion46.js';
import search43Parser from './parsers/search43.js';
import columns77Parser from './parsers/columns77.js';
import cards62Parser from './parsers/cards62.js';
import columns78Parser from './parsers/columns78.js';
import embedVideo73Parser from './parsers/embedVideo73.js';
import hero68Parser from './parsers/hero68.js';
import embedVideo67Parser from './parsers/embedVideo67.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero3: hero3Parser,
  columns2: columns2Parser,
  columns5: columns5Parser,
  columns9: columns9Parser,
  columns1: columns1Parser,
  accordion14: accordion14Parser,
  accordion16: accordion16Parser,
  cards15: cards15Parser,
  columns10: columns10Parser,
  tableStripedBordered6: tableStripedBordered6Parser,
  accordion12: accordion12Parser,
  columns17: columns17Parser,
  columns19: columns19Parser,
  carousel24: carousel24Parser,
  columns20: columns20Parser,
  accordion13: accordion13Parser,
  accordion21: accordion21Parser,
  columns25: columns25Parser,
  accordion28: accordion28Parser,
  tableStripedBordered29: tableStripedBordered29Parser,
  carousel11: carousel11Parser,
  search26: search26Parser,
  tableStripedBordered34: tableStripedBordered34Parser,
  cards4: cards4Parser,
  embedVideo8: embedVideo8Parser,
  embedVideo37: embedVideo37Parser,
  cards23: cards23Parser,
  cards40: cards40Parser,
  columns39: columns39Parser,
  tableStripedBordered7: tableStripedBordered7Parser,
  columns35: columns35Parser,
  cards27: cards27Parser,
  cards33: cards33Parser,
  tableBordered47: tableBordered47Parser,
  cards30: cards30Parser,
  hero22: hero22Parser,
  tableStripedBordered45: tableStripedBordered45Parser,
  hero51: hero51Parser,
  hero50: hero50Parser,
  cards54: cards54Parser,
  columns49: columns49Parser,
  cards55: cards55Parser,
  hero56: hero56Parser,
  columns48: columns48Parser,
  search42: search42Parser,
  hero38: hero38Parser,
  accordion60: accordion60Parser,
  tabs44: tabs44Parser,
  columns57: columns57Parser,
  accordion63: accordion63Parser,
  cards31: cards31Parser,
  hero66: hero66Parser,
  accordion65: accordion65Parser,
  cardsNoImages69: cardsNoImages69Parser,
  columns58: columns58Parser,
  accordion59: accordion59Parser,
  cards61: cards61Parser,
  carousel71: carousel71Parser,
  tabs70: tabs70Parser,
  hero74: hero74Parser,
  embedVideo72: embedVideo72Parser,
  accordion64: accordion64Parser,
  tabs75: tabs75Parser,
  accordion76: accordion76Parser,
  accordion46: accordion46Parser,
  search43: search43Parser,
  columns77: columns77Parser,
  cards62: cards62Parser,
  columns78: columns78Parser,
  embedVideo73: embedVideo73Parser,
  hero68: hero68Parser,
  embedVideo67: embedVideo67Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all elements using parsers
  [...blockElements, ...pageElements].forEach((item) => {
    const { element = main, ...pageBlock } = item;
    const isBlockElement = blockElements.includes(item);
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      let parserElement = element;
      if (typeof parserElement === 'string') {
        parserElement = main.querySelector(parserElement);
      }
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, parserElement, { ...source });
      // parse the element
      if (isBlockElement) {
        WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      }
      parserFn.call(this, parserElement, { ...source });
      if (isBlockElement) {
        WebImporter.DOMUtils.createTable = tableBuilder.restore();
      }
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, parserElement, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${parserName}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
