import { css } from "@emotion/react";

export const layout = (isShow) => css`
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: ${isShow ? "0px" : "-310px"};
  z-index: 99;
  border-right: 1px solid #dbdbdb;
  width: 300px;
  height: 100%;
  transition: left 0.5s ease-in-out;
  background-color: #707070;
  box-shadow: 1px 0px 3px #22222222;
  border-radius: 28px;
`;

export const openButton = (isButtonVisible) => css`
  box-sizing: border-box;
  position: fixed;
  border: none;
  transform: translateY(-50%);
  top: 80px;
  left: 140px;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
  transition: opacity 0.3s ease-in;
  opacity: ${isButtonVisible ? 1 : 0};
  pointer-events: ${isButtonVisible ? 'auto' : 'none'};
`;

export const closeButton = css`
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

export const homeButton = css`
  box-sizing: border-box;
  position: absolute;
  top: 10px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  font-size: 24px;
  color: white;
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
  width: 100%;
  height: 50px;
  color: black;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  padding: 40px 0;
`;

export const link = css`
  display: flex;
  margin-top: 15px;
  text-decoration: none;
  cursor: pointer;
  color: #eee;
  font-size: 20px;
`;
