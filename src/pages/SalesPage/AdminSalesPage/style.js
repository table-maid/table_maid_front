import { css } from "@emotion/react";

export const layout = css`
  z-index: 0;
  box-sizing: border-box;
  height: 99%;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #f5f5f7;
  border-radius: 40px 30px;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const header = css`
  width: 100%;
  height: 19%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const title = css`
  box-sizing: border-box;
  color: #1d1d1f;
  width: 90%;
  height: 50%;
  font-size: 30px;
  font-weight: 700;
  margin-top: 80px;
`;

export const main = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const chartContainer = css`
  box-sizing: border-box;
  width: 90%;
  height: 380px;
  border-radius: 20px;
  box-shadow: 0px 3px 10px 2px hsla(0, 0%, 0%, 0.2);
  background-color: #fefefe;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const salesLayout = css`
  box-sizing: border-box;
  width: 90%;
  height: 80%;
  margin-top: 40px;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const selectBox = css`
  box-sizing: border-box;
  background-color: #fefefe;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -12px;
  border-radius: 20px;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const selectContainer = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const selectButton = css`
  box-sizing: border-box;
  background-color: #bbbbbbea;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const font = css`
  margin: 0 72px;
  font-size: 20px;
  width: 10%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

`;

export const buttonBox = css`
  width: 90%;
  height: 70%;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  `;

export const calenderLayout = css`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const calender = css`
  width: 319px;
  height: 100%;
  display: flex;
  padding-right: 10px;
  align-items: center;
  margin-left: 23px;
`;

export const customButton = css`
  box-sizing: border-box;
  width: 310px;
  height: 45px;
  padding: 5px;
  font-size: 16px;
  letter-spacing: 2px;
  background-color: transparent;
  box-shadow: 0px 3px 7px 2px hsla(0, 0%, 0%, 0.2);
  border: 1px solid hsl(0, 0%, 60%);
  cursor: pointer;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
  z-index: 5;
  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;

export const sercher = (isActive) => css`
  box-sizing: border-box;
  padding: 13px 30px;
  font-size: 15px;
  background-color: transparent;
  border: 1px solid hsl(0, 0%, 60%);
  cursor: pointer;
  text-align: center;
  box-shadow: ${isActive ? "inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8" : "0px 3px 10px 2px hsla(0, 0%, 0%, 0.2)"};
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 10px;
`;

export const searchIcon = (isDisabled) => css`
  color: ${isDisabled ? "#ec4a4a" : "#575757;"};
  & svg {
    font-size: 19px;
  }
`;

export const totalLayout = css`
  box-sizing: border-box;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  margin-top: 40px;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const totalBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  justify-content: space-around;
`;

export const box = css`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const total = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: #bbbbbbea;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;

  & h1 {
    font-size: 20px;
    font-weight: 500;
    color: white;
  }
`;
export const count = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: #fefefe;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 15px 25px -12px;

  & h1 {
    font-size: 20px;
    font-weight: 500;
    margin-right: 30px;
    color: #575757;
  }
`;

export const button = (isActive) => css`
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  padding: 12px 130px;
  margin-right: 30px;
  border-radius: 10px;
  background-color: #fefefe;
  box-shadow: ${isActive ? "inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8" : "0px 3px 10px 2px hsla(0, 0%, 0%, 0.2)"};
  font-size: 15px;
  color: #575757;
  font-weight: 600;

  &:hover {
    box-shadow: inset -4px -4px 10px #fff, inset 4px 2px 8px #aeb0b8;
  }
  &:active {
    background-color: #eee;
  }
`;

export const list = css`
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border-radius: 30px;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
  }
`;

export const noDateBox = css`
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  background-color: #f7f7f7;
  border-radius: 30px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #6b6b6bcc;

  & svg {
    font-size: 30px;
    color: #eb4040ff;
  }
`;
