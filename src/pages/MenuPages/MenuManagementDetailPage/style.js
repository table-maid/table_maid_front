import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const container = css`
  width: 95%;
  height: 90%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const menuDetailLayout = css`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 20px;
`;

export const menuDetailContent = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  div:nth-of-type(1) {
    width: 30%;
  }
  div:nth-of-type(2) {
    width: 50%;
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 16px;
      color: #555;
    }

    input[type="text"] {
      padding: 8px 12px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 200px;
    }
  }
`;

export const headerLayout = css`
    width: 100%;
    margin-bottom: 5px;
`

export const header = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h2 {
    margin: 0;

  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    svg {
      margin-right: 5px;
    }
  }
`;

export const selectWrapper = css`
  position: relative;
  display: flex;
  align-items: center;

  select {
    width: 150px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    background-position: right 20px center;
    background-size: 10px 10px;
  }

  .select-arrow {
    position: absolute;
    right: 10px;
    pointer-events: none;
    font-size: 16px;
    color: #555;
  }

  select::-ms-expand {
    display: none;
  }
`;

export const checkboxContainer = css`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  width: fit-content;
  color: #555;
  font-size: 18px;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

`;

export const font = css`
    margin-bottom: 15px;
`;

export const optionLayout = css`
  padding: 15px 20px;
  height: 325px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const optionManagementLayout = css`
  display: flex;
  margin-top: 13px;
`;

export const optionManagementTitleLayout = css`
  flex-wrap: wrap;
  overflow: auto;
  width: 20%;
  height: 220px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 20px;
  background-color: #f1f1f1;
  * {
    margin: 0;
  }
`;

export const optionTitle = css`
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 10px;
  h3 {
    margin-bottom: 20px;
  }
`;

export const optionButton = css`
  border: none;
  font-size: 20px;
  padding: 0px 5px;
  cursor: pointer;

  :hover {
    font-size: 22px;
  }

`;

export const optionButtonLayout = css`
  display: flex;
  height: 30px;
`;

export const optionNameLayout = css`
  box-sizing: border-box;
  width: 220px;
  flex-wrap: wrap;
  padding-right: 10px;

  * {
    display: flex;
  }
  button {
    margin-bottom: 10px;
  }
  div {
    height: 30px;
  }
`;
export const optionManagementContentLayout = css`
  box-sizing: border-box;
  width: 30%;
  height: 240px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f1f1f1;
  overflow: auto;
`;

export const updateMenuLayout = css`
  margin-top: 10px;
  color: #555;
  input[type="text"] {
    margin: 10px 0px;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
  input[type="number"] {
    margin: 10px 0px;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 200px;
  }
`;
export const actionButtons = css`
  box-sizing: border-box;
  display: flex;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    svg {
      margin-right: 5px;
    }
  }

  .backButton {
    background-color: #6c757d;

    &:hover {
      background-color: #5a6268;
    }
  }

  .saveButton {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  }
`;
