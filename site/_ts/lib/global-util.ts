import {l10n} from '@alwatr/i18n';
import {calcDiscount} from '@alwatr/math';

import {logger} from './logger';

logger.logModule?.('global-util');

declare global {
  interface Window {
    calcDiscount: typeof calcDiscount;
    clearLocalStorage: typeof clearLocalStorage;
    l10n: typeof l10n;
  }
}

l10n.setResourceLoader((locale) => {
  return {
    ok: true,
    meta: {
      code: locale.code,
      rev: 0,
    },
    data: {
      order_status_draft: 'پیش‌نویس',
      order_status_registered: 'ثبت شده',
      order_status_processing: 'در حال پردازش',
      order_status_payment_pending: 'در انتظار پرداخت',
      order_status_preparing: 'در حال آماده‌سازی',
      order_status_shipping: 'در حال ارسال',
      order_status_delayed: 'تاخیر',
      order_status_on_hold: 'معلق',
      order_status_canceled: 'لغو شده',
      order_status_refunded: 'بازپرداخت شده',
    },
  };
});

function clearLocalStorage() {
  logger.logMethod?.('clearLocalStorage');
  localStorage.clear();
  if (logger.devMode) {
    localStorage.setItem('alwatrDebug', '1');
  }
  location.reload();
}

l10n.setLocale('auto');

window.calcDiscount = calcDiscount;
window.l10n = l10n;
window.clearLocalStorage = clearLocalStorage;
