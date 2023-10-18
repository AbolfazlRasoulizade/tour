import {orderApiRequest} from './context.order.js';
import {defineStore} from './define-store.js';
import {logger} from './logger.js';
import {productListStorage} from './store.product-list.js';
import {shippingStorage} from './store.shipping.js';

import type {Order, ProductDetail} from './type.js';
import type {ServerRequestState} from '@alwatr/server-context';

logger.logModule?.('store.cart');

export interface CartStorage extends Record<string, unknown> {
  data: Order;
  submitState: ServerRequestState;
  findIndex(category: string, productId: string): number;
  add(category: string, productId: string): void;
  remove(category: string, productId: string): void;
  update(): void;
  clear(): void;
  submit(): void;
  save?(): void;
  readonly isEmpty: boolean;
}

const emptyOrder = (): Order => ({
  id: 'new',
  status: 'draft',
  itemList: {
    tile: [],
    lighting: [],
    connection: [],
  },
  sumDisplayPrice: 0,
  sumSalePrice: 0,
  shippingInfo: {},
});

export const cartStorage: CartStorage = {
  data: emptyOrder(),
  submitState: 'initial',

  findIndex(this: CartStorage, category: string, productId: string): number {
    logger.logMethodArgs?.('cart.find', {category, productId});
    return this.data.itemList[category].findIndex((item) => item.productId === productId);
  },

  add(this: CartStorage, category: string, productId: string) {
    logger.logMethodArgs?.('cart.add', {category, id: productId});

    if (this.findIndex(category, productId) !== -1) {
      this.remove(category, productId);
    }

    const productDetail: ProductDetail = productListStorage.data[category][productId];

    this.data.itemList[category].push({
      productId,
      qty: 1,
      displayPrice: productDetail.priceA,
      salePrice: productDetail.priceB,
    });

    this.update?.();
  },

  remove(this: CartStorage, category: string, productId: string) {
    logger.logMethodArgs?.('cart.remove', {category, id: productId});
    const index = this.findIndex(category, productId);
    if (index == -1) {
      logger.accident('cart.remove', 'cart_product_not_found', `${category} ${productId} not found`);
      return;
    }
    this.data.itemList[category].splice(index, 1);
    this.update?.();
  },

  update(this: CartStorage) {
    logger.logMethod?.('cart.update');

    let displayPrice = 0;
    let salePrice = 0;

    const itemList = this.data.itemList;

    for (const category in itemList) {
      for (const cartItem of itemList[category]) {
        const product = productListStorage.get(category, cartItem.productId);
        if (cartItem.qty < product.minOrder) cartItem.qty = product.minOrder;
        displayPrice += cartItem.qty * cartItem.displayPrice * product.countInBox * product.priceFactor;
        salePrice += cartItem.qty * cartItem.salePrice * product.countInBox * product.priceFactor;
      }
    }

    // sum
    this.data.sumDisplayPrice = Math.round(displayPrice);
    this.data.sumSalePrice = Math.round(salePrice);

    this.save?.();
  },

  clear() {
    logger.logMethod?.('cart.clear');
    this.data = emptyOrder();
    this.save?.();
  },

  submit() {
    logger.logMethod?.('cart.submit');

    this.submitState = 'initial';
    if (shippingStorage.isValid) {
      this.data.shippingInfo = shippingStorage.data;
    }
 else {
      logger.accident('cart.submit', 'shipping_info_invalid', 'shipping info invalid');
      // TODO: set state and show to user
    }

    logger.logProperty?.('cart.submit.data', this.data);

    orderApiRequest.request({bodyJson: this.data});

    const listener = orderApiRequest.subscribe((state) => {
      this.submitState = state;
      if (state === 'complete') {
        this.clear();
        listener.unsubscribe();
      }
    });
  },

  get isEmpty(): boolean {
    logger.logMethod?.('cart.isEmpty');
    for (const category in this.data.itemList) {
      if (this.data.itemList[category].length > 0) {
        return false;
      }
    }
    return true;
  },
};

defineStore('cart', cartStorage, 'v0');
