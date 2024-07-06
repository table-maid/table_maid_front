import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
`
export const container = css`
    width: 100%;
    height: 90%;
    margin: 20px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border: 1px solid black;
    border-radius: 8px;
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
`

export const view = css`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
export const title = css`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`;

export const managementLayout = css`

    display: flex;
    width: 90%;
    gap: 20px;

`;

export const selectedCategoryStyle = css`
    background-color: #d0d0d0;
    border-radius: 6px;

`;

export const contentBox = css`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 6px;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
`;


export const selectedMenuStyle = css`
    background-color: #d0d0d0; 
    border-radius: 6px;
`;

export const categoryLayout = css`
    width: 250px;
    padding: 10px;
    height: 600px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    overflow: auto;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
`;

export const menuLayout = css`
    width: 650px;
    height: 600px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    overflow: auto;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    input:checkbox {
        display: none;
    }
`;

export const optionLayout = css`
    width: 250px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    
`;

export const hiddenCheckbox = css`
    display: none;
`;

export const price = css`
    font-weight: bold;
    color: #333;
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
