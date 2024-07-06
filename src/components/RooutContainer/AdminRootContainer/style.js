import { css } from "@emotion/react";

export const layout = css`
  z-index: 0;
  position: relative;
  width: 100%; //모니터 기준
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  border-radius: 30px;
`;
export const sideBar = (isShow) => css`
  position: absolute;

  height: 100%;

  pointer-events: ${isShow ? "auto" : "none"};
`;

export const content = (isShow) => css`
  flex-grow: 1;
  pointer-events: ${isShow ? "none" : "auto"};
  z-index: 1;
  position: relative;
`;
