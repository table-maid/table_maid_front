import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const header = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

export const logo = css`
  font-size: 18px;
  font-weight: bold;
`;

export const date = css`
  font-size: 30px;
`;

export const calendarSection = css`
  display: flex;
  flex: 1;
`;

export const calendar = css`
  width: 70%;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

export const sideSection = css`
  width: 30%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const inputSection = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 16px;
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const toggle = css`
  display: flex;
`;

export const buttons = css`
  display: flex;
  flex-direction: column;

  button {
    padding: 10px;
    margin-bottom: 10px;
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
  }
`;
