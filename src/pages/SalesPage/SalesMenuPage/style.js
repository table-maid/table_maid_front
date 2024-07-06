import { css } from "@emotion/react";

export const buttonContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
`;

export const backButton = css`
  position: absolute;
  transform: translateY(-50%);
  top: -5%;
  right: -4%;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const ChoiceContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  margin-left: 20px;
`;

export const dataChoice = css`
  display: flex;
  justify-content: center;
`;

export const chartContainer = css`
  width: 95%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  margin-left: 20px;
`;

export const button = (isSelected) => css`
  margin: 0 10px;
  padding: 10px 20px;
  color: ${isSelected ? "#FFFFFF" : "#919191"};
  background-color: ${isSelected ? "#007BFF" : "#FFFFFF"};
  border: 1px solid ${isSelected ? "#007BFF" : "#dbdbdb"};
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
  font-weight: 600;

  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;
