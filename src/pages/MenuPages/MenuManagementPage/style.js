import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    margin: 0 auto;
    width: 90%;
    height: 100%;
`;

export const categoryLayout = css`
    width: 300px;
    height: 600px;
    border: 1px solid black;
`;

export const menuLayout = css`
    margin-left: 20px;
    width: 400px;
    height: 600px;
    border: 1px solid black;
    overflow: auto;
    h3 {
        margin: 18px 0px 18px 0px;
    }
`;

export const optionLayout = css`
    margin-left: 20px;
    width: 300px;
    height: 600px;
    border: 1px solid black;
`;

export const price = css`
    margin-right: 20px;
`;

export const menuModal = css`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 700px;
    height: 400px;
    border: 1px solid black;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const optionModal = css`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 400px;
    height: 200px;
    border: 1px solid black;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;
