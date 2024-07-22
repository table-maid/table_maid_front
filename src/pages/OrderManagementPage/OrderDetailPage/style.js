import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    margin: 20px auto;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
    box-sizing: border-box;
`;

export const container = css`
    display: flex;
    width: 100%;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
`;

export const tableSection = css`
    flex: 1;
    padding: 20px;
    border-right: 1px solid #ccc;
`;

export const tableHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 2px solid #f4f4f4;
`;

export const tableNumber = css`
    font-size: 24px;
`;

export const tableLayout = css`
    width: 100%;
    height: 400px;
    overflow-x: auto;
    margin-top: 20px;
    border: 1px solid #ccc;
    overflow: auto;

`;

export const table = css`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border-bottom: 1px solid #ccc;
        padding: 12px;
        text-align: center;
        font-size: 16px;
    }

    th {
        background-color: #f4f4f4;
        font-weight: 600;
    }

    tr:nth-of-type(even) {
        background-color: #f9f9f9;
    }
`;

export const totalSection = css`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 20px;
    border-top: 2px solid #f4f4f4;
`;

export const totalPrice = css`
    display: flex;
    width: 50%;
    font-size: 20px;
    font-weight: bold;
    div:nth-of-type(1){
        margin-right: 20px;
    }
`;

export const paymentLayout = css`
    display: flex;
    justify-content: flex-end;
    width: 50%;
`;

export const paymentButton = css`
    padding: 15px 30px;
    width: 200px;
    height: 150px;
    font-size: 18px;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;
