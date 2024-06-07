import { css } from "@emotion/react";

export const listContainer = css`
  box-sizing: border-box;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const askTitle = css`
  list-style-type: none;
  background-color: #bbbbbbea;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  color: white;

  & > li {
    text-align: center;
  }

  & > li:nth-of-type(1) {
    width: 40%;
  }
  & > li:nth-of-type(2) {
    width: 15%;
  }
  & > li:nth-of-type(3) {
    width: 20%;
  }
`;

export const list = css`
  box-sizing: border-box;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
  padding: 0;
  list-style: none;
  font-size: 18px;

  & > li {
    text-align: center;
  }

  & > li:nth-of-type(1) {
    width: 40%;
  }
  & > li:nth-of-type(2) {
    width: 15%;
  }
  & > li:nth-of-type(3) {
    width: 20%;
  }

`;
