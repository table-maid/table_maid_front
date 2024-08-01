import { css } from "@emotion/react";

export const posLayout = css`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 30px;
`;

export const timeLayout = css`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  background-color: #a1a1a1;
  color: white;
  font-size: 23px;
`;

export const tableLayout = css`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const tableContainer = (count) => css`
  width: 90%;
  height: 600px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(${count}, 1fr);
  grid-gap: 10px;
  box-sizing: border-box;
  justify-items: center;
`;

export const tableButton = css`
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #c7c7c7;
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

export const tableHeader = (hasItems) => css`
  width: 252px;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  background-color: ${hasItems ? "inherit" : "transparent"};
  font-weight: bold;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  & p {
    margin: 0;
  }
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
  padding-bottom: 40px;
`;

export const button = css`
  width: 25%;
  background-color: transparent;
  border: none;
  pointer-events: auto;

  & svg {
    color: #bebebe;
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

export const selectedTableHeader = css`
  background-color: #b1b1b1; // 선택된 테이블의 헤더 색상 변경
`;

export const menuBox = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
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
`;

export const managmentContainer = css`
  width: 92%;
  height: 100px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
`;

export const managementButton = css`
  width: 130px;
  height: 80px;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  background-color: white;
`;

export const floorbutton = css`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #c7c7c7;
  background-color: white;
`;

export const setting = css`
  width: 30px;
  height: 30px;
  border: none;
  color: #3f3f3f;
  padding-top: 20px;
`;
