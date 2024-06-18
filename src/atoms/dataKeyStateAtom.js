import { atom } from "recoil";

export const dataKeyState = atom({
	key: "dataKeyState",
	default: ["totalSales", "dayTotalSales"],
  });