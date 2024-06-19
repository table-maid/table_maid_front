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
  z-index: 5;
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
  position: relative;
  box-sizing: border-box;
  background-color: #fefefe;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 15px 20px -12px;
  border-radius: 20px;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  &.animate {
    animation: fadeInUp 1s forwards;
  }

  &.hide {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s, transform 1s;
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
  background-color: #666666ea;
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

