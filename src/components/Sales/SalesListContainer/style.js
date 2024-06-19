import { css } from "@emotion/react";

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
