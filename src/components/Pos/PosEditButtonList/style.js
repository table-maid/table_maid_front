import { css } from "@emotion/react";

export const buttonLayout = css`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const buttonContainer = css`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const button = css`
  box-sizing: border-box;
  width: 65px;
  padding: 7px 15px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  cursor: pointer;
  letter-spacing: 5px;
  text-align: center; /* 텍스트를 중앙에 정렬 */

  :hover {
    background-color: #dbdbdb;
  }
`;
