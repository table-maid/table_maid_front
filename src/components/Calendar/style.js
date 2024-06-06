import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const calendar = css`
margin-right: 30px;
  border: 1px solid colors.$GRAY6;
  border-radius: 10px;
  background-color: colors.$BG_COLOR;
  box-sizing: border-box;
  width: 100%;
  height: 46px;
  color: colors.$WHITE;
  text-align: center;
  padding-right: 14px;

  &:focus {
    border: 2px solid colors.$ORANGE;
  }
`;

export const customButton = css`
    width: 200px;
    height: 30px;
    padding: 5px;
    font-size: 16px;
    letter-spacing: 2px;
    background-color: #999999;
    box-shadow: 3px 5px 8px 3px hsla(0, 0%, 0%, 0.411);
    border: none;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    &:hover {
        box-shadow: inset 3px 5px 8px 3px hsla(0, 0%, 0%, 0.411);
        transform: translateY(2px);
    }
`;