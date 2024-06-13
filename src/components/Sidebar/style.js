import { css } from "@emotion/react";

export const layout = (isShow) => css`
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: ${isShow ? "0px" : "-310px"};
  z-index: 99;
  border-right: 1px solid #dbdbdb;
  width: 300px;
  height: 99%;
  transition: left 0.5s ease-in-out;
  background-color: white;
  box-shadow: 1px 0px 3px #22222222;
  border-radius: 30px;
`;

export const button = css`
  box-sizing: border-box;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid #dbdbdb;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 25px;
  height: 70px;
  background-color: white;
  cursor: pointer;
`;

export const menuList = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  margin: 0;
`;

export const menuItem = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  height: 50px;
  color: black;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;
