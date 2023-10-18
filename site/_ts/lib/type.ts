import type {AlwatrDocumentObject, MultiLangStringObj, Photo, StringifyableRecord} from '@alwatr/type';

export const ladingTypeCS = ['hand', 'pallet'] as const;
export type LadingType = (typeof ladingTypeCS)[number];

export const carTypeCS = [
  'trailer_truck',
  'camion_dual',
  'camion_solo',
  'camion_911',
  'camion_800',
  'camion_600',
  'camion_mini',
  'nissan',
] as const;
export type CarType = (typeof carTypeCS)[number];

export const timePeriodCS = ['auto', '3_4w', '2_3w', '1_2w'] as const;
export type TimePeriod = (typeof timePeriodCS)[number];

export interface ProductDetail extends AlwatrDocumentObject {
  /**
   * Product global unique id.
   */
  id: string;

  /**
   * Product title
   */
  title: MultiLangStringObj;

  /**
   * Product image
   */
  image: Photo;

  minOrder: number;
  countInBox: number;
  priceFactor: number;

  priceA: number;
  priceB: number;
  priceC: number;
  priceD: number;
}

export interface OrderShippingInfo extends StringifyableRecord {
  recipientName: string;
  recipientNationalCode: string;
  address: string;
  description: string;
  ladingType: LadingType;
  carType: CarType;
  timePeriod: TimePeriod;
}

export interface OrderItem extends StringifyableRecord {
  /**
   * Product unique id.
   */
  productId: string;

  /**
   * Quantity of this item.
   */
  qty: number;

  /**
   * The original price of single product in the market.
   */
  displayPrice: number;

  /**
   * The selling price of a product after any discounts to this buyer.
   */
  salePrice: number;
}

export const orderStatusCS = [
  'draft',
  'registered',
  'processing',
  'payment_pending',
  'preparing',
  'shipping',
  'delayed',
  'on_hold',
  'canceled',
  'refunded',
] as const;
export type OrderStatus = (typeof orderStatusCS)[number];

export interface Order extends AlwatrDocumentObject {
  /**
   * Order auto incremental unique id.
   */
  id: string;

  /**
   * Order Status
   */
  status: OrderStatus;

  /**
   * Order cart list.
   *
   * Example:
   *
   * ```json
   * {
   *   // ...
   *   "itemList": {
   *     "tile": [
   *       {
   *         "productId": "tile-1",
   *         "qty": 80,
   *         "displayPrice": 100,
   *         "salePrice": 79
   *       }
   *     ],
   *     "lighting": [
   *       {
   *         "productId": "lighting-1",
   *         "qty": 10,
   *         "displayPrice": 100,
   *         "salePrice": 79
   *       }
   *     ],
   *     "connection": [
   *       {
   *         "productId": "connection-1",
   *         "qty": 20,
   *         "displayPrice": 100,
   *         "salePrice": 79
   *       }
   *     ]
   *   }
   * }
   * ```
   */
  itemList: Record<string, OrderItem[]>;

  /**
   * Delivery info
   */
  shippingInfo: Partial<OrderShippingInfo>;

  // discount: number;
  // discountType: DiscountType;

  /**
   * The total displayPrice of all items in the cart.
   */
  sumDisplayPrice: number;

  /**
   * The total salePrice of all items in the cart.
   */
  sumSalePrice: number;

  /**
   * The cost of lading the order.
   */
  // ladingFee: number;

  /**
   * The cost of pallet.
   */
  // palletCost: number;

  /**
   * The cost of shipping price.
   */
  // shippingFee: number;

  /**
   * Total shipping const.
   */
  // totalShippingFee: number;

  /**
   * Customer device uuid.
   */
  clientId?: string;

  /**
   * Customer device ip address.
   */
  remoteAddress?: string;
}
