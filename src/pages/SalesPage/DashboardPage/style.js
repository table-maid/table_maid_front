import { css } from "@emotion/react";

export const saleLayout = css`
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;

export const saleContainer = css`
box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`;

export const saleGraphContainer = css`
box-sizing: border-box;
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
  /* background-color: orange; */
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  `;
export const graphBox = css`
box-sizing: border-box;
  width: 30%;
  height: 90%;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border: 1px solid #dbdbdb;

  & h3 {
    font-size: 20px;
    margin: 10px 0;
    font-weight: 400;
  }
  
  & h1 {
    margin: 10px 0;
    font-size: 25px;
  }
  & h2 {
    font-size: 35px;
    margin: 0;
    margin-bottom: 8px;
  }

  transition: transform 0.5s ease, box-shadow 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  /* box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); 
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.7); 
  }  */


  `;

export const firstGraphBox = css`
  /* background: linear-gradient(to right, #babeff, lightblue);  */
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
    font-size: 23px;
    font-weight: 700;
  }
`;

export const button = css`
box-sizing: border-box;
  padding: 7px 20px;
  border-radius: 8px;
  border: 1px solid #187CFF;
  margin-top: 10px;
  background-color: #187CFF;
  color: white;
`;
export const listBox = css`
box-sizing: border-box;
  width: 63%;
  height: 85%;
  border: 1px solid #dbdbdb;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  transition: transform 0.5s ease, box-shadow 0.5s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  /* box-shadow: 0 0 20px rgba(255, 255, 255, 0.5); 
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.7); 
  } */

`;

export const menuBox = css`
box-sizing: border-box;
  width: 30%;
  height: 85%;
  background-color: #fff;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  border: 1px solid #dbdbdb;

  & h1 {
    font-size: 30px;
    margin: 0;
    margin-top: 10px;
  }

  & svg {
    color: gold;
  }

  /* box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);  */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

`;
export const menu = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  

  & h2 {
    margin: 0;
    margin-bottom: 15px;
    font-size: 20px;
  }

  & img {
    width: 70%;
    height: 70%;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.336) 0px 25px 30px -12px;
  }
`;
