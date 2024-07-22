import { css } from "@emotion/react";

export const layout = css`
  position: fixed;
  top: 36px;
  border-radius: 30px;
  left: 50%;
  width: 415px;
  height: 790px;
  transform: translateX(-50%);
  z-index: 998;
  background-color: #757575b4;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);
`;

export const backdrop = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 어두운 배경 색상과 투명도 조정 */
  z-index: 998; /* 모달보다 낮은 z-index 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const optionModal = css`
  position: fixed;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 999;
  width: 410px;
  height: 50%;
  border: 1px solid black;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;
export const container = css`
  display: flex;
  height: 90%;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-between;
  padding: 20px;

  & h1 {
    font-size: 25px;
    margin: 0;
  }
`;

export const list = css`
  display: flex;
  flex-direction: row;
  width: 100%;

  & span {
    font-size: 20px;
  }
`;

export const itemBox = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & h3 {
    margin: 10px 0;
  }

  & span {
    font-size: 20px;
  }

  & input {
    transform: scale(1.5);
    margin: 10px;
  }
`;

export const button = css`
  box-sizing: border-box;
  width: 100%;
  background-color: #187cff;
  border: 1px solid #187cff;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 15px;
  font-weight: 300;
`;
