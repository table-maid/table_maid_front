
import { css } from "@emotion/react";

export const timeLayout = css`
    width: 100%;
    display: flex;
    border-bottom: 1px solid black;
    justify-content: center;
    align-items: center;
`;

export const tableLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const tableContainer = css`
    width: 90%;
    height: 550px;
    border: 1px solid black;

`;

export const tableButton = css`
    padding: 0;
    box-sizing: border-box;
    width: 200px;
    background-color: white;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #dbdbdb;
    }
    :active {
        background-color: #fafafa;
    }
`;

export const table = css`

    width: 100%;
    text-align: left;
`;

export const tableHeader = css`
    display: flex;
    justify-content: space-between;
    background-color: #b2f7ef;
    padding: 5px;
    font-weight: bold;
`;

export const tableNumber = css`
    font-size: 1.2em;
`;

export const tablePeople = css`
    font-size: 1.2em;
`;

export const tableDetails = css`
    padding: 10px;
`;

export const menuItem = css`
    display: flex;
    justify-content: space-between;
`;

export const totalPrice = css`
    margin-top: 10px;
    font-weight: bold;
    text-align: right;
`;

export const managmentLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const managmentContainer = css`
    width: 90%;
    height: 150px;
    border: 1px solid black;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const managementButton = css`
    width: 160px;
    height: 80px;
`;