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
  /* border-bottom: 2px solid #222; */
  color: #222;
  width: 90%;
  height: 50%;
  font-size: 30px;
  font-weight: 700;
  margin-top: 60px;
  margin-left: 20px;

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
`;

export const categorieButton = (isActive) => css`
background-color: ${isActive ? '#0076DF' : '#f0f0f0'};
border: none;
font-size: 20px;
padding: 10px 25px;
border-radius: 20px;
border: 1px solid ${isActive ? '#0076DF' : '#ccc'};
color: ${isActive ? '#ffffff' : '#646464'};;
&:active {
    background-color: #dddddd 
  }
&:hover {
    background-color:${isActive ? '#00559b' : '#bebebe'}; 
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
  margin-left: 10px;
`;
