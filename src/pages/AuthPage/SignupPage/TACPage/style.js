import { css } from "@emotion/react";

export const pageLayout = css`
  width: 100%;
  height: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* background-color: aqua; */
`;

export const header = css`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const pageContainer = css`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  /* background-color: aqua; */
`;
export const agreeBox = css`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const container = css`
  width: 90%;
  height: auto;
  background-color: transparent;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
export const agree = css`
/* 일부러 아무것도 안넣음 */
`;

export const buttonBox = css`
    background-color: aqua;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
`;

export const button  = (agreed) => css`
  width: 100%;
  font-size: 14px;
  cursor: pointer;
  padding: 15px 0;
  background-color: transparent;
  color: #999999;
  box-shadow: ${agreed ? "3px 5px 8px 3px hsla(0, 0%, 0%, 0.411)" : ""};
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: ${agreed ? "translateY(2px)" : ""};
  }
  &:active {
    box-shadow: inset 3px 5px 8px 3px hsla(0, 0%, 0%, 0.411);
  }
`;
