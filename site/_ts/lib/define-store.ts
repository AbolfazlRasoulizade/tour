import {getLocalStorageItem, setLocalStorageItem} from '@alwatr/util';
import alpine from 'alpinejs';

import {logger} from './logger.js';

import type {StringifyableRecord} from '@alwatr/type';

logger.logModule?.('define-store');

export interface StoreConfig extends Record<string, unknown> {
  data: StringifyableRecord;
  load?(): void;
  save?(): void;
}

export function defineStore(name: string, config: StoreConfig, version = 'v1') {
  logger.logMethodArgs?.('defineStore', {name, config});
  const localStorageName = `store.${name}.${version}`;

  config.load = function (this: StoreConfig) {
    logger.logMethod?.('cart.load');
    this.data = getLocalStorageItem(localStorageName, config.data);
  };

  config.save = function (this: StoreConfig) {
    logger.logMethodArgs?.('cart.save', this.data);
    setLocalStorageItem(localStorageName, this.data);
  };

  config.load();

  alpine.store(name, config);

  requestAnimationFrame(() => {
    (alpine.store(name) as StoreConfig).load?.();
  });
}
