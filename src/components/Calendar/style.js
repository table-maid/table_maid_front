import { css } from "@emotion/react";

export const calendar = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid colors.$GRAY6;
  border-radius: 4px;
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
