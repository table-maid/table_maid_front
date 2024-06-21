import { css } from "@emotion/react";

export const container = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: auto;
  height: 50%;
  & > h3 {
    margin: 0;
    margin-bottom: 10px;
  }
  & > span {
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;
  }
  color: #352e2e;
  margin-bottom: 10px;
`;

export const checkContainer = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
`;

export const checkBox = css`
box-sizing: border-box;
  font-size: 25px;
  margin-right: 20px;
  margin-top: 3px;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
`;

export const text = css`
  width: 100%;
  height: 100%;
`;

export const textarea = (isShow) => css`
  resize: none;
  width: 100%;
  height: ${isShow ? "170px" : "0px"};
  visibility: ${isShow ? "visible" : "hidden"};
  opacity: ${isShow ? "1" : "0"};
  transition: all ease-in-out 0.2s;
  overflow-y: auto;
  cursor: default;
  &::-webkit-scrollbar {
    color: aliceblue;
  }
`;
