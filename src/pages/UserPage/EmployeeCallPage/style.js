import { css, keyframes } from "@emotion/react";

const fadeOut = keyframes`
  0% {
    background-color: #187cff;
  }
  100% {
    background-color: transparent;
  }
`;

export const layout = css`
  box-sizing: border-box;
  position: relative;
  margin: 60px auto;
  width: 410px;
  height: 660px;
  background-color: #fff;
`;

export const container = css`
  width: 85%;
  height: 50%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const itemBox = css`
  width: 100%;
  height: 30%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const item = css`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;

  :hover {
    background-color: #d3d3d3;
  }

  :active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: #187cff;
    animation: ${fadeOut} 0.5s ease-out;
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
  position: fixed;
  height: 80px;
  bottom: 220px;
  width: 410px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 10px;

  & button {
    box-sizing: border-box;
    background-color: #187cff;
    border: 1px solid #187cff;
    border-radius: 10px;
    padding: 15px 145px;
    color: white;
    font-size: 15px;
    font-weight: 300;
  }
`;

export const selectedItemsBox = css`
  width: 100%;
  height: 27%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const itemTitle = css`
  font-size: 25px;
  margin: 10px 0 10px 25px;
`;

export const selectedItem = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  & h3 {
    width: 20%;
  }
`;

export const close = css`
  background-color: transparent;
  border: none;
`;
