import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const salesLayout = css`
  box-sizing: border-box;
  margin-top: 40px;
  z-index: 5;

`;

export const selectBox = css`
  position: relative;
  box-sizing: border-box;
  background-color: #fefefe;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -12px;
  border-radius: 20px;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

`;

export const listLayout = css`
  box-sizing: border-box;
  padding: 20px 10px;
  height: 480px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -12px;
  margin-top: 20px;
  overflow: auto;
  background-color: #fefefe;
  border-radius: 20px;
`

export const tableLayout = css`
  overflow: auto;
  width: 1140px;
  table-layout: fixed;
  border-collapse: collapse;
  border-radius: 25px;
  border: 1px solid #dbdbdb;

  th,
  td {
    box-sizing: border-box;
    height: 46px;
    overflow: hidden;  
    text-overflow: ellipsis;  
    white-space: nowrap; 
    border-bottom: 1px solid #ccc;
    padding: 12px 8px;
    text-align: left;
    font-size: 16px;
    color: #333;
  }

  thead {
    background-color: wheat;
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