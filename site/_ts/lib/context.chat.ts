import {AlwatrServerContext, AlwatrApiRequest} from '@alwatr/server-context';

import {config} from './config.js';
import {logger} from './logger.js';

import type {ChatMessage, ChatStorage, AlwatrServiceResponse} from '@alwatr/type';

logger.logModule?.('context.chat');

export const commentContext = new AlwatrServerContext<ChatStorage>({
  name: 'comment-context',
  url: config.comment.baseUrl + '/storage',
  queryParameters: {name: config.comment.storage},
  token: config.comment.token,
});

export const commentApiRequest = new AlwatrApiRequest<AlwatrServiceResponse<ChatMessage>>({
  name: 'comment-api-request',
  method: 'PATCH',
  url: config.comment.baseUrl + '/',
  queryParameters: {storage: config.comment.storage},
  token: config.comment.token,
});
