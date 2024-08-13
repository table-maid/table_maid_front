import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    height: 100vh;
`;

export const container = css`
    display: flex;
    width: 100%;
`;

export const tableSection = css`
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    background-color: #ffffff;
    border-bottom-left-radius: 40px;
    border-top-left-radius: 40px;
    border-right: 1px solid #ccc;
    max-height: 780px;
`;

export const tableHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;

`;

export const tableNumber = css`
  font-size: 24px;
  color: #555;
`;


export const tableLayout = css`
  width: 100%;
  height: 350px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: auto;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    font-size: 16px;
  }

  th {
    background-color: #f4f4f4;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

export const totalSection = css`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const quantityChange = css`
  display: flex;
  justify-content: space-around;
  width: 100%;

  button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff2d2d;
    }
  }
`;


export const selectLayout = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const cancelButton = css`
  width: 100%;
  height: 40px;
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff2d2d;
  }
`;

export const calculation = css`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 20px;
`;


export const totalPrice = css`
  flex: 1;
  font-size: 20px;
  text-align: center;

  div:nth-of-type(2) {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 10px;
  }
`;


export const paymentLayout = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;


export const paymentButton = css`
  width: 100%;
  height: 100px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a045;
  }
`;

export const menuSection = css`
    box-sizing: border-box;
    flex: 1;
    padding: 20px;
    border-top-right-radius: 40px;
    background-color: #ffffff;
    border-bottom-right-radius: 40px;
    border-left: 1px solid #ddd;
    max-height: 780px;
`;

export const menuTabs = css`
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;

    button {
        cursor: pointer;
        border: 1px solid #dbdbdb;
        background-color: transparent;
        font-size: 18px;
        margin: 5px 5px;
        transition: color 0.3s ease;

        &:hover {
        color: #007bff;
        }

        &:disabled {
        color: #ccc;
        }
  }
`;
export const menuBox = css`
    display: flex;
    flex-wrap: wrap;
  div {
    display: flex;
    width: 110px;
    height: 50px;

    button {
        width: 100%;
        height: 100%;
    }
  }
`;

export const categoryButton = css`
    width: 100px;
    height: 50px;
`

export const menuItems = css`
    display: flex;
    flex-wrap: wrap;
`;

export const menuItem = css`
    width: 100px;
    height: 70px;
    padding: 10px;
    border: 1px solid #ccc;
    div {
        overflow: hidden;
    }
`;

export const customerRequest = css`
    margin: 20px 0;
    text-align: center;
`;

export const bottomButtons = css`
    display: flex;
    margin-top: 20px;
    margin-right: 24px;
    justify-content: flex-end;
    button {
        padding: 10px 20px;
        cursor: pointer;
        border: 1px solid #dbdbdb;
        background-color: transparent;
        font-size: 18px;
        margin: 5px 5px;
        transition: color 0.3s ease;

        &:hover {
        color: #ffffff;
        background-color: #80bdff;
        }

        &:disabled {
        color: #ccc;
        }
    }
`;
