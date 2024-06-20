import { atom } from "recoil";

export const ShoppingCartState = atom({
  key: "ShoppingCartState",
  default: [],
});

export const TotalPriceState = atom({
  key: "TotalPriceState",
  default: 0,
});
