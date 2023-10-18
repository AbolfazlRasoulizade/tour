import alpine from 'alpinejs';

import {logger} from './logger.js';
import productList from '../../_data/products.json' assert {type: 'json'};

import type {ProductDetail} from './type.js';

logger.logModule?.('store.product-list');

export const productListStorage = {
  data: productList,

  get: (category: string, productId: string): ProductDetail => {
    logger.logMethodArgs?.('productList.get', {category, productId});
    return productListStorage.data[category][productId];
  },
};

alpine.store('productList', productListStorage);
