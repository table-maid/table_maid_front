import { atom } from 'recoil';

export const viewTypeState = atom({
  key: 'viewTypeState',
  default: "", // 초기값을 'week'로 설정
});
