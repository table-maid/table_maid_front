import { css } from "@emotion/react";

export const loginLayout = css`
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const loginContainer = css`
  box-sizing: border-box;
  width: 30%;
  height: 60%;
  /* background-color: orange; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
`;

export const header = css`
  width: 100%;
  height: 30%;
  /* background-color: #0099ff; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;

  & h1 {
    font-size: 35px;
    margin: 10px 0;
    cursor: default;
  }
`;

export const input = css`
  width: 100%;
  height: 60%;
  /* background-color: #757575; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const authPageInput = css`
  margin: 0 auto;
  width: 300px;
  margin-bottom: 15px;
  input {
    box-sizing: border-box;
    padding: 0 5px;
    width: 300px;
    height: 45px;
    border: 1px solid #b8d6fd;
  }
  input:nth-of-type(1) {
    margin-bottom: 2px;
  }
`;

export const signinButton = css`
  box-sizing: border-box;
  border: none;
  height: 40px;
  width: 75%;
  margin: 15px 0;
  background-color: #4cb5f9;
  border-radius: 8px;
  color: white;

  cursor: pointer;
  &:hover {
    background-color: #4494fc;
    color: #c2dbff;
  }
  &:active {
    background-color: #1071fa;
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

export const search = css`
  /* background-color: aqua; */
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
`;
export const link = css`
  /* background-color: aqua; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration-line: none;
  color: #636363;
  font-size: 14px;
`;

export const singUpBox = css`
  /* background-color: aqua; */
  width: 30%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #636363;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  margin-top: 20px;

  & p {
    font-size: 15px;
    width: 50%;
  }
`;

export const singUp = css`
  /* background-color: aqua; */
  width: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  & p {
    cursor: default;
  }
`;

export const link2 = css`
  text-decoration-line: none;
  color: #007fd4;
`;
