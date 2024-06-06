import { css } from "@emotion/react";

export const layout = css`
  z-index: 0;
  box-sizing: border-box;
  height: 98%;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
`;

export const chartContainer = css`
  box-sizing: border-box;
  width: 90%;
  height: 380px;
  border-radius: 30px;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
`;
export const salesLayout = css`
  box-sizing: border-box;
  width: 90%;
  height: 100%;
  margin-top: 32px;
`;

export const selectBox = css`
  box-sizing: border-box;
  background-color: #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -12px;
  border-radius: 30px;
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const selectContainer = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const selectButton = css`
  box-sizing: border-box;
  background-color: #bbbbbbea;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const font = css`
  margin: 0 72px;
  font-size: 20px;
  width: 10%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const buttonBox = css`
  width: 90%;
  height: 70%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const calender = css`
  width: 90%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const button = css`
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  padding: 12px 130px;
  margin-right: 30px;
  border-radius: 15px;
  background-color: #fefefe;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
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
export const list = css`
  margin-top: 40px;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border-radius: 30px;
`;
