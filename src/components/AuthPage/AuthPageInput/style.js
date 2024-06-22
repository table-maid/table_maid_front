import { css } from "@emotion/react";

export const inputBox = css`
  position: relative;
  box-sizing: border-box;
  width: 80%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: aqua; */
`;

export const inputContainer = css`
  position: relative;
  width: 100%;
`;

export const input = css`
  box-sizing: border-box;
  background-color: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
`;

export const label = (isFocusedOrFilled) => css`
  position: absolute;
  top: ${isFocusedOrFilled ? "12px" : "50%"};
  left: 13px;
  font-size: ${isFocusedOrFilled ? "12px" : "14px"};
  color: ${isFocusedOrFilled ? "#afafaf" : "#818181"};
  background-color: transparent;
  padding: 0 5px;
  transform: translateY(-50%);
  transition: all 0.2s ease-in-out;
`;

export const message = css`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7px 0;
`;

export const inputIcon = (type) => css`
  position: absolute;
  right: 20px;
  top: 13px;
  color: ${type === "error" ? "#ff6161" : "#00921b"};
`;

export const inputMessage = (type) => css`
  padding: 0;
  width: 100%;
  color: ${type === "error" ? "#ff6161" : "#00921b"};
  font-size: 11px;
  font-weight: 600;
`;
