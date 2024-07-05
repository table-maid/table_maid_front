import { css } from "@emotion/react";
import { IoIosArrowDown } from "react-icons/io";

export const layout = css`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export const filterLayout = css`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 1100px;
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
`;

export const filterActions = css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  button {
    padding: 8px 12px;
    font-size: 16px;
    margin-left: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }

    &:nth-of-type(2) {
      background-color: #6c757d;

      &:hover {
        background-color: #5a6268;
      }
    }

    &:nth-of-type(3) {
      background-color: #28a745;

      &:hover {
        background-color: #218838;
      }
    }

    &:nth-of-type(4) {
      background-color: #dc3545;

      &:hover {
        background-color: #c82333;
      }
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



export const filterInputs = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;

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
export const menu = css`
  height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  border: 1px solid #ccc;
  

`;

export const menuListLayout = css`
  display: flex;
  width: 100%;
  max-height: 500px;
  overflow: auto;
  background-color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
`;

export const tableLayout = css`
  width: 1140px;
  overflow: auto;
  table-layout: fixed;
  border-collapse: collapse;


  th,
  td {
    box-sizing: border-box;
    height: 46px;
    overflow: hidden;  
    text-overflow: ellipsis;  
    white-space: nowrap; 
    border: 1px solid #ccc;
    padding: 12px 8px;
    text-align: left;
    font-size: 16px;
    color: #333;
  }

  thead {
    background-color: #f7f7f7;
  }

  tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  th {
    background-color: #e9e9e9;
    font-weight: bold;
  }

  td {
    cursor: pointer;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;
