import alpine from 'alpinejs';

import {defineStore} from './define-store.js';
import {logger} from './logger.js';

import type {Order} from './type.js';

logger.logModule?.('store.shipping');

export interface ShippingStorage extends Record<string, unknown> {
  data: Order['shippingInfo'];
  update(): void;
  save?(): void;
  readonly isValid: boolean;
}

export const _shippingStorage: ShippingStorage = {
  data: {},

  update(this: ShippingStorage) {
    logger.logMethod?.('shipping.update');
    this.save?.();
  },

  get isValid(): boolean {
    logger.logMethod?.('shipping.isValid');
    return true;
  },
};

defineStore('shipping', _shippingStorage, 'v0');

export const shippingStorage = alpine.store('shipping') as ShippingStorage;
