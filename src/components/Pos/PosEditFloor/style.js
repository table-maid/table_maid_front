import { css } from "@emotion/react";

export const floorLayout = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const floorContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const header = css`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  button {
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #dbdbdb;
    }
  }
`;

export const floorBox = css`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;

  input:nth-of-type(1) {
    width: 13%;
    border-radius: 5px;
    border: 1px solid #757575;
  }

  input:nth-of-type(2) {
    width: 20%;
    border-radius: 5px;
    border: 1px solid #757575;
  }

  button {
    padding: 4px 10px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #dbdbdb;
    }
  }
`;

export const floorListContainer = css`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  h4 {
    margin: 0;
    padding: 10px;
  }
`;

export const floorItem = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #dbdbdb;

  div {
    flex: 1;
  }

  button {
    padding: 4px 10px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #dbdbdb;
    }
  }
`;

export const buttonContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    padding: 5px 15px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #dbdbdb;
    }
  }
`;

export const buttonBox = css`
  width: 80%;
  margin: 20px 0;
  display: flex;
  gap: 20px;

  button {
    padding: 5px 14px;
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    cursor: pointer;

    :hover {
      background-color: #dbdbdb;
    }
  }
`;
