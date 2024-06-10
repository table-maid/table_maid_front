import { css } from '@emotion/react';

export const buttonContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const button = css`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
