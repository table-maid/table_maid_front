import { css } from "@emotion/react";

export const layout = css`
  width: 100%;
  height: 100%;
`;

export const backButton = css`
position: fixed;
top: 60px;
left: 140px;
background-color: transparent;
border: none;
`

export const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: orange; */
`;
export const containerBox = css`
  width: 30%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #dbdbdb;
`;
export const header = css`
  width: 100%;
  height: 10%;
  /* background-color: aqua; */
  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    font-weight: 400;
    font-size: 25px;
  }
`;
export const inputContainer = css`
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h4 {
    margin: 0;
    margin-bottom: 15px;
    font-weight: 500;
  }
`;

export const signupLayout = css`
  position: absolute;
  justify-content: center;
  text-align: center;
  width: 500px;
  height: 500px;
  top: 50%;
  transform: translateY(-50%);
  h1 {
    margin-bottom: 40px;
  }
`;

export const authPageInput = css`
  margin: 0 auto;
  width: 80%;
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

export const signinButton = (active) => css`
  box-sizing: border-box;
  border: none;
  padding: 10px;
  width: 80%;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: ${active ? '#187cff' : '#b8d6fd'};
  color: white;
  cursor: ${active ? "pointer" : "default"};
  &:hover {
    background-color: ${active ? '#4494fc' : '#a2cbff'};
    color: ${active ? '#c2dbff' : 'black'};
  }
  &:active {
    background-color: ${active ? '#1071fa' : '#a2cbff'};
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
`;

export const authentiCation = (state) => css`
  box-sizing: border-box;
  border: none;
  height: 40px;
  width: 80%;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: ${state ? '#187cff' : '#b8d6fd'};
  color: white;
  cursor: ${state ? 'pointer' : 'default'};
  &:hover {
    background-color: ${state ? "#4494fc" : "#a2cbff"};
  }
  &:active {
    background-color: ${state ? "#1071fa" : "#a2cbff"};
  }
`;