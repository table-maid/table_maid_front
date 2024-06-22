import { css } from "@emotion/react";

export const posLayout = css`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 30px;
`;

export const timeLayout = css`
  width: 100%;
  height: 5%;
  display: flex;
  /* background-color: white; */
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  border-bottom: 2px solid #5e5e5e;
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
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  justify-items: center;
`;

export const tableButton = (bgColor) => css`
  padding: 0;
  box-sizing: border-box;
  width: 70%;
  height: 150px;
  background-color: ${bgColor};
  border: 1px solid #adadad;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;

export const table = css`
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  
`;

export const tableHeader = css`
  width: 255px;
  height: 20px;
  display: flex;
  padding: 10px 9px;
  justify-content: space-between;
  background-color: #b2f7ef;
  font-weight: bold;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const tableNumber = css`
  font-size: 1.2em;
`;

export const tablePeople = css`
  font-size: 1.2em;
`;

export const buttonBox = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;

`;
export const button = css`
  width: 25%;
  background-color: transparent;
  border: none;
  pointer-events: auto;

  & svg {
    /* padding: 0 65px; */
    color: #aaaaaa;
    cursor: pointer;
  }
`;

export const tableDetails = css`
  padding: 10px;
  width: 90%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const menuItem = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  
  & span {
    padding: 5px 0;
  }
`;

export const totalPrice = css`
width: 90%;
margin: 10px 0 15px 0;
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
