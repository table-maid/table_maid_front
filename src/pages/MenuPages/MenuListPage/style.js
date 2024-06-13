import { css } from "@emotion/react";

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
    border: 1px solid black;
    padding: 20px;

    h1 {
        margin-bottom: 20px;
    }

    div {
        gap: 10px;

        label {
            margin-right: 10px;
        }

        select, button {
            margin-right: 20px;
        }
    }
`;

export const menuListLayout = css`
    display: flex;
    width: 1;
    height: 500px;
    border: 1px solid black;
    overflow: auto;
    justify-content: center;
    margin-top: 10px;
`;

export const tableLayout = css`
    width: 100%;
    overflow: auto;
    border-collapse: collapse;

    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    thead {
        background-color: #f2f2f2;
    }
`;
