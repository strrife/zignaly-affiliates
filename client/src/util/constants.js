export const USER_AFFILIATE = 'AFFILIATE';
export const USER_MERCHANT = 'MERCHANT';

export const SERVICE_TYPE_MONTHLY_FEE = 'MONTHLY_FEE';
export const SERVICE_TYPE_PROFIT_SHARING = 'PROFIT_SHARING';

export const SERVICE_TYPE_LABELS = {
  [SERVICE_TYPE_MONTHLY_FEE]: 'Monthly fee',
  [SERVICE_TYPE_PROFIT_SHARING]: 'Success fee',
};

export const SERVICE_BASE = 'https://zignaly.com/';
export const ACTUAL_SERVICE_BASE = 'https://zignaly.com/';

export const DISCOUNT_CODE_EXTRA_LIFE = 'EXTRA_LIFE';
export const DISCOUNT_CODE_PERCENT = 'PERCENT';
export const DISCOUNT_CODE_FIXED_AMOUNT = 'FIXED_AMOUNT';

export const SUPPORT_EMAIL =
  process.env.REACT_APP_SUPPORT_EMAIL || 'hello@zignaly.com';
