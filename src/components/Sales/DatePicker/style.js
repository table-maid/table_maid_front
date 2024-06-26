import { css } from "@emotion/react";

export const calenderLayout = css`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const calender = css`
  width: 320px;
  height: 100%;
  display: flex;
  padding-right: 28px;
  align-items: center;
  margin-left: 5px;
  /* margin-right: 10px; */
`;

export const customButton = css`
  box-sizing: border-box;
  width: 310px;
  height: 45px;
  padding: 5px;
  font-size: 16px;
  letter-spacing: 2px;
  background-color: transparent;
  box-shadow: 0px 3px 7px 2px hsla(0, 0%, 0%, 0.2);
  border: 1px solid hsl(0, 0%, 60%);
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;

export const sercher = (isActive) => css`
  box-sizing: border-box;
  padding: 13px 30px;
  font-size: 15px;
  background-color: transparent;
  border: 1px solid hsl(0, 0%, 60%);
  cursor: pointer;
  text-align: center;
  box-shadow: ${isActive ? "inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8" : "0px 3px 10px 2px hsla(0, 0%, 0%, 0.2)"};
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
`;

export const searchIcon = (isDisabled) => css`
  color: ${isDisabled ? "#ec4a4a" : "#575757;"};
  & svg {
    font-size: 19px;
  }
`;