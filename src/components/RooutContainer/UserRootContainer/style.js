import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
	width: 100%;
	height: 100%;
    /* background-color: aqua; */
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const header = css`
    box-sizing: border-box;
	width: 100%;
	height: 5%;
	display: flex;
	align-items: center;
	justify-content: center;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
    /* background-color: #eee; */
`;

export const headerBox = css`
    box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	/* align-items: center; */
	justify-content: center;
    /* background-color: orange; */
`;

export const iphone = css`
    box-sizing: border-box;
	margin-left: 10px;
	width: 50%;
	height: 80%;
	display: flex;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	justify-content: center;
    background-color: black;
`;
export const icon = css`
margin-top: 10px;
width: 90%;
position: absolute;
display: flex;
align-items: center;
justify-content: space-between;
`;

export const container = css`
    box-sizing: border-box;
    position: relative;
	width: 100%;
    /* background-color: #bdbaba; */
`;
