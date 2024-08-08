import { css } from "@emotion/react";

export const posLayout = css`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border-radius: 30px;
`;

export const tableLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const tableContainer = (count) => css`
  width: 90%;
  height: 600px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(${count}, 1fr);
  grid-gap: 10px;
  padding: 10px;
  box-sizing: border-box;
  justify-items: center;
`;

export const tableButton = (checked, deleted, tableName) => css`
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: ${checked ? "1px solid red" : "1px solid #c7c7c7"};
  background-color: ${tableName === "삭제된 테이블입니다"
    ? "transparent"
    : "#fff"};
  visibility: ${tableName === "삭제된 테이블입니다" ? "hidden" : "visible"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  ${deleted && `color: #ccc;`} // 삭제된 상태일 때 텍스트 색상 조정
  ${deleted &&
  `text-decoration: line-through;`} // 삭제된 상태일 때 텍스트에 취소선 추가
`;

export const tableHeader = css`
  width: 100%;
  height: 20%;
  font-size: 1.2em;
  font-weight: bold;
  background-color: beige;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const managmentLayout = css`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const managmentContainer = css`
  width: 93%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
`;

export const button = css`
  box-sizing: border-box;
  cursor: pointer;
  width: 130px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
  background-color: #fff;

  :hover {
    background-color: #dbdbdb;
  }
`;

export const floorManagement = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  background-color: #ffffff00;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const floorEditBox = css`
  position: relative;
  width: 30%;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 20px;
  z-index: 10;
`;

export const emptySlot = css`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
`;

export const floorButtonBox = css`
display: flex;
gap: 10px;
padding-bottom: 5px;
`;

export const floorButton = css`
box-sizing: border-box;
background-color: #fff;
border: 1px solid #dbdbdb;
border-radius: 5px;
display: flex;
gap: 10px;
padding: 5px 10px;
cursor: pointer;

:hover {
  background-color: #dbdbdb;
}
`;

export const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.432); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99; 
`;
