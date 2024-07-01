import { css } from "@emotion/react";

export const layout = css`
  box-sizing: border-box;
  position: relative;
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #fff;
  margin-top: 50px;
`;

export const buttonBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  /* background-color: aqua; */
`;

export const button = css`
  box-sizing: border-box;
  padding: 10px 20px;
  border: 1px solid #dbdbdb;
  background-color: transparent;
  border-radius: 15px;
  margin-right: 25px;
  cursor: pointer;
  /* background-color: aqua; */
`;
export const storeName = css`
  width: 100%;
  height: 7%;
  font-size: 40px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  margin-top: 10px;
  /* background-color: aqua; */
`;
export const categoryBox = css`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  -ms-overflow-style: none;
  /* scrollbar-width: none; */
  width: 100%;
  gap: 10px;
  padding: 10px 0;
  margin-bottom: 20px;
  white-space: nowrap;
  /* background-color: aqua; */
  /* ::-webkit-scrollbar {
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    width: 20%;
    background: #dbdbdb;

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  } */

  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const selectedCategory = css`
  flex: 0 0 auto;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: #187cff;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 25px;
  transition: background-color 0.3s ease;
`;

export const categor = css`
  flex: 0 0 auto;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: #f0f0f0;
  text-align: center;
  cursor: pointer;
  border-radius: 25px;
`;

export const listBox = css`
  width: 100%;
  height: auto;
  /* background-color: aqua; */
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  /* border: 1px solid #dbdbdb; */
  border-radius: 10px;
`;
export const menuList = css`
  width: 90%;
  height: 30px;
  /* background-color: aqua; */
  display: flex;
  padding: 15px;
`;
