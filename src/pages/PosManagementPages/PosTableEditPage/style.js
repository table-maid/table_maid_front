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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const managmentContainer = css`
  width: 82%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const floorManagement = css`
  position: absolute;
  top: 10px;
  border: 1px solid black;
`