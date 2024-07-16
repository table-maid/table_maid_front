import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  width: 100%;
  height: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const header = css`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  z-index: 999;
`;

export const headerBox = css`
  box-sizing: border-box;
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 999;
`;

export const iphone = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: black;
  overflow: hidden; /* Prevent overflow */
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto; /* Allow scrolling */
`;
