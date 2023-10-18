import alpine from 'alpinejs';

import {logger} from './logger.js';
import {cartStorage} from './store.cart.js';

logger.logModule?.('data.product-item');

alpine.data('productItem', (category: unknown, productId: unknown) => {
  let selected = false;
  if (typeof category !== 'string' || typeof productId !== 'string') {
    logger.accident('productItem', 'invalid_argument', `category: ${category}, productId: ${productId}`);
    return {selected: false};
  }
  selected = cartStorage.findIndex(category, productId) !== -1;
  return {selected};
});
