import { css } from "@emotion/react";

export const Layout = css`
  width: 285px;
  height: 150px;
  /* background-color: white; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const menu = css`
  width: 300px;
  /* background-color: hsl(39, 100%, 50%); */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  overflow-wrap: break-word; /* 단어가 길 경우 줄바꿈 */
  white-space: pre-wrap; /* 공백 처리 및 줄바꿈 유지 */
`;
export const imgLayout = css`
  box-sizing: border-box;
  width: 130px;
  height: 120px;
  border-radius: 50%;
  background-color: #dfdfdf;
  position: relative;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
export const menuListLayout = css`
  /* background-color: beige; */
  width: 180px;

  & h1 {
    font-size: 16px;
  }
`;

export const img = css`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
