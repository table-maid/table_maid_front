import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;
export const header = css`
  box-sizing: border-box;
  position: fixed;
  width: 25%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 999;

  /* background-color: #eee; */
`;

export const headerBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  z-index: 999;
  /* background-color: orange; */
`;

export const iphone = css`
  box-sizing: border-box;
  margin-left: 10px;
  width: 50%;
  height: 80%;
  display: flex;
  z-index: 999;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  justify-content: center;
  background-color: black;
`;
export const icon = css`
  margin-top: 10px;
  width: 90%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const container = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: #bdbaba; */
`;
