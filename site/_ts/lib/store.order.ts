import alpine from 'alpinejs';

import {orderContext} from './context.order.js';
import {logger} from './logger.js';

import type {Order} from './type.js';
import type {ServerRequestState} from '@alwatr/server-context';
import type {AlwatrDocumentStorage} from '@alwatr/type';

logger.logModule?.('store.chat');

export interface OrderStorage extends Record<string, unknown> {
  orderList?: Order[];
  state: ServerRequestState;

  request(): void;
  reload(): void;
  update(state: ServerRequestState, context?: AlwatrDocumentStorage<Order>): void;
}

const _orderStorage: OrderStorage = {
  state: 'initial',

  request() {
    logger.logMethod?.('order.init');

    orderContext.request();
    orderContext.subscribe((state) => {
      logger.logMethodArgs?.('orderContext', {state});
      this.update(orderContext.state as ServerRequestState, orderContext.context);
    });
  },

  reload() {
    logger.logMethod?.('order.reload');

    orderContext.request();
  },

  update(this: OrderStorage, state: ServerRequestState, context?: AlwatrDocumentStorage<Order>) {
    this.orderList = Object.values(context?.data ?? {}).reverse();
    this.state = state;
  },
};

alpine.store('order', _orderStorage);

export const orderStorage = alpine.store('order') as OrderStorage;
