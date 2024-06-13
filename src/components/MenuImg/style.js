import { css } from "@emotion/react";

export const MenuImgLayout = css`
    width: 275px;
    height: 183px;

`;
export const imgBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #dbdbdb;
    & > img{
        width: 100%;
    }
    cursor: pointer;
`