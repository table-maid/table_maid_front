import { css } from "@emotion/react";

export const userPasswordLayout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 30px;
`;

export const userPasswordContainer = css`
  box-sizing: border-box;
  background-color: white;
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
    margin: 5px 0 10px 0;
    cursor: default;
  }
`;

export const backButton = css`
position: relative;
right: 43%;
top: -8.5%;
transform: translate(-100%, -100%);
background-color: transparent;
border: none;
`

export const header = css`
  width: 75%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h1 {
    font-size: 23px;
    margin: 5px 0 10px 0;
    cursor: default;
  }
  & h3 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 13px;
    font-weight: 300;
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
