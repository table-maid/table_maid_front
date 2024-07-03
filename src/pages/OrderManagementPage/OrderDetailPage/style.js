import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 800px;
`;

export const container = css`
    display: flex;
    width: 100%;
`;

export const tableSection = css`
    flex: 1;
    padding: 20px;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
`;

export const tableHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
`;

export const tableNumber = css`
    font-size: 24px;
`;

export const tableLayout = css`
    width: 100%;
    height: 400px;
    border: 1px solid black;

`;
export const table = css`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
    }

    th {
        background-color: #f4f4f4;
    }
`;

export const totalSection = css`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const quantityChange = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    button {
        margin: 0 5px;
        padding: 5px 10px;
        cursor: pointer;
    }

`;

export const selectLayout = css`
    width: 100%;
    display: flex;
`;
export const cancelButton = css`
    width: 100%;
    height: 40px;
    background-color: #ff4d4d;
    color: white;
    padding: 10px 20px;
    border: none;
    margin-bottom: 10px;
    cursor: pointer;
`;

export const calculation = css`
    display: flex;
    width: 100%;
    height: 250px;
`
export const totalPrice = css`
    margin-top: 10px;
    width: 50%;
    height: 100%;
    font-size: 20px;

    div:nth-of-type(2) {
        border-bottom: 1px solid #dbdbdb;
    }

`
export const paymentLayout = css`
    margin-top: 10px;
    height: 100%;
    width: 50%;
`

export const paymentButton = css`
    width: 100%;
    height: 100px;
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    margin: 5px 0;
    cursor: pointer;

`;

export const menuSection = css`
    flex: 1;
    padding: 20px;
    height: 100%;
`;

export const menuTabs = css`
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;

    button {
        cursor: pointer;
    }
`;
export const menuBox = css`
    display: flex;
    flex-wrap: wrap;

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
    justify-content: space-between;

    button {
        padding: 10px 20px;
        cursor: pointer;
    }
`;
