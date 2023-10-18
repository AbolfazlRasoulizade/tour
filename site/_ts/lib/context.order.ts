import {AlwatrServerContext, AlwatrApiRequest} from '@alwatr/server-context';

import {config} from './config.js';
import {logger} from './logger.js';

import type {Order} from './type.js';
import type {AlwatrDocumentStorage} from '@alwatr/type';

logger.logModule?.('context.order');

export const orderContext = new AlwatrServerContext<AlwatrDocumentStorage<Order>>({
  name: 'order-context',
  url: config.order.baseUrl + '/publistore/auth/order-list',
  token: config.user.token,
});

export const orderApiRequest = new AlwatrApiRequest({
  name: 'order-api-request',
  url: config.order.baseUrl + '/order',
  method: 'PUT',
  token: `${config.user.id}/${config.user.token}`,
});
