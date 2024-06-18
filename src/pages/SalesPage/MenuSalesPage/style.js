import { css } from "@emotion/react";

export const buttonContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  padding: 30px 0;
`;

export const ChoiceContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 20px;
`;

export const dataChoice = css`
  display: flex;
  justify-content: center;
`;

export const chartContainer = css`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  margin-left: 20px;
`;

export const button = css`
  margin: 0 10px;
  padding: 10px 20px;
  /* background-color: #c7c7c7; */
  color: #919191;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
  font-weight: 600;


  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;
