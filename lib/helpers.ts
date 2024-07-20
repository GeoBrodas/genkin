import { customAlphabet } from 'nanoid';

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn();
};

export const currency = {
  Rupee: {
    symbol: '\u20B9',
  },
  Dollar: {
    symbol: '\u0024',
  },
  Euro: {
    symbol: '	\u20A0',
  },
  Cent: {
    symbol: '	\u00A2',
  },
};
