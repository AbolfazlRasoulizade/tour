import {untilNextFrame} from '@alwatr/util';
import alpine from 'alpinejs';

import {commentApiRequest, commentContext} from './context.chat.js';
import {logger} from './logger.js';

import type {ServerRequestState} from '@alwatr/server-context';
import type {ChatStorage as AlwatrChatStorage, ChatTextMessage} from '@alwatr/type';

logger.logModule?.('store.chat');

export interface ChatStorage extends Record<string, unknown> {
  state: ServerRequestState;
  sending: boolean;
  chatList?: ChatTextMessage[];
  meta?: AlwatrChatStorage['meta'];

  request(): void;
  reload(): void;
  sendMessage(text: string): void;
  update(state: ServerRequestState, context?: AlwatrChatStorage): void;
}

const _chatStorage: ChatStorage = {
  state: 'initial',
  sending: false,

  request() {
    logger.logMethod?.('chat.init');

    commentContext.request();
    commentContext.subscribe((state) => {
      logger.logMethodArgs?.('commentContext', {state});
      this.update(state as ServerRequestState, commentContext.context);
    });
  },

  reload() {
    logger.logMethod?.('chat.reload');

    commentContext.request();
  },

  sendMessage(this: ChatStorage, text: string) {
    logger.logMethodArgs?.('chat.sendMessage', text);
    text = text.trim();

    if (text.length === 0) return;
    this.sending = true;

    commentApiRequest.request({
      bodyJson: {
        id: 'auto_increment',
        user: 'user-1',
        type: 'text',
        text,
      },
    });

    const listener = commentApiRequest.subscribe((state) => {
      if (state === 'complete') {
        this.sending = false;
        this.reload();
        listener.unsubscribe();
      }
    });
  },

  update(this: ChatStorage, state: ServerRequestState, context?: AlwatrChatStorage) {
    this.state = state;
    this.chatList = Object.values(context?.data ?? {});
    this.meta = context?.meta;

    // wait to paint
    untilNextFrame().then(() => {
      // scroll $el to end with animation
      const chatContainer = document.querySelector('main.overflow-y-scroll');
      chatContainer?.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth',
      });
    });
  },
};

alpine.store('chat', _chatStorage);

export const chatStorage = alpine.store('chat') as ChatStorage;
