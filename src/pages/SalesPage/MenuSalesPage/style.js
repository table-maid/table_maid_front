import { css } from "@emotion/react";

export const layout = css`
  z-index: 0;
  box-sizing: border-box;
  height: 99%;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #f5f5f7;
  border-radius: 40px 30px;
`;

export const header = css`
  width: 100%;
  height: 19%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const title = css`
  box-sizing: border-box;
  border-bottom: 2px solid #222;
  color: #222;
  width: 90%;
  height: 50%;
  font-size: 40px;
  font-weight: 700;
`;
export const main = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
`;
export const ListLayout = css`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: aqua; */
`;

export const list = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 10px;
`;

export const categorieButton = css`
width: 100px;
background-color: transparent;
border: none;
font-size: 20px;
&:active {
    background-color: #a7a7a7; 
  }
`;

export const menulist = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;
