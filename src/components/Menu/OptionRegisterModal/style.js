import { css } from "@emotion/react";

export const optionModal = css`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 400px;
    height: 600px;
    border: 1px solid black;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;