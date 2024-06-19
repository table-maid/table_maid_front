import { css } from "@emotion/react";

export const listContainer = css`
  box-sizing: border-box;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  text-align: center;
  position: absolute;
  border-radius: 20px;
`;

export const askTitle = css`
  list-style-type: none;
  background-color: #666666ea;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  color: white;

  & > li {
    text-align: center;
  }

  & > li:nth-of-type(1) {
    width: 40%;
  }
  & > li:nth-of-type(2) {
    width: 15%;
  }
  & > li:nth-of-type(3) {
    width: 30%;
  }
`;

export const list = css`
  box-sizing: border-box;
  /* border-radius: 30px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 90%;
  padding: 0;
  list-style: none;
  font-size: 18px;
  margin: 13px 0;

  & > li {
    text-align: center;
  }

  & > li:nth-of-type(1) {
    width: 40%;
  }
  & > li:nth-of-type(2) {
    width: 15%;
  }
  & > li:nth-of-type(3) {
    width: 30%;
  }

`;

export const pagination = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  list-style: none;
  padding: 0;

  li {
    display: inline;
    margin: 0 5px;

    button {
      padding: 5px 10px;
      border: none;
      background-color: #0e76ff;
      color: white;
      cursor: pointer;

      &:disabled {
        background-color: grey;
        cursor: default;
      }
    }
  }

  .active {
    font-weight: bold;
  }
`;