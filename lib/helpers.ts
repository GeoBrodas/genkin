import { TransactionSchema } from '@/schemas/form';
import { customAlphabet } from 'nanoid';
import { z } from 'zod';
import { ChartData } from './types';

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn();
};

export function getFirstAndLastDayOfMonth(env: 'local' | 'server') {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  let firstDay = new Date(year, month, env === 'server' ? 2 : 1).toISOString();
  let lastDay = new Date(
    year,
    month + 1,
    env === 'server' ? 1 : 0
  ).toISOString();

  return {
    firstDay,
    lastDay,
  };
}

export function getCurrentWeekDates() {
  let today = new Date();
  let currentDay = today.getDay();
  let diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);

  let startOfWeek = new Date(today.setDate(diff)).toISOString();
  let endOfWeek = new Date(today.setDate(diff + 6)).toISOString();

  return {
    startOfWeek,
    endOfWeek,
  };
}

export const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getInflowsAmount = (data: z.infer<typeof TransactionSchema>[]) => {
  let totalInflows = 0;

  data.map((obj) => {
    if (obj.amount > 0) totalInflows += obj.amount;
  });

  return totalInflows;
};

export const getOutflowsAmount = (
  data: z.infer<typeof TransactionSchema>[]
) => {
  let totalOutflows = 0;

  data.map((obj) => {
    if (obj.amount < 0) totalOutflows += obj.amount;
  });

  return Math.floor(Math.abs(totalOutflows));
};

export function calculateMoneySpentByDay(
  dataset: z.infer<typeof TransactionSchema>[]
) {
  if (dataset.length === 0) {
    return [
      { day: 'Monday', amount: 0 },
      { day: 'Tuesday', amount: 0 },
      { day: 'Wednesday', amount: 0 },
      { day: 'Thursday', amount: 0 },
      { day: 'Friday', amount: 0 },
      { day: 'Saturday', amount: 0 },
    ];
  }

  const totalMoneyByDay: {
    [key: string]: { day: number; totalOutflow: number };
  } = {};

  dataset.forEach((entry) => {
    let date = new Date(entry.date);
    let dayOfWeek = date.getDay();
    let moneySpent = entry.amount || 0;

    if (!totalMoneyByDay[dayOfWeek]) {
      totalMoneyByDay[dayOfWeek] = {
        day: dayOfWeek,
        totalOutflow: moneySpent,
      };
    } else {
      totalMoneyByDay[dayOfWeek].totalOutflow += moneySpent;
    }
  });

  const result: ChartData = Object.values(totalMoneyByDay)
    .sort((a, b) => a.day - b.day)
    .map((day) => {
      return {
        day: daysOfWeek[day.day],
        totalOutflow: Math.floor(Math.abs(day.totalOutflow)),
      };
    });

  daysOfWeek.forEach((day, index) => {
    if (!result.find((entry) => entry.day === day)) {
      result.splice(index, 0, { day: day, totalOutflow: 0 });
    }
  });

  return result;
}

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
