import { css } from "@emotion/react";

export const layout = (show) => css`
  box-sizing: border-box;
  opacity: ${show ? 1 : 0};
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: #f5f5f7;
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
`;

export const modal = css`
position: absolute;
  width: 90%;
  height: 80%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
`;
