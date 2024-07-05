/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const header = css`
  box-sizing: border-box;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-top-right-radius: 28px;
  border-top-left-radius: 28px;
  background-color: #a1a1a1;
  color: white;
  font-size: 15px;
`;

export const logo = css`
  font-size: 30px;
  font-weight: bold;
  margin: 0;
`;

export const date = css`
  font-size: 23px;
`;

export const calendarSection = css`
  display: flex;
  flex: 1;
`;

export const calendar = css`
  width: 70%;
  padding: 20px;
  border-right: 1px solid #ccc;
  background-color: #fff;
  border-bottom-left-radius: 30px;
`;

export const sideSection = css`
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`;
export const logoBox = css`
display: flex;
align-items: center;
justify-content: center;
& h1 {
  font-size: 45px;
}
`;

export const inputSection = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const inputContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    padding: 11px;
    font-size: 16px;
    flex: 1;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  span {
    padding: 10px;
    font-size: 16px;
  }
`;

export const inputbox = css``;

export const toggle = css`
  display: flex;
  align-items: center;

  & span {
    
    padding: 10px;
  }
`;

export const buttons = css`
  height: 23%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background-color: #f4f4f4;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ddd;
    }

    &:nth-of-type(1) {
      background-color: #4caf50;
      color: white;
    }

    &:nth-of-type(2) {
      background-color: #2196f3;
      color: white;
    }

    &:nth-of-type(3) {
      background-color: #f44336;
      color: white;
    }
    
    &:disabled {
      cursor: default; 
      background-color: #e0e0e0;
    }
  }
`;
