import { css } from "@emotion/react";

export const container = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: auto;
  height: 50%;
  & h3 {
    margin: 0;
  }
  & > span {
    position: absolute;
    top: 20px;
    right: 0;
    cursor: pointer;
  }
  color: #353535;
  margin-bottom: 10px;
  padding: 10px;
`;

export const checkContainer = css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
`;

export const checkBox = (isChecked) => css`
  box-sizing: border-box;
  font-size: 25px;
  margin-right: 20px;
  margin-top: 3px;
  transition: all ease-in-out 0.2s;
  cursor: pointer;
  color: ${isChecked ? "#187cff" : "#dbdbdb"}; /* 체크 상태에 따른 색상 변경 */
`;

export const text = css`
  width: 100%;
  height: 100%;
`;

export const textarea = (isShow) => css`
  resize: none;
  margin-top: 20px;
  padding: 0;
  width: 100%;
  height: ${isShow ? "170px" : "0px"};
  visibility: ${isShow ? "visible" : "hidden"};
  opacity: ${isShow ? "1" : "0"};
  transition: all ease-in-out 0.2s;
  overflow-y: auto;
  cursor: default;
  &::-webkit-scrollbar {
    width: 250px;
    height: 250px;
    overflow-y: scroll; 
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(173, 173, 173, 1); 
    border-radius: 5px; 
  }

  &::-webkit-scrollbar-track {
    background: rgba(179, 179, 179, 0.1); 
  }
`;
