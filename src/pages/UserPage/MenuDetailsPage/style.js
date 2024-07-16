import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  position: relative;
  width: 90%;
  height: auto;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const container = css`
  padding: 20px 10px 0 10px;
  flex-grow: 1;
`;

export const img = css`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #f5f5f5;

  & img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const menuList = css`
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 15px;

  & h1 {
    margin: 0;
  }
`;

export const price = css`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & h2 {
    margin: 0;
  }
`;

export const optionBox = css`
  width: 100%;
  height: auto;
`;

export const optionName = css`
  & input {
    border: 1px solid #dbdbdb;
    margin-right: 20px;
    transform: scale(2);
    border-radius: 5px;
  }

  & h3 {
    font-weight: 300;
  }
`;

export const countBox = css`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  & h2 {
    font-weight: 700;
  }
`;

export const count = css`
  box-sizing: border-box;
  width: 35%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 10px;

  & button {
    border: none;
    background-color: transparent;
  }

  & span {
    font-weight: 500;
  }
`;

export const buttonBox = css`
  width: 100%;
  padding: 15px 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: sticky; /* position을 sticky로 설정 */
  bottom: 0; /* 화면 하단에 고정 */

  & button {
    box-sizing: border-box;
    background-color: #187cff;
    border: 1px solid #187cff;
    border-radius: 10px;
    padding: 15px 130px;
    color: white;
    font-size: 15px;
    font-weight: 300;
  }
`;
