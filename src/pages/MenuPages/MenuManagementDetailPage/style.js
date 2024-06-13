import { css } from "@emotion/react";

export const layout = css`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`;

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const optionLayout = css`
    
    width: 90%;
    height: 90%;
    border: 1px solid black;
`;

export const optionManagementLayout = css`
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-bottom: 10px;
`;

export const optionManagementTitleLayout = css`
    width: 30%;
    height: 250px;
    border: 1px solid black;
    * {
        margin: 0;
    }
`;

export const optionManagementContentLayout = css`
    width: 65%;
    height: 250px;
    border: 1px solid black;
   
`;
