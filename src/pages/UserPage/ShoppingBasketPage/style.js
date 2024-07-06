import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  position: relative;
  margin: 40px auto;
  margin-bottom: 0;
  padding: 10px;
  width: 390px;
  height: 93%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #fff;
`;

export const container = css`
  /* background-color: aqua; */
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;
export const noItem = css`
  background-color: transparent;
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & p {
    padding-top: 30px;
  }
`;
export const menuBox = css`
  box-sizing: border-box;
  /* background-color: aqua; */
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
`;

export const menuList = css`
  /* background-color: aqua; */
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & img {
    box-sizing: border-box;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    margin: 0 20px;
    background-color: #f5f5f5;
  }
`;

export const menuItem = css`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background-color: orange; */
  margin: 20px 0 0 20px;

  & h2 {
    margin: 0;
  }
`;

export const buttonBox = css`
  display: flex;
  flex-direction: column;
`;

export const button = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const option = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  /* background-color: aqua; */
  margin-left: 18px;

  & p {
    margin: 8px 0;
  }
`;

export const Xbutton = css`
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: aqua; */

  & button {
    background-color: transparent;
    border: none;
    padding: 0;
  }
`;

export const countBox = css`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;

`;
export const optionChange = css`
  background-color: transparent;
  padding: 10px 20px;
border: 1px solid #dbdbdb;
margin-right: 10px;
border-radius: 8px;
`;

export const count = css`
  box-sizing: border-box;
  width: 30%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  border-radius: 7px;
  background-color: transparent;
  margin: 10px 0;

  & button {
    padding: 0;
    background-color: transparent;
    border: none;
  }
`;

export const bottom = css`
  position: relative;
  width: 100%;

  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transform: translateX(-50%, -50%);

  & button {
    box-sizing: border-box;
    background-color: #187cff;
    border: 1px solid #187cff;
    border-radius: 10px;
    padding: 15px 150px;
    color: white;
    font-size: 15px;
    font-weight: 300;
  }
`;
