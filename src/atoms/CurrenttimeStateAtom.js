import { atom } from "recoil";

export const currentTimeState = atom({
  key: "currentTimeState",
  default: new Date(),
});
