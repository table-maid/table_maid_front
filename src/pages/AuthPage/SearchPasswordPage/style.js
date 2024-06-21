import { css } from "@emotion/react";

export const userPasswordLayout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const userPasswordContainer = css`
  box-sizing: border-box;
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  border-radius: 10px;

  & h1 {
    font-size: 35px;
    margin: 10px 0;
    cursor: default;
  }
`;

export const input = css`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const button = (isFormValid) => css`
  box-sizing: border-box;
  border: none;
  height: 40px;
  width: 75%;
  margin: 15px 0;
  background-color: ${isFormValid ? "#4cb5f9" : "#B2DFFC"};
  border-radius: 8px;
  color: white;
  cursor: ${isFormValid ? "pointer" : "default"};

  &:hover {
    background-color: ${isFormValid ? "#4494fc" : "#B2DFFC"};
    color: ${isFormValid ? "#c2dbff" : "white"};
  }
  &:active {
    background-color: ${isFormValid ? "#1071fa" : "#B2DFFC"};
  }

  a {
    text-decoration: none;
    padding: 5px;
  }
  a:link {
    color: #333333;
  }
  a:visited {
    color: #333333;
  }
  a:hover {
    color: #c2dbff;
  }
`;
