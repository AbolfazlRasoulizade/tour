import alpine from 'alpinejs';

import './lib/banner.js';
// import './lib/data.product-item.js';
import './lib/global-util.js';
import {logger} from './lib/logger.js';
import './lib/register-service-worker.js';
import './lib/store.cart.js';
import './lib/store.chat.js';
import './lib/store.order.js';
import './lib/store.product-list.js';
import './lib/store.shipping.js';

logger.logModule?.('main');

alpine.start();
