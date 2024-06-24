import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalContent = css`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
`;

export const closeButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const buttonLayout = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const insertButton = css`
  padding: 10px 20px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;
