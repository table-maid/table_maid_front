import { css } from "@emotion/react";

export const saleLayout = css`
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;

export const saleContainer = css`
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;

export const saleGraphContainer = css`
  width: 100%;
  height: 100%;
  /* background-color: orange; */
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;
`;


export const menuLayout = css`
  width: 100%;
  height: 100%;
  background-color: orange;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  `;
export const graphBox = css`
  width: 30%;
  height: 90%;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  & h3 {
    font-size: 20px;
    margin: 10px 0;
    font-weight: 400;
  }
  
  & h1 {
    margin: 10px 0;
  }
  & h2 {
    font-size: 50px;
    margin: 0;
  }
  `;

export const firstGraphBox = css`
  background: linear-gradient(to right, #babeff, lightblue); 
`;

export const imgLayout = css`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const img = css`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const sales = css`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;

& h1 {
  margin-left: 30px;
}


`;
export const link = css`
width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
  font-size: 24px;
  
  & h3 {
    margin-left: 50px;
    font-size: 26px;
  }
`;
export const listBox = css`
  width: 63%;
  height: 85%;
  background-color: #695c42;
  border-radius: 30px;
`;

export const menuBox = css`
  width: 30%;
  height: 85%;
  background-color: #695c42;
  border-radius: 30px;
`;
