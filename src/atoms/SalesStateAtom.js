// atoms/salesState.js
import { atom } from 'recoil';

export const salesTotalState = atom({
  key: 'salesTotalState',
  default: {
    totalSales: 0,
    totalCount: 0,
  },
});
