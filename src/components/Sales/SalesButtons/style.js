import { css } from "@emotion/react";

export const selectButton = css`
  box-sizing: border-box;
  background-color: #666666ea;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const buttonBox = css`
  width: 90%;
  height: 70%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  `;

export const button = (isActive) => css`
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  padding: 12px 130px;
  margin-right: 30px;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: ${isActive ? "inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8" : "0px 3px 10px 2px hsla(0, 0%, 0%, 0.2)"};
  font-size: 15px;
  color: #575757;
  font-weight: 600;

  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;
