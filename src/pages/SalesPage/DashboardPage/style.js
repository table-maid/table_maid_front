import { css } from "@emotion/react";

export const saleLayout = css`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const saleContainer = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;

export const saleGraphContainer = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;
`;

export const menuLayout = css`
  width: 100%;
  height: 100%;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const graphBox = css`
  box-sizing: border-box;
  width: 30%;
  height: 90%;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border: 1px solid #dbdbdb;

  & h3 {
    font-size: 20px;
    margin: 10px 0;
    font-weight: 400;
  }

  & h1 {
    margin: 10px 0;
    font-size: 25px;
  }
  & h2 {
    font-size: 35px;
    margin: 0;
    margin-bottom: 8px;
    font-weight: 700;
  }

  transition: transform 0.5s ease, box-shadow 0.5s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const firstGraphBox = css``;

export const imgLayout = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const img = css`
  max-width: 100%;
  max-height: 90%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
`;

export const sales = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & h1 {
    margin-left: 30px;
    color: #187cff;
  }
`;

export const link = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
  font-size: 24px;

  & h3 {
    margin-left: 50px;
    font-size: 23px;
    font-weight: 700;
  }
`;

export const button = css`
  box-sizing: border-box;
  padding: 7px 20px;
  border-radius: 8px;
  border: 1px solid #187cff;
  margin-top: 10px;
  background-color: #187cff;
  color: white;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 18px rgba(80, 80, 80, 0.2);
  }

  cursor: pointer;
`;

export const listBox = css`
  position: relative;
  box-sizing: border-box;
  width: 63%;
  height: 85%;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  transition: transform 0.5s ease, box-shadow 0.5s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const list = css`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

export const menuBox = css`
  box-sizing: border-box;
  width: 30%;
  height: 85%;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border: 1px solid #dbdbdb;
  cursor: default;

  & h1 {
    font-size: 30px;
  }

  & svg {
    color: gold;
  }

  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

export const menu = (index) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h2 {
    margin-bottom: 15px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; 
  }

  & img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  }

  & svg {
    color: ${index === 0 ? "gold" : index === 1 ? "silver" : "#cc9c5c"};
  }
`;
